'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authService } from '../auth/service'
import { AuthUser, UserType, EmployeeRole } from '../auth/types'

interface AuthContextType {
  currentUser: AuthUser | null
  userType: UserType | undefined
  userRole: EmployeeRole | undefined
  isLoading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        setIsLoading(true)
        const session = await authService.getSession()
        
        if (session?.user) {
          // Extract user metadata
          const user: AuthUser = {
            id: session.user.id,
            email: session.user.email || '',
            metadata: session.user.user_metadata || {},
          }
          setCurrentUser(user)
        } else {
          setCurrentUser(null)
        }
      } catch (error) {
        console.error('Error checking session:', error)
        setCurrentUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await authService.signIn({ email, password })
      
      if (result.success && result.user) {
        const user: AuthUser = {
          id: result.user.id,
          email: result.user.email || '',
          metadata: result.user.user_metadata || {},
        }
        setCurrentUser(user)
        return true
      }
      
      return false
    } catch (error) {
      console.error('Sign in error:', error)
      return false
    }
  }

  const signOut = async () => {
    try {
      await authService.signOut()
      setCurrentUser(null)
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const refreshUser = async () => {
    try {
      const session = await authService.getSession()
      
      if (session?.user) {
        const user: AuthUser = {
          id: session.user.id,
          email: session.user.email || '',
          metadata: session.user.user_metadata || {},
        }
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }
    } catch (error) {
      console.error('Error refreshing user:', error)
      setCurrentUser(null)
    }
  }

  const userType: UserType | undefined = currentUser?.metadata?.user_type
  const userRole: EmployeeRole | undefined = currentUser?.metadata?.role
  const isAuthenticated = !!currentUser

  const value: AuthContextType = {
    currentUser,
    userType,
    userRole,
    isLoading,
    isAuthenticated,
    signIn,
    signOut,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}

