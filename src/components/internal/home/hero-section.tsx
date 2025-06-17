'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Languages, FileAudio2, WavesIcon } from 'lucide-react'
import { Orbitron } from 'next/font/google'
import { SelectBox } from '@/components/common/select-box'

const orbitron = Orbitron({
    subsets: ['latin'],
    variable: '--font-orbitron',
})

// Custom animated wave component
const AudioWave = ({ playing = false }: { playing?: boolean }) => {
    const bars = Array.from({ length: 12 }).map((_, i) => i)
    
    return (
        <div className="flex items-end gap-[2px] h-6">
            {bars.map((i) => (
                <motion.div
                    key={i}
                    className="w-1 bg-gradient-to-t from-[#7209B7] to-[#F72585]"
                    animate={playing ? {
                        height: [
                            `${Math.random() * 50 + 20}%`,
                            `${Math.random() * 100}%`,
                            `${Math.random() * 50 + 20}%`,
                        ]
                    } : { height: '30%' }}
                    transition={{
                        duration: playing ? 0.6 : 0,
                        repeat: playing ? Infinity : 0,
                        ease: "easeInOut",
                        delay: i * 0.05,
                    }}
                />
            ))}
        </div>
    )
}

// Language options with codes
const languages = [
    { name: 'English (US)', code: 'en-US' },
    { name: 'English (UK)', code: 'en-GB' },
    { name: 'Spanish', code: 'es' },
    { name: 'French', code: 'fr' },
    { name: 'German', code: 'de' },
    { name: 'Italian', code: 'it' },
    { name: 'Portuguese', code: 'pt' },
    { name: 'Russian', code: 'ru' },
    { name: 'Japanese', code: 'ja' },
    { name: 'Korean', code: 'ko' },
    { name: 'Chinese (Simplified)', code: 'zh-CN' },
    { name: 'Arabic', code: 'ar' },
    { name: 'Hindi', code: 'hi' },
    { name: 'Turkish', code: 'tr' },
]

const HeroSection = () => {
    const [dragActive, setDragActive] = useState(false)
    const [activeDemo, setActiveDemo] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState('english')
    const controls = useAnimation()

    // Handle drag events
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
            controls.start({
                scale: 1.03,
                boxShadow: "0 0 30px rgba(114, 9, 183, 0.5)"
            })
        } else if (e.type === 'dragleave') {
            setDragActive(false)
            controls.start({
                scale: 1,
                boxShadow: "0 0 0px rgba(114, 9, 183, 0)"
            })
        }
    }
    
    // Handle drop event
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        controls.start({
            scale: 1,
            boxShadow: "0 0 0px rgba(114, 9, 183, 0)"
        })
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0])
        }
    }

    // Handle file selection
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0])
        }
    }
    
    // Common handler for both drop and file selection
    const handleFile = (file: File) => {
        console.log("File processed:", file.name)
        setActiveDemo(true)
        
        // Auto-disable demo after 10 seconds
        setTimeout(() => setActiveDemo(false), 10000)
    }

    // Handle language change
    const handleLanguageChange = (value: string) => {
        setSelectedLanguage(value)
    }

    return (
        <section className="min-h-screen relative pt-20 pb-32 overflow-hidden">
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
                        ease: "easeInOut"
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
                        ease: "easeInOut"
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
                        ease: "easeInOut"
                    }}
                />
            </div>
            
            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.015] z-0"></div>
            
            {/* Content */}
            <div className="container mx-auto px-6 relative z-10">
                {/* Two-column layout */}
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 pt-10">
                    {/* Left column - Text content */}
                    <div className="w-full lg:w-1/2">
                        {/* Tech badge */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3A0CA3]/20 to-[#7209B7]/20 border border-purple-500/20 rounded-full py-2 px-4 mb-8"
                        >
                            <WavesIcon className="w-4 h-4 text-[#7209B7]" />
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
                                <AudioWave playing={activeDemo} />
                            </motion.div>
                        </div>
                        
                        {/* Description */}
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="text-lg text-white/70 mb-10 max-w-lg"
                        >
                            Precision transcription powered by cutting-edge AI. Convert any audio or video to text with unmatched accuracy in over 100+ languages.
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
                                { label: "Users", value: "500K+" }
                            ].map((stat, index) => (
                                <div key={index} className="flex flex-col">
                                    <span className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</span>
                                    <span className="text-xs text-white/50 uppercase tracking-wider">{stat.label}</span>
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
                            <button className="bg-gradient-to-r from-[#7209B7] to-[#F72585] text-white px-8 py-4 rounded-full font-medium text-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                                Start Transcribing
                            </button>
                            
                            <a href="#features" className="flex items-center gap-2 text-white/80 hover:text-white group">
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
                            <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full border border-[#7209B7]/30"></div>
                            <div className="absolute -bottom-8 -right-8 w-16 h-16 rounded-full border border-[#F72585]/30"></div>
                            
                            {/* Upload panel */}
                            <motion.div 
                                animate={controls}
                                className="bg-gradient-to-br from-[#150C28] to-[#0F0A19] overflow-visible rounded-2xl border border-white/5 shadow-lg relative z-10"
                            >
                                {/* Top navigation bar */}
                                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                                    <div className="flex items-center gap-2">
                                        <FileAudio2 className="w-5 h-5 text-[#F72585]" />
                                        <span className="font-medium text-white">Audio Transcription</span>
                                    </div>
                                    
                                    <div className="flex gap-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-2 h-2 rounded-full bg-white/20" />
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Main upload area */}
                                <div 
                                    className={`p-8 transition-all duration-300 ${dragActive ? 'bg-[#7209B7]/10' : ''}`}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    onClick={() => document.getElementById('fileInput')?.click()}
                                    tabIndex={0}
                                    role="button"
                                    aria-label="Upload audio or video file"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            document.getElementById('fileInput')?.click();
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
                                    
                                    {activeDemo ? (
                                        <div className="border-2 border-[#7209B7]/30 rounded-xl p-10 cursor-pointer text-center h-72 flex flex-col items-center justify-center">
                                            <div className="w-20 h-20 mb-6">
                                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                                    <defs>
                                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                            <stop offset="0%" stopColor="#7209B7" />
                                                            <stop offset="100%" stopColor="#F72585" />
                                                        </linearGradient>
                                                    </defs>
                                                    <motion.circle 
                                                        cx="50" cy="50" r="45" 
                                                        stroke="url(#gradient)" 
                                                        strokeWidth="4" 
                                                        fill="none" 
                                                        initial={{ pathLength: 0 }}
                                                        animate={{ pathLength: 1 }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                    />
                                                    <motion.circle 
                                                        cx="50" cy="50" r="30" 
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
                                            <p className="mt-5 text-white font-medium">Processing your audio...</p>
                                            <p className="text-white/50 text-sm mt-2">This usually takes less than a minute</p>
                                        </div>
                                    ) : (
                                        <div className="border-2 border-dashed border-white/10 rounded-xl p-10 cursor-pointer text-center h-72 flex flex-col items-center justify-center hover:border-[#7209B7]/40 transition-colors duration-300">
                                            <div className="w-20 h-20 rounded-full bg-[#7209B7]/10 flex items-center justify-center mb-6">
                                                <FileAudio2 className="w-8 h-8 text-[#F72585]" />
                                            </div>
                                            <p className="text-xl font-medium text-white mb-2">Drop your audio or video here</p>
                                            <p className="text-white/50">or click to browse your files</p>
                                            <p className="text-white/30 text-xs mt-4">Supports MP3, WAV, MP4, MOV & more</p>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Bottom controls */}
                                <div className="border-t border-white/5 p-6 flex flex-col lg:flex-row gap-4 justify-between relative">
                                    {/* Language selector - enhanced styling */}
                                    <div className="w-full">
                                        <SelectBox
                                            value={selectedLanguage}
                                            onValueChange={handleLanguageChange}
                                            triggerClassName="w-full bg-white/5 hover:bg-white/10 text-white/70 border-white/10"
                                            contentClassName="border-white/10 text-white/80"
                                            searchPlaceholder="Find language..."
                                            notFoundText="Language not found"
                                            icon={<Languages className="w-4 h-4 text-[#F72585]" />}
                                        />
                                    </div>
                                    
                                    {/* Transcribe button */}
                                    <button className="w-full lg:w-auto px-6 py-2 bg-[#7209B7] hover:bg-[#5c07bb] rounded-lg text-white font-medium transition-colors whitespace-nowrap">
                                        Transcribe Now
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
