import { sql } from '@/lib/db'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const { status } = body

    const result = await sql`
      UPDATE orcamentos
      SET status = ${status}
      WHERE id = ${parseInt(id)}
      RETURNING *
    `

    return Response.json(result[0])
  } catch (error) {
    console.error('Error updating orcamento:', error)
    return Response.json({ error: 'Failed to update orcamento' }, { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const result = await sql`
      SELECT o.*, c.nome as cliente_nome
      FROM orcamentos o
      LEFT JOIN clientes c ON o.cliente_id = c.id
      WHERE o.id = ${parseInt(id)}
    `

    return Response.json(result[0])
  } catch (error) {
    console.error('Error fetching orcamento:', error)
    return Response.json({ error: 'Failed to fetch orcamento' }, { status: 500 })
  }
}
