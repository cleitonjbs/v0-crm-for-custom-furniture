import { sql } from '@/lib/db'

export async function GET() {
  try {
    const orcamentos = await sql`
      SELECT o.*, c.nome as cliente_nome
      FROM orcamentos o
      LEFT JOIN clientes c ON o.cliente_id = c.id
      ORDER BY o.data_criacao DESC
    `
    return Response.json(orcamentos)
  } catch (error) {
    console.error('Error fetching orcamentos:', error)
    return Response.json({ error: 'Failed to fetch orcamentos' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { cliente_id, numero_orcamento, valor_total, descricao, status, observacoes } = body

    const result = await sql`
      INSERT INTO orcamentos (cliente_id, numero_orcamento, valor_total, descricao, status, observacoes, data_prazo)
      VALUES (
        ${cliente_id},
        ${numero_orcamento},
        ${valor_total},
        ${descricao},
        ${status || 'Novo Contato'},
        ${observacoes},
        NOW() + INTERVAL '45 days'
      )
      RETURNING *
    `
    return Response.json(result[0], { status: 201 })
  } catch (error) {
    console.error('Error creating orcamento:', error)
    return Response.json({ error: 'Failed to create orcamento' }, { status: 500 })
  }
}
