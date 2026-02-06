export async function POST(req: Request) {
  try {
    const response = Response.json({ success: true, message: 'Logout realizado com sucesso' })

    response.cookies.delete('user_id')
    response.cookies.delete('user_email')

    return response
  } catch (error) {
    console.error('Error logging out:', error)
    return Response.json({ error: 'Erro ao fazer logout' }, { status: 500 })
  }
}
