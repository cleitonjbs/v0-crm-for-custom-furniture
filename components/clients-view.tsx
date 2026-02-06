'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Plus, Trash2, Edit } from 'lucide-react'
import { ClientForm } from './client-form'

interface Cliente {
  id: number
  nome: string
  email: string
  telefone: string
  cpf_cnpj: string
  endereco: string
  cidade: string
  estado: string
  cep: string
}

export function ClientsView() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingData, setEditingData] = useState<Cliente | null>(null)

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
    } finally {
      setLoading(false)
    }
  }

  const handleAddCliente = async (clienteData: any) => {
    try {
      const url = editingId ? `/api/clientes/${editingId}` : '/api/clientes'
      const method = editingId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clienteData),
      })
      if (res.ok) {
        setShowForm(false)
        setEditingId(null)
        setEditingData(null)
        fetchClientes()
      }
    } catch (error) {
      console.error('Error saving cliente:', error)
    }
  }

  const handleDeleteCliente = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        const res = await fetch(`/api/clientes/${id}`, {
          method: 'DELETE',
        })
        if (res.ok) {
          fetchClientes()
        }
      } catch (error) {
        console.error('Error deleting cliente:', error)
      }
    }
  }

  const handleEditCliente = (cliente: Cliente) => {
    setEditingId(cliente.id)
    setEditingData(cliente)
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingId(null)
    setEditingData(null)
  }

  const filteredClientes = clientes.filter((c) =>
    c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex-1 overflow-auto p-8 bg-slate-50">
      <div className="max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Clientes</h1>
          <Button
            onClick={() => {
              setEditingId(null)
              setEditingData(null)
              setShowForm(!showForm)
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Cliente
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <ClientForm
                onSubmit={handleAddCliente}
                onCancel={handleCancelForm}
                initialData={editingData}
              />
            </CardContent>
          </Card>
        )}

        <Input
          placeholder="Buscar cliente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6"
        />

        {loading ? (
          <p className="text-slate-500">Carregando clientes...</p>
        ) : filteredClientes.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-slate-500">
              Nenhum cliente encontrado
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredClientes.map((cliente) => (
              <Card key={cliente.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{cliente.nome}</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm text-slate-600">
                        <div>
                          <p className="text-xs font-semibold text-slate-500">Email</p>
                          <p>{cliente.email || '-'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500">Telefone</p>
                          <p>{cliente.telefone}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500">CPF/CNPJ</p>
                          <p>{cliente.cpf_cnpj || '-'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500">Cidade</p>
                          <p>{cliente.cidade || '-'} {cliente.estado ? `, ${cliente.estado}` : ''}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEditCliente(cliente)}
                        size="sm"
                        variant="outline"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteCliente(cliente.id)}
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
