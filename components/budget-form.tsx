'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface BudgetFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function BudgetForm({ onSubmit, onCancel }: BudgetFormProps) {
  const [clientes, setClientes] = useState<any[]>([])
  const [formData, setFormData] = useState({
    cliente_id: '',
    numero_orcamento: '',
    valor_total: '',
    descricao: '',
    status: 'Novo Contato',
    observacoes: '',
  })

  useEffect(() => {
    fetchClientes()
  }, [])

  const fetchClientes = async () => {
    try {
      const res = await fetch('/api/clientes')
      const data = await res.json()
      setClientes(data)
    } catch (error) {
      console.error('Error fetching clientes:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      cliente_id: parseInt(formData.cliente_id),
      valor_total: parseFloat(formData.valor_total),
    })
    setFormData({
      cliente_id: '',
      numero_orcamento: '',
      valor_total: '',
      descricao: '',
      status: 'Novo Contato',
      observacoes: '',
    })
  }

  const statuses = [
    'Novo Contato',
    'Aguardando Resposta',
    'Reunião Marcada',
    'Projeto em Desenvolvimento',
    'Orçamento Enviado',
    'Aguardando Aprovação',
    'Aprovado',
    'Finalizado',
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cliente">Cliente</Label>
          <Select value={formData.cliente_id} onValueChange={(value) => handleSelectChange('cliente_id', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um cliente" />
            </SelectTrigger>
            <SelectContent>
              {clientes.map((cliente) => (
                <SelectItem key={cliente.id} value={cliente.id.toString()}>
                  {cliente.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="numero_orcamento">Número do Orçamento</Label>
          <Input
            id="numero_orcamento"
            name="numero_orcamento"
            value={formData.numero_orcamento}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="valor_total">Valor Total (R$)</Label>
          <Input
            id="valor_total"
            name="valor_total"
            type="number"
            step="0.01"
            value={formData.valor_total}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2">
          <Label htmlFor="descricao">Descrição</Label>
          <Textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="observacoes">Observações</Label>
          <Textarea
            id="observacoes"
            name="observacoes"
            value={formData.observacoes}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Salvar Orçamento
        </Button>
      </div>
    </form>
  )
}
