import { sql } from '@/lib/db'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = body?.email?.trim()
    const senha = body?.senha?.trim()
    const nome = body?.nome?.trim()

    if (!email || !senha || !nome) {
      return Response.json({ error: 'Email, senha e nome são obrigatórios' }, { status: 400 })
    }

    const existingUser = await sql`SELECT id FROM usuarios WHERE email = ${email}`
    if (existingUser && existingUser.length > 0) {
      return Response.json({ error: 'Este email já está cadastrado' }, { status: 400 })
    }

    const senhaHash = await bcrypt.hash(senha, 10)
    const usuario = await sql`INSERT INTO usuarios (email, senha, nome) VALUES (${email}, ${senhaHash}, ${nome}) RETURNING id, email, nome`

    const cookieStore = await cookies()
    cookieStore.set('user_id', usuario[0].id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 604800,
    })

    return Response.json({ success: true, usuario: usuario[0], message: 'Usuário criado com sucesso' }, { status: 201 })
  } catch (error) {
    console.error('[v0] Register error:', error)
    return Response.json({ error: 'Erro ao registrar usuário' }, { status: 500 })
  }
}
