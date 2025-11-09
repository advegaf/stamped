import React from 'react'

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  required?: boolean
}

export function Label({
  children,
  required,
  className = '',
  ...props
}: LabelProps) {
  return (
    <label
      className={`block text-sm font-medium text-neutral-700 ${className}`}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-error-500">*</span>}
    </label>
  )
}

