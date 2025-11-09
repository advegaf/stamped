'use client'

import { DashboardShell } from '@/components/layout/dashboard-shell'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Timeline } from '@/components/ui/timeline'
import {
  Users,
  Building2,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'

export default function DashboardPage() {
  // mock data for now, replace with real api calls
  const stats = [
    {
      title: 'Pending Reviews',
      value: '12',
      change: '+3 from yesterday',
      icon: Clock,
      variant: 'warning' as const,
    },
    {
      title: 'High Risk Alerts',
      value: '3',
      change: '2 require immediate action',
      icon: AlertTriangle,
      variant: 'error' as const,
    },
    {
      title: 'Approved Today',
      value: '8',
      change: '+25% from last week',
      icon: CheckCircle,
      variant: 'success' as const,
    },
    {
      title: 'Total Active',
      value: '247',
      change: '+12% this month',
      icon: TrendingUp,
      variant: 'default' as const,
    },
  ]

  const recentActivity = [
    {
      id: '1',
      title: 'High-risk client flagged',
      description: 'Acme Corp - Sanctions screening match found',
      timestamp: '5 minutes ago',
      variant: 'error' as const,
    },
    {
      id: '2',
      title: 'Document uploaded',
      description: 'TechStart Inc - KYC documents received',
      timestamp: '23 minutes ago',
      variant: 'default' as const,
    },
    {
      id: '3',
      title: 'Client approved',
      description: 'Global Solutions LLC - Onboarding completed',
      timestamp: '1 hour ago',
      variant: 'success' as const,
    },
    {
      id: '4',
      title: 'Review requested',
      description: 'International Trade Co - Manual review needed',
      timestamp: '2 hours ago',
      variant: 'warning' as const,
    },
  ]

  const pendingTasks = [
    {
      id: '1',
      name: 'Acme Corporation',
      type: 'Client',
      status: 'High Risk',
      dueDate: 'Today',
      riskLevel: 'high',
    },
    {
      id: '2',
      name: 'Tech Supplies Inc',
      type: 'Vendor',
      status: 'Awaiting Review',
      dueDate: 'Today',
      riskLevel: 'medium',
    },
    {
      id: '3',
      name: 'Global Partners Ltd',
      type: 'Client',
      status: 'Documents Pending',
      dueDate: 'Tomorrow',
      riskLevel: 'low',
    },
  ]

  const getRiskBadgeVariant = (level: string) => {
    switch (level) {
      case 'high':
        return 'error'
      case 'medium':
        return 'warning'
      case 'low':
        return 'success'
      default:
        return 'default'
    }
  }

  return (
    <DashboardShell
      title="Dashboard"
      notificationCount={3}
      userRole="compliance"
      userName="John Smith"
    >
      <div className="space-y-8 md:space-y-10">
        {/* welcome message */}
        <div className="animate-fade-in-up">
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-neutral-900">
            Welcome back, John
          </h1>
          <p className="mt-2 text-lg text-neutral-600">
            Here's what's happening with your compliance workflow today.
          </p>
        </div>

        {/* stats cards at top */}
        <div className="grid gap-4 md:gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="transition-all duration-300 hover:shadow-2xl border-neutral-200/50 bg-white/90">
                <CardContent className="p-6 md:p-7">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-neutral-600">
                        {stat.title}
                      </p>
                      <p className="mt-2 text-3xl font-bold text-neutral-900">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs text-neutral-500">
                        {stat.change}
                      </p>
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        stat.variant === 'error'
                          ? 'bg-error-100 text-error-600'
                          : stat.variant === 'warning'
                          ? 'bg-warning-100 text-warning-600'
                          : stat.variant === 'success'
                          ? 'bg-success-100 text-success-600'
                          : 'bg-primary-100 text-primary-600'
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* pending tasks list */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-sans text-2xl">Pending Tasks</CardTitle>
              <CardDescription>
                Items requiring your immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between rounded-lg border border-neutral-200 p-4 transition-all hover:border-neutral-300 hover:shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          task.type === 'Client'
                            ? 'bg-primary-100 text-primary-600'
                            : 'bg-warning-100 text-warning-600'
                        }`}
                      >
                        {task.type === 'Client' ? (
                          <Users className="h-5 w-5" />
                        ) : (
                          <Building2 className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">
                          {task.name}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {task.type}
                          </Badge>
                          <Badge
                            variant={getRiskBadgeVariant(task.riskLevel)}
                            className="text-xs"
                          >
                            {task.riskLevel.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-neutral-500">
                            Due: {task.dueDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Review
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* recent activity feed */}
          <Card>
            <CardHeader>
              <CardTitle className="font-sans text-2xl">Recent Activity</CardTitle>
              <CardDescription>Latest updates and changes</CardDescription>
            </CardHeader>
            <CardContent>
              <Timeline items={recentActivity} />
            </CardContent>
          </Card>
        </div>

        {/* quick action buttons */}
        <Card>
          <CardHeader>
            <CardTitle className="font-sans text-2xl">Quick Actions</CardTitle>
            <CardDescription>
              Common tasks for compliance officers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-auto flex-col py-6">
                <Users className="mb-2 h-8 w-8" />
                <span>New Client</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col py-6">
                <Building2 className="mb-2 h-8 w-8" />
                <span>New Vendor</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col py-6">
                <AlertTriangle className="mb-2 h-8 w-8" />
                <span>Run Screening</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col py-6">
                <TrendingUp className="mb-2 h-8 w-8" />
                <span>View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

