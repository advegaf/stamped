'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { DashboardShell } from '@/components/layout/dashboard-shell'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Timeline } from '@/components/ui/timeline'
import { Modal } from '@/components/ui/modal'
import { Textarea } from '@/components/ui/textarea'
import { Alert } from '@/components/ui/alert'
import {
  FileText,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Building2,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'

export default function ClientDetailPage() {
  const params = useParams()
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [comment, setComment] = useState('')

  // mock data for now, in prod fetch from api using params.id
  const client = {
    id: params.id,
    name: 'Acme Corporation',
    legalName: 'Acme Corporation Inc.',
    status: 'Under Review',
    riskLevel: 'medium',
    country: 'United States',
    industry: 'Technology',
    entityType: 'Corporation',
    registrationNumber: '123456789',
    annualRevenue: '$50,000,000',
    employees: '250',
    primaryContact: {
      name: 'John Doe',
      email: 'john.doe@acmecorp.com',
      phone: '+1 (555) 123-4567',
    },
    address: {
      street: '123 Main Street, Suite 100',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
    },
    documents: [
      { id: '1', name: 'Certificate of Incorporation.pdf', uploadDate: '2024-01-15', type: 'Certificate' },
      { id: '2', name: 'Articles of Association.pdf', uploadDate: '2024-01-15', type: 'Legal' },
      { id: '3', name: 'Business License.pdf', uploadDate: '2024-01-15', type: 'License' },
    ],
    screening: {
      status: 'Completed',
      result: 'Match Found',
      details: '1 potential match in sanctions database',
      confidence: 'Medium',
    },
    history: [
      {
        id: '1',
        title: 'Sanctions screening completed',
        description: '1 potential match found - requires manual review',
        timestamp: '2 hours ago',
        variant: 'warning' as const,
      },
      {
        id: '2',
        title: 'Documents uploaded',
        description: 'All required documents received',
        timestamp: '5 hours ago',
        variant: 'success' as const,
      },
      {
        id: '3',
        title: 'Application submitted',
        description: 'Client onboarding initiated by Jane Smith',
        timestamp: '1 day ago',
        variant: 'default' as const,
      },
    ],
  }

  const handleApprove = () => {
    console.log('Approved with comment:', comment)
    setShowApproveModal(false)
    setComment('')
  }

  const handleReject = () => {
    console.log('Rejected with comment:', comment)
    setShowRejectModal(false)
    setComment('')
  }

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

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'success'
      case 'Under Review':
        return 'warning'
      case 'Rejected':
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <DashboardShell title={client.name} userRole="compliance" userName="John Smith">
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Clients', href: '/clients' },
            { label: client.name },
          ]}
        />

        {/* header with client info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                  <Building2 className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-neutral-900">
                    {client.name}
                  </h1>
                  <p className="mt-1 text-sm text-neutral-600">
                    {client.legalName}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Badge variant={getStatusBadgeVariant(client.status)}>
                      {client.status}
                    </Badge>
                    <Badge variant={getRiskBadgeVariant(client.riskLevel)}>
                      Risk: {client.riskLevel.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">{client.country}</Badge>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowRejectModal(true)}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button onClick={() => setShowApproveModal(true)}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* show alert if sanctions match found */}
        {client.screening.result === 'Match Found' && (
          <Alert variant="warning" title="Sanctions Screening Alert">
            {client.screening.details} - Please review before proceeding with approval.
          </Alert>
        )}

        {/* tabs for different sections */}
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Entity Type</p>
                    <p className="mt-1 text-base text-neutral-900">{client.entityType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Registration Number</p>
                    <p className="mt-1 text-base text-neutral-900">{client.registrationNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Industry</p>
                    <p className="mt-1 text-base text-neutral-900">{client.industry}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-neutral-500">Annual Revenue</p>
                      <p className="mt-1 text-base text-neutral-900">{client.annualRevenue}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-500">Employees</p>
                      <p className="mt-1 text-base text-neutral-900">{client.employees}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Primary Contact</p>
                    <p className="mt-1 text-base text-neutral-900">{client.primaryContact.name}</p>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{client.primaryContact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{client.primaryContact.phone}</span>
                  </div>
                  <div className="flex items-start gap-2 text-neutral-700">
                    <MapPin className="h-4 w-4 mt-0.5" />
                    <div className="text-sm">
                      <p>{client.address.street}</p>
                      <p>{client.address.city}, {client.address.state} {client.address.postalCode}</p>
                      <p>{client.address.country}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Documents</CardTitle>
                <CardDescription>
                  All documents submitted for this client
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {client.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between rounded-lg border border-neutral-200 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-10 w-10 text-primary-600" />
                        <div>
                          <p className="font-medium text-neutral-900">{doc.name}</p>
                          <p className="text-sm text-neutral-500">
                            {doc.type} • Uploaded {doc.uploadDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sanctions Screening</CardTitle>
                  <CardDescription>
                    Latest screening results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-500">Status</span>
                      <Badge variant="success">{client.screening.status}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-500">Result</span>
                      <Badge variant="warning">{client.screening.result}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-500">Confidence</span>
                      <span className="text-sm text-neutral-900">{client.screening.confidence}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-500">Details</p>
                      <p className="mt-2 text-sm text-neutral-700">{client.screening.details}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-500">Overall Risk</span>
                      <Badge variant={getRiskBadgeVariant(client.riskLevel)}>
                        {client.riskLevel.toUpperCase()}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-500 mb-2">Risk Factors</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm">
                          <AlertTriangle className="h-4 w-4 text-warning-600 mt-0.5" />
                          <span>Potential sanctions match requires review</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success-600 mt-0.5" />
                          <span>All required documents submitted</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success-600 mt-0.5" />
                          <span>Company registered in low-risk jurisdiction</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
                <CardDescription>
                  Complete history of all actions and events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Timeline items={client.history} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* approve modal */}
      <Modal
        isOpen={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        title="Approve Client"
        description="Are you sure you want to approve this client for onboarding?"
      >
        <div className="space-y-4">
          <Textarea
            label="Comment (Optional)"
            placeholder="Add any notes or comments..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowApproveModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleApprove}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </Button>
          </div>
        </div>
      </Modal>

      {/* reject modal */}
      <Modal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        title="Reject Client"
        description="Please provide a reason for rejection"
      >
        <div className="space-y-4">
          <Textarea
            label="Reason for Rejection"
            placeholder="Explain why this client is being rejected..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            required
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowRejectModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleReject}>
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardShell>
  )
}

