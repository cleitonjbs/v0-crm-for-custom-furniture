import { sql } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { email, senha } = await req.json()

    if (!email || !senha) {
      return Response.json({ error: 'Email e senha são obrigatórios' }, { status: 400 })
    }

    const usuario = await sql`SELECT * FROM usuarios WHERE email = ${email}`

    if (usuario.length === 0) {
      return Response.json({ error: 'Email ou senha inválidos' }, { status: 401 })
    }

    const senhaValida = await bcrypt.compare(senha, usuario[0].senha)

    if (!senhaValida) {
      return Response.json({ error: 'Email ou senha inválidos' }, { status: 401 })
    }

    const response = Response.json(
      { success: true, usuario: { id: usuario[0].id, email: usuario[0].email, nome: usuario[0].nome } },
      { status: 200 }
    )

    // Set cookie with session
    response.cookies.set('user_id', usuario[0].id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    response.cookies.set('user_email', usuario[0].email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error) {
    console.error('Error logging in:', error)
    return Response.json({ error: 'Erro ao fazer login' }, { status: 500 })
  }
}
