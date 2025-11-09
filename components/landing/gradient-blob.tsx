'use client'

import { cn } from '@/lib/utils'

interface GradientBlobProps {
  className?: string
  color?: 'gold' | 'warm' | 'teal' | 'turquoise' | 'navy' | 'green' | 'blue' | 'cyan' | 'orange' | 'purple' | 'pink'
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  blur?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export function GradientBlob({
  className,
  color = 'gold',
  size = 'lg',
  blur = 'xl',
}: GradientBlobProps) {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
    xl: 'w-96 h-96',
    '2xl': 'w-[32rem] h-[32rem]',
  }

  const blurClasses = {
    sm: 'blur-2xl',
    md: 'blur-3xl',
    lg: 'blur-[100px]',
    xl: 'blur-[120px]',
    '2xl': 'blur-[150px]',
  }

  const colorClasses = {
    gold: 'bg-gradient-to-br from-gold-400 via-gold-500 to-warm-400',
    warm: 'bg-gradient-to-br from-warm-400 via-warm-500 to-gold-400',
    teal: 'bg-gradient-to-br from-primary-400 via-primary-500 to-turquoise-400',
    turquoise: 'bg-gradient-to-br from-turquoise-400 via-turquoise-500 to-primary-500',
    navy: 'bg-gradient-to-br from-navy-600 via-navy-700 to-primary-800',
    green: 'bg-gradient-to-br from-emerald-300 via-emerald-400 to-teal-500',
    blue: 'bg-gradient-to-br from-primary-400 via-turquoise-500 to-primary-600',
    cyan: 'bg-gradient-to-br from-turquoise-400 via-primary-500 to-turquoise-600',
    orange: 'bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-500',
    purple: 'bg-gradient-to-br from-primary-400 via-turquoise-500 to-primary-600', // Replaced with teal gradient
    pink: 'bg-gradient-to-br from-turquoise-300 via-primary-400 to-turquoise-500', // Replaced with turquoise gradient
  }

  return (
    <div
      className={cn(
        'absolute rounded-full opacity-40 -z-10 animate-float pointer-events-none',
        sizeClasses[size],
        blurClasses[blur],
        colorClasses[color],
        className
      )}
    />
  )
}

