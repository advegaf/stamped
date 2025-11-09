import * as React from 'react'
import { UnifiedNav } from './unified-nav'
import type { EmployeeRole } from './unified-nav'
import { cn } from '@/lib/utils'
import { AtmosphericBackground } from '@/components/landing/atmospheric-background'

interface DashboardShellProps {
  children: React.ReactNode
  title?: string
  notificationCount?: number
  userRole?: 'compliance' | 'relationship' | 'procurement' | 'compliance_officer' | 'relationship_manager' | 'risk_analyst' | 'executive'
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
  // Map old role format to new format
  const mapRole = (role?: string): EmployeeRole => {
    if (role === 'compliance' || role === 'compliance_officer') return 'compliance_officer'
    if (role === 'relationship' || role === 'relationship_manager') return 'relationship_manager'
    if (role === 'risk_analyst') return 'risk_analyst'
    if (role === 'executive') return 'executive'
    return 'relationship_manager' // default
  }

  return (
    <AtmosphericBackground variant="light">
      <div className="flex min-h-screen flex-col">
        <UnifiedNav 
          userType="employee" 
          userRole={mapRole(userRole)} 
          userName={userName}
        />
        
        <main className={cn('flex-1 p-8 md:p-10 lg:p-12', className)}>
          {children}
        </main>
      </div>
    </AtmosphericBackground>
  )
}

