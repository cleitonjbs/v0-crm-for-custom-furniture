import { sql } from '@/lib/db'

export async function POST() {
  try {
    // Inserir status padrão se não existirem
    const existingStatuses = await sql`SELECT COUNT(*) as count FROM status_definicoes`
    
    if (existingStatuses[0].count === 0) {
      const statuses = [
        { nome: 'prospect', ordem: 1, cor: '#FBBF24' },
        { nome: 'qualificado', ordem: 2, cor: '#3B82F6' },
        { nome: 'proposta', ordem: 3, cor: '#A855F7' },
        { nome: 'negociacao', ordem: 4, cor: '#F97316' },
        { nome: 'fechado_ganho', ordem: 5, cor: '#22C55E' },
        { nome: 'fechado_perdido', ordem: 6, cor: '#EF4444' },
        { nome: 'em_producao', ordem: 7, cor: '#6366F1' },
        { nome: 'finalizado', ordem: 8, cor: '#9CA3AF' },
      ]

      for (const status of statuses) {
        await sql`
          INSERT INTO status_definicoes (nome, ordem, cor)
          VALUES (${status.nome}, ${status.ordem}, ${status.cor})
          ON CONFLICT DO NOTHING
        `
      }
    }

    return Response.json({ success: true, message: 'Database initialized' })
  } catch (error) {
    console.error('Error initializing database:', error)
    return Response.json({ error: 'Failed to initialize database' }, { status: 500 })
  }
}
