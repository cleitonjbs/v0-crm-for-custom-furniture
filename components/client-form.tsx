'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ClientFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  initialData?: any
}

export function ClientForm({ onSubmit, onCancel, initialData }: ClientFormProps) {
  const [formData, setFormData] = useState(initialData || {
    nome: '',
    email: '',
    telefone: '',
    cpf_cnpj: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const formatTelefone = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 10) {
      return cleaned.replace(/(\d{2})(\d{0,8})/, '$1 $2')
    }
    return cleaned.slice(0, 11).replace(/(\d{2})(\d{5})(\d{4})/, '$1 $2-$3')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let formattedValue = value

    if (name === 'telefone') {
      formattedValue = formatTelefone(value)
    }

    setFormData({ ...formData, [name]: formattedValue })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nome || formData.nome.trim().length < 3) {
      newErrors.nome = 'Nome é obrigatório e deve ter no mínimo 3 letras'
    }

    if (!formData.telefone) {
      newErrors.telefone = 'Telefone é obrigatório (xx xxxxx-xxxx)'
    } else if (!/^\d{2} \d{5}-\d{4}$/.test(formData.telefone)) {
      newErrors.telefone = 'Telefone inválido. Use o formato: xx xxxxx-xxxx'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
      if (!initialData) {
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          cpf_cnpj: '',
          endereco: '',
          cidade: '',
          estado: '',
          cep: '',
        })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nome">Nome *</Label>
          <Input
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Mínimo 3 letras"
          />
          {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="telefone">Telefone *</Label>
          <Input
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="xx xxxxx-xxxx"
          />
          {errors.telefone && <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>}
        </div>
        <div>
          <Label htmlFor="cpf_cnpj">CPF/CNPJ</Label>
          <Input
            id="cpf_cnpj"
            name="cpf_cnpj"
            value={formData.cpf_cnpj}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="endereco">Endereço</Label>
          <Input
            id="endereco"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="cidade">Cidade</Label>
          <Input
            id="cidade"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="estado">Estado</Label>
          <Input
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            maxLength={2}
          />
        </div>
        <div>
          <Label htmlFor="cep">CEP</Label>
          <Input
            id="cep"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {initialData ? 'Atualizar Cliente' : 'Salvar Cliente'}
        </Button>
      </div>
    </form>
  )
}
