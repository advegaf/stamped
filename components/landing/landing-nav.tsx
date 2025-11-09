'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={cn(
      'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
      scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-neutral-200/50' : 'bg-transparent'
    )}>
      <div className="mx-auto max-w-7xl px-10 md:px-12 lg:px-14 py-1">
        <div className="flex items-center justify-between">
          {/* floating logo */}
          <Link
            href="/"
            className="relative h-32 w-96 -my-4 transition-opacity hover:opacity-70"
          >
            <Image
              src="/logo.png"
              alt="Stamped"
              fill
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* floating cta button */}
          <Link href="/login">
            <Button 
              size="sm" 
              className={cn(
                "transition-all duration-300",
                scrolled && "shadow-lg"
              )}
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
