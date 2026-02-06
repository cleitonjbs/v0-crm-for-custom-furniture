import { cookies } from 'next/headers'

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()

    cookieStore.delete('user_id')
    cookieStore.delete('user_email')

    return Response.json({ success: true, message: 'Logout realizado com sucesso' })
  } catch (error) {
    console.error('Error logging out:', error)
    return Response.json({ error: 'Erro ao fazer logout' }, { status: 500 })
  }
}
