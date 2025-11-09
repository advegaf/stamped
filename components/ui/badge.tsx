import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-neutral-900 text-white',
        secondary:
          'border-transparent bg-neutral-100 text-neutral-900',
        success:
          'border-transparent bg-success-100 text-success-800',
        warning:
          'border-transparent bg-warning-100 text-warning-800',
        error:
          'border-transparent bg-error-100 text-error-800',
        outline:
          'border-neutral-300 text-neutral-900',
        primary:
          'border-transparent bg-primary-100 text-primary-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

