import { sql } from '@/lib/db'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = body?.email?.trim()
    const senha = body?.senha?.trim()

    if (!email || !senha) {
      return Response.json({ error: 'Email e senha são obrigatórios' }, { status: 400 })
    }

    const usuario = await sql`SELECT id, email, nome, senha FROM usuarios WHERE email = ${email}`

    if (!usuario || usuario.length === 0) {
      return Response.json({ error: 'Email ou senha inválidos' }, { status: 401 })
    }

    const senhaValida = await bcrypt.compare(senha, usuario[0].senha)
    if (!senhaValida) {
      return Response.json({ error: 'Email ou senha inválidos' }, { status: 401 })
    }

    const cookieStore = await cookies()
    cookieStore.set('user_id', usuario[0].id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 604800,
    })

    return Response.json({ success: true, usuario: { id: usuario[0].id, email: usuario[0].email, nome: usuario[0].nome } }, { status: 200 })
  } catch (error) {
    console.error('[v0] Login error:', error)
    return Response.json({ error: 'Erro ao fazer login' }, { status: 500 })
  }
}
