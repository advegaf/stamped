'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Search, X } from 'lucide-react'

interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (value: string) => void
  onClear?: () => void
}

export function SearchInput({
  onChange,
  onClear,
  value,
  className,
  ...props
}: SearchInputProps) {
  const [internalValue, setInternalValue] = React.useState(value || '')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInternalValue(newValue)
    onChange(newValue)
  }

  const handleClear = () => {
    setInternalValue('')
    onChange('')
    onClear?.()
  }

  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
      <input
        type="text"
        value={internalValue}
        onChange={handleChange}
        className={cn(
          'h-10 w-full rounded-lg border border-neutral-300 bg-white pl-10 pr-10 text-sm transition-colors',
          'placeholder:text-neutral-400',
          'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-0'
        )}
        {...props}
      />
      {internalValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

