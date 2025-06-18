"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  FileAudio,
  Languages,
  FileJson,
  Brain,
  Fingerprint,
  Download,
  Sparkles,
  MicVocal,
  Globe2,
  FileText,
  ArrowRight,
  ChevronRight,
  X,
} from "lucide-react";
import { languages } from "./language-list";

const ExportCard = ({
  format,
  active,
  setActive,
}: {
  format: string;
  active: boolean;
  setActive: (format: string) => void;
}) => {
  const getIcon = () => {
    switch (format.toLowerCase()) {
      case "srt":
        return <FileText className="w-5 h-5" />;
      case "txt":
        return <FileText className="w-5 h-5" />;
      case "json":
        return <FileJson className="w-5 h-5" />;
      case "docx":
        return <FileText className="w-5 h-5" />;
      case "csv":
        return <FileText className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <motion.div
      className={`relative w-16 h-16 rounded-xl flex flex-col items-center justify-center cursor-pointer ${
        active ? "bg-[#7209B7]" : "bg-white/5 hover:bg-white/10"
      } transition-colors`}
      onClick={() => setActive(format)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="text-white">{getIcon()}</div>
      <span
        className={`text-xs mt-1 ${active ? "text-white" : "text-white/70"}`}
      >
        .{format.toLowerCase()}
      </span>

      {active && (
        <motion.div
          layoutId="selectedIndicator"
          className="absolute -bottom-1 w-2 h-2 bg-[#F72585] rounded-full"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </motion.div>
  );
};

const WaveVisualizer = () => {
  return (
    <div className="flex h-16 items-end gap-[2px]">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t from-[#7209B7] to-[#F72585]"
          initial={{ height: 4 }}
          animate={{
            height: [
              `${Math.random() * 16 + 4}px`,
              `${Math.random() * 40 + 4}px`,
              `${Math.random() * 16 + 4}px`,
            ],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.03,
          }}
        />
      ))}
    </div>
  );
};

const LanguagesPopover = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Reset search query when popover closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  // Handle close with search reset
  const handleClose = () => {
    setSearchQuery("");
    onClose();
  };

  if (!isOpen) return null;

  const filteredLanguages = languages.filter((lang) =>
    lang.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#150C28] border border-white/10 rounded-xl shadow-xl z-50 w-[90vw] max-w-3xl max-h-[80vh] overflow-hidden"
          >
            <div className="p-4 border-b border-white/10 flex justify-between items-center sticky top-0 bg-[#150C28] z-10">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-[#F72585]" />
                Supported Languages (100+)
              </h3>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 border-b border-white/10 bg-[#150C28]/90 sticky top-[65px] backdrop-blur-sm">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search languages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-white outline-none focus:ring-2 focus:ring-[#7209B7]/50 pl-10"
                />
                <svg
                  className="absolute left-3 top-2.5 w-5 h-5 text-white/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(80vh-10rem)]">
              {filteredLanguages.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {filteredLanguages.map((lang, index) => (
                    <motion.div
                      key={lang.value}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.01 }}
                      className="px-3 py-2 rounded-lg bg-white/5 hover:bg-[#7209B7]/30 transition-colors"
                    >
                      <p className="text-white">{lang.label}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-white/70">
                  <p>No languages found matching "{searchQuery}"</p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-2 text-sm text-[#F72585] hover:underline"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const FeatureSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const [activeFormat, setActiveFormat] = useState("SRT");
  const [activeDemoTab, setActiveDemoTab] = useState("accuracy");
  const [showLanguagesPopover, setShowLanguagesPopover] = useState(false);

  // Parallax effect
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Export formats
  const exportFormats = ["SRT", "TXT", "JSON", "DOCX", "CSV"];

  // Feature highlights data
  const demoTabs = [
    {
      id: "accuracy",
      name: "Accuracy",
      description:
        "Advanced AI models trained on millions of hours of diverse audio for unmatched transcription accuracy.",
      stats: [
        { label: "Accuracy Rate", value: "99.8%" },
        { label: "Error Reduction", value: "85%" },
      ],
    },
    {
      id: "languages",
      name: "Languages",
      description:
        "Support for over 100 languages with dialect detection and specialized vocabulary handling.",
      stats: [
        { label: "Languages", value: "100+" },
        { label: "Dialects", value: "45+" },
      ],
    },
    {
      id: "speed",
      name: "Speed",
      description:
        "Process hours of audio in minutes with our distributed cloud processing architecture.",
      stats: [
        { label: "Processing", value: "5x Faster" },
        { label: "Real-time", value: "Available" },
      ],
    },
  ];

  return (
    <section
      id="features"
      ref={containerRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0F0A19]" />
        <motion.div
          style={{ y }}
          className="absolute -top-40 -left-20 w-[40rem] h-[40rem] rounded-full bg-[#7209B7]/5 blur-[120px]"
        />
        <motion.div
          style={{ y: y.get() * -1 }}
          className="absolute -bottom-40 -right-20 w-[30rem] h-[30rem] rounded-full bg-[#F72585]/5 blur-[100px]"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#7209B7]/20 to-[#F72585]/20 border border-purple-500/10 mb-6">
            <Sparkles className="w-4 h-4 text-[#F72585]" />
            <span className="text-sm text-white/80">
              Revolutionary Features
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-purple-100 to-[#F72585]">
            Beyond Basic Transcription
          </h2>

          <p className="text-lg text-white/60">
            Experience the next generation of audio-to-text technology with
            features that transform how you work with spoken content
          </p>
        </motion.div>

        {/* Feature blocks */}
        <div className="space-y-40 mb-32">
          {/* Feature 1: Real-time transcription demo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col md:flex-row items-center gap-12 md:gap-20"
          >
            {/* Left side */}
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#150C28] to-[#0F0A19] rounded-2xl overflow-hidden border border-white/5 shadow-xl"
              >
                <div className="p-1">
                  <div className="bg-[#0F0A19]/80 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex gap-1">
                        {["#F72585", "#7209B7", "#4361EE"].map((color, i) => (
                          <div
                            key={i}
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <div className="px-3 py-1 rounded-full bg-[#7209B7]/20 text-xs text-[#F72585]">
                        LIVE DEMO
                      </div>
                    </div>

                    <div className="flex gap-4 mb-6">
                      {demoTabs.map((tab) => (
                        <button
                          key={tab.id}
                          className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            activeDemoTab === tab.id
                              ? "bg-[#7209B7] text-white"
                              : "bg-white/5 text-white/70 hover:bg-white/10"
                          }`}
                          onClick={() => setActiveDemoTab(tab.id)}
                        >
                          {tab.name}
                        </button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeDemoTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="mb-6"
                      >
                        <p className="text-white/70 mb-6">
                          {
                            demoTabs.find((tab) => tab.id === activeDemoTab)
                              ?.description
                          }
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-6">
                          {demoTabs
                            .find((tab) => tab.id === activeDemoTab)
                            ?.stats.map((stat, i) => (
                              <div
                                key={i}
                                className="bg-white/5 rounded-lg p-4"
                              >
                                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
                                  {stat.label}
                                </p>
                                <p className="text-2xl font-bold text-white">
                                  {stat.value}
                                </p>
                              </div>
                            ))}
                        </div>

                        {activeDemoTab === "languages" && (
                          <motion.button
                            onClick={() => setShowLanguagesPopover(true)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-2 px-4 py-2 bg-[#7209B7]/30 hover:bg-[#7209B7]/50 text-white rounded-lg transition-colors mt-2 text-sm"
                          >
                            <span>View All Supported Languages</span>
                            <ChevronRight className="w-4 h-4" />
                          </motion.button>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    <WaveVisualizer />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2 order-1 md:order-2"
            >
              <h3 className="text-sm uppercase tracking-wider text-[#F72585] mb-4">
                High Performance
              </h3>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                AI-Powered Accuracy & Speed
              </h2>

              <p className="text-white/70 mb-8 text-lg">
                Our advanced neural networks are trained on millions of hours of
                diverse audio data, achieving industry-leading accuracy even
                with challenging audio conditions.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: <Brain className="w-6 h-6" />,
                    title: "Noise Filtering",
                    description:
                      "Automatically removes background noise and enhances speech clarity",
                  },
                  {
                    icon: <MicVocal className="w-6 h-6" />,
                    title: "Speaker Diarization",
                    description:
                      "Distinguishes between different speakers in conversations",
                  },
                  {
                    icon: <Globe2 className="w-6 h-6" />,
                    title: "Multilingual Support",
                    description:
                      "Handles accents and mixed language content with ease",
                  },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#7209B7] to-[#4361EE] shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-white/60">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Feature 2: Export options */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col md:flex-row items-center gap-12 md:gap-20"
          >
            {/* Left side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
              <h3 className="text-sm uppercase tracking-wider text-[#F72585] mb-4">
                Flexible Output
              </h3>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Export In Any Format
              </h2>

              <p className="text-white/70 mb-8 text-lg">
                Take your transcriptions anywhere with multiple export options.
                From subtitles to documents, we've got you covered.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                {exportFormats.map((format) => (
                  <ExportCard
                    key={format}
                    format={format}
                    active={activeFormat === format}
                    setActive={setActiveFormat}
                  />
                ))}
              </div>

              <div className="flex items-center gap-4">
                <button className="px-6 py-3 bg-[#7209B7] hover:bg-[#4361EE] rounded-lg text-white font-medium transition-colors flex items-center gap-2">
                  <span>See All Formats</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#"
                  className="text-white/70 hover:text-white transition-colors underline"
                >
                  View samples
                </a>
              </div>
            </motion.div>

            {/* Right side */}
            <div className="w-full md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Code preview background shape */}
                <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full border border-[#7209B7]/30"></div>
                <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full border border-[#F72585]/30"></div>

                {/* Export preview */}
                <div className="bg-gradient-to-br from-[#150C28] to-[#0F0A19] rounded-2xl overflow-hidden border border-white/5 shadow-xl relative z-10">
                  <div className="p-5 border-b border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#F72585]"></div>
                      <span className="text-white font-mono text-sm">
                        transcript.{activeFormat.toLowerCase()}
                      </span>
                    </div>
                    <button className="px-3 py-1 bg-[#7209B7]/30 hover:bg-[#7209B7]/50 rounded text-sm text-white/80">
                      Download
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFormat}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="p-5 min-h-[300px] max-h-[300px] overflow-auto font-mono text-sm"
                    >
                      {activeFormat === "SRT" && (
                        <pre className="text-white/80">
                          {`1
00:00:01,000 --> 00:00:04,000
Welcome to MultiScribe, the next generation

2
00:00:04,100 --> 00:00:08,000
of AI-powered transcription technology.

3
00:00:08,500 --> 00:00:12,500
Our platform offers unmatched accuracy

4
00:00:12,600 --> 00:00:16,000
and support for over 100 languages.

5
00:00:16,500 --> 00:00:20,000
Turn any audio or video into precise text.`}
                        </pre>
                      )}

                      {activeFormat === "TXT" && (
                        <div className="text-white/80">
                          <p>
                            Welcome to MultiScribe, the next generation of
                            AI-powered transcription technology.
                          </p>
                          <br />
                          <p>
                            Our platform offers unmatched accuracy and support
                            for over 100 languages.
                          </p>
                          <br />
                          <p>
                            Turn any audio or video into precise text with our
                            cutting-edge models trained on millions of hours of
                            diverse content.
                          </p>
                          <br />
                          <p>
                            Whether you're a content creator, researcher,
                            journalist or business professional, MultiScribe
                            delivers enterprise-quality transcriptions with
                            lightning speed.
                          </p>
                        </div>
                      )}

                      {activeFormat === "JSON" && (
                        <pre className="text-green-400">
                          {`{
  "transcript": {
    "metadata": {
      "duration": 58.4,
      "speakers": 1,
      "language": "en-US",
      "confidence": 0.98
    },
    "segments": [
      {
        "start": 1.0,
        "end": 4.0,
        "text": "Welcome to MultiScribe, the next generation",
        "confidence": 0.99,
        "speaker": "speaker_0"
      },
      {
        "start": 4.1,
        "end": 8.0,
        "text": "of AI-powered transcription technology.",
        "confidence": 0.98,
        "speaker": "speaker_0"
      },
      {
        "start": 8.5,
        "end": 12.5,
        "text": "Our platform offers unmatched accuracy",
        "confidence": 0.99,
        "speaker": "speaker_0"
      }
    ]
  }
}`}
                        </pre>
                      )}

                      {activeFormat === "DOCX" && (
                        <div className="text-white/80 space-y-4">
                          <p className="font-bold text-lg">Transcript</p>
                          <p>
                            Welcome to MultiScribe, the next generation of
                            AI-powered transcription technology.
                          </p>
                          <p>
                            Our platform offers unmatched accuracy and support
                            for over 100 languages.
                          </p>
                          <p>
                            Turn any audio or video into precise text with our
                            cutting-edge models.
                          </p>
                          <div className="border-t border-white/10 pt-4 mt-4">
                            <p className="text-xs text-white/50">
                              Generated by MultiScribe AI | 99% accuracy
                            </p>
                          </div>
                        </div>
                      )}

                      {activeFormat === "CSV" && (
                        <pre className="text-yellow-300">
                          {`start,end,speaker,text
1.0,4.0,speaker_0,"Welcome to MultiScribe, the next generation"
4.1,8.0,speaker_0,"of AI-powered transcription technology."
8.5,12.5,speaker_0,"Our platform offers unmatched accuracy"
12.6,16.0,speaker_0,"and support for over 100 languages."
16.5,20.0,speaker_0,"Turn any audio or video into precise text."
20.1,24.0,speaker_0,"With our cutting-edge models trained on"
24.1,28.0,speaker_0,"millions of hours of diverse content."
`}
                        </pre>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Final CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative mt-20 rounded-3xl overflow-hidden"
        >
          {/* Background gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#7209B7]/30 to-[#F72585]/20"></div>
          <div className="absolute inset-0 bg-[#0F0A19]/80"></div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F72585] to-transparent"></div>
          <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full border border-[#7209B7]/20"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full border border-[#F72585]/20"></div>

          <div className="relative p-12 md:p-20 z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Ready to Transform Your Audio?
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg">
              Join thousands of professionals who trust MultiScribe for
              accurate, fast, and flexible transcription.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-[#7209B7] to-[#F72585] rounded-full text-lg font-medium text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              Start Transcribing Now
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Languages Popover */}
      <LanguagesPopover
        isOpen={showLanguagesPopover}
        onClose={() => setShowLanguagesPopover(false)}
      />
    </section>
  );
};

export default FeatureSection;
