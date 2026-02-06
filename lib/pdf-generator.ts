import jsPDF from 'jspdf'

interface Orcamento {
  id: number
  cliente_id: number
  numero_orcamento: string
  valor_total: number
  descricao: string
  status: string
  data_criacao: string
  data_prazo: string
  observacoes: string
  cliente_nome?: string
}

export async function generateBudgetPDF(orcamento: Orcamento) {
  const doc = new jsPDF()

  // Cores
  const primaryColor = [25, 118, 210] // Azul
  const textColor = [40, 40, 40]
  const lightGray = [200, 200, 200]

  // Cabeçalho
  doc.setFillColor(...primaryColor)
  doc.rect(0, 0, 210, 35, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.text('CRM MÓVEIS PLANEJADOS', 20, 20)

  // Resetar cores
  doc.setTextColor(...textColor)
  doc.setFontSize(10)

  // Informações do orçamento
  let yPosition = 50

  doc.setFontSize(12)
  doc.setFont(undefined, 'bold')
  doc.text('ORÇAMENTO', 20, yPosition)

  yPosition += 10
  doc.setFontSize(10)
  doc.setFont(undefined, 'normal')

  const infoData = [
    ['Número:', orcamento.numero_orcamento],
    ['Cliente:', orcamento.cliente_nome || 'N/A'],
    ['Data de Criação:', new Date(orcamento.data_criacao).toLocaleDateString('pt-BR')],
    ['Data de Prazo:', new Date(orcamento.data_prazo).toLocaleDateString('pt-BR')],
    ['Status:', orcamento.status],
  ]

  infoData.forEach(([label, value]) => {
    doc.setFont(undefined, 'bold')
    doc.text(label, 20, yPosition)
    doc.setFont(undefined, 'normal')
    doc.text(value, 60, yPosition)
    yPosition += 8
  })

  // Descrição
  yPosition += 8
  doc.setFont(undefined, 'bold')
  doc.text('DESCRIÇÃO:', 20, yPosition)

  yPosition += 8
  doc.setFont(undefined, 'normal')
  const descricaoLines = doc.splitTextToSize(orcamento.descricao, 170)
  doc.text(descricaoLines, 20, yPosition)
  yPosition += descricaoLines.length * 8 + 8

  // Valor
  doc.setFontSize(12)
  doc.setFont(undefined, 'bold')
  doc.setFillColor(240, 240, 240)
  doc.rect(20, yPosition, 170, 12, 'F')
  doc.setTextColor(...primaryColor)
  doc.text(`VALOR TOTAL: R$ ${orcamento.valor_total.toFixed(2)}`, 100, yPosition + 8, {
    align: 'center',
  })

  yPosition += 20
  doc.setTextColor(...textColor)
  doc.setFontSize(10)

  // Observações
  if (orcamento.observacoes) {
    doc.setFont(undefined, 'bold')
    doc.text('OBSERVAÇÕES:', 20, yPosition)

    yPosition += 8
    doc.setFont(undefined, 'normal')
    const obsLines = doc.splitTextToSize(orcamento.observacoes, 170)
    doc.text(obsLines, 20, yPosition)
    yPosition += obsLines.length * 8
  }

  // Rodapé
  const pageHeight = doc.internal.pageSize.height
  doc.setFontSize(8)
  doc.setTextColor(150, 150, 150)
  doc.text(
    `Gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`,
    20,
    pageHeight - 10
  )

  // Salvar
  doc.save(`orcamento_${orcamento.numero_orcamento}.pdf`)
}
