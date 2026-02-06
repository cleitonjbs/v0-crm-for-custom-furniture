'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Orcamento {
  id: number
  cliente_id: number
  numero_orcamento: string
  valor_total: number
  descricao: string
  status: string
  data_criacao: string
  data_prazo: string
  cliente_nome?: string
}

const STATUSES = [
  'prospect',
  'qualificado',
  'proposta',
  'negociacao',
  'fechado_ganho',
  'fechado_perdido',
  'em_producao',
  'finalizado',
]

const STATUS_LABELS: Record<string, string> = {
  prospect: 'Prospect',
  qualificado: 'Qualificado',
  proposta: 'Proposta',
  negociacao: 'Negociação',
  fechado_ganho: 'Fechado Ganho',
  fechado_perdido: 'Fechado Perdido',
  em_producao: 'Em Produção',
  finalizado: 'Finalizado',
}

const STATUS_COLORS: Record<string, string> = {
  prospect: 'bg-yellow-50 border-yellow-200',
  qualificado: 'bg-blue-50 border-blue-200',
  proposta: 'bg-purple-50 border-purple-200',
  negociacao: 'bg-orange-50 border-orange-200',
  fechado_ganho: 'bg-green-50 border-green-200',
  fechado_perdido: 'bg-red-50 border-red-200',
  em_producao: 'bg-indigo-50 border-indigo-200',
  finalizado: 'bg-gray-50 border-gray-200',
}

const CARD_COLORS: Record<string, string> = {
  prospect: 'border-yellow-400',
  qualificado: 'border-blue-400',
  proposta: 'border-purple-400',
  negociacao: 'border-orange-400',
  fechado_ganho: 'border-green-400',
  fechado_perdido: 'border-red-400',
  em_producao: 'border-indigo-400',
  finalizado: 'border-gray-400',
}

export function PipelineView() {
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrcamentos()
  }, [])

  const fetchOrcamentos = async () => {
    try {
      const res = await fetch('/api/orcamentos')
      const data = await res.json()
      setOrcamentos(data)
    } catch (error) {
      console.error('Error fetching orcamentos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orcamentoId: number, newStatus: string) => {
    try {
      // Atualizar no backend
      await fetch(`/api/orcamentos/${orcamentoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      // Atualizar localmente
      setOrcamentos(
        orcamentos.map((o) =>
          o.id === orcamentoId ? { ...o, status: newStatus } : o
        )
      )
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex-1 p-8 bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Carregando pipeline...</p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto p-8 bg-slate-50">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">Pipeline de Vendas</h1>
        <p className="text-slate-600 mt-2">Gerencie seus orçamentos através dos estágios</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 2xl:grid-cols-8 gap-4 pb-8">
        {STATUSES.map((status) => {
          const statusOrcamentos = orcamentos.filter((o) => o.status === status)
          const totalValor = statusOrcamentos.reduce((acc, o) => acc + o.valor_total, 0)

          return (
            <div key={status} className={`rounded-lg p-4 border-2 ${STATUS_COLORS[status]}`}>
              <div className="mb-4">
                <h2 className="font-bold text-slate-900">{STATUS_LABELS[status]}</h2>
                <p className="text-xs text-slate-600 mt-1">
                  {statusOrcamentos.length} orçamento(s)
                </p>
                <p className="text-xs font-semibold text-slate-700 mt-1">
                  R$ {totalValor.toFixed(2)}
                </p>
              </div>

              <div className="space-y-3">
                {statusOrcamentos.map((orcamento) => (
                  <div
                    key={orcamento.id}
                    className={`bg-white border-l-4 rounded p-3 ${CARD_COLORS[status]} shadow-sm hover:shadow-md transition-shadow`}
                  >
                    <p className="font-semibold text-sm text-slate-900">
                      {orcamento.numero_orcamento}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      {orcamento.cliente_nome}
                    </p>
                    <p className="text-sm font-bold text-slate-700 mt-2">
                      R$ {orcamento.valor_total.toFixed(2)}
                    </p>

                    <div className="mt-3">
                      <Select
                        value={status}
                        onValueChange={(newStatus) =>
                          handleStatusChange(orcamento.id, newStatus)
                        }
                      >
                        <SelectTrigger size="sm" className="text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUSES.map((s) => (
                            <SelectItem key={s} value={s}>
                              {STATUS_LABELS[s]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}

                {statusOrcamentos.length === 0 && (
                  <p className="text-xs text-slate-400 text-center py-4">
                    Nenhum orçamento
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
