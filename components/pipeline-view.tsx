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
  'Novo Contato',
  'Aguardando Resposta',
  'Reunião Marcada',
  'Projeto em Desenvolvimento',
  'Orçamento Enviado',
  'Aguardando Aprovação',
  'Aprovado',
  'Finalizado',
]

const STATUS_LABELS: Record<string, string> = {
  'Novo Contato': 'Novo Contato',
  'Aguardando Resposta': 'Aguardando Resposta',
  'Reunião Marcada': 'Reunião Marcada',
  'Projeto em Desenvolvimento': 'Projeto em Desenvolvimento',
  'Orçamento Enviado': 'Orçamento Enviado',
  'Aguardando Aprovação': 'Aguardando Aprovação',
  'Aprovado': 'Aprovado',
  'Finalizado': 'Finalizado',
}

const STATUS_COLORS: Record<string, string> = {
  'Novo Contato': 'bg-blue-50 border-blue-200',
  'Aguardando Resposta': 'bg-yellow-50 border-yellow-200',
  'Reunião Marcada': 'bg-purple-50 border-purple-200',
  'Projeto em Desenvolvimento': 'bg-cyan-50 border-cyan-200',
  'Orçamento Enviado': 'bg-orange-50 border-orange-200',
  'Aguardando Aprovação': 'bg-pink-50 border-pink-200',
  'Aprovado': 'bg-green-50 border-green-200',
  'Finalizado': 'bg-gray-50 border-gray-200',
}

const CARD_COLORS: Record<string, string> = {
  'Novo Contato': 'border-blue-400',
  'Aguardando Resposta': 'border-yellow-400',
  'Reunião Marcada': 'border-purple-400',
  'Projeto em Desenvolvimento': 'border-cyan-400',
  'Orçamento Enviado': 'border-orange-400',
  'Aguardando Aprovação': 'border-pink-400',
  'Aprovado': 'border-green-400',
  'Finalizado': 'border-gray-400',
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
          const totalValor = statusOrcamentos.reduce((acc, o) => {
            const valor = typeof o.valor_total === 'number' ? o.valor_total : parseFloat(o.valor_total as any) || 0
            return acc + valor
          }, 0)

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
