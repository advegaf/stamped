'use client'

import { DashboardShell } from '@/components/layout/dashboard-shell'
import { useAuth } from '@/lib/hooks/useAuth'

export default function ExecutiveLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()
  
  return (
    <DashboardShell
      title="Executive Dashboard"
      notificationCount={1}
      userRole="executive"
      userName={user?.name}
    >
      {children}
    </DashboardShell>
  )
}
