'use client'

import { cn } from '@/lib/utils'
import { Check, Loader2 } from 'lucide-react'

interface StatusIndicatorProps {
  label: string
  status?: 'idle' | 'active' | 'complete'
  icon?: React.ReactNode
  className?: string
}

export function StatusIndicator({
  label,
  status = 'idle',
  icon,
  className,
}: StatusIndicatorProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
        status === 'idle' && 'bg-white/10 text-white/60 backdrop-blur-sm',
        status === 'active' && 'bg-gold-400/20 text-gold-400 glow-gold backdrop-blur-sm',
        status === 'complete' && 'bg-green-400/20 text-green-400 backdrop-blur-sm',
        className
      )}
    >
      {status === 'active' && (
        <Loader2 className="h-4 w-4 animate-spin" />
      )}
      {status === 'complete' && (
        <Check className="h-4 w-4" />
      )}
      {status === 'idle' && icon}
      {label}
    </div>
  )
}

