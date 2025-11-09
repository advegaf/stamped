'use client'

import { DashboardShell } from '@/components/layout/dashboard-shell'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { User, Bell, Shield, Palette } from 'lucide-react'

export default function SettingsPage() {
  return (
    <DashboardShell title="Settings" userRole="compliance" userName="John Smith">
      <div className="mx-auto max-w-4xl space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary-100 p-2">
                <User className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="First Name" defaultValue="John" />
              <Input label="Last Name" defaultValue="Smith" />
            </div>
            <Input label="Email" type="email" defaultValue="john.smith@gs.com" />
            <Select
              label="Role"
              options={[
                { value: 'compliance', label: 'Compliance Officer' },
                { value: 'relationship', label: 'Relationship Manager' },
                { value: 'procurement', label: 'Procurement Specialist' },
              ]}
              defaultValue="compliance"
            />
            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-warning-100 p-2">
                <Bell className="h-5 w-5 text-warning-600" />
              </div>
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure your notification preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'High risk alerts', checked: true },
              { label: 'Document uploads', checked: true },
              { label: 'Approval requests', checked: true },
              { label: 'Weekly reports', checked: false },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-700">
                  {item.label}
                </span>
                <input
                  type="checkbox"
                  defaultChecked={item.checked}
                  className="h-5 w-5 rounded border-neutral-300 text-primary-600 focus:ring-2 focus:ring-primary-500"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-error-100 p-2">
                <Shield className="h-5 w-5 text-error-600" />
              </div>
              <div>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your security settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Enable Two-Factor Authentication
            </Button>
            <div className="rounded-lg bg-neutral-50 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-neutral-900">Active Sessions</p>
                  <p className="mt-1 text-sm text-neutral-600">2 active sessions</p>
                </div>
                <Button variant="ghost" size="sm">
                  Manage
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

