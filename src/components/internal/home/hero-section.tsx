"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Languages,
  FileAudio2,
  Play,
  RefreshCw,
  Pause,
  LanguagesIcon,
  Globe2,
  ChevronRight,
} from "lucide-react";
import { Orbitron } from "next/font/google";
import { SearchSelect } from "@/components/ui/search-select";
import { languages } from "./language-list";
import { LanguagesPopover } from "./feature-section"; // Import LanguagesPopover component

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

// Define application states
const STATES = {
  UPLOAD: "upload",
  PREVIEW: "preview",
  PROCESSING: "processing",
};

// Custom animated wave component
const AudioWave = ({ playing = false }: { playing?: boolean }) => {
  const bars = Array.from({ length: 12 }).map((_, i) => i);

  return (
    <div className="flex items-end gap-[2px] h-6">
      {bars.map((i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t from-[#7209B7] to-[#F72585]"
          animate={
            playing
              ? {
                  height: [
                    `${Math.random() * 50 + 20}%`,
                    `${Math.random() * 100}%`,
                    `${Math.random() * 50 + 20}%`,
                  ],
                }
              : { height: "30%" }
          }
          transition={{
            duration: playing ? 0.6 : 0,
            repeat: playing ? Infinity : 0,
            ease: "easeInOut",
            delay: i * 0.05,
          }}
        />
      ))}
    </div>
  );
};

// Convert languages to the format expected by SearchSelect
const languageOptions = languages.map((lang) => ({
  label: lang.label,
  value: lang.value,
}));

// Upload state component
type UploadStateProps = {
  onDragEnter: React.DragEventHandler<HTMLDivElement>;
  onDragLeave: React.DragEventHandler<HTMLDivElement>;
  onDragOver: React.DragEventHandler<HTMLDivElement>;
  onDrop: React.DragEventHandler<HTMLDivElement>;
  handleFileSelect: React.ChangeEventHandler<HTMLInputElement>;
  dragActive: boolean;
};

const UploadState = ({
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  handleFileSelect,
  dragActive,
}: UploadStateProps) => (
  <div
    className={`border-2 border-dashed border-white/10 rounded-xl p-12 cursor-pointer text-center h-96 flex flex-col items-center justify-center hover:border-[#7209B7]/40 transition-colors duration-300 ${
      dragActive ? "bg-[#7209B7]/10" : ""
    }`}
    onDragEnter={onDragEnter}
    onDragLeave={onDragLeave}
    onDragOver={onDragOver}
    onDrop={onDrop}
    onClick={() => document.getElementById("fileInput")?.click()}
    tabIndex={0}
    role="button"
    aria-label="Upload audio or video file"
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        document.getElementById("fileInput")?.click();
      }
    }}
  >
    <input
      type="file"
      id="fileInput"
      className="hidden"
      accept="audio/*,video/*"
      onChange={handleFileSelect}
    />
    <div className="w-24 h-24 rounded-full bg-[#7209B7]/10 flex items-center justify-center mb-8">
      <FileAudio2 className="w-10 h-10 text-[#F72585]" />
    </div>
    <p className="text-2xl font-medium text-white mb-3">
      Drop your audio or video here
    </p>
    <p className="text-white/50 text-lg">or click to browse your files</p>
    <p className="text-white/30 text-sm mt-5">
      Supports MP3, WAV, MP4, MOV & more
    </p>
  </div>
);

// Preview state component
type PreviewStateProps = {
  uploadedFile: File;
  handleReset: () => void;
  isPlaying: boolean;
  togglePlay: () => void;
  formatFileSize: (bytes: number) => string;
  getFileExtension: (filename: string) => string;
};

const PreviewState = ({
  uploadedFile,
  handleReset,
  isPlaying,
  togglePlay,
  formatFileSize,
  getFileExtension,
}: PreviewStateProps) => (
  <div className="border-2 border-[#7209B7]/30 rounded-xl p-10 text-center h-96 flex flex-col justify-between">
    {/* File info */}
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7209B7]/30 to-[#F72585]/30 flex items-center justify-center mb-6">
        <span className="text-xl font-bold text-white">
          {getFileExtension(uploadedFile.name)}
        </span>
      </div>

      <h4 className="font-medium text-xl text-white mb-2 max-w-xs truncate">
        {uploadedFile.name}
      </h4>

      <p className="text-white/50 text-base">
        {formatFileSize(uploadedFile.size)}
      </p>

      {/* Audio wave animation */}
      <div className="mt-8">
        <AudioWave playing={isPlaying} />
      </div>
    </div>

    {/* Action buttons */}
    <div className="flex justify-center gap-5 mt-6">
      <button
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
        className={`flex items-center gap-2 ${
          isPlaying
            ? "bg-[#F72585]/40 text-[#F72585]"
            : "bg-[#7209B7]/40 text-[#7209B7]"
        } px-5 py-3 rounded-lg hover:bg-opacity-30 transition-colors text-base`}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
        <span>{isPlaying ? "Pause" : "Play"}</span>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleReset(); // Call handleReset to clear the current file and reset state
          // After resetting, trigger the file input click to select a new file
          setTimeout(() => {
            document.getElementById("fileInput")?.click();
          }, 100);
        }}
        className="flex items-center gap-2 bg-white/5 text-white/80 px-5 py-3 rounded-lg hover:bg-white/10 transition-colors text-base"
      >
        <RefreshCw className="w-5 h-5" />
        <span>Replace</span>
      </button>
    </div>
  </div>
);

// Processing state component
const ProcessingState = () => (
  <div className="border-2 border-[#7209B7]/30 rounded-xl p-12 cursor-pointer text-center h-96 flex flex-col items-center justify-center">
    <div className="w-28 h-28 mb-8">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7209B7" />
            <stop offset="100%" stopColor="#F72585" />
          </linearGradient>
        </defs>
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          stroke="url(#gradient)"
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          stroke="url(#gradient)"
          strokeWidth="4"
          fill="none"
          initial={{ pathLength: 0, rotate: 0 }}
          animate={{ pathLength: 1, rotate: 180 }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </svg>
    </div>
    <AudioWave playing={true} />
    <p className="mt-6 text-white font-medium text-xl">
      Processing your audio...
    </p>
    <p className="text-white/50 text-base mt-2">
      This usually takes less than a minute
    </p>
  </div>
);

// Main component
const HeroSection = () => {
  const [currentState, setCurrentState] = useState(STATES.UPLOAD);
  const [dragActive, setDragActive] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const controls = useAnimation();
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [showLanguagesPopover, setShowLanguagesPopover] = useState(false); // Add state for languages popover

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
      controls.start({
        scale: 1.03,
        boxShadow: "0 0 30px rgba(114, 9, 183, 0.5)",
      });
    } else if (e.type === "dragleave") {
      setDragActive(false);
      controls.start({
        scale: 1,
        boxShadow: "0 0 0px rgba(114, 9, 183, 0)",
      });
    }
  };

  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    controls.start({
      scale: 1,
      boxShadow: "0 0 0px rgba(114, 9, 183, 0)",
    });

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Common handler for both drop and file selection
  const handleFile = (file: File) => {
    // Reset previous audio URL if it exists
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    setUploadedFile(file);
    setCurrentState(STATES.PREVIEW);

    // Create URL for audio preview if it's audio file
    if (file.type.startsWith("audio/") || file.type.startsWith("video/")) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);

      // Create audio element for preview
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.load();
      } else {
        const audio = new Audio(url);
        audioRef.current = audio;
      }
    }
  };

  // Handle play/pause
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Reset file upload
  const handleReset = () => {
    setUploadedFile(null);
    setCurrentState(STATES.UPLOAD);
    setIsPlaying(false);

    if (audioRef.current) {
      audioRef.current.pause();
    }

    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  };

  // Start transcription process
  const startTranscription = () => {
    if (uploadedFile && selectedLanguage) {
      setCurrentState(STATES.PROCESSING);

      // Auto-disable demo after 10 seconds
      setTimeout(() => {
        setCurrentState(STATES.UPLOAD);
        // Reset after processing is complete
        handleReset();
      }, 10000);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  // Audio playback ended event
  useEffect(() => {
    if (!audioRef.current) return;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audioRef.current.addEventListener("ended", handleEnded);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleEnded);
      }
    };
  }, [audioRef.current]);

  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  // Get file extension
  const getFileExtension = (filename: string): string => {
    return filename.split(".").pop()?.toUpperCase() || "";
  };

  // Render the appropriate state component
  const renderStateComponent = () => {
    switch (currentState) {
      case STATES.UPLOAD:
        return (
          <UploadState
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            handleFileSelect={handleFileSelect}
            dragActive={dragActive}
          />
        );
      case STATES.PREVIEW:
        return (
          <PreviewState
            uploadedFile={uploadedFile!}
            handleReset={handleReset}
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            formatFileSize={formatFileSize}
            getFileExtension={getFileExtension}
          />
        );
      case STATES.PROCESSING:
        return <ProcessingState />;
      default:
        return (
          <UploadState
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            handleFileSelect={handleFileSelect}
            dragActive={dragActive}
          />
        );
    }
  };

  // Selected language display name
  const selectedLanguageName =
    languages.find((lang) => lang.value === selectedLanguage)?.label ||
    "Select language";

  return (
    <section
      id="hero"
      className="min-h-screen relative pt-20 md:mt-20 pb-40 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {/* Animated circles */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 rounded-full bg-[#7209B7]/10 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -top-20 -right-20 w-[30rem] h-[30rem] rounded-full bg-[#4361EE]/10 blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-0 left-1/4 w-[25rem] h-[25rem] rounded-full bg-[#F72585]/10 blur-[100px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.015] z-0"></div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 pt-10">
          {/* Left column - Text content */}
          <div className="w-full lg:w-1/2">
            {/* Tech badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3A0CA3]/20 to-[#7209B7]/20 border border-purple-500/20 rounded-full py-2 px-4 mb-8"
            >
              <LanguagesIcon className="w-4 h-4 text-[#7209B7]" />
              <span className="text-xs font-semibold tracking-wider text-[#F72585]">
                AI-POWERED TRANSCRIPTION
              </span>
            </motion.div>

            {/* Main heading with animation */}
            <div className="mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className={`text-5xl md:text-7xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-purple-100 to-[#F72585] ${orbitron.className}`}
              >
                Turn Voice Into Text
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex items-center gap-4 my-4"
              >
                <div className="h-[1px] w-20 bg-gradient-to-r from-[#7209B7] to-transparent"></div>
                <AudioWave playing={currentState === STATES.PROCESSING} />
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg text-white/70 mb-10 max-w-lg"
            >
              Precision transcription powered by cutting-edge AI. Convert any
              audio or video to text with unmatched accuracy in over 100+
              languages.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-3 gap-8 mb-10"
            >
              {[
                { label: "Accuracy", value: "99.8%" },
                { label: "Languages", value: "100+" },
                { label: "Users", value: "500K+" },
              ].map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </span>
                  <span className="text-xs text-white/50 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Call to action links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-wrap gap-6 items-center"
            >
              <button
                onClick={() => setShowLanguagesPopover(true)}
                className="bg-gradient-to-r from-[#7209B7] to-[#F72585] text-white px-8 py-4 rounded-full font-medium text-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center gap-2"
              >
                <Globe2 className="w-5 h-5" />
                <span>View Supported Languages</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href="#features"
                className="flex items-center gap-2 text-white/80 hover:text-white group"
              >
                <span>See Features</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </motion.div>
          </div>

          {/* Right column - Upload interface */}
          <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {/* Decorative circles */}
              <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full border border-[#7209B7]/30"></div>
              <div className="absolute -bottom-12 -right-12 w-24 h-24 rounded-full border border-[#F72585]/30"></div>

              {/* Upload panel */}
              <motion.div
                animate={controls}
                className="bg-gradient-to-br from-[#150C28] to-[#0F0A19] overflow-visible rounded-2xl border border-white/5 shadow-xl relative z-10"
              >
                {/* Top navigation bar */}
                <div className="flex items-center justify-between px-8 py-5 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <FileAudio2 className="w-6 h-6 text-[#F72585]" />
                    <span className="font-medium text-white text-lg">
                      Audio Transcription
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-2.5 h-2.5 rounded-full bg-white/20"
                      />
                    ))}
                  </div>
                </div>

                {/* Main upload area - Dynamic based on current state */}
                <div className="p-8 transition-all duration-300">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentState}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderStateComponent()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom controls */}
                <div className="border-t border-white/5 p-8 flex flex-col lg:flex-row gap-5 justify-between relative">
                  {/* Language selector */}
                  <div className="w-full">
                    <SearchSelect
                      options={languageOptions}
                      value={selectedLanguage}
                      onChange={setSelectedLanguage}
                      placeholder="Select language"
                      searchPlaceholder="Search language..."
                      icon={<Languages className="w-5 h-5" />}
                      emptyMessage="No languages found"
                    />
                  </div>

                  {/* Transcribe button - disabled until file is uploaded and language is selected */}
                  <button
                    className={`w-full lg:w-auto px-8 py-3 rounded-lg font-medium transition-all whitespace-nowrap text-base
                      ${
                        uploadedFile && selectedLanguage
                          ? "bg-gradient-to-r from-[#7209B7] to-[#F72585] text-white hover:shadow-lg hover:shadow-purple-500/30"
                          : "bg-white/5 text-white/30 cursor-not-allowed"
                      }`}
                    disabled={
                      !uploadedFile ||
                      !selectedLanguage ||
                      currentState === STATES.PROCESSING
                    }
                    onClick={startTranscription}
                  >
                    Transcribe Now
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Languages Popover */}
      <LanguagesPopover
        isOpen={showLanguagesPopover}
        onClose={() => setShowLanguagesPopover(false)}
      />
    </section>
  );
};

export default HeroSection;
