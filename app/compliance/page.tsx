'use client'

import { useState } from 'react'
import { DashboardShell } from '@/components/layout/dashboard-shell'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  Shield,
  FileCheck,
} from 'lucide-react'

export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    {
      title: 'Pending Screenings',
      value: '8',
      icon: Clock,
      color: 'warning',
    },
    {
      title: 'High Risk Entities',
      value: '3',
      icon: AlertTriangle,
      color: 'error',
    },
    {
      title: 'Cleared This Week',
      value: '42',
      icon: CheckCircle,
      color: 'success',
    },
    {
      title: 'Compliance Score',
      value: '94%',
      icon: TrendingUp,
      color: 'primary',
    },
  ]

  const screeningResults = [
    {
      id: '1',
      entityName: 'Acme Corporation',
      type: 'Client',
      status: 'Match Found',
      risk: 'high',
      matches: 1,
      date: '2024-01-15',
    },
    {
      id: '2',
      entityName: 'Global Solutions LLC',
      type: 'Client',
      status: 'Clear',
      risk: 'low',
      matches: 0,
      date: '2024-01-14',
    },
    {
      id: '3',
      entityName: 'Tech Supplies Inc',
      type: 'Vendor',
      status: 'Under Review',
      risk: 'medium',
      matches: 2,
      date: '2024-01-13',
    },
  ]

  const riskDistribution = {
    low: 65,
    medium: 25,
    high: 10,
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Clear':
        return 'success'
      case 'Match Found':
        return 'error'
      case 'Under Review':
        return 'warning'
      default:
        return 'default'
    }
  }

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
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
    <DashboardShell title="Compliance" userRole="compliance" userName="John Smith">
      <div className="space-y-6">
        {/* stats cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-neutral-600">
                        {stat.title}
                      </p>
                      <p className="mt-2 text-3xl font-bold text-neutral-900">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        stat.color === 'error'
                          ? 'bg-error-100 text-error-600'
                          : stat.color === 'warning'
                          ? 'bg-warning-100 text-warning-600'
                          : stat.color === 'success'
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

        {/* compliance tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="screenings">Sanctions Screening</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="kyc">KYC Review</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Screenings</CardTitle>
                  <CardDescription>Latest sanctions screening results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {screeningResults.slice(0, 3).map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center justify-between rounded-lg border border-neutral-200 p-4"
                      >
                        <div>
                          <p className="font-medium text-neutral-900">
                            {result.entityName}
                          </p>
                          <p className="mt-1 text-sm text-neutral-600">
                            {result.type} • {result.date}
                          </p>
                        </div>
                        <Badge variant={getStatusBadgeVariant(result.status)}>
                          {result.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Distribution</CardTitle>
                  <CardDescription>Entity risk level breakdown</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-neutral-700">Low Risk</span>
                      <span className="text-sm font-semibold text-neutral-900">
                        {riskDistribution.low}%
                      </span>
                    </div>
                    <Progress value={riskDistribution.low} variant="success" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-neutral-700">Medium Risk</span>
                      <span className="text-sm font-semibold text-neutral-900">
                        {riskDistribution.medium}%
                      </span>
                    </div>
                    <Progress value={riskDistribution.medium} variant="warning" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-neutral-700">High Risk</span>
                      <span className="text-sm font-semibold text-neutral-900">
                        {riskDistribution.high}%
                      </span>
                    </div>
                    <Progress value={riskDistribution.high} variant="error" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="screenings">
            <Card>
              <CardHeader>
                <CardTitle>Sanctions Screening Results</CardTitle>
                <CardDescription>
                  All entities screened against sanctions databases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Entity Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Matches</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {screeningResults.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium">
                          {result.entityName}
                        </TableCell>
                        <TableCell>{result.type}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(result.status)}>
                            {result.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getRiskBadgeVariant(result.risk)}>
                            {result.risk.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>{result.matches}</TableCell>
                        <TableCell>{result.date}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Scoring Model</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-neutral-700 mb-2">
                      Country Risk
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">Weight</span>
                      <span className="text-sm font-semibold">35%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-700 mb-2">
                      Industry Risk
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">Weight</span>
                      <span className="text-sm font-semibold">25%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-700 mb-2">
                      Sanctions Screening
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">Weight</span>
                      <span className="text-sm font-semibold">40%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>High Risk Entities</CardTitle>
                  <CardDescription>
                    Entities requiring immediate attention
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {screeningResults
                      .filter((r) => r.risk === 'high')
                      .map((entity) => (
                        <div
                          key={entity.id}
                          className="flex items-center justify-between rounded-lg border-2 border-error-200 bg-error-50 p-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-error-100 p-2">
                              <AlertTriangle className="h-5 w-5 text-error-600" />
                            </div>
                            <div>
                              <p className="font-medium text-neutral-900">
                                {entity.entityName}
                              </p>
                              <p className="text-sm text-neutral-600">
                                {entity.matches} sanction{entity.matches !== 1 ? 's' : ''} match
                                {entity.matches !== 1 ? 'es' : ''} found
                              </p>
                            </div>
                          </div>
                          <Button size="sm">Review Now</Button>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="kyc">
            <Card>
              <CardHeader>
                <CardTitle>KYC Review Queue</CardTitle>
                <CardDescription>
                  Entities requiring KYC document review
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border border-neutral-200 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary-100 p-2">
                          <FileCheck className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900">
                            Entity {i} - Documents Submitted
                          </p>
                          <p className="text-sm text-neutral-600">
                            5 documents awaiting review
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Review Documents
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}

