import { sql } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { email, senha, nome } = await req.json()

    if (!email || !senha || !nome) {
      return Response.json({ error: 'Email, senha e nome são obrigatórios' }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await sql`SELECT * FROM usuarios WHERE email = ${email}`

    if (existingUser.length > 0) {
      return Response.json({ error: 'Este email já está cadastrado' }, { status: 400 })
    }

    // Hash password
    const senhaHash = await bcrypt.hash(senha, 10)

    const usuario = await sql`
      INSERT INTO usuarios (email, senha, nome)
      VALUES (${email}, ${senhaHash}, ${nome})
      RETURNING id, email, nome
    `

    const response = Response.json(
      { success: true, usuario: usuario[0], message: 'Usuário criado com sucesso' },
      { status: 201 }
    )

    // Set session cookies
    response.cookies.set('user_id', usuario[0].id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    })

    response.cookies.set('user_email', usuario[0].email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error) {
    console.error('Error registering user:', error)
    return Response.json({ error: 'Erro ao registrar usuário' }, { status: 500 })
  }
}
