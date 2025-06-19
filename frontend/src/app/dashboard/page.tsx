"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileAudio,
  BarChart2,
  Clock,
  Calendar,
  Folder,
  Settings,
  LogOut,
  Plus,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Search,
  Filter,
  Download,
  MoreVertical,
  FileText,
  Play,
  Globe,
  User,
  Bell,
  ChevronDown,
  Zap,
  Clock8,
  FileJson,
  BrainCircuit,
  Languages,
  Sparkles,
  Heart,
  PlusCircle,
  Upload,
  FileUp,
} from "lucide-react";
import Link from "next/link";

// Mock data for recent transcriptions
const recentTranscriptions = [
  {
    id: "tr-1",
    filename: "interview-with-ceo.mp3",
    duration: "28:14",
    date: "2 hours ago",
    status: "completed",
    language: "English (US)",
    size: "36.2 MB",
    accuracy: 98,
  },
  {
    id: "tr-2",
    filename: "q4-earning-call-2023.mp4",
    duration: "58:42",
    date: "Yesterday",
    status: "completed",
    language: "English (UK)",
    size: "128.5 MB",
    accuracy: 97,
  },
  {
    id: "tr-3",
    filename: "product-feedback-session.wav",
    duration: "42:09",
    date: "2 days ago",
    status: "completed",
    language: "English (US)",
    size: "52.8 MB",
    accuracy: 99,
  },
  {
    id: "tr-4",
    filename: "team-meeting-nov-15.mp3",
    duration: "1:02:37",
    date: "3 days ago",
    status: "completed",
    language: "English (US)",
    size: "75.1 MB",
    accuracy: 96,
  },
  {
    id: "tr-5",
    filename: "customer-interview-german.mp3",
    duration: "24:18",
    date: "4 days ago",
    status: "completed",
    language: "German",
    size: "28.7 MB",
    accuracy: 95,
  },
];

// Mock data for usage stats
const usageStats = {
  minutesTranscribed: 840,
  totalMinutes: 1000,
  usagePercentage: 84,
  filesProcessed: 42,
  languages: 5,
  averageAccuracy: 97.8,
};

// Mock data for analytics
const analyticsData = {
  weeklyUsage: [42, 38, 69, 91, 48, 52, 73],
  topLanguages: [
    { name: "English (US)", percentage: 68 },
    { name: "Spanish", percentage: 14 },
    { name: "German", percentage: 8 },
    { name: "French", percentage: 6 },
    { name: "Japanese", percentage: 4 },
  ],
};

// Dashboard navigation items
const navItems = [
  { name: "Dashboard", icon: <BarChart2 className="w-5 h-5" />, active: true },
  { name: "Transcriptions", icon: <FileAudio className="w-5 h-5" /> },
  { name: "Projects", icon: <Folder className="w-5 h-5" /> },
  { name: "Calendar", icon: <Calendar className="w-5 h-5" /> },
  { name: "History", icon: <Clock className="w-5 h-5" /> },
  { name: "Settings", icon: <Settings className="w-5 h-5" /> },
];

// Dashboard component
const Dashboard = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedTab, setSelectedTab] = useState("all");

  // Simulate file upload
  const handleUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-[#0F0A19] text-white flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <span className="text-[#F72585]">Multi</span>Scribe
            <Sparkles className="w-4 h-4 text-[#F72585]" />
          </h1>
          <p className="text-xs text-white/50">Enterprise Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-1">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  href="#"
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                    item.active
                      ? "bg-[#7209B7]/20 text-white"
                      : "hover:bg-white/5 text-white/70"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                  {item.active && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#F72585]"></div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Usage meter */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-white/70">Monthly Usage</span>
            <span className="text-sm font-medium text-white">
              {usageStats.minutesTranscribed}/{usageStats.totalMinutes} min
            </span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#7209B7] to-[#F72585]"
              initial={{ width: 0 }}
              animate={{ width: `${usageStats.usagePercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            ></motion.div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-white/50">
              {usageStats.usagePercentage}% Used
            </span>
            <button className="text-xs text-[#F72585] hover:underline">
              Upgrade Plan
            </button>
          </div>
        </div>

        {/* User profile */}
        <div className="mt-6 pt-6 border-t border-white/10 flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7209B7] to-[#F72585] flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">Alex Johnson</p>
            <p className="text-xs text-white/50">Enterprise Plan</p>
          </div>
          <button className="ml-auto text-white/50 hover:text-white">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 max-h-screen overflow-auto">
        {/* Top bar - removed sticky positioning */}
        <div className="border-b border-white/10 bg-[#0F0A19]/95 backdrop-blur-md p-4 flex justify-between items-center">
          {/* Search */}
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search transcriptions..."
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white/90 focus:outline-none focus:border-[#7209B7]/50"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-white/50" />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleUpload}
              className="px-4 py-2 bg-gradient-to-r from-[#7209B7] to-[#F72585] rounded-lg flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
            >
              <FileUp className="w-4 h-4" />
              <span>New Upload</span>
            </button>

            <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center relative">
              <Bell className="w-5 h-5 text-white/70" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#F72585]"></span>
            </button>

            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7209B7] to-[#F72585] flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <ChevronDown className="w-4 h-4 text-white/50" />
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-6">
          {/* Welcome message */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, Alex!
            </h1>
            <p className="text-white/60">
              Here's what's happening with your transcriptions today.
            </p>
          </div>

          {/* Stats overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Files Processed",
                value: usageStats.filesProcessed,
                icon: <FileText className="w-5 h-5 text-[#F72585]" />,
                change: "+12% from last week",
                positive: true,
              },
              {
                title: "Minutes Transcribed",
                value: `${usageStats.minutesTranscribed} min`,
                icon: <Clock8 className="w-5 h-5 text-[#7209B7]" />,
                change: "+8% from last week",
                positive: true,
              },
              {
                title: "Languages Used",
                value: usageStats.languages,
                icon: <Languages className="w-5 h-5 text-[#4361EE]" />,
                change: "+2 new languages",
                positive: true,
              },
              {
                title: "Average Accuracy",
                value: `${usageStats.averageAccuracy}%`,
                icon: <BrainCircuit className="w-5 h-5 text-[#4CC9F0]" />,
                change: "+1.2% improvement",
                positive: true,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-[#150C28]/50 rounded-xl border border-white/5 p-6 hover:border-[#7209B7]/30 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <div
                    className={`text-xs ${
                      stat.positive ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-white/50">{stat.title}</p>
              </motion.div>
            ))}
          </div>

          {/* Upload card (conditional rendering) */}
          {isUploading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 bg-gradient-to-br from-[#150C28] to-[#0F0A19] rounded-xl border border-[#7209B7]/30 p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#7209B7]/20 flex items-center justify-center animate-pulse">
                    <Upload className="w-5 h-5 text-[#F72585]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">
                      Uploading file...
                    </h3>
                    <p className="text-sm text-white/60">
                      quarterly-review-meeting.mp3
                    </p>
                  </div>
                </div>
                <button className="text-white/50 hover:text-white">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-2">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#7209B7] to-[#F72585]"
                    style={{ width: `${uploadProgress}%` }}
                  ></motion.div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">
                  {uploadProgress}% uploaded
                </span>
                <span className="text-sm text-white/60">42MB / 65MB</span>
              </div>
            </motion.div>
          )}

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recent transcriptions */}
              <div className="bg-[#150C28]/50 rounded-xl border border-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">
                    Recent Transcriptions
                  </h2>

                  {/* Tabs */}
                  <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                    {["all", "completed", "processing", "failed"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setSelectedTab(tab)}
                        className={`px-3 py-1 text-sm rounded-md ${
                          selectedTab === tab
                            ? "bg-[#7209B7] text-white"
                            : "text-white/70 hover:text-white"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transcription list */}
                <div className="divide-y divide-white/5">
                  {recentTranscriptions.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="p-4 hover:bg-white/5 transition-colors flex items-center"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#7209B7]/10 flex items-center justify-center mr-4">
                        <FileAudio className="w-5 h-5 text-[#F72585]" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white truncate">
                          {item.filename}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-white/50">
                          <span>{item.duration}</span>
                          <span>•</span>
                          <span>{item.date}</span>
                          <span>•</span>
                          <span>{item.language}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                          <span className="text-white/70">
                            {item.status === "completed" && "Completed"}
                          </span>
                        </div>

                        <div className="text-sm font-medium text-white/90">
                          {item.accuracy}%
                        </div>

                        <div className="flex gap-1">
                          <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70">
                            <Play className="w-4 h-4" />
                          </button>
                          <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 border-t border-white/10 flex justify-center">
                  <button className="px-4 py-2 text-sm text-white/70 hover:text-white flex items-center gap-2">
                    <span>View All Transcriptions</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Weekly usage chart */}
              <div className="bg-[#150C28]/50 rounded-xl border border-white/5 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">Weekly Usage</h2>
                  <button className="text-sm text-white/50 flex items-center gap-1">
                    <span>This Week</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                <div className="h-64 flex items-end gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day, i) => (
                      <div
                        key={day}
                        className="flex-1 flex flex-col items-center gap-2"
                      >
                        <motion.div
                          className="w-full rounded-t-md bg-gradient-to-t from-[#7209B7] to-[#F72585]"
                          style={{
                            height: `${
                              (analyticsData.weeklyUsage[i] / 100) * 80
                            }%`,
                            opacity:
                              0.7 + (analyticsData.weeklyUsage[i] / 100) * 0.3,
                          }}
                          initial={{ height: 0 }}
                          animate={{
                            height: `${
                              (analyticsData.weeklyUsage[i] / 100) * 80
                            }%`,
                          }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          whileHover={{ opacity: 1 }}
                        ></motion.div>
                        <span className="text-xs text-white/60">{day}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-8">
              {/* Quick actions */}
              <div className="bg-[#150C28]/50 rounded-xl border border-white/5 p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Quick Actions
                </h2>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      name: "New Upload",
                      icon: <FileUp className="w-4 h-4" />,
                      color: "from-[#7209B7] to-[#F72585]",
                    },
                    {
                      name: "New Project",
                      icon: <Folder className="w-4 h-4" />,
                      color: "from-[#4361EE] to-[#4CC9F0]",
                    },
                    {
                      name: "Batch Process",
                      icon: <RefreshCw className="w-4 h-4" />,
                      color: "from-[#F72585] to-[#7209B7]",
                    },
                    {
                      name: "Export All",
                      icon: <Download className="w-4 h-4" />,
                      color: "from-[#4CC9F0] to-[#4361EE]",
                    },
                  ].map((action, i) => (
                    <motion.button
                      key={i}
                      className={`p-4 rounded-xl bg-gradient-to-br ${action.color} bg-opacity-10 flex flex-col items-center gap-2 hover:shadow-lg hover:shadow-purple-500/10 transition-all`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        {action.icon}
                      </div>
                      <span className="text-sm font-medium">{action.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Language stats */}
              <div className="bg-[#150C28]/50 rounded-xl border border-white/5 p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Top Languages
                </h2>

                <div className="space-y-4">
                  {analyticsData.topLanguages.map((lang, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white/80">
                          {lang.name}
                        </span>
                        <span className="text-sm font-medium text-white">
                          {lang.percentage}%
                        </span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#7209B7] to-[#F72585]"
                          initial={{ width: 0 }}
                          animate={{ width: `${lang.percentage}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upgrade card */}
              <motion.div
                className="bg-gradient-to-br from-[#150C28] to-[#0F0A19] rounded-xl border border-[#7209B7]/20 p-6 relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {/* Background decoration */}
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full border border-[#F72585]/20 opacity-50"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full border border-[#7209B7]/20 opacity-50"></div>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-[#7209B7]/20 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-[#F72585]" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    Upgrade to Pro
                  </h3>
                  <p className="text-sm text-white/70 mb-4">
                    Get unlimited transcription minutes and priority processing.
                  </p>

                  <button className="w-full py-3 bg-gradient-to-r from-[#7209B7] to-[#F72585] rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all">
                    Upgrade Now
                  </button>
                </div>
              </motion.div>

              {/* Favorites/Bookmarks */}
              <div className="bg-[#150C28]/50 rounded-xl border border-white/5 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">Favorites</h2>
                  <button className="text-[#F72585] text-sm flex items-center gap-1">
                    <PlusCircle className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>

                {/* Empty state */}
                {true && (
                  <div className="py-8 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-[#7209B7]/10 flex items-center justify-center mb-3">
                      <Heart className="w-6 h-6 text-[#F72585]/50" />
                    </div>
                    <p className="text-white/50 text-sm mb-4">
                      Mark important transcriptions as favorites for quick
                      access
                    </p>
                    <button className="text-sm text-[#F72585] hover:underline flex items-center gap-1">
                      <Plus className="w-4 h-4" />
                      <span>Add your first favorite</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
