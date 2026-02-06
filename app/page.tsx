'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Dashboard } from '@/components/dashboard'
import { ClientsView } from '@/components/clients-view'
import { BudgetsView } from '@/components/budgets-view'
import { PipelineView } from '@/components/pipeline-view'
import { AgendaView } from '@/components/agenda-view'
import { useInitializeDatabase } from '@/hooks/use-init-db'

type ViewType = 'dashboard' | 'clients' | 'budgets' | 'pipeline' | 'agenda'

export default function Page() {
  useInitializeDatabase()
  const [currentView, setCurrentView] = useState<ViewType>('dashboard')

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
