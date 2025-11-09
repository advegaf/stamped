'use client'

import { GradientBlob } from './gradient-blob'

interface AtmosphericBackgroundProps {
  variant?: 'dark' | 'light'
  children?: React.ReactNode
}

export function AtmosphericBackground({
  variant = 'light',
  children,
}: AtmosphericBackgroundProps) {
  if (variant === 'dark') {
    return (
      <div className="relative min-h-screen overflow-hidden bg-dark-800">
        {/* gradient blobs for atmosphere */}
        <GradientBlob
          color="gold"
          size="xl"
          className="left-[-10%] top-[-10%]"
        />
        <GradientBlob
          color="warm"
          size="lg"
          className="right-[-5%] top-[20%]"
        />
        <GradientBlob
          color="gold"
          size="md"
          className="left-[10%] bottom-[-5%]"
        />
        
        {/* content */}
        <div className="relative z-20">{children}</div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-neutral-50/50 to-white">
      {/* professional teal/navy gradient blobs */}
      <GradientBlob
        color="teal"
        size="2xl"
        blur="2xl"
        className="left-[-15%] top-[-15%] opacity-15"
      />
      <GradientBlob
        color="turquoise"
        size="xl"
        blur="xl"
        className="right-[-10%] top-[10%] opacity-20"
      />
      <GradientBlob
        color="navy"
        size="lg"
        blur="xl"
        className="left-[10%] top-[50%] opacity-10"
      />
      <GradientBlob
        color="cyan"
        size="xl"
        blur="2xl"
        className="right-[5%] bottom-[-10%] opacity-18"
      />
      <GradientBlob
        color="green"
        size="md"
        blur="lg"
        className="left-[40%] bottom-[20%] opacity-12"
      />
      
      {/* content */}
      <div className="relative z-20">{children}</div>
    </div>
  )
}

