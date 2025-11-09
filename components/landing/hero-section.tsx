'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { StatusIndicator } from './status-indicator'
import { Brain, Search, FileCheck, CheckCircle } from 'lucide-react'

export function HeroSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [typingComplete, setTypingComplete] = useState(false)
  
  const fullText = 'Compliance\nthat works while\nyou focus'
  
  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setTypingComplete(true)
        // Hide cursor after typing is complete
        setTimeout(() => setShowCursor(false), 800)
      }
    }, 50) // 50ms per character for faster typing
    
    return () => clearInterval(typingInterval)
  }, [])
  
  const steps = [
    { label: 'Thinking', icon: <Brain className="h-4 w-4" /> },
    { label: 'Researching', icon: <Search className="h-4 w-4" /> },
    { label: 'Screening', icon: <FileCheck className="h-4 w-4" /> },
    { label: 'Completing', icon: <CheckCircle className="h-4 w-4" /> },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [steps.length])

  const getStepStatus = (index: number) => {
    if (index < activeStep) return 'complete'
    if (index === activeStep) return 'active'
    return 'idle'
  }

  return (
    <section className="relative min-h-screen pt-20 md:pt-28">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-32 lg:py-40">
        <div className="mx-auto max-w-5xl text-center">
          {/* headline with typewriter animation */}
          <h1 className="font-serif text-5xl font-bold leading-[1.1] text-neutral-900 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
            {typedText.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < typedText.split('\n').length - 1 && <br />}
              </span>
            ))}
            {showCursor && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 1.0, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block w-1 h-[0.9em] ml-1 bg-neutral-900 align-middle"
              />
            )}
          </h1>

          {/* tagline - appears immediately */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeInOut' }}
            className="mt-8 font-serif text-2xl italic text-neutral-600 sm:text-3xl md:text-4xl"
          >
            automated, intelligent, effortless.
          </motion.p>

          {/* description - appears immediately */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeInOut' }}
            className="mx-auto mt-10 max-w-2xl text-xl leading-relaxed text-neutral-600"
          >
            Automated client and vendor onboarding with intelligent risk assessment,
            sanctions screening, and continuous compliance monitoring.
          </motion.p>

          {/* status indicators - appears immediately */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: 'easeInOut' }}
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
          >
            {steps.map((step, index) => (
              <StatusIndicator
                key={step.label}
                label={step.label}
                status={getStepStatus(index)}
                icon={step.icon}
              />
            ))}
          </motion.div>

          {/* cta buttons - appears immediately */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: 'easeInOut' }}
            className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/login">
              <Button size="lg" className="min-w-[200px]">
                Get Started
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="min-w-[200px]"
              onClick={() => {
                const element = document.getElementById('services')
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

