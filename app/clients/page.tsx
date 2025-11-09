'use client'

import { useState } from 'react'
import Link from 'next/link'
import { DashboardShell } from '@/components/layout/dashboard-shell'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/search-input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Filter, Download } from 'lucide-react'

// mock data, replace with real api
const mockClients = [
  {
    id: '1',
    name: 'Acme Corporation',
    country: 'United States',
    industry: 'Technology',
    status: 'Under Review',
    riskLevel: 'high',
    lastUpdated: '2024-01-15',
  },
  {
    id: '2',
    name: 'Global Solutions LLC',
    country: 'United Kingdom',
    industry: 'Financial Services',
    status: 'Approved',
    riskLevel: 'low',
    lastUpdated: '2024-01-14',
  },
  {
    id: '3',
    name: 'TechStart Inc',
    country: 'Canada',
    industry: 'Technology',
    status: 'Pending Documents',
    riskLevel: 'medium',
    lastUpdated: '2024-01-13',
  },
  {
    id: '4',
    name: 'International Trade Co',
    country: 'Germany',
    industry: 'Manufacturing',
    status: 'Under Review',
    riskLevel: 'medium',
    lastUpdated: '2024-01-12',
  },
  {
    id: '5',
    name: 'Healthcare Partners',
    country: 'United States',
    industry: 'Healthcare',
    status: 'Approved',
    riskLevel: 'low',
    lastUpdated: '2024-01-11',
  },
]

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'Approved':
      return 'success'
    case 'Under Review':
      return 'warning'
    case 'Pending Documents':
      return 'outline'
    case 'Rejected':
      return 'error'
    default:
      return 'default'
  }
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

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [clients] = useState(mockClients)

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <DashboardShell title="Clients" userRole="compliance" userName="John Smith">
      <div className="space-y-6">
        {/* action buttons and search */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput
            placeholder="Search clients..."
            onChange={setSearchQuery}
            className="sm:w-96"
          />
          
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Link href="/clients/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Client
              </Button>
            </Link>
          </div>
        </div>

        {/* clients table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.country}</TableCell>
                    <TableCell>{client.industry}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(client.status)}>
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRiskBadgeVariant(client.riskLevel)}>
                        {client.riskLevel.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{client.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/clients/${client.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {filteredClients.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-neutral-500">No clients found</p>
          </div>
        )}
      </div>
    </DashboardShell>
  )
}

