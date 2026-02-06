import { sql } from '@/lib/db'

export async function GET() {
  try {
    const eventos = await sql`
      SELECT e.*, o.numero_orcamento, c.nome as cliente_nome
      FROM eventos_agenda e
      LEFT JOIN orcamentos o ON e.orcamento_id = o.id
      LEFT JOIN clientes c ON o.cliente_id = c.id
      ORDER BY e.data_evento ASC
    `
    return Response.json(eventos)
  } catch (error) {
    console.error('Error fetching eventos:', error)
    return Response.json({ error: 'Failed to fetch eventos' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { orcamento_id, titulo, descricao, data_evento, tipo } = body

    const result = await sql`
      INSERT INTO eventos_agenda (orcamento_id, titulo, descricao, data_evento, tipo)
      VALUES (${orcamento_id}, ${titulo}, ${descricao}, ${data_evento}, ${tipo})
      RETURNING *
    `
    return Response.json(result[0], { status: 201 })
  } catch (error) {
    console.error('Error creating evento:', error)
    return Response.json({ error: 'Failed to create evento' }, { status: 500 })
  }
}
