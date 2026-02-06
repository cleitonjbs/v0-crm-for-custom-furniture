import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required')
}

export const sql = neon(process.env.DATABASE_URL)

export interface Cliente {
  id: number
  nome: string
  email: string
  telefone: string
  cpf_cnpj: string
  endereco: string
  cidade: string
  estado: string
  cep: string
  criado_em: string
}

export interface Orcamento {
  id: number
  cliente_id: number
  numero_orcamento: string
  valor_total: number
  descricao: string
  status: string
  data_criacao: string
  data_prazo: string
  observacoes: string
  cliente?: Cliente
}

export interface EventoAgenda {
  id: number
  orcamento_id: number
  titulo: string
  descricao: string
  data_evento: string
  tipo: string
}

export interface StatusDefinicao {
  id: number
  nome: string
  ordem: number
  cor: string
}
