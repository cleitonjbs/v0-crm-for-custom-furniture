import { sql } from '@/lib/db'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await req.json()
    const { nome, email, telefone, cpf_cnpj, endereco, cidade, estado, cep } = body

    const result = await sql`
      UPDATE clientes
      SET nome = ${nome}, email = ${email}, telefone = ${telefone}, 
          cpf_cnpj = ${cpf_cnpj}, endereco = ${endereco}, 
          cidade = ${cidade}, estado = ${estado}, cep = ${cep}
      WHERE id = ${parseInt(id)}
      RETURNING *
    `
    return Response.json(result[0], { status: 200 })
  } catch (error) {
    console.error('Error updating cliente:', error)
    return Response.json({ error: 'Failed to update cliente' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    await sql`DELETE FROM clientes WHERE id = ${parseInt(id)}`
    return Response.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error deleting cliente:', error)
    return Response.json({ error: 'Failed to delete cliente' }, { status: 500 })
  }
}
