'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/hooks/useAuth'
import {
  LayoutDashboard,
  Users,
  Building2,
  FileCheck,
  AlertCircle,
  Settings,
  LogOut,
  User as UserIcon,
} from 'lucide-react'

interface NavigationProps {
  userRole?: 'compliance' | 'relationship' | 'procurement'
  userName?: string
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

export function Navigation({ userRole = 'compliance', userName: userNameProp }: NavigationProps) {
  const pathname = usePathname()
  const { user } = useAuth()
  
  // Use auth user name if available, fallback to prop, then 'User'
  const userName = user?.name || userNameProp || 'User'
  const avatarUrl = user?.avatarUrl

  const visibleItems = navigationItems.filter(item =>
    item.roles.includes(userRole)
  )

  return (
    <nav className="flex h-screen w-64 flex-col border-r border-neutral-200/50 bg-white/70 backdrop-blur-xl">
        {/* logo at top */}
        <div className="flex h-16 items-center border-b border-neutral-200/50 px-6">
          <Link href="/dashboard" className="relative h-12 w-auto transition-transform duration-200 hover:scale-105">
            <Image
              src="/logo.png"
              alt="Stamped"
              width={216}
              height={60}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>
        </div>

      {/* nav menu items */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1.5">
          {visibleItems.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300',
                  isActive
                    ? 'bg-gradient-to-r from-primary-50 to-turquoise-50/50 text-primary-700 shadow-md border border-primary-100'
                    : 'text-neutral-700 hover:bg-gradient-to-r hover:from-neutral-50 hover:to-neutral-100/50 hover:text-neutral-900 hover:translate-x-1 hover:shadow-sm'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Icon className={cn(
                  "h-5 w-5 transition-all duration-300",
                  isActive ? "text-primary-600" : "text-neutral-500 group-hover:text-primary-600 group-hover:scale-110"
                )} />
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>

      {/* user info at bottom */}
      <div className="border-t border-neutral-200/50 p-4">
        <div className="mb-3 rounded-xl bg-gradient-to-br from-white/80 to-neutral-50/80 backdrop-blur-sm p-3 shadow-sm border border-neutral-200/50 transition-all duration-300 hover:shadow-md">
          <div className="flex items-center gap-3">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={userName}
                className="h-10 w-10 rounded-full object-cover border-2 border-primary-200 ring-2 ring-primary-100"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-100 to-turquoise-100 flex items-center justify-center shadow-sm">
                <UserIcon className="h-5 w-5 text-primary-600" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-neutral-900 truncate">{userName}</p>
              <p className="text-xs text-neutral-600 capitalize">{userRole} Officer</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-1">
          <Link
            href="/settings"
            className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 transition-all duration-300 hover:bg-gradient-to-r hover:from-neutral-50 hover:to-neutral-100/50 hover:translate-x-1 hover:shadow-sm"
          >
            <Settings className="h-5 w-5 text-neutral-500 transition-all group-hover:text-primary-600 group-hover:rotate-90" />
            Settings
          </Link>
          <button
            onClick={async () => {
              const { authService } = await import('@/lib/auth/service')
              await authService.signOut()
              window.location.href = '/login'
            }}
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 transition-all duration-300 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100/50 hover:translate-x-1 hover:shadow-sm hover:text-red-700"
          >
            <LogOut className="h-5 w-5 text-neutral-500 transition-all group-hover:text-red-600 group-hover:-translate-x-0.5" />
            Sign out
          </button>
        </div>
      </div>
    </nav>
  )
}

