'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, FileText, TrendingUp, Clock } from 'lucide-react'

interface DashboardStats {
  totalClientes: number
  totalOrcamentos: number
  orcamentosAbertos: number
  proximos30dias: number
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalClientes: 0,
    totalOrcamentos: 0,
    orcamentosAbertos: 0,
    proximos30dias: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [clientesRes, orcamentosRes] = await Promise.all([
        fetch('/api/clientes'),
        fetch('/api/orcamentos'),
      ])

      const clientes = await clientesRes.json()
      const orcamentos = await orcamentosRes.json()

      const now = new Date()
      const proximo30 = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

      const proximos = orcamentos.filter((o: any) => {
        const data = new Date(o.data_prazo)
        return data >= now && data <= proximo30
      })

      setStats({
        totalClientes: clientes.length,
        totalOrcamentos: orcamentos.length,
        orcamentosAbertos: orcamentos.filter((o: any) => o.status !== 'finalizado').length,
        proximos30dias: proximos.length,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total de Clientes',
      value: stats.totalClientes,
      icon: <Users className="w-8 h-8" />,
      color: 'bg-blue-500',
    },
    {
      title: 'Orçamentos',
      value: stats.totalOrcamentos,
      icon: <FileText className="w-8 h-8" />,
      color: 'bg-green-500',
    },
    {
      title: 'Abertos',
      value: stats.orcamentosAbertos,
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'bg-orange-500',
    },
    {
      title: 'Próximos 30 dias',
      value: stats.proximos30dias,
      icon: <Clock className="w-8 h-8" />,
      color: 'bg-purple-500',
    },
  ]

  return (
    <div className="flex-1 overflow-auto p-8 bg-slate-50">
      <div className="max-w-7xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Dashboard</h1>

        {loading ? (
          <p className="text-slate-500">Carregando dados...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((card, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-slate-600">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-slate-900">
                      {card.value}
                    </div>
                    <div className={`${card.color} p-3 rounded-lg text-white`}>
                      {card.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
