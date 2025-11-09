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

const mockVendors = [
  {
    id: '1',
    name: 'Tech Supplies Inc',
    country: 'United States',
    category: 'IT Equipment',
    status: 'Approved',
    riskLevel: 'low',
    lastUpdated: '2024-01-15',
  },
  {
    id: '2',
    name: 'Office Solutions Global',
    country: 'Canada',
    category: 'Office Supplies',
    status: 'Under Review',
    riskLevel: 'medium',
    lastUpdated: '2024-01-14',
  },
  {
    id: '3',
    name: 'Industrial Parts Ltd',
    country: 'United Kingdom',
    category: 'Manufacturing',
    status: 'Approved',
    riskLevel: 'low',
    lastUpdated: '2024-01-13',
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

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [vendors] = useState(mockVendors)

  const filteredVendors = vendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <DashboardShell title="Vendors" userRole="procurement" userName="John Smith">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput
            placeholder="Search vendors..."
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
            <Link href="/vendors/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Vendor
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell className="font-medium">{vendor.name}</TableCell>
                    <TableCell>{vendor.country}</TableCell>
                    <TableCell>{vendor.category}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(vendor.status)}>
                        {vendor.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRiskBadgeVariant(vendor.riskLevel)}>
                        {vendor.riskLevel.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{vendor.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/vendors/${vendor.id}`}>
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
      </div>
    </DashboardShell>
  )
}

