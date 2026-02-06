# Guia de Validação do CRM Móveis Planejados

Este documento contém um checklist completo para validar todas as funcionalidades da aplicação.

## ✅ Pré-requisitos

- [ ] Neon PostgreSQL configurado e acessível
- [ ] DATABASE_URL adicionada em `.env.local`
- [ ] `npm install` executado com sucesso
- [ ] `npm run dev` iniciado sem erros

## 📊 Dashboard

- [ ] Página carrega sem erros
- [ ] Exibe 4 cards com estatísticas
- [ ] Cards mostram: Total de Clientes, Orçamentos, Abertos, Próximos 30 dias
- [ ] Valores numéricos são atualizados em tempo real
- [ ] Ícones aparecem corretamente

## 👥 Clientes

### Criar Cliente
- [ ] Botão "Novo Cliente" abre formulário
- [ ] Formulário contém todos os campos (nome, email, telefone, CPF/CNPJ, endereço, cidade, estado, CEP)
- [ ] Validação de email funciona
- [ ] Botão "Salvar Cliente" cria registro no banco
- [ ] Cliente aparece na lista após salvar
- [ ] Botão "Cancelar" fecha formulário

### Listar Clientes
- [ ] Lista mostra todos os clientes cadastrados
- [ ] Informações exibidas: Nome, Email, Telefone, CPF/CNPJ, Cidade/Estado
- [ ] Campo de busca filtra por nome e email
- [ ] Busca é case-insensitive
- [ ] Mensagem "Nenhum cliente encontrado" aparece quando lista está vazia

## 📋 Orçamentos

### Criar Orçamento
- [ ] Botão "Novo Orçamento" abre formulário
- [ ] Dropdown de clientes carrega corretamente
- [ ] Todos os campos podem ser preenchidos (número, valor, descrição, status, observações)
- [ ] Status padrão é "prospect"
- [ ] Botão "Salvar Orçamento" cria registro
- [ ] Orçamento aparece na lista com status correto
- [ ] Data de prazo é calculada como 45 dias úteis

### Listar Orçamentos
- [ ] Lista mostra todos os orçamentos
- [ ] Informações exibidas: Número, Status, Cliente, Descrição, Valor, Prazo
- [ ] Status appear com cores apropriadas
- [ ] Busca filtra por número e cliente
- [ ] Botão PDF está presente

### Gerar PDF
- [ ] Botão "PDF" está presente em cada orçamento
- [ ] Clique no botão gera download de PDF
- [ ] PDF contém:
  - [ ] Cabeçalho com logo "CRM MÓVEIS"
  - [ ] Número do orçamento
  - [ ] Nome do cliente
  - [ ] Data de criação
  - [ ] Data de prazo
  - [ ] Status
  - [ ] Descrição
  - [ ] Valor total destacado
  - [ ] Observações (se houver)
  - [ ] Data/hora de geração no rodapé

## 🎯 Pipeline de Vendas

### Visualização Kanban
- [ ] Página carrega com todas as 8 colunas
- [ ] Colunas: Prospect, Qualificado, Proposta, Negociação, Fechado Ganho, Fechado Perdido, Em Produção, Finalizado
- [ ] Cada coluna exibe:
  - [ ] Nome do status
  - [ ] Número de orçamentos
  - [ ] Valor total em R$

### Cards de Orçamento
- [ ] Cada orçamento aparece como card
- [ ] Card mostra:
  - [ ] Número do orçamento
  - [ ] Nome do cliente
  - [ ] Valor em R$
  - [ ] Dropdown de status
- [ ] Cards têm cores de borda diferentes por status

### Alteração de Status
- [ ] Clicar no dropdown de status abre opções
- [ ] Selecionando novo status atualiza imediatamente
- [ ] Orçamento move para coluna correta
- [ ] Valores totais das colunas atualizam

## 📅 Agenda

### Visualização de Calendário
- [ ] Calendário exibe mês atual
- [ ] Botões de navegação funcionam (anterior/próximo)
- [ ] Mês e ano exibem corretamente
- [ ] Dias do mês aparecem em grid 7x... (domingo a sábado)
- [ ] Eventos aparecem em seus dias

### Criar Evento
- [ ] Botão "Novo Evento" abre formulário
- [ ] Dropdown de orçamentos carrega
- [ ] Campo de tipo tem opções: Reunião, Visita, Telefonema, Entrega
- [ ] Campo de data/hora com datetime-local input
- [ ] Botão "Salvar Evento" cria registro
- [ ] Evento aparece no calendário

### Listar Próximos Eventos
- [ ] Sidebar direita mostra "Próximos Eventos"
- [ ] Eventos ordenados por data
- [ ] Mostra máximo 5 próximos eventos
- [ ] Exibe: Título, Data/Hora, Número orçamento, Cliente
- [ ] Botão "Deletar" remove evento

### Deletar Evento
- [ ] Botão "Deletar" remove evento
- [ ] Evento desaparece do calendário
- [ ] Evento desaparece da lista de próximos

## 🔄 Fluxo Completo de Vendas

1. [ ] Criar cliente → validar que aparece na lista
2. [ ] Criar orçamento → validar que aparece no pipeline como "prospect"
3. [ ] No pipeline → mover para "qualificado"
4. [ ] Gerar PDF → validar que download funciona
5. [ ] Agendar evento → validar que aparece no calendário
6. [ ] Continuar movendo status até "finalizado"
7. [ ] Validar que dashboard atualiza com cada mudança

## 🗄️ Validação de Banco de Dados

Execute este SQL para verificar se tudo foi criado:

```sql
-- Verificar tabelas
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Verificar clientes
SELECT COUNT(*) FROM clientes;

-- Verificar orçamentos
SELECT COUNT(*) FROM orcamentos;

-- Verificar status
SELECT * FROM status_definicoes;

-- Verificar eventos
SELECT COUNT(*) FROM eventos_agenda;
```

## 🐛 Troubleshooting

### Erro: "DATABASE_URL is not set"
- Verificar se `.env.local` existe
- Verificar se DATABASE_URL está corretamente preenchida
- Reiniciar servidor dev com `npm run dev`

### Erro: "relation "clientes" does not exist"
- Executar migration: `scripts/create-schema.sql`
- Verificar se teve sucesso no Neon
- Recarregar página

### Orçamentos não aparecem no Pipeline
- Verificar se orçamentos foram criados
- Verificar console do navegador para erros
- Recarregar página

### PDFs não geram
- Verificar se jsPDF está instalado: `npm list jspdf`
- Verificar console do navegador para erros
- Tentar em outro navegador

## 📈 Performance

- [ ] Dashboard carrega em < 2 segundos
- [ ] Lista de clientes carrega em < 1 segundo
- [ ] Pipeline Kanban renderiza suavemente
- [ ] Busca tem resposta imediata
- [ ] Mudança de status é instantânea (UI) e sincroniza com BD

## 🎨 Interface

- [ ] Sidebar é visível e navegável
- [ ] Cores estão corretas (azul escuro para sidebar)
- [ ] Textos legíveis
- [ ] Responsividade: funciona em telas pequenas
- [ ] Ícones aparecem corretamente
- [ ] Botões têm hover states

## ✨ Funcionalidades Avançadas

- [ ] Busca case-insensitive
- [ ] Validação de email no formulário
- [ ] Cálculo de prazo em 45 dias úteis
- [ ] Status cores diferentes por tipo
- [ ] Dados são persistidos após recarga
- [ ] Múltiplos usuários podem acessar (futura)

---

## Resumo Final

Se todos os checkboxes acima estão marcados, a aplicação está **100% funcional** e pronta para uso! ✅

