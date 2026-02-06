'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is authenticated by verifying if cookies exist
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check')
        if (res.ok) {
          const data = await res.json()
          setUser(data.usuario)
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
          router.push('/login')
        }
      } catch {
        setIsAuthenticated(false)
        router.push('/login')
      }
    }

    checkAuth()
  }, [router])

  return { isAuthenticated, user }
}
