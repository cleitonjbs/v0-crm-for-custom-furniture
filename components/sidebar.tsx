'use client';

import React from "react"

import { LayoutDashboard, Users, FileText, Trello, Calendar } from 'lucide-react'

type ViewType = 'dashboard' | 'clients' | 'budgets' | 'pipeline' | 'agenda'

interface SidebarProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems: { view: ViewType; label: string; icon: React.ReactNode }[] = [
    { view: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { view: 'clients', label: 'Clientes', icon: <Users size={20} /> },
    { view: 'budgets', label: 'Orçamentos', icon: <FileText size={20} /> },
    { view: 'pipeline', label: 'Pipeline', icon: <Trello size={20} /> },
    { view: 'agenda', label: 'Agenda', icon: <Calendar size={20} /> },
  ]

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold">CRM Móveis</h1>
        <p className="text-xs text-slate-400 mt-1">Planejados</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onViewChange(item.view)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === item.view
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 text-xs text-slate-400">
        <p>© 2024 CRM Móveis</p>
      </div>
    </aside>
  )
}
