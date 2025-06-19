#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { createGoogleGenerativeAI } = require("@ai-sdk/google");
const { generateObject } = require("ai");
const { z } = require("zod");
const { exec } = require("child_process");
const util = require("util");
const os = require("os");
require("dotenv/config");

// Debug mode - set to true to enable debug logging
const DEBUG = false;
// Keep temporary files on error
const KEEP_FILES_ON_ERROR = false;

const MEDIA_CONCURRENCY = 5;
const API_CONCURRENCY = 10;

// Debug logging function
function debugLog(...args) {
  if (DEBUG) {
    console.log("[DEBUG]", ...args);
  }
}

// Debug logging function
function debugErrorLog(...args) {
  if (DEBUG) {
    console.error("[ERROR] ", ...args);
  }
}

// Promisify exec
const execAsync = util.promisify(exec);

// Check if file path is provided
if (process.argv.length < 3) {
  debugErrorLog("Please provide an audio file path");
  debugErrorLog("Usage: node script.js <audio_file_path>");
  process.exit(1);
}

const audioFilePath = process.argv[2];

// Validate file exists
if (!fs.existsSync(audioFilePath)) {
  debugErrorLog(`File does not exist: ${audioFilePath}`);
  process.exit(1);
}

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

// Check file type
const mimeType = getMimeType(audioFilePath);
if (!mimeType.startsWith("audio/")) {
  debugErrorLog(`File is not an audio file: ${audioFilePath}`);
  process.exit(1);
}

// Check if ffmpeg is installed
async function checkFfmpegInstalled() {
  try {
    await execAsync("ffmpeg -version", { stdio: "ignore" });
    return true;
  } catch (error) {
    debugErrorLog(
      "ffmpeg is not installed or not in PATH. Please install ffmpeg to use this script."
    );
    return false;
  }
}

// Create temp directory for chunks
function createTempDir() {
  const tempDir = path.join(os.tmpdir(), `audio-chunks-${Date.now()}`);
  fs.mkdirSync(tempDir, { recursive: true });
  return tempDir;
}

// Get audio duration in seconds using ffmpeg
async function getAudioDuration(audioPath) {
  const { stdout } = await execAsync(
    `ffmpeg -i "${audioPath}" 2>&1 | grep "Duration" | awk '{print $2}' | tr -d ,`
  );

  const durationStr = stdout.trim();
  const [hours, minutes, seconds] = durationStr.split(":").map(parseFloat);
  return hours * 3600 + minutes * 60 + seconds;
}

// Get silence points in audio using ffmpeg
async function detectSilence(
  audioPath,
  silenceThreshold = -30,
  minSilenceDuration = 0.3
) {
  const { stdout } = await execAsync(
    `ffmpeg -i "${audioPath}" -af silencedetect=noise=${silenceThreshold}dB:d=${minSilenceDuration} -f null - 2>&1`
  );

  // Extract both silence start and end points
  const silenceRanges = [];
  const silencePoints = [];
  const startRegex = /silence_start: ([\d.]+)/g;
  const endRegex = /silence_end: ([\d.]+)\s+silence_duration: ([\d.]+)/g;

  let startMatch;
  let endMatch;

  while ((startMatch = startRegex.exec(stdout)) !== null) {
    const start = parseFloat(startMatch[1]);
    silencePoints.push({ type: "start", time: start });
  }

  while ((endMatch = endRegex.exec(stdout)) !== null) {
    const end = parseFloat(endMatch[1]);
    const duration = parseFloat(endMatch[2]);
    silencePoints.push({ type: "end", time: end });
    silenceRanges.push({
      start: end - duration,
      end: end,
      duration: duration,
    });
  }

  // Sort by time
  silencePoints.sort((a, b) => a.time - b.time);

  return {
    points: silencePoints.filter((p) => p.type === "end").map((p) => p.time),
    ranges: silenceRanges,
  };
}

// Split audio file into chunks at silence points
async function splitAudioIntoChunks(audioPath, tempDir, chunkDuration = 50) {
  const totalDuration = await getAudioDuration(audioPath);

  // Get silence points
  const silenceData = await detectSilence(audioPath);
  const silencePoints = silenceData.points;
  const silenceRanges = silenceData.ranges;

  // Set up chunk parameters
  let startTime = 0;
  let chunkIndex = 0;
  const chunkParams = [];

  // First, collect all chunk parameters without creating them yet
  while (startTime < totalDuration) {
    // Find the next suitable silence point
    const nextIdealPoint = startTime + chunkDuration;
    let cutPoint = nextIdealPoint;

    // Find the closest silence point after the minimum duration
    const nextSilence = silencePoints.find((point) => point > nextIdealPoint);
    if (nextSilence && nextSilence < nextIdealPoint + 10) {
      // Allow up to 10 seconds extra to find silence
      cutPoint = nextSilence;
    }

    // Ensure we don't exceed total duration
    cutPoint = Math.min(cutPoint, totalDuration);

    const chunkPath = path.join(
      tempDir,
      `chunk-${chunkIndex}${path.extname(audioPath)}`
    );

    chunkParams.push({
      path: chunkPath,
      startTime: startTime,
      endTime: cutPoint,
    });

    startTime = cutPoint;
    chunkIndex++;
  }

  // Now create chunks with concurrency limit of 5
  const allChunksData = [];

  // Process chunks in batches of 5
  for (let i = 0; i < chunkParams.length; i += MEDIA_CONCURRENCY) {
    const batch = chunkParams.slice(i, i + MEDIA_CONCURRENCY);

    const batchPromises = batch.map((params) =>
      createChunk(audioPath, params, silenceRanges)
    );
    const batchResults = await Promise.all(batchPromises);

    allChunksData.push(...batchResults);
  }

  return allChunksData;
}

// Helper function to create a single chunk
async function createChunk(audioPath, params, silenceRanges) {
  const { path: chunkPath, startTime, endTime } = params;

  await execAsync(
    `ffmpeg -i "${audioPath}" -ss ${startTime} -t ${
      endTime - startTime
    } -c copy "${chunkPath}" -y`,
    { stdio: "ignore" }
  );

  // Check if this chunk is entirely silent using silence ranges from original detection
  const isSilent = isChunkSilent(startTime, endTime, silenceRanges);

  return {
    path: chunkPath,
    startTime,
    endTime,
    isSilent,
  };
}

// Check if an audio chunk is entirely or mostly silent using pre-detected silence ranges
function isChunkSilent(
  chunkStart,
  chunkEnd,
  silenceRanges,
  silenceRatio = 0.95
) {
  try {
    const chunkDuration = chunkEnd - chunkStart;
    let silenceDuration = 0;

    // Calculate how much silence is in this chunk
    for (const range of silenceRanges) {
      // Check if silence range overlaps with chunk
      if (range.end > chunkStart && range.start < chunkEnd) {
        // Calculate overlap
        const overlapStart = Math.max(range.start, chunkStart);
        const overlapEnd = Math.min(range.end, chunkEnd);
        silenceDuration += overlapEnd - overlapStart;
      }
    }

    // If silence covers at least 95% of the chunk, consider it silent
    return silenceDuration / chunkDuration >= silenceRatio;
  } catch (error) {
    debugErrorLog(`Error checking for silence: ${error.message}`);
    return false; // Assume not silent on error
  }
}

async function generateTimestamps(audioPath, baseTime = 0) {
  debugLog("Start transcribing => ", audioPath);
  try {
    const audioData = fs.readFileSync(audioPath);
    const chunkMimeType = getMimeType(audioPath);

    const result = await generateObject({
      model: google("gemini-2.5-pro-preview-05-06"),
      schema: z.object({
        transcript: z
          .array(
            z.object({
              text: z
                .string()
                .describe(
                  "The transcribed and translated to english text content"
                ),
              start: z
                .number()
                .describe("Start time of the speech segment in seconds"),
              end: z
                .number()
                .describe("End time of the speech segment in seconds"),
            })
          )
          .describe("Array of transcribed speech segments with timestamps"),
      }),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: 'Transcribe this audio file to English, providing accurate timestamps in seconds. If the audio contains a non-English language, translate it to English while keeping the translation concise and natural. Only include the translated text in final output, Provide speech segments with start and end times. Handle silences, pauses, and unclear audio appropriately. For unclear audio, indicate this in the text like "(unclear)" or "(background noise)". For laughs or sounds, indicate as "(laughs)" or "(sigh)".',
            },
            {
              type: "file",
              data: audioData,
              mimeType: chunkMimeType,
            },
          ],
        },
      ],
    });

    // Adjust timestamps based on the chunk's start time
    const adjustedTranscript = result.object.transcript.map((segment) => ({
      ...segment,
      start: segment.start + baseTime,
      end: segment.end + baseTime,
    }));

    return { transcript: adjustedTranscript };
  } catch (error) {
    debugErrorLog("Error generating timestamps:", error.message, audioPath);
    if (error.response) {
      debugErrorLog("API response:", error.response.data);
    }
    throw error;
  }
}

// Helper function to determine MIME type from file extension
function getMimeType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    ".mp3": "audio/mpeg",
    ".wav": "audio/wav",
    ".ogg": "audio/ogg",
    ".m4a": "audio/mp4",
    ".flac": "audio/flac",
    ".aac": "audio/aac",
    ".wma": "audio/webm",
  };

  return mimeTypes[extension] || "application/octet-stream";
}

// Clean up temporary directory
function cleanupTempDir(tempDir) {
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch (error) {
    debugErrorLog(`Failed to clean up temporary directory: ${error.message}`);
  }
}

// Main execution
(async () => {
  let hasError = false;
  let tempDir;

  try {
    // Check if ffmpeg is installed
    if (!(await checkFfmpegInstalled())) {
      process.exit(1);
    }

    // Create temporary directory
    tempDir = createTempDir();
    debugLog(`Created temporary directory: ${tempDir}`);

    // Split audio into chunks
    const chunks = await splitAudioIntoChunks(audioFilePath, tempDir);
    debugLog(`Split audio into ${chunks.length} chunks`);

    // Process chunks in batches with limited concurrency
    const results = [];

    // Process chunks in batches with limited concurrency
    for (let i = 0; i < chunks.length; i += API_CONCURRENCY) {
      const batch = chunks.slice(i, i + API_CONCURRENCY);
      debugLog(
        `Processing batch ${Math.floor(i / API_CONCURRENCY) + 1}/${Math.ceil(
          chunks.length / API_CONCURRENCY
        )}`
      );

      const batchPromises = batch.map((chunk) => {
        // Skip transcription for silent chunks
        if (chunk.isSilent) {
          debugLog(`Skipping silent chunk ${chunk.path}`);
          return Promise.resolve({ transcript: [] });
        }
        debugLog(
          `Processing chunk ${chunk.path} (${chunk.startTime}s - ${chunk.endTime}s)`
        );
        return generateTimestamps(chunk.path, chunk.startTime);
      });

      const batchResults = await Promise.allSettled(batchPromises);
      batchResults.forEach((result) => {
        if (result.status === "fulfilled") {
          results.push(...result.value.transcript);
        } else {
          hasError = true;
          debugErrorLog(`Failed to process chunk: ${result.reason}`);
        }
      });
    }

    // Sort results by start time
    results.sort((a, b) => a.start - b.start);
    debugLog(`Completed processing with ${results.length} transcript segments`);

    // Output final combined results
    console.log(JSON.stringify(results, null, 2));
  } catch (error) {
    hasError = true;
    debugErrorLog("Failed to process audio file:", error);
    process.exit(1);
  } finally {
    // Clean up temporary files if no error occurred or if we don't want to keep files on error
    if (tempDir && (!hasError || !KEEP_FILES_ON_ERROR)) {
      debugLog("Cleaning up temporary directory");
      cleanupTempDir(tempDir);
    } else if (tempDir) {
      debugErrorLog(`Temporary files preserved at: ${tempDir}`);
    }
  }
})();
