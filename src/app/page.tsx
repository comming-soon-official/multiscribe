'use client'

import React, { useEffect, useState } from 'react'
import HeroSection from '@/components/internal/home/hero-section'
import FeatureSection from '@/components/internal/home/feature-section'
import { motion } from 'framer-motion'

// Custom cursor component
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      // Check if cursor is over a clickable element
      const target = e.target as HTMLElement
      const isClickable = 
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      
      setIsPointer(!!isClickable)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return (
    <>
      <motion.div 
        className="fixed w-7 h-7 rounded-full bg-white mix-blend-difference z-50 pointer-events-none"
        animate={{ 
          x: position.x - 14, 
          y: position.y - 14,
          scale: isPointer ? 1.5 : 1
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div 
        className="fixed w-14 h-14 rounded-full border border-white/50 z-50 pointer-events-none"
        animate={{ 
          x: position.x - 28, 
          y: position.y - 28,
          scale: isPointer ? 1.2 : 1
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      />
    </>
  )
}

// Floating background elements component
const FloatingElements = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large gradient circle */}
      <motion.div 
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-700/20 to-blue-700/20 blur-3xl"
        animate={{ 
          x: ['-5%', '5%'],
          y: ['-5%', '8%'],
        }}
        transition={{ 
          repeat: Infinity,
          repeatType: "reverse",
          duration: 18,
          ease: "easeInOut"
        }}
        style={{ top: '10%', left: '15%' }}
      />
      
      {/* Small gradient blob */}
      <motion.div 
        className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-pink-600/20 to-indigo-600/20 blur-2xl"
        animate={{ 
          x: ['8%', '-8%'],
          y: ['5%', '-7%'],
        }}
        transition={{ 
          repeat: Infinity,
          repeatType: "reverse",
          duration: 23,
          ease: "easeInOut"
        }}
        style={{ top: '65%', right: '10%' }}
      />
      
      {/* Medium gradient shape */}
      <motion.div 
        className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-violet-500/15 to-cyan-500/15 blur-3xl"
        animate={{ 
          x: ['-3%', '7%'],
          y: ['7%', '-4%'],
        }}
        transition={{ 
          repeat: Infinity,
          repeatType: "reverse", 
          duration: 20,
          ease: "easeInOut"
        }}
        style={{ top: '30%', right: '25%' }}
      />
      
      {/* Small accent element */}
      <motion.div 
        className="absolute w-[150px] h-[150px] rounded-full bg-gradient-to-r from-[#7209B7]/30 to-[#3A0CA3]/30 blur-xl"
        animate={{ 
          x: ['5%', '-5%', '5%'],
          y: ['-7%', '7%', '-7%'],
        }}
        transition={{ 
          repeat: Infinity,
          duration: 15,
          ease: "easeInOut"
        }}
        style={{ bottom: '15%', left: '20%' }}
      />
    </div>
  );
};

export default function Home() {
  return (
    <main className="bg-[#0F0A19] text-white overflow-hidden">
      {/* Custom cursor for desktop only */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>
      
      {/* Floating background elements */}
      <FloatingElements />
      
      <HeroSection />
      <FeatureSection />
      
      {/* Audio wave footer */}
      <div className="h-48 bg-[#0F0A19] relative overflow-hidden">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <motion.path 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M0,96L48,128C96,160,192,224,288,213.3C384,203,480,117,576,96C672,75,768,117,864,154.7C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill="#7209B7"
            fillOpacity="0.3"
            stroke="#7209B7"
            strokeWidth="2"
          />
          <motion.path 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
            d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,160C672,139,768,117,864,128C960,139,1056,181,1152,176C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill="#3A0CA3"
            fillOpacity="0.2"
            stroke="#3A0CA3"
            strokeWidth="2"
          />
        </svg>
      </div>
    </main>
  )
}