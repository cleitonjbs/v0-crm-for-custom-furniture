'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export function useAuth() {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Skip auth check on login page
    if (pathname === '/login') {
      setIsAuthenticated(true)
      return
    }

    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check', {
          credentials: 'include',
        })
        
        if (res.ok) {
          const data = await res.json()
          setUser(data.usuario)
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
          // Only redirect if not already on login page
          if (pathname !== '/login') {
            router.push('/login')
          }
        }
      } catch (error) {
        console.error('[v0] Auth check error:', error)
        setIsAuthenticated(false)
        if (pathname !== '/login') {
          router.push('/login')
        }
      }
    }

    checkAuth()
  }, [router, pathname])

  return { isAuthenticated, user }
}
