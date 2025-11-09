import * as React from 'react'
import { Navigation } from './navigation'
import { cn } from '@/lib/utils'

interface DashboardShellProps {
  children: React.ReactNode
  title?: string
  notificationCount?: number
  userRole?: 'compliance' | 'relationship' | 'procurement'
  userName?: string
  className?: string
}

export function DashboardShell({
  children,
  title,
  notificationCount,
  userRole,
  userName,
  className,
}: DashboardShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100/50">
      <Navigation userRole={userRole} userName={userName} />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className={cn('flex-1 overflow-y-auto p-8 md:p-10 lg:p-12', className)}>
          {children}
        </main>
      </div>
    </div>
  )
}

