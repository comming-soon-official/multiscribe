"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileQuestion,
  FileCheck2,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";

// Problem-solution card that flips between both sides
const FlippableCard = ({
  problem,
  solution,
}: {
  problem: {
    title: string;
    description: string;
    icon: React.ReactNode;
  };
  solution: {
    title: string;
    description: string;
    icon: React.ReactNode;
  };
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-full h-[280px] perspective-1000 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setIsFlipped(!isFlipped);
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={isFlipped}
    >
      <motion.div
        className="relative w-full h-full transform-style-3d transition-transform duration-800"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Problem Side */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-xl p-6 border border-red-500/20 bg-gradient-to-br from-[#471323]/40 to-[#0F0A19] flex flex-col`}
        >
          <div className="mb-4 flex justify-between items-start">
            <div className="w-12 h-12 rounded-lg bg-red-900/20 flex items-center justify-center">
              {problem.icon}
            </div>
            <XCircle className="w-6 h-6 text-red-500/80" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">{problem.title}</h3>
          <p className="text-white/70 text-sm leading-relaxed">
            {problem.description}
          </p>
          <div className="mt-auto flex justify-end">
            <motion.div
              className="flex items-center gap-2 text-sm text-white/60"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <span>See solution</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>

        {/* Solution Side */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-xl p-6 border border-[#7209B7]/20 bg-gradient-to-br from-[#150C28]/80 to-[#0F0A19] flex flex-col rotateY-180`}
        >
          <div className="mb-4 flex justify-between items-start">
            <div className="w-12 h-12 rounded-lg bg-[#7209B7]/20 flex items-center justify-center">
              {solution.icon}
            </div>
            <CheckCircle2 className="w-6 h-6 text-[#4CC9F0]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">
            {solution.title}
          </h3>
          <p className="text-white/70 text-sm leading-relaxed">
            {solution.description}
          </p>
          <div className="mt-auto flex justify-end">
            <motion.div
              className="flex items-center gap-2 text-sm text-white/60"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <span>See problem</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProblemSolutionSection = () => {
  // Problem-Solution pairs data
  const problemSolutions = [
    {
      problem: {
        icon: <Clock className="w-6 h-6 text-red-400" />,
        title: "Manual Transcription Takes Forever",
        description:
          "Traditional transcription requires hours of painstaking work. A 1-hour audio file can take 4-5 hours to transcribe manually, delaying your workflow.",
      },
      solution: {
        icon: <Clock className="w-6 h-6 text-[#4CC9F0]" />,
        title: "5x Faster Processing Speed",
        description:
          "MultiScribe processes audio at lightning speed. That same 1-hour file? Transcribed in just minutes, so you can focus on what matters.",
      },
    },
    {
      problem: {
        icon: <FileQuestion className="w-6 h-6 text-red-400" />,
        title: "Inconsistent Quality & Accuracy",
        description:
          "Manual transcription or basic tools often miss words, misinterpret accents, and struggle with technical jargon or poor audio quality.",
      },
      solution: {
        icon: <FileCheck2 className="w-6 h-6 text-[#4CC9F0]" />,
        title: "99.8% Accuracy Guaranteed",
        description:
          "Our AI models are trained on diverse speech data with advanced noise filtering, ensuring precision even with accents, jargon, and challenging audio.",
      },
    },
    {
      problem: {
        icon: <XCircle className="w-6 h-6 text-red-400" />,
        title: "Limited Language Support",
        description:
          "Most transcription services support only major languages, leaving gaps for multilingual content and regional dialects.",
      },
      solution: {
        icon: <CheckCircle2 className="w-6 h-6 text-[#4CC9F0]" />,
        title: "100+ Languages & Dialects",
        description:
          "From Mandarin to Maori, Arabic to Zulu, MultiScribe handles over 100 languages with regional accent recognition built in.",
      },
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0F0A19]" />
        <motion.div
          className="absolute top-40 left-0 w-[30rem] h-[30rem] rounded-full bg-red-900/5 blur-[100px]"
          animate={{
            opacity: [0.3, 0.2, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-10 w-[35rem] h-[35rem] rounded-full bg-[#7209B7]/5 blur-[120px]"
          animate={{
            opacity: [0.3, 0.1, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 18, repeat: Infinity }}
        />
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500/20 to-[#7209B7]/20 border border-red-500/10 mb-6">
            <Lightbulb className="w-4 h-4 text-[#F72585]" />
            <span className="text-sm text-white/80">Problem Solved</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-purple-100 to-[#F72585]">
            From Challenge to Solution
          </h2>

          <p className="text-lg text-white/60">
            See how MultiScribe eliminates the common headaches of traditional
            transcription methods
          </p>
        </motion.div>

        {/* Problem-Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {problemSolutions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FlippableCard problem={item.problem} solution={item.solution} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={"/#hero"}
                className="relative z-10 px-8 py-4 bg-gradient-to-r from-[#7209B7] to-[#F72585] rounded-full text-lg font-medium text-white transition-all"
              >
                Try MultiScribe Free
              </Link>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#7209B7] to-[#F72585] rounded-full blur-md opacity-70 z-0"></div>
            </motion.div>
          </div>

          <p className="mt-4 text-white/50 text-sm">
            No credit card required • 60 minutes free transcription
          </p>
        </motion.div>
      </div>

      {/* Custom CSS for 3D flipping card effect */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .rotateY-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default ProblemSolutionSection;
