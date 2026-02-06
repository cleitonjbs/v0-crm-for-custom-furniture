'use client';

import { useEffect } from 'react'

export function useInitializeDatabase() {
  useEffect(() => {
    const initializeDB = async () => {
      try {
        await fetch('/api/init', { method: 'POST' })
      } catch (error) {
        console.error('Error initializing database:', error)
      }
    }

    initializeDB()
  }, [])
}
