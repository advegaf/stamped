'use client'

import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-neutral-200/50 bg-white/80 backdrop-blur-sm p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary-200 hover:shadow-2xl',
        className
      )}
    >
      {/* gradient glow effect on hover */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100/20 via-turquoise-100/10 to-primary-50/20" />
      </div>

      <div className="relative">
        {/* icon */}
        <div className="inline-flex rounded-xl bg-gradient-to-br from-primary-500/10 via-turquoise-500/10 to-primary-400/10 p-4 text-primary-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg">
          <Icon className="h-6 w-6" />
        </div>

        {/* title */}
        <h3 className="mt-6 font-serif text-2xl font-semibold text-neutral-900 transition-colors duration-300 group-hover:text-primary-700">
          {title}
        </h3>

        {/* description */}
        <p className="mt-3 text-neutral-600 leading-relaxed transition-colors duration-300 group-hover:text-neutral-700">
          {description}
        </p>
      </div>
    </div>
  )
}

