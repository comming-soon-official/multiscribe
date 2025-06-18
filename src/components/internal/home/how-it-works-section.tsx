"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FileAudio2,
  FileText,
  Play,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Globe2,
  ArrowUpRight,
  MoveRight,
} from "lucide-react";

const HowItWorksSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // How it works steps
  const steps = [
    {
      icon: <FileAudio2 className="w-8 h-8 text-[#F72585]" />,
      title: "Upload",
      description: "Drop any audio or video file into the transcription box",
      color: "from-[#F72585]/20 to-[#F72585]/5",
      borderColor: "border-[#F72585]/20",
      iconBg: "bg-[#F72585]/10",
    },
    {
      icon: <Globe2 className="w-8 h-8 text-[#7209B7]" />,
      title: "Select Language",
      description: "Choose from 100+ languages for accurate transcription",
      color: "from-[#7209B7]/20 to-[#7209B7]/5",
      borderColor: "border-[#7209B7]/20",
      iconBg: "bg-[#7209B7]/10",
    },
    {
      icon: <FileText className="w-8 h-8 text-[#4361EE]" />,
      title: "Get Results",
      description: "Receive your accurate transcript in just minutes",
      color: "from-[#4361EE]/20 to-[#4361EE]/5",
      borderColor: "border-[#4361EE]/20",
      iconBg: "bg-[#4361EE]/10",
    },
  ];

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
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#7209B7]/20 to-[#F72585]/20 border border-purple-500/10 mb-6">
            <Play className="w-4 h-4 text-[#F72585]" />
            <span className="text-sm text-white/80">Simple Process</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-purple-100 to-[#F72585]">
            How MultiScribe Works
          </h2>

          <p className="text-lg text-white/60">
            Three simple steps from audio to accurate transcription
          </p>
        </motion.div>

        {/* Interactive steps with visual flow */}
        <div className="max-w-5xl mx-auto">
          {/* Steps connected by arrows */}
          <div className="relative">
            {/* Arrow connectors */}
            <div className="hidden md:block">
              <motion.div
                className="absolute top-[105px] left-[260px] w-[calc(100%-520px)] h-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="h-[2px] w-full bg-gradient-to-r from-[#F72585] to-[#7209B7]"></div>
                <motion.div
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  viewport={{ once: true }}
                >
                  <ArrowRight className="w-5 h-5 text-[#7209B7]" />
                </motion.div>
              </motion.div>

              <motion.div
                className="absolute top-[105px] right-[260px] w-[calc(100%-520px)] h-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="h-[2px] w-full bg-gradient-to-r from-[#7209B7] to-[#4361EE]"></div>
                <motion.div
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                  viewport={{ once: true }}
                >
                  <ArrowRight className="w-5 h-5 text-[#4361EE]" />
                </motion.div>
              </motion.div>
            </div>

            {/* Cards */}
            <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex-1"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`rounded-2xl p-6 h-full bg-gradient-to-b ${step.color} border ${step.borderColor} backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/5 transition-all`}
                  >
                    <div className="flex items-start gap-5">
                      <div className={`p-3 rounded-xl ${step.iconBg}`}>
                        {step.icon}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-white text-xs font-medium mr-2">
                            {index + 1}
                          </span>
                          <h3 className="text-xl font-semibold text-white">
                            {step.title}
                          </h3>
                        </div>
                        <p className="mt-3 text-white/60">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visual demonstration */}
          <motion.div
            className="mt-12 md:mt-16 p-6 border border-white/10 rounded-2xl bg-[#150C28]/30 backdrop-blur-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Left side - Description */}
              <div className="w-full md:w-2/5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-2 w-2 rounded-full bg-[#F72585]"></div>
                  <h3 className="text-white font-semibold">
                    AI-Powered Accuracy
                  </h3>
                </div>

                <h4 className="text-2xl font-bold text-white mb-4">
                  What happens behind the scenes
                </h4>

                <p className="text-white/60 mb-6">
                  Our powerful AI engine processes your audio, identifying
                  speakers, reducing background noise, and recognizing accents
                  for superior accuracy.
                </p>

                <div className="space-y-3">
                  {[
                    "Advanced speaker diarization",
                    "Smart punctuation and formatting",
                    "Background noise filtering",
                    "Support for industry terminology",
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#7209B7] mt-0.5" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side - Visual */}
              <div className="w-full md:w-3/5 flex justify-center">
                <div className="relative">
                  {/* Input file */}
                  <motion.div
                    className="absolute -left-12 md:-left-20 top-6 w-32 h-32 md:w-40 md:h-40 rounded-xl bg-[#150C28]/80 border border-[#F72585]/20 p-4 flex flex-col items-center justify-center"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    viewport={{ once: true }}
                  >
                    <FileAudio2 className="w-8 h-8 md:w-10 md:h-10 text-[#F72585] mb-2" />
                    <p className="text-xs md:text-sm text-white/80 text-center">
                      Audio Input
                    </p>
                  </motion.div>

                  {/* Processing */}
                  <motion.div
                    className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-gradient-to-br from-[#150C28] to-[#0F0A19] border border-purple-500/20 flex flex-col items-center justify-center"
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="w-20 h-20 rounded-full bg-[#7209B7]/20 flex items-center justify-center mb-6"
                      animate={{
                        boxShadow: [
                          "0 0 0 rgba(114, 9, 183, 0)",
                          "0 0 20px rgba(114, 9, 183, 0.5)",
                          "0 0 0 rgba(114, 9, 183, 0)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Sparkles className="w-8 h-8 text-[#F72585]" />
                    </motion.div>
                    <p className="text-lg md:text-xl font-semibold text-white mb-2">
                      AI Processing
                    </p>
                    <p className="text-white/60 text-center text-xs md:text-sm max-w-[80%]">
                      Converting speech to text with advanced machine learning
                    </p>

                    {/* Animated processing dots */}
                    <div className="flex gap-2 mt-4">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-[#F72585]"
                          animate={{
                            opacity: [0.3, 1, 0.3],
                            scale: [0.8, 1.2, 0.8],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* Output file */}
                  <motion.div
                    className="absolute -right-12 md:-right-20 top-6 w-32 h-32 md:w-40 md:h-40 rounded-xl bg-[#150C28]/80 border border-[#4361EE]/20 p-4 flex flex-col items-center justify-center"
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    viewport={{ once: true }}
                  >
                    <FileText className="w-8 h-8 md:w-10 md:h-10 text-[#4361EE] mb-2" />
                    <p className="text-xs md:text-sm text-white/80 text-center">
                      Text Output
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interactive demo button */}
        <div className="flex justify-center mt-12">
          <motion.a
            href="#demo"
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7209B7]/20 to-[#F72585]/20 rounded-lg border border-purple-500/20 text-white hover:bg-gradient-to-r hover:from-[#7209B7]/30 hover:to-[#F72585]/30 transition-all"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Try it yourself at the top</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </motion.a>
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
