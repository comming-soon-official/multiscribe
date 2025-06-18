"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Fingerprint,
  Shield,
  Rocket,
  BarChart3,
  Sparkles,
  Zap,
  Lock,
  Check,
  Code,
  ArrowRight,
  Star,
  CloudCog,
  HeartHandshake,
} from "lucide-react";

// Animated comparison card component
const ComparisonCard = ({
  title,
  description,
  icon,
  features,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}) => {
  return (
    <motion.div
      className="bg-gradient-to-br from-[#150C28] to-[#0F0A19] border border-white/5 rounded-xl overflow-hidden shadow-lg"
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(114, 9, 183, 0.15)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Card Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-lg bg-[#7209B7]/20 flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-white/70">{description}</p>
      </div>

      {/* Feature list */}
      <div className="p-6">
        <div className="space-y-3">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#7209B7]/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-[#F72585]" />
              </div>
              <span className="text-white/80">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Technology icon card
const TechCard = ({ icon, name }: { icon: React.ReactNode; name: string }) => {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#7209B7]/20 to-[#F72585]/20 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-white/70 text-sm text-center">{name}</span>
    </motion.div>
  );
};

// Testimonial card
const TestimonialCard = ({
  quote,
  author,
  role,
  stars,
}: {
  quote: string;
  author: string;
  role: string;
  stars: number;
}) => {
  return (
    <motion.div
      className="bg-white/5 rounded-xl p-6"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < stars ? "text-[#F72585]" : "text-white/20"
            }`}
            fill={i < stars ? "#F72585" : "none"}
          />
        ))}
      </div>

      <p className="text-white/80 italic mb-4">"{quote}"</p>

      <div>
        <p className="font-medium text-white">{author}</p>
        <p className="text-white/50 text-sm">{role}</p>
      </div>
    </motion.div>
  );
};

const WhyChooseUsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0F0A19]" />
        <motion.div
          style={{ y }}
          className="absolute -top-20 left-40 w-[40rem] h-[40rem] rounded-full bg-[#7209B7]/5 blur-[150px]"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-0 right-0 w-[35rem] h-[35rem] rounded-full bg-[#F72585]/5 blur-[120px]"
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]"></div>
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
            <Sparkles className="w-4 h-4 text-[#F72585]" />
            <span className="text-sm text-white/80">Industry Leader</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-purple-100 to-[#F72585]">
            Why Choose MultiScribe?
          </h2>

          <p className="text-lg text-white/60">
            See how MultiScribe stands out from generic transcription services
          </p>
        </motion.div>

        {/* Comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <ComparisonCard
              icon={<Rocket className="w-6 h-6 text-[#F72585]" />}
              title="Cutting-Edge Technology"
              description="MultiScribe uses the most advanced AI technology to deliver superior results"
              features={[
                "Neural network architecture with 1.5B parameters",
                "Custom acoustic models for challenging audio",
                "Continuous learning that improves over time",
                "Advanced noise filtering algorithms",
                "Real-time processing capabilities",
              ]}
            />
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <ComparisonCard
              icon={<BarChart3 className="w-6 h-6 text-[#F72585]" />}
              title="Enterprise Performance"
              description="Built for professional use with reliability and quality you can trust"
              features={[
                "99.8% accuracy even with challenging audio",
                "Processing times 5x faster than competitors",
                "Handles files up to 10 hours in length",
                "Scales to enterprise volume with ease",
                "Robust API for system integration",
              ]}
            />
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ComparisonCard
              icon={<Shield className="w-6 h-6 text-[#F72585]" />}
              title="Security & Privacy"
              description="Your data security is our priority with comprehensive protections"
              features={[
                "End-to-end encryption for all files",
                "GDPR, HIPAA, and SOC 2 compliant",
                "Optional on-premise deployment",
                "Automated data deletion policies",
                "Private cloud infrastructure",
              ]}
            />
          </motion.div>

          {/* Card 4 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ComparisonCard
              icon={<Zap className="w-6 h-6 text-[#F72585]" />}
              title="Flexible & Adaptable"
              description="Custom solutions that fit perfectly into your workflow"
              features={[
                "Custom vocabulary training for specific fields",
                "Multiple output formats including SRT, TXT, JSON",
                "Seamless integration via API and webhooks",
                "Batch processing for large workloads",
                "Domain-specific optimization",
              ]}
            />
          </motion.div>
        </div>

        {/* Technology showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Powered by Advanced Technology
            </h3>
            <p className="text-white/60 max-w-2xl mx-auto">
              Our technology stack combines the latest innovations in AI,
              machine learning, and cloud computing
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
            {[
              {
                icon: <Code className="w-8 h-8 text-[#F72585]" />,
                name: "Neural Networks",
              },
              {
                icon: <CloudCog className="w-8 h-8 text-[#F72585]" />,
                name: "Cloud Processing",
              },
              {
                icon: <Lock className="w-8 h-8 text-[#F72585]" />,
                name: "Encryption",
              },
              {
                icon: <Fingerprint className="w-8 h-8 text-[#F72585]" />,
                name: "Speaker ID",
              },
              {
                icon: <Shield className="w-8 h-8 text-[#F72585]" />,
                name: "Security",
              },
              {
                icon: <Zap className="w-8 h-8 text-[#F72585]" />,
                name: "Real-time API",
              },
            ].map((tech, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <TechCard icon={tech.icon} name={tech.name} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
              <Star className="w-4 h-4 text-[#F72585]" fill="#F72585" />
              <span className="text-sm text-white/80">User Testimonials</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Trusted by Professionals Worldwide
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "MultiScribe has transformed our podcast production workflow. We save hours on each episode with the most accurate transcripts I've ever seen.",
                author: "Alex Rodriguez",
                role: "Podcast Producer",
                stars: 5,
              },
              {
                quote:
                  "As a journalist, I need accurate transcriptions fast. MultiScribe delivers consistently even with challenging audio from press conferences and field interviews.",
                author: "Sarah Chen",
                role: "Investigative Journalist",
                stars: 5,
              },
              {
                quote:
                  "The ability to handle specialized medical terminology is exceptional. We use MultiScribe for all our research interviews and clinical documentation.",
                author: "Dr. Rajiv Patel",
                role: "Medical Researcher",
                stars: 4,
              },
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <TestimonialCard
                  quote={testimonial.quote}
                  author={testimonial.author}
                  role={testimonial.role}
                  stars={testimonial.stars}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#150C28]/95 to-[#0F0A19]/95"></div>
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]"></div>

          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full border border-[#7209B7]/20"></div>
          <div className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full border border-[#F72585]/20"></div>

          <div className="relative p-10 md:p-16 z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#7209B7]/20 flex items-center justify-center">
                  <HeartHandshake className="w-6 h-6 text-[#F72585]" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Ready to get started?
                </h3>
              </div>
              <p className="text-white/70 max-w-md">
                Join thousands of professionals who rely on MultiScribe for
                fast, accurate transcripts
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gradient-to-r from-[#7209B7] to-[#F72585] rounded-lg text-white font-medium whitespace-nowrap hover:shadow-lg hover:shadow-purple-500/20 transition-all"
              >
                Start Free Trial
              </motion.button>

              <button className="px-6 py-3 bg-white/5 hover:bg-white/10 transition-colors rounded-lg text-white font-medium whitespace-nowrap">
                View Pricing
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
