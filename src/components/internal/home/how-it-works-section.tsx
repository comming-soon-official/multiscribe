"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  FileAudio2,
  Settings2,
  FileText,
  Download,
  Share2,
  Play,
  CheckCircle,
  MoveRight,
  Sparkles,
  ChevronRight,
} from "lucide-react";

// Step indicator component
const StepIndicator = ({
  step,
  currentStep,
  title,
  onClick,
}: {
  step: number;
  currentStep: number;
  title: string;
  onClick: () => void;
}) => {
  const isActive = step === currentStep;
  const isCompleted = step < currentStep;

  return (
    <motion.button
      onClick={onClick}
      className={`relative flex flex-col items-center gap-2 group ${
        step === 4 ? "ml-auto" : ""
      }`}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: step * 0.1 }}
      viewport={{ once: true }}
    >
      {/* Line connector */}
      {step < 4 && (
        <div className="absolute top-[22px] left-[50px] w-[calc(100%+50px)] h-[2px]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#7209B7] to-[#4361EE]"
            initial={{ width: "0%" }}
            animate={{ width: isCompleted ? "100%" : "0%" }}
            transition={{ duration: 0.5 }}
          />
          <div
            className="absolute inset-0 bg-white/10"
            style={{ width: isCompleted ? "0%" : "100%" }}
          ></div>
        </div>
      )}

      {/* Step circle */}
      <div className="relative z-10">
        <motion.div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white border-2 transition-colors
            ${
              isActive
                ? "border-[#F72585] bg-[#F72585]/20"
                : isCompleted
                ? "border-[#7209B7] bg-[#7209B7]"
                : "border-white/30 bg-white/5"
            }`}
          animate={
            isActive
              ? {
                  boxShadow: [
                    "0 0 0 rgba(247, 37, 133, 0)",
                    "0 0 15px rgba(247, 37, 133, 0.5)",
                    "0 0 0 rgba(247, 37, 133, 0)",
                  ],
                }
              : {}
          }
          transition={{ duration: 2, repeat: Infinity }}
        >
          {isCompleted ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <span className="font-medium">{step}</span>
          )}
        </motion.div>
      </div>

      {/* Title */}
      <span
        className={`text-sm whitespace-nowrap font-medium transition-colors
        ${
          isActive
            ? "text-[#F72585]"
            : isCompleted
            ? "text-[#7209B7]"
            : "text-white/50"
        }`}
      >
        {title}
      </span>
    </motion.button>
  );
};

// Step content components
const StepUpload = () => (
  <div className="h-full flex flex-col">
    <div className="border-2 border-dashed border-[#7209B7]/40 rounded-xl p-8 cursor-pointer text-center flex-1 flex flex-col items-center justify-center hover:border-[#F72585]/40 transition-colors">
      <div className="w-16 h-16 rounded-full bg-[#7209B7]/20 flex items-center justify-center mb-6">
        <FileAudio2 className="w-6 h-6 text-[#F72585]" />
      </div>
      <p className="text-lg font-medium text-white mb-2">
        Upload your audio or video
      </p>
      <p className="text-white/50 text-sm">Drag and drop or click to browse</p>
      <p className="text-white/30 text-xs mt-4">
        Supports MP3, WAV, MP4, MOV & more
      </p>
    </div>
  </div>
);

const StepConfigure = () => (
  <div className="h-full flex flex-col gap-4">
    <div className="bg-[#150C28]/80 rounded-xl p-6 flex-1">
      <h3 className="font-medium text-white mb-4">Transcription Settings</h3>

      <div className="space-y-5">
        {[
          {
            label: "Language",
            value: "English (US)",
            options: ["English (US)", "Spanish", "French"],
          },
          { label: "Speaker Identification", value: true },
          { label: "Timestamps", value: true },
          { label: "Filter Fillers", value: false },
          { label: "Custom Vocabulary", placeholder: "Add industry terms..." },
        ].map((setting, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <label className="text-white/70 text-sm">{setting.label}</label>

            {Array.isArray(setting.options) ? (
              <select className="bg-[#0F0A19] border border-white/10 rounded-lg p-2 text-white">
                {setting.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : typeof setting.value === "boolean" ? (
              <div className="flex items-center">
                <div
                  className={`w-10 h-5 rounded-full relative ${
                    setting.value ? "bg-[#7209B7]" : "bg-white/10"
                  }`}
                >
                  <div
                    className={`absolute top-[2px] w-4 h-4 rounded-full bg-white transition-all ${
                      setting.value ? "left-[22px]" : "left-[2px]"
                    }`}
                  ></div>
                </div>
                <span className="ml-2 text-white/50 text-xs">
                  {setting.value ? "Enabled" : "Disabled"}
                </span>
              </div>
            ) : (
              <input
                type="text"
                placeholder={setting.placeholder}
                className="bg-[#0F0A19] border border-white/10 rounded-lg p-2 text-white placeholder:text-white/30"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const StepProcess = () => (
  <div className="h-full flex flex-col">
    <div className="bg-[#150C28]/80 rounded-xl p-8 flex-1 flex flex-col items-center justify-center text-center">
      <motion.div
        className="w-20 h-20 mb-6 relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-[#7209B7]/30"></div>
        <div className="absolute inset-0 rounded-full border-t-4 border-[#F72585]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8 text-[#F72585]" />
          </motion.div>
        </div>
      </motion.div>

      <h3 className="text-xl font-medium text-white mb-2">
        Processing Your Audio
      </h3>
      <p className="text-white/60 mb-8">
        Our AI is carefully analyzing your audio
      </p>

      <div className="w-full max-w-md bg-[#0F0A19]/80 rounded-full h-2.5 mb-4">
        <motion.div
          className="bg-gradient-to-r from-[#7209B7] to-[#F72585] h-2.5 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "75%" }}
          transition={{ duration: 3 }}
        ></motion.div>
      </div>
      <p className="text-white/50 text-sm">75% complete</p>
    </div>
  </div>
);

const StepComplete = () => (
  <div className="h-full flex flex-col">
    <div className="bg-[#150C28]/80 rounded-xl p-6 flex-1">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium text-white">Transcription Complete</h3>
        <div className="px-2 py-1 bg-[#7209B7]/20 text-[#F72585] text-xs rounded-full">
          00:05:32
        </div>
      </div>

      <div className="bg-[#0F0A19] border border-white/10 rounded-lg p-4 mb-6 max-h-[140px] overflow-auto">
        <div className="space-y-3">
          <div>
            <p className="text-white/50 text-xs mb-1">00:00:12</p>
            <p className="text-white">
              Welcome to MultiScribe, the next generation of transcription
              technology.
            </p>
          </div>
          <div>
            <p className="text-white/50 text-xs mb-1">00:00:18</p>
            <p className="text-white">
              Our AI can process any audio or video with unmatched accuracy.
            </p>
          </div>
          <div>
            <p className="text-white/50 text-xs mb-1">00:00:24</p>
            <p className="text-white">
              With support for over 100 languages, you're always covered.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-2 bg-[#7209B7] hover:bg-[#7209B7]/80 text-white px-4 py-2 rounded-lg transition-colors">
          <Download className="w-4 h-4" />
          <span>Download</span>
        </button>
        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg transition-colors">
          <FileText className="w-4 h-4" />
          <span>Edit</span>
        </button>
        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg transition-colors">
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>
    </div>
  </div>
);

const HowItWorksSection = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Step data
  const steps = [
    { number: 1, title: "Upload", component: <StepUpload /> },
    { number: 2, title: "Configure", component: <StepConfigure /> },
    { number: 3, title: "Process", component: <StepProcess /> },
    { number: 4, title: "Complete", component: <StepComplete /> },
  ];

  // Handle next step
  const goToNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0F0A19]" />
        <motion.div
          style={{ y }}
          className="absolute bottom-0 -left-40 w-[50rem] h-[50rem] rounded-full bg-[#7209B7]/5 blur-[150px]"
        />
        <motion.div className="absolute top-20 -right-20 w-[35rem] h-[35rem] rounded-full bg-[#F72585]/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#7209B7]/20 to-[#F72585]/20 border border-purple-500/10 mb-6">
            <Play className="w-4 h-4 text-[#F72585]" />
            <span className="text-sm text-white/80">Simple Process</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-purple-100 to-[#F72585]">
            How MultiScribe Works
          </h2>

          <p className="text-lg text-white/60">
            From upload to finished transcript in four easy steps
          </p>
        </motion.div>

        {/* Step indicators */}
        <div className="flex justify-between items-start mb-12 max-w-3xl mx-auto">
          {steps.map((step) => (
            <StepIndicator
              key={step.number}
              step={step.number}
              currentStep={currentStep}
              title={step.title}
              onClick={() => setCurrentStep(step.number)}
            />
          ))}
        </div>

        {/* Main demo container */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-gradient-to-br from-[#150C28] to-[#0F0A19] border border-white/5 rounded-2xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Header */}
            <div className="border-b border-white/5 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-white/70 text-sm ml-2">MultiScribe</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#F72585]"></div>
                <span className="text-xs text-white/50">LIVE DEMO</span>
              </div>
            </div>

            {/* Content area */}
            <div className="p-8 min-h-[380px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {steps.find((step) => step.number === currentStep)?.component}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="border-t border-white/5 p-4 flex justify-between items-center">
              <button
                className="px-4 py-2 text-white/50 hover:text-white transition-colors text-sm"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Back
              </button>

              <div className="flex items-center gap-1.5">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className={`w-2 h-2 rounded-full ${
                      currentStep === step.number
                        ? "bg-[#F72585]"
                        : "bg-white/20"
                    }`}
                  />
                ))}
              </div>

              <button
                className={`px-4 py-2 text-sm flex items-center gap-2 rounded-lg ${
                  currentStep === steps.length
                    ? "bg-[#7209B7]/20 text-white/50 cursor-not-allowed"
                    : "bg-[#7209B7] text-white hover:bg-[#7209B7]/80 transition-colors"
                }`}
                onClick={goToNextStep}
                disabled={currentStep === steps.length}
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTAs */}
        <div className="mt-20 max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              Ready to Get Started?
            </h3>
            <p className="text-white/60 mb-4">
              Try MultiScribe with 60 minutes free transcription
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-[#7209B7] to-[#F72585] rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all">
              Start Transcribing Free
            </button>
          </motion.div>

          <div className="w-px h-20 bg-white/10 hidden md:block"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              Need More Details?
            </h3>
            <p className="text-white/60 mb-4">
              See our detailed documentation and guides
            </p>
            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 transition-colors rounded-lg text-white font-medium flex items-center gap-2">
              <span>View Documentation</span>
              <MoveRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
