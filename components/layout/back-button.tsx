'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  href: string
  label: string
  className?: string
}

export function BackButton({ href, label, className = '' }: BackButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors ${className}`}
    >
      <ArrowLeft className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  )
}

