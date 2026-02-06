import { sql } from '@/lib/db'

export async function GET() {
  try {
    // Testar conexão com banco
    const result = await sql`SELECT NOW() as time`
    
    return Response.json({
      status: 'healthy',
      timestamp: result[0].time,
      message: 'Aplicação CRM Móveis Planejados rodando normalmente',
      version: '1.0.0',
    })
  } catch (error) {
    return Response.json(
      {
        status: 'error',
        message: 'Erro ao conectar com o banco de dados',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
