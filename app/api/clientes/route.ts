import { sql } from '@/lib/db'

export async function GET() {
  try {
    const clientes = await sql`SELECT * FROM clientes ORDER BY criado_em DESC`
    return Response.json(clientes)
  } catch (error) {
    console.error('Error fetching clientes:', error)
    return Response.json({ error: 'Failed to fetch clientes' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { nome, email, telefone, cpf_cnpj, endereco, cidade, estado, cep } = body

    const result = await sql`
      INSERT INTO clientes (nome, email, telefone, cpf_cnpj, endereco, cidade, estado, cep)
      VALUES (${nome}, ${email}, ${telefone}, ${cpf_cnpj}, ${endereco}, ${cidade}, ${estado}, ${cep})
      RETURNING *
    `
    return Response.json(result[0], { status: 201 })
  } catch (error) {
    console.error('Error creating cliente:', error)
    return Response.json({ error: 'Failed to create cliente' }, { status: 500 })
  }
}
