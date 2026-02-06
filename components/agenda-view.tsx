'use client'

import React from "react"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2 } from 'lucide-react'

interface Evento {
  id: number
  orcamento_id: number
  titulo: string
  descricao: string
  data_evento: string
  tipo: string
  numero_orcamento?: string
  cliente_nome?: string
}

export function AgendaView() {
  const [eventos, setEventos] = useState<Evento[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    orcamento_id: '',
    titulo: '',
    descricao: '',
    data_evento: '',
    tipo: 'reuniao',
  })
  const [orcamentos, setOrcamentos] = useState<any[]>([])
  const [currentMonth, setCurrentMonth] = useState(new Date())

  useEffect(() => {
    fetchEventos()
    fetchOrcamentos()
  }, [])

  const fetchEventos = async () => {
    try {
      const res = await fetch('/api/agenda')
      const data = await res.json()
      setEventos(data)
    } catch (error) {
      console.error('Error fetching eventos:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchOrcamentos = async () => {
    try {
      const res = await fetch('/api/orcamentos')
      const data = await res.json()
      setOrcamentos(data)
    } catch (error) {
      console.error('Error fetching orcamentos:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/agenda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          orcamento_id: parseInt(formData.orcamento_id),
        }),
      })
      if (res.ok) {
        setShowForm(false)
        setFormData({
          orcamento_id: '',
          titulo: '',
          descricao: '',
          data_evento: '',
          tipo: 'reuniao',
        })
        fetchEventos()
      }
    } catch (error) {
      console.error('Error adding evento:', error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/agenda/${id}`, { method: 'DELETE' })
      fetchEventos()
    } catch (error) {
      console.error('Error deleting evento:', error)
    }
  }

  const diasMes = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate()

  const eventosPorDia = eventos.reduce(
    (acc, evento) => {
      const data = new Date(evento.data_evento)
      if (
        data.getFullYear() === currentMonth.getFullYear() &&
        data.getMonth() === currentMonth.getMonth()
      ) {
        const dia = data.getDate()
        if (!acc[dia]) acc[dia] = []
        acc[dia].push(evento)
      }
      return acc
    },
    {} as Record<number, Evento[]>
  )

  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  return (
    <div className="flex-1 overflow-auto p-8 bg-slate-50">
      <div className="max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Agenda</h1>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Evento
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Adicionar Evento</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="orcamento">Orçamento</Label>
                    <select
                      id="orcamento"
                      name="orcamento_id"
                      value={formData.orcamento_id}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-slate-300 rounded-md"
                    >
                      <option value="">Selecione...</option>
                      {orcamentos.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.numero_orcamento} - {o.cliente_nome}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="tipo">Tipo</Label>
                    <select
                      id="tipo"
                      name="tipo"
                      value={formData.tipo}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md"
                    >
                      <option value="reuniao">Reunião</option>
                      <option value="visita">Visita</option>
                      <option value="telefonema">Telefonema</option>
                      <option value="entrega">Entrega</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="titulo">Título</Label>
                    <Input
                      id="titulo"
                      name="titulo"
                      value={formData.titulo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="descricao">Descrição</Label>
                    <textarea
                      id="descricao"
                      name="descricao"
                      value={formData.descricao}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md"
                      rows={3}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="data">Data e Hora</Label>
                    <Input
                      id="data"
                      name="data_evento"
                      type="datetime-local"
                      value={formData.data_evento}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Salvar Evento
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <p className="text-slate-500">Carregando agenda...</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentMonth(
                          new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
                        )
                      }
                    >
                      ← Anterior
                    </Button>
                    <CardTitle className="text-xl">
                      {meses[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentMonth(
                          new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
                        )
                      }
                    >
                      Próximo →
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2">
                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map((dia) => (
                      <div key={dia} className="text-center font-bold text-slate-600 p-2">
                        {dia}
                      </div>
                    ))}

                    {Array.from({ length: diasMes }).map((_, i) => {
                      const dia = i + 1
                      const eventosDia = eventosPorDia[dia] || []

                      return (
                        <div
                          key={dia}
                          className="border border-slate-200 rounded p-2 min-h-20 bg-slate-50"
                        >
                          <p className="font-bold text-slate-900">{dia}</p>
                          <div className="space-y-1 mt-1">
                            {eventosDia.slice(0, 2).map((evento) => (
                              <div
                                key={evento.id}
                                className="text-xs bg-blue-100 text-blue-800 p-1 rounded truncate"
                              >
                                {evento.titulo}
                              </div>
                            ))}
                            {eventosDia.length > 2 && (
                              <p className="text-xs text-slate-500">
                                +{eventosDia.length - 2} mais
                              </p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Próximos Eventos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {eventos
                      .filter((e) => new Date(e.data_evento) >= new Date())
                      .sort((a, b) => new Date(a.data_evento).getTime() - new Date(b.data_evento).getTime())
                      .slice(0, 5)
                      .map((evento) => (
                        <div key={evento.id} className="border-l-4 border-blue-500 pl-3 pb-3">
                          <p className="font-semibold text-slate-900">{evento.titulo}</p>
                          <p className="text-xs text-slate-600">
                            {new Date(evento.data_evento).toLocaleDateString('pt-BR')}{' '}
                            {new Date(evento.data_evento).toLocaleTimeString('pt-BR', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                          <p className="text-xs text-slate-600 mt-1">
                            {evento.numero_orcamento} - {evento.cliente_nome}
                          </p>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(evento.id)}
                            className="mt-2 w-full"
                          >
                            <Trash2 className="w-3 h-3 mr-2" />
                            Deletar
                          </Button>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
