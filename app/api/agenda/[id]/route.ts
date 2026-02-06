import { sql } from '@/lib/db'

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await sql`DELETE FROM eventos_agenda WHERE id = ${parseInt(id)}`
    return Response.json({ success: true })
  } catch (error) {
    console.error('Error deleting evento:', error)
    return Response.json({ error: 'Failed to delete evento' }, { status: 500 })
  }
}
