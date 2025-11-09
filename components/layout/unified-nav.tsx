'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { 
  Home, 
  FileText, 
  MessageSquare, 
  User, 
  LogOut, 
  Menu, 
  X,
  LayoutDashboard,
  Users,
  TrendingUp,
  FileCheck,
  BarChart3,
  Lightbulb,
  Building2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { NotificationCenter } from '@/components/notifications/notification-center'

export type UserType = 'client' | 'vendor' | 'employee'
export type EmployeeRole = 'relationship_manager' | 'compliance_officer' | 'risk_analyst' | 'executive'

interface UnifiedNavProps {
  userType: UserType
  userRole?: EmployeeRole
  userName?: string
}

// Navigation items for different user types
const clientNavItems = [
  { href: '/client-portal/dashboard', label: 'Dashboard', icon: Home },
  { href: '/client-portal/documents', label: 'Documents', icon: FileText },
  { href: '/client-portal/messages', label: 'Messages', icon: MessageSquare },
  { href: '/client-portal/profile', label: 'Profile', icon: User },
]

const vendorNavItems = [
  { href: '/vendor-portal/dashboard', label: 'Dashboard', icon: Home },
  { href: '/vendor-portal/documents', label: 'Documents', icon: FileText },
  { href: '/vendor-portal/messages', label: 'Messages', icon: MessageSquare },
  { href: '/vendor-portal/profile', label: 'Profile', icon: User },
]

const employeeNavItemsByRole = {
  relationship_manager: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/leads', label: 'Leads', icon: Users },
    { href: '/leads/pipeline', label: 'Pipeline', icon: TrendingUp },
    { href: '/clients', label: 'Clients', icon: Building2 },
  ],
  compliance_officer: [
    { href: '/compliance', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/compliance/documents', label: 'Documents', icon: FileCheck },
    { href: '/compliance/risk-assessment', label: 'Risk Assessment', icon: BarChart3 },
    { href: '/clients', label: 'Clients', icon: Users },
  ],
  risk_analyst: [
    { href: '/risk-analyst/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/risk-analyst/analysis', label: 'Risk Analysis', icon: BarChart3 },
    { href: '/risk-analyst/reports', label: 'Reports', icon: FileText },
  ],
  executive: [
    { href: '/executive/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/executive/insights', label: 'Insights', icon: Lightbulb },
  ],
}

export function UnifiedNav({ userType, userRole, userName = 'User' }: UnifiedNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Determine navigation items based on user type
  const getNavItems = () => {
    if (userType === 'client') return clientNavItems
    if (userType === 'vendor') return vendorNavItems
    if (userType === 'employee' && userRole) {
      return employeeNavItemsByRole[userRole] || employeeNavItemsByRole.relationship_manager
    }
    return []
  }

  const navItems = getNavItems()

  const handleSignOut = async () => {
    const { authService } = await import('@/lib/auth/service')
    await authService.signOut()
    window.location.href = '/login'
  }

  // Determine home route
  const getHomeRoute = () => {
    if (userType === 'client') return '/client-portal/dashboard'
    if (userType === 'vendor') return '/vendor-portal/dashboard'
    if (userType === 'employee' && userRole) {
      if (userRole === 'compliance_officer') return '/compliance'
      if (userRole === 'risk_analyst') return '/risk-analyst/dashboard'
      if (userRole === 'executive') return '/executive/dashboard'
      return '/dashboard'
    }
    return '/dashboard'
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200/50 bg-white/70 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href={getHomeRoute()} 
            className="relative h-10 w-32 transition-transform duration-200 hover:scale-105"
          >
            <Image
              src="/logo.png"
              alt="Stamped"
              fill
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'group flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-300',
                    isActive
                      ? 'bg-gradient-to-r from-primary-50 to-turquoise-50/50 text-primary-700 shadow-sm'
                      : 'text-neutral-700 hover:bg-gradient-to-r hover:from-neutral-50 hover:to-neutral-100/50 hover:text-neutral-900'
                  )}
                >
                  <Icon className={cn(
                    "h-4 w-4 transition-all duration-300",
                    isActive ? "text-primary-600" : "text-neutral-500 group-hover:text-primary-600 group-hover:scale-110"
                  )} />
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Right side - Notifications & User Menu */}
          <div className="flex items-center gap-3">
            {/* Notification Center for employees */}
            {userType === 'employee' && <NotificationCenter />}

            {/* User Menu */}
            <div className="hidden md:flex items-center gap-2 rounded-xl bg-gradient-to-br from-white/80 to-neutral-50/80 backdrop-blur-sm px-3 py-2 border border-neutral-200/50 transition-all duration-300 hover:shadow-md">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-100 to-turquoise-100 flex items-center justify-center shadow-sm">
                <span className="text-xs font-semibold text-primary-700">
                  {userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <p className="text-xs font-semibold text-neutral-900 truncate max-w-[120px]">{userName}</p>
                <p className="text-[10px] text-neutral-600 capitalize">
                  {userType === 'employee' && userRole ? userRole.replace('_', ' ') : userType}
                </p>
              </div>
              <button
                onClick={handleSignOut}
                className="ml-1 p-1.5 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                title="Sign Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-lg p-2 text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-neutral-200/50 py-4 md:hidden">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300',
                      isActive
                        ? 'bg-gradient-to-r from-primary-50 to-turquoise-50/50 text-primary-700 shadow-sm'
                        : 'text-neutral-700 hover:bg-gradient-to-r hover:from-neutral-50 hover:to-neutral-100/50 hover:text-neutral-900'
                    )}
                  >
                    <Icon className={cn(
                      "h-5 w-5",
                      isActive ? "text-primary-600" : "text-neutral-500"
                    )} />
                    {item.label}
                  </Link>
                )
              })}

              {/* Mobile User Info & Sign Out */}
              <div className="mt-4 pt-4 border-t border-neutral-200/50">
                <div className="flex items-center gap-3 px-3 py-2 mb-2">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-100 to-turquoise-100 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary-700">
                      {userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">{userName}</p>
                    <p className="text-xs text-neutral-600 capitalize">
                      {userType === 'employee' && userRole ? userRole.replace('_', ' ') : userType}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-700 transition-all duration-300 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100/50 hover:text-red-700"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

