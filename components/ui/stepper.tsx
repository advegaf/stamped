'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface Step {
  label: string
  description?: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const isLast = index === steps.length - 1

          return (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                {/* step circle */}
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all',
                    isCompleted &&
                      'border-primary-600 bg-primary-600 text-white',
                    isCurrent &&
                      'border-primary-600 bg-white text-primary-600',
                    !isCompleted &&
                      !isCurrent &&
                      'border-neutral-300 bg-white text-neutral-500'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{stepNumber}</span>
                  )}
                </div>
                
                {/* step label */}
                <div className="mt-2 text-center">
                  <p
                    className={cn(
                      'text-sm font-medium',
                      (isCompleted || isCurrent)
                        ? 'text-neutral-900'
                        : 'text-neutral-500'
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="mt-0.5 text-xs text-neutral-500">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* line between steps */}
              {!isLast && (
                <div className="mb-8 flex-1 px-2">
                  <div
                    className={cn(
                      'h-0.5 w-full transition-colors',
                      stepNumber < currentStep
                        ? 'bg-primary-600'
                        : 'bg-neutral-300'
                    )}
                  />
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

