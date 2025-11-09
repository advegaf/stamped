'use client'

import { DashboardShell } from '@/components/layout/dashboard-shell'
import { useAuth } from '@/lib/hooks/useAuth'

export default function ComplianceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()
  
  return (
    <DashboardShell
      title="Compliance"
      notificationCount={3}
      userRole="compliance_officer"
      userName={user?.name}
    >
      {children}
    </DashboardShell>
  )
}
