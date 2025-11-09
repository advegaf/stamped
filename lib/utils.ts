import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// utility to merge tailwind classes, prevents conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// format date to readable string, handles both date and string inputs
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(d)
}

// format date with time, useful for timestamps
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(d)
}

