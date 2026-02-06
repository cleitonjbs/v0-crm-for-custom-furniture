import { cookies } from 'next/headers'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get('user_id')
    const userEmail = cookieStore.get('user_email')

    if (!userId || !userEmail) {
      return Response.json({ error: 'Not authenticated' }, { status: 401 })
    }

    return Response.json({
      usuario: {
        id: userId.value,
        email: userEmail.value,
      },
    })
  } catch (error) {
    console.error('Error checking auth:', error)
    return Response.json({ error: 'Not authenticated' }, { status: 401 })
  }
}
