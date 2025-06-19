"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  FileText,
  Video,
  Newspaper,
  Briefcase,
  Microscope,
  GraduationCap,
  LibraryBig,
  MoveRight,
  CheckCircle2,
  ArrowRight,
  Award,
} from "lucide-react";

// User group icon mapping
const userIcons = {
  "content-creators": Video,
  journalists: Newspaper,
  "business-professionals": Briefcase,
  researchers: Microscope,
  educators: GraduationCap,
  "legal-professionals": LibraryBig,
};

type UserCategoryId = keyof typeof userIcons;

// User card component
const UserCard = ({
  id,
  icon,
  title,
  active,
  onClick,
}: {
  id: UserCategoryId;
  icon: React.ElementType;
  title: string;
  active: boolean;
  onClick: () => void;
}) => {
  const Icon = icon;

  return (
    <motion.div
      onClick={onClick}
      className={`relative cursor-pointer p-4 rounded-xl transition-all overflow-hidden ${
        active
          ? "bg-gradient-to-br from-[#7209B7]/30 to-[#F72585]/20 border-[#F72585]/30"
          : "bg-white/5 hover:bg-white/10 border-white/5"
      } border`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      {/* Background glow effect when active */}
      {active && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#7209B7]/0 via-[#F72585]/20 to-[#7209B7]/0 blur-xl"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            left: ["-100%", "100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      )}

      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            active ? "bg-[#F72585]/20" : "bg-white/10"
          }`}
        >
          <Icon
            className={`w-5 h-5 ${active ? "text-[#F72585]" : "text-white/70"}`}
          />
        </div>
        <span
          className={`font-medium ${active ? "text-white" : "text-white/70"}`}
        >
          {title}
        </span>
      </div>

      {active && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#7209B7] to-[#F72585]"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          exit={{ width: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

// User profile content component
const UserProfile = ({ id }: { id: UserCategoryId }) => {
  // Content for each user category
  const userProfiles = {
    "content-creators": {
      title: "Content Creators",
      description:
        "Whether you're producing videos, podcasts, or social media content, MultiScribe helps you create accurate captions, generate transcripts, and repurpose your audio content into blog posts or social media snippets.",
      useCases: [
        "Automatic caption generation for videos",
        "Convert podcasts to blog articles",
        "Create searchable archives of your content",
        "Extract quotes for social media",
      ],
      testimonial: {
        text: "MultiScribe doubled my content output by letting me repurpose my podcast episodes into blog posts and social media content with minimal effort.",
        author: "Alex Chen, Podcast Host",
      },
    },
    journalists: {
      title: "Journalists & Media",
      description:
        "Save valuable time by automatically transcribing interviews, press conferences, and field recordings. Focus on crafting your story while MultiScribe handles the transcription work with accuracy and speed.",
      useCases: [
        "Interview transcription with speaker identification",
        "Searchable archives of recorded content",
        "Quick turnaround for breaking news",
        "Transcribe press conferences in real-time",
      ],
      testimonial: {
        text: "As a journalist on tight deadlines, MultiScribe has been a game-changer. I can focus on asking the right questions knowing my interviews will be transcribed accurately and quickly.",
        author: "Sophia Rodriguez, Investigative Reporter",
      },
    },
    "business-professionals": {
      title: "Business Professionals",
      description:
        "Never miss important details from meetings, calls, or conferences. Create searchable records of business discussions, extract action items, and share meeting notes with your team in minutes.",
      useCases: [
        "Meeting transcription with action item extraction",
        "Conference call documentation",
        "Customer interview insights",
        "Sales call analysis",
      ],
      testimonial: {
        text: "Our team meetings are now 40% more productive because we can focus on discussion rather than note-taking. MultiScribe captures everything and the summary feature highlights key decisions.",
        author: "Michael Tran, Product Manager",
      },
    },
    researchers: {
      title: "Researchers & Academics",
      description:
        "Transform qualitative research with efficient transcription of interviews, focus groups, and field recordings. MultiScribe handles technical terminology and supports multiple languages for global research.",
      useCases: [
        "Interview and focus group transcription",
        "Field research documentation",
        "Lecture and seminar transcription",
        "Multi-language research support",
      ],
      testimonial: {
        text: "MultiScribe handles the specialized vocabulary in my research field with remarkable accuracy. It's cut my qualitative data processing time by at least 70%.",
        author: "Dr. Amara Singh, Research Scientist",
      },
    },
    educators: {
      title: "Educators & Students",
      description:
        "Create accessible learning materials, transcribe lectures, and help students with note-taking. MultiScribe makes education more inclusive while saving valuable preparation time.",
      useCases: [
        "Lecture transcription for student reference",
        "Accessibility compliance for educational content",
        "Create searchable educational archives",
        "Convert spoken assignments to text",
      ],
      testimonial: {
        text: "My students with hearing impairments now have equal access to all lecture content. Plus, everyone benefits from the searchable transcripts when studying for exams.",
        author: "Professor James Wilson, University Educator",
      },
    },
    "legal-professionals": {
      title: "Legal Professionals",
      description:
        "Streamline documentation of client meetings, depositions, and court proceedings. MultiScribe's accuracy and confidentiality make it the trusted choice for legal transcription needs.",
      useCases: [
        "Deposition and hearing transcription",
        "Client meeting documentation",
        "Legal research interview transcription",
        "Evidence review and cataloging",
      ],
      testimonial: {
        text: "The accuracy of MultiScribe for legal terminology is impressive. It's become an essential tool in our practice for documenting client consultations and case preparation.",
        author: "Elizabeth Parker, Attorney",
      },
    },
  };

  const profile = userProfiles[id];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-[#150C28] to-[#0F0A19] rounded-2xl overflow-hidden border border-white/5 shadow-lg"
    >
      <div className="p-8">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-3xl font-bold text-white mb-4">
            {profile.title}
          </h3>
          <p className="text-white/70">{profile.description}</p>
        </div>

        {/* Use cases */}
        <div className="mb-8">
          <h4 className="text-lg font-medium text-white mb-4">
            Popular Use Cases
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {profile.useCases.map((useCase, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#F72585] shrink-0 mt-0.5" />
                <span className="text-white/80">{useCase}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-white/5 rounded-xl p-5">
          <p className="text-white/80 italic mb-4">
            "{profile.testimonial.text}"
          </p>
          <p className="text-sm text-[#F72585]">{profile.testimonial.author}</p>
        </div>
      </div>

      {/* Footer with CTA */}
      <div className="border-t border-white/5 p-6 flex justify-between items-center">
        <a
          href="#"
          className="text-white/70 hover:text-white transition-colors"
        >
          View {profile.title} case studies
        </a>
        <button className="flex items-center gap-2 bg-[#7209B7] hover:bg-[#7209B7]/80 text-white px-4 py-2 rounded-lg transition-colors">
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

const TargetUsersSection = () => {
  const [activeUser, setActiveUser] =
    useState<UserCategoryId>("content-creators");

  // User categories
  const users = [
    { id: "content-creators" as UserCategoryId, title: "Content Creators" },
    { id: "journalists" as UserCategoryId, title: "Journalists" },
    {
      id: "business-professionals" as UserCategoryId,
      title: "Business Professionals",
    },
    { id: "researchers" as UserCategoryId, title: "Researchers" },
    { id: "educators" as UserCategoryId, title: "Educators" },
    {
      id: "legal-professionals" as UserCategoryId,
      title: "Legal Professionals",
    },
  ];

  return (
    <section id="target-users" className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0F0A19]" />
        <motion.div
          className="absolute -top-20 right-0 w-[40rem] h-[40rem] rounded-full bg-[#7209B7]/5 blur-[120px]"
          animate={{
            opacity: [0.3, 0.1, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-20 w-[30rem] h-[30rem] rounded-full bg-[#F72585]/5 blur-[100px]"
          animate={{
            opacity: [0.2, 0.1, 0.2],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 15, repeat: Infinity }}
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#7209B7]/20 to-[#F72585]/20 border border-purple-500/10 mb-6">
            <Users className="w-4 h-4 text-[#F72585]" />
            <span className="text-sm text-white/80">Versatile Solution</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white via-purple-100 to-[#F72585]">
            Who Benefits from MultiScribe?
          </h2>

          <p className="text-lg text-white/60">
            Our AI transcription tools are designed for diverse professionals
            with unique needs
          </p>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar - User categories */}
          <div className="space-y-3">
            {users.map((user) => (
              <UserCard
                key={user.id}
                id={user.id}
                icon={userIcons[user.id]}
                title={user.title}
                active={activeUser === user.id}
                onClick={() => setActiveUser(user.id)}
              />
            ))}

            {/* Stats block */}
            {/* <motion.div
              className="bg-gradient-to-br from-[#150C28] to-[#0F0A19] rounded-xl p-6 mt-6 border border-white/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#7209B7]/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#F72585]" />
                </div>
                <h3 className="font-medium text-lg text-white">
                  Trusted by Professionals
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-3xl font-bold text-white">500K+</p>
                  <p className="text-white/50 text-sm">Active Users</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">100+</p>
                  <p className="text-white/50 text-sm">Industries</p>
                </div>
              </div>
            </motion.div> */}
          </div>

          {/* Right content - User profile details */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <UserProfile key={activeUser} id={activeUser} />
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-white/70 mb-6">
            Don't see your specific use case? MultiScribe is adaptable to many
            more industries and needs.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-[#F72585] hover:text-[#F72585]/80 transition-colors font-medium"
          >
            <span>Contact us to discuss your requirements</span>
            <MoveRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TargetUsersSection;
