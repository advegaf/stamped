'use client'

import { useEffect, useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SuccessAnimationProps {
  show: boolean
  message?: string
  onComplete?: () => void
}

export function SuccessAnimation({
  show,
  message = 'Success!',
  onComplete,
}: SuccessAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        onComplete?.()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="animate-scale-in rounded-2xl bg-white p-8 shadow-2xl">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-success-400 opacity-75" />
            <div className="relative rounded-full bg-success-100 p-4">
              <CheckCircle className="h-12 w-12 text-success-600" />
            </div>
          </div>
          <p className="text-xl font-semibold text-neutral-900">{message}</p>
        </div>
      </div>
    </div>
  )
}

