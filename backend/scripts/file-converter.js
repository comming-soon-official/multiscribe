const { exec } = require("child_process");
const path = require("path");
const util = require("util");
const fs = require("fs");

// Debug mode - set to true to enable debug logging
const DEBUG = true;

// Debug logging function
function debugLog(...args) {
  if (DEBUG) {
    console.log("[DEBUG]", ...args);
  }
}

// Debug error logging function
function debugErrorLog(...args) {
  if (DEBUG) {
    console.error("[ERROR] ", ...args);
  }
}

// Promisify exec
const execAsync = util.promisify(exec);

if (process.argv.length < 3) {
  debugErrorLog("Usage: node file-converter.js <input-file>");
  process.exit(1);
}

const inputFile = process.argv[2];

// Validate file exists
if (!fs.existsSync(inputFile)) {
  debugErrorLog(`File does not exist: ${inputFile}`);
  process.exit(1);
}

const ext = path.extname(inputFile);
const baseName = path.basename(inputFile, ext);
const outputFile = `${baseName}.mp3`;
const outputPath = path.resolve(
  "/home/himal/Projects/Cyberkrypts/multiscribe/backend/uploads/converted",
  outputFile
);

// Ensure output directory exists
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  debugLog(`Creating output directory: ${outputDir}`);
  fs.mkdirSync(outputDir, { recursive: true });
}

debugLog(`Starting conversion: ${inputFile} -> ${outputPath}`);
const cmd = `ffmpeg -i "${inputFile}" -vn -ar 44100 -ac 2 -b:a 192k "${outputPath}"`;

// Execute the command asynchronously
(async () => {
  try {
    debugLog(`Executing command: ${cmd}`);
    const { stdout, stderr } = await execAsync(cmd);

    if (stderr) {
      debugLog(`ffmpeg stderr output: ${stderr}`);
    }

    if (fs.existsSync(outputPath)) {
      debugLog(`Verified output file exists: ${outputPath}`);
      console.log(`Conversion complete: ${outputFile}`);
    } else {
      debugErrorLog(`Output file not created: ${outputPath}`);
      process.exit(1);
    }
  } catch (error) {
    debugErrorLog(`Conversion failed: ${error.message}`);
    if (error.stderr) {
      debugErrorLog(`ffmpeg error output: ${error.stderr}`);
    }
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
})();
