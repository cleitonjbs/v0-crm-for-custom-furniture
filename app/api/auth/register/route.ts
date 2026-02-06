import { sql } from '@/lib/db'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = body.email?.trim()
    const senha = body.senha?.trim()
    const nome = body.nome?.trim()

    if (!email || !senha || !nome) {
      return Response.json({ error: 'Email, senha e nome são obrigatórios' }, { status: 400 })
    }

    // Check if user already exists
    let existingUser
    try {
      existingUser = await sql`SELECT id FROM usuarios WHERE email = ${email}`
    } catch (dbError) {
      console.error('[v0] Database error checking user:', dbError)
      return Response.json({ error: 'Erro ao verificar usuário' }, { status: 500 })
    }

    if (existingUser && existingUser.length > 0) {
      return Response.json({ error: 'Este email já está cadastrado' }, { status: 400 })
    }

    // Hash password
    let senhaHash
    try {
      senhaHash = await bcrypt.hash(senha, 10)
    } catch (bcryptError) {
      console.error('[v0] Bcrypt error:', bcryptError)
      return Response.json({ error: 'Erro ao processar senha' }, { status: 500 })
    }

    // Create user
    let usuario
    try {
      usuario = await sql`
        INSERT INTO usuarios (email, senha, nome)
        VALUES (${email}, ${senhaHash}, ${nome})
        RETURNING id, email, nome
      `
    } catch (dbError) {
      console.error('[v0] Database error creating user:', dbError)
      return Response.json({ error: 'Erro ao criar usuário' }, { status: 500 })
    }

    // Set cookies
    try {
      const cookieStore = await cookies()

      cookieStore.set('user_id', usuario[0].id.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 604800, // 7 days in seconds
      })

      cookieStore.set('user_email', usuario[0].email, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 604800,
      })
    } catch (cookieError) {
      console.error('[v0] Cookie error:', cookieError)
      return Response.json({ error: 'Erro ao definir cookies' }, { status: 500 })
    }

    return Response.json(
      { success: true, usuario: usuario[0], message: 'Usuário criado com sucesso' },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Error registering user:', error)
    return Response.json({ error: 'Erro ao registrar usuário' }, { status: 500 })
  }
}
