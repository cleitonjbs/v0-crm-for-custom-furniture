import { sql } from '@/lib/db'

export async function POST() {
  try {
    // Status já são inseridos no script SQL, então apenas verificamos se a tabela existe
    const result = await sql`SELECT COUNT(*) as count FROM status_definicoes`
    
    return Response.json({ 
      success: true, 
      message: 'Database initialized',
      statusCount: result[0].count 
    })
  } catch (error) {
    console.error('Error initializing database:', error)
    return Response.json({ error: 'Failed to initialize database' }, { status: 500 })
  }
}
