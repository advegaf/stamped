'use client'

import * as React from 'react'
import { Search } from 'lucide-react'
import { NotificationCenter } from '@/components/notifications/notification-center'

interface HeaderProps {
  title?: string
  notificationCount?: number
}

export function Header({ title, notificationCount = 0 }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-neutral-200/50 bg-white/70 backdrop-blur-xl px-8 transition-all duration-300">
      <div>
        {title && (
          <h2 className="text-2xl font-semibold text-neutral-900">{title}</h2>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* search button */}
        <button className="group flex h-10 items-center gap-2 rounded-lg border border-neutral-200 bg-white/80 backdrop-blur-sm px-4 text-sm text-neutral-500 transition-all duration-200 hover:border-primary-300 hover:bg-white hover:shadow-md hover:-translate-y-0.5">
          <Search className="h-4 w-4 transition-colors group-hover:text-primary-600" />
          <span className="transition-colors group-hover:text-neutral-700">Search...</span>
          <kbd className="ml-2 rounded bg-neutral-100 px-1.5 py-0.5 text-xs transition-colors group-hover:bg-primary-50 group-hover:text-primary-700">⌘K</kbd>
        </button>

        {/* notifications */}
        <NotificationCenter />
      </div>
    </header>
  )
}

