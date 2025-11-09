'use client'

import { DashboardShell } from '@/components/layout/dashboard-shell'
import { useAuth } from '@/lib/hooks/useAuth'

export default function RiskAnalystLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()
  
  return (
    <DashboardShell
      title="Risk Analysis"
      notificationCount={2}
      userRole="risk_analyst"
      userName={user?.name}
    >
      {children}
    </DashboardShell>
  )
}
