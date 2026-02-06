'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Dashboard } from '@/components/dashboard'
import { ClientsView } from '@/components/clients-view'
import { BudgetsView } from '@/components/budgets-view'
import { PipelineView } from '@/components/pipeline-view'
import { AgendaView } from '@/components/agenda-view'
import { useInitializeDatabase } from '@/hooks/use-init-db'
import { useAuth } from '@/hooks/use-auth'

type ViewType = 'dashboard' | 'clients' | 'budgets' | 'pipeline' | 'agenda'

export default function Page() {
  useInitializeDatabase()
  const { isAuthenticated } = useAuth()
  const [currentView, setCurrentView] = useState<ViewType>('dashboard')

  if (isAuthenticated === false) {
    return null // Will redirect to login
  }

  if (isAuthenticated === null) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">Carregando...</p>
      </div>
    )
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />
      case 'clients':
        return <ClientsView />
      case 'budgets':
        return <BudgetsView />
      case 'pipeline':
        return <PipelineView />
      case 'agenda':
        return <AgendaView />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-hidden">
        {renderView()}
      </main>
    </div>
  )
}
