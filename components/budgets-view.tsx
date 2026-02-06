'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Plus, Download } from 'lucide-react'
import { BudgetForm } from './budget-form'
import { generateBudgetPDF } from '@/lib/pdf-generator'

interface Orcamento {
  id: number
  cliente_id: number
  numero_orcamento: string
  valor_total: number
  descricao: string
  status: string
  data_criacao: string
  data_prazo: string
  observacoes: string
  cliente_nome?: string
}

export function BudgetsView() {
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

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

  const handleAddOrcamento = async (orcamentoData: any) => {
    try {
      const res = await fetch('/api/orcamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orcamentoData),
      })
      if (res.ok) {
        setShowForm(false)
        fetchOrcamentos()
      }
    } catch (error) {
      console.error('Error adding orcamento:', error)
    }
  }

  const handleDownloadPDF = async (orcamento: Orcamento) => {
    try {
      await generateBudgetPDF(orcamento)
    } catch (error) {
      console.error('Error generating PDF:', error)
    }
  }

  const filteredOrcamentos = orcamentos.filter((o) =>
    o.numero_orcamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.cliente_nome?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const statusColors: Record<string, string> = {
    'Novo Contato': 'bg-blue-100 text-blue-800',
    'Aguardando Resposta': 'bg-yellow-100 text-yellow-800',
    'Reunião Marcada': 'bg-purple-100 text-purple-800',
    'Projeto em Desenvolvimento': 'bg-cyan-100 text-cyan-800',
    'Orçamento Enviado': 'bg-orange-100 text-orange-800',
    'Aguardando Aprovação': 'bg-pink-100 text-pink-800',
    'Aprovado': 'bg-green-100 text-green-800',
    'Finalizado': 'bg-gray-100 text-gray-800',
  }

  return (
    <div className="flex-1 overflow-auto p-8 bg-slate-50">
      <div className="max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Orçamentos</h1>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Orçamento
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <BudgetForm onSubmit={handleAddOrcamento} onCancel={() => setShowForm(false)} />
            </CardContent>
          </Card>
        )}

        <Input
          placeholder="Buscar orçamento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6"
        />

        {loading ? (
          <p className="text-slate-500">Carregando orçamentos...</p>
        ) : filteredOrcamentos.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-slate-500">
              Nenhum orçamento encontrado
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredOrcamentos.map((orcamento) => (
              <Card key={orcamento.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="font-bold text-lg">
                          {orcamento.numero_orcamento}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            statusColors[orcamento.status] || 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {orcamento.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">
                        Cliente: <span className="font-semibold">{orcamento.cliente_nome}</span>
                      </p>
                      <p className="text-sm text-slate-600 mb-2">
                        {orcamento.descricao}
                      </p>
                      <div className="flex justify-between text-sm text-slate-500">
                        <span>Valor: R$ {(typeof orcamento.valor_total === 'number' ? orcamento.valor_total : parseFloat(orcamento.valor_total as any) || 0).toFixed(2)}</span>
                        <span>
                          Prazo: {new Date(orcamento.data_prazo).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleDownloadPDF(orcamento)}
                      size="sm"
                      variant="outline"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
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
