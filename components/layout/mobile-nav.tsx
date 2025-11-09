'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { X, Menu } from 'lucide-react'
import {
  LayoutDashboard,
  Users,
  Building2,
  FileCheck,
  AlertCircle,
} from 'lucide-react'

interface MobileNavProps {
  userRole?: 'compliance' | 'relationship' | 'procurement'
}

const navigationItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['compliance', 'relationship', 'procurement'],
  },
  {
    label: 'Clients',
    href: '/clients',
    icon: Users,
    roles: ['compliance', 'relationship'],
  },
  {
    label: 'Vendors',
    href: '/vendors',
    icon: Building2,
    roles: ['compliance', 'procurement'],
  },
  {
    label: 'Compliance',
    href: '/compliance',
    icon: FileCheck,
    roles: ['compliance'],
  },
  {
    label: 'Adverse Media',
    href: '/adverse-media',
    icon: AlertCircle,
    roles: ['compliance', 'relationship', 'procurement'],
  },
]

export function MobileNav({ userRole = 'compliance' }: MobileNavProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  const visibleItems = navigationItems.filter(item =>
    item.roles.includes(userRole)
  )

  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      {/* mobile menu toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg lg:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* mobile menu overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <nav className="fixed bottom-20 right-4 z-40 w-64 rounded-2xl border border-neutral-200 bg-white p-4 shadow-2xl lg:hidden">
            <div className="space-y-1">
              {visibleItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-all',
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-neutral-700 active:bg-neutral-100'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </nav>
        </>
      )}
    </>
  )
}

