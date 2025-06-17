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
        className="fixed w-5 h-5 rounded-full bg-white mix-blend-difference z-50 pointer-events-none"
        animate={{ 
          x: position.x - 10, 
          y: position.y - 10,
          scale: isPointer ? 1.5 : 1
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div 
        className="fixed w-10 h-10 rounded-full border border-white/50 z-50 pointer-events-none"
        animate={{ 
          x: position.x - 20, 
          y: position.y - 20,
          scale: isPointer ? 1.2 : 1
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      />
    </>
  )
}

export default function Home() {
  return (
    <main className="bg-[#0F0A19] text-white overflow-hidden">
      {/* Custom cursor for desktop only */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>
      
      {/* Background noise texture */}
      <div className="fixed inset-0 bg-noise opacity-[0.03] pointer-events-none z-10"></div>
      
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
      
      <style jsx global>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0) }
          10% { transform: translate(-5%, -10%) }
          30% { transform: translate(3%, -15%) }
          50% { transform: translate(12%, 9%) }
          70% { transform: translate(9%, 4%) }
          90% { transform: translate(-1%, 7%) }
        }
        
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' fill='%23ffffff'/%3E%3C/svg%3E");
          animation: grain 8s steps(10) infinite;
        }
      `}</style>
    </main>
  )
}