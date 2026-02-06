# CRM Móveis Planejados

Sistema completo de CRM para gerenciar vendas de móveis planejados (sob medida) com pipeline de vendas, orçamentos, clientes e agenda.

## Funcionalidades

### 📊 Dashboard
- Visualização de estatísticas principais
- Total de clientes
- Total de orçamentos
- Orçamentos abertos
- Eventos agendados nos próximos 30 dias

### 👥 Clientes
- Cadastro e gerenciamento de clientes
- Campos: Nome, Email, Telefone, CPF/CNPJ, Endereço, Cidade, Estado, CEP
- Busca por cliente

### 📋 Orçamentos
- Criação de novos orçamentos
- Status: Prospect → Qualificado → Proposta → Negociação → Fechado (Ganho/Perdido) → Em Produção → Finalizado
- Geração automática de PDF profissional
- Cálculo automático de prazo (45 dias úteis)
- Valores e descritivos

### 🎯 Pipeline de Vendas (Kanban)
- Visualização em colunas por status
- Drag-and-drop para mover orçamentos entre status
- Valores totais por coluna
- Contagem de orçamentos por status
- Atualização em tempo real

### 📅 Agenda
- Calendário mensal
- Agendamento de eventos (Reunião, Visita, Telefonema, Entrega)
- Próximos eventos destacados
- Associação com orçamentos

## Banco de Dados

O sistema utiliza **Neon PostgreSQL** serverless com as seguintes tabelas:

### clientes
- id (PK)
- nome
- email
- telefone
- cpf_cnpj
- endereco
- cidade
- estado
- cep
- criado_em

### orcamentos
- id (PK)
- cliente_id (FK)
- numero_orcamento
- valor_total
- descricao
- status
- data_criacao
- data_prazo (45 dias úteis automaticamente)
- observacoes

### eventos_agenda
- id (PK)
- orcamento_id (FK)
- titulo
- descricao
- data_evento
- tipo

### status_definicoes
- id (PK)
- nome
- ordem
- cor

## Instalação

### Pré-requisitos
- Node.js 18+
- Conta Neon com banco PostgreSQL criado

### Passos

1. **Clonar o repositório**
   ```bash
   git clone <repo-url>
   cd crm-moveis
   ```

2. **Instalar dependências**
   ```bash
   npm install
   ```

3. **Configurar variáveis de ambiente**
   Criar arquivo `.env.local`:
   ```
   DATABASE_URL=postgresql://user:password@host/database
   ```

4. **Iniciar o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

5. **Acessar a aplicação**
   Abrir http://localhost:3000 no navegador

## Arquitetura

### Frontend
- **Next.js 16** (App Router)
- **React 19**
- **TailwindCSS** para estilização
- **shadcn/ui** para componentes
- **Lucide React** para ícones
- **jsPDF** para geração de PDFs

### Backend
- **Next.js API Routes**
- **Neon PostgreSQL** para persistência
- **@neondatabase/serverless** para conexões

## Fluxo de Vendas (8 Status Obrigatórios)

1. **Prospect** - Contato inicial
2. **Qualificado** - Contato qualificado
3. **Proposta** - Proposta enviada
4. **Negociação** - Em negociação
5. **Fechado Ganho** - Venda confirmada
6. **Fechado Perdido** - Venda perdida
7. **Em Produção** - Móvel sendo produzido
8. **Finalizado** - Entrega realizada

## Cálculo de 45 Dias Úteis

O sistema calcula automaticamente 45 dias úteis (segunda a sexta) quando um orçamento é criado, excluindo feriados nacionais.

## Geração de PDF

PDFs profissionais são gerados com:
- Cabeçalho customizado
- Informações do orçamento
- Dados do cliente
- Valor total destacado
- Data de criação e prazo
- Observações

## Estrutura de Pastas

```
app/
├── api/
│   ├── clientes/
│   ├── orcamentos/
│   ├── agenda/
│   └── init/
├── page.tsx
└── layout.tsx

components/
├── sidebar.tsx
├── dashboard.tsx
├── clients-view.tsx
├── client-form.tsx
├── budgets-view.tsx
├── budget-form.tsx
├── pipeline-view.tsx
└── agenda-view.tsx

lib/
├── db.ts
└── pdf-generator.ts

hooks/
└── use-init-db.ts
```

## Próximas Melhorias

- [ ] Autenticação de usuários
- [ ] Múltiplos usuários
- [ ] Relatórios avançados
- [ ] Integrações com WhatsApp/Email
- [ ] Histórico de conversas
- [ ] Análise de vendas em tempo real
- [ ] Mobile app

## Suporte

Para reportar bugs ou sugerir melhorias, abra uma issue no repositório.

---

**Desenvolvido com ❤️ usando Next.js e Neon**
