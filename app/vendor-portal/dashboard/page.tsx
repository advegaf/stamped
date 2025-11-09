'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, Upload, MessageSquare, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function VendorDashboardPage() {
  // Mock vendor data
  const vendorData = {
    companyName: 'TechSupply Solutions',
    status: 'In Review',
    completionPercentage: 65,
    assignedOfficer: {
      name: 'Rachel Chen',
      email: 'rachel.chen@stamped.com',
      phone: '+1 (555) 0145',
    },
    requiredDocuments: [
      { name: 'Business License', status: 'approved', uploadedAt: '2024-01-15' },
      { name: 'Tax Certificate', status: 'pending_review', uploadedAt: '2024-01-18' },
      { name: 'Insurance Documents', status: 'pending_upload', uploadedAt: null },
      { name: 'W-9 Form', status: 'approved', uploadedAt: '2024-01-16' },
      { name: 'Bank Account Details', status: 'pending_review', uploadedAt: '2024-01-19' },
    ],
    recentActivity: [
      { action: 'Document approved', document: 'W-9 Form', timestamp: '2 hours ago' },
      { action: 'Document uploaded', document: 'Bank Account Details', timestamp: '1 day ago' },
      { action: 'Document approved', document: 'Business License', timestamp: '3 days ago' },
    ],
    nextSteps: [
      'Upload Insurance Documents',
      'Await review of Tax Certificate',
      'Await review of Bank Account Details',
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'pending_review':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'pending_upload':
        return 'bg-neutral-100 text-neutral-700 border-neutral-200'
      default:
        return 'bg-neutral-100 text-neutral-700 border-neutral-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4" />
      case 'pending_review':
        return <Clock className="h-4 w-4" />
      case 'pending_upload':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-neutral-900 mb-2">
          Welcome, {vendorData.companyName}
        </h1>
        <p className="text-lg text-neutral-600">
          Track your vendor onboarding progress and manage documentation
        </p>
      </motion.div>

      {/* Status Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Onboarding Status</CardTitle>
            <CardDescription>Your vendor onboarding is {vendorData.completionPercentage}% complete</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-neutral-700">Overall Progress</span>
                  <span className="font-semibold text-primary-600">{vendorData.completionPercentage}%</span>
                </div>
                <div className="h-3 bg-neutral-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${vendorData.completionPercentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-primary-500 to-turquoise-500 rounded-full"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge className={cn(
                  'px-3 py-1',
                  vendorData.status === 'In Review' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : ''
                )}>
                  {vendorData.status}
                </Badge>
                <span className="text-sm text-neutral-600">
                  Our team is reviewing your submitted documents
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Required Documents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-2xl">Required Documents</CardTitle>
              <CardDescription>
                {vendorData.requiredDocuments.filter(d => d.status === 'pending_upload').length} documents pending upload
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {vendorData.requiredDocuments.map((doc, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg border border-neutral-200 bg-white/50 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary-600" />
                      <div>
                        <p className="font-medium text-neutral-900">{doc.name}</p>
                        {doc.uploadedAt && (
                          <p className="text-xs text-neutral-500">Uploaded {doc.uploadedAt}</p>
                        )}
                      </div>
                    </div>
                    <div className={cn(
                      'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
                      getStatusColor(doc.status)
                    )}>
                      {getStatusIcon(doc.status)}
                      {doc.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link href="/vendor-portal/documents">
                <Button className="w-full mt-4" variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Documents
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Assigned Officer & Next Steps */}
        <div className="space-y-6">
          {/* Assigned Officer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Your Compliance Officer</CardTitle>
                <CardDescription>Your dedicated point of contact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-100 to-turquoise-100 flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary-700">
                        {vendorData.assignedOfficer.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900">{vendorData.assignedOfficer.name}</p>
                      <p className="text-sm text-neutral-600">Compliance Officer</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-neutral-600">
                      <span className="font-medium">Email:</span> {vendorData.assignedOfficer.email}
                    </p>
                    <p className="text-neutral-600">
                      <span className="font-medium">Phone:</span> {vendorData.assignedOfficer.phone}
                    </p>
                  </div>
                  <Link href="/vendor-portal/messages">
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Next Steps</CardTitle>
                <CardDescription>What to do next</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {vendorData.nextSteps.map((step, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      className="flex items-start gap-2 text-sm text-neutral-700"
                    >
                      <div className="mt-0.5 h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-primary-700">{index + 1}</span>
                      </div>
                      {step}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Recent Activity</CardTitle>
            <CardDescription>Latest updates on your onboarding</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {vendorData.recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg border border-neutral-200 bg-white/50"
                >
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-primary-500 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900">{activity.action}</p>
                    <p className="text-sm text-neutral-600">{activity.document}</p>
                  </div>
                  <span className="text-xs text-neutral-500">{activity.timestamp}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

