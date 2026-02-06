# 📑 Índice Completo - CRM Móveis Planejados

Bem-vindo ao CRM Móveis Planejados! Use este índice para navegar pela documentação e código.

---

## 📖 Documentação (Leia Primeiro!)

### Para Iniciantes
1. **[QUICK_START.md](QUICK_START.md)** - ⭐ COMECE AQUI
   - Setup em 5 minutos
   - Primeiros passos
   - FAQ

2. **[README_CRM.md](README_CRM.md)**
   - Funcionalidades completas
   - Arquitetura
   - Estrutura de pastas

### Para Desenvolvedores
3. **[DEVELOPMENT_SUMMARY.md](DEVELOPMENT_SUMMARY.md)**
   - Resumo técnico
   - O que foi desenvolvido
   - Stack de tecnologia

4. **[VALIDATION.md](VALIDATION.md)**
   - Checklist de testes (50+ itens)
   - Troubleshooting
   - Como validar cada função

---

## 🔧 Código Principal

### Telas da Aplicação
```
components/
├── dashboard.tsx          → Estatísticas e KPIs
├── clients-view.tsx       → Gerenciar clientes
├── client-form.tsx        → Formulário de cliente
├── budgets-view.tsx       → Gerenciar orçamentos
├── budget-form.tsx        → Formulário de orçamento
├── pipeline-view.tsx      → Pipeline Kanban com 8 status
├── agenda-view.tsx        → Calendário e eventos
└── sidebar.tsx            → Navegação principal
```

### APIs Backend
```
app/api/
├── clientes/route.ts      → GET/POST clientes
├── orcamentos/route.ts    → GET/POST orçamentos
├── orcamentos/[id]/route.ts → PATCH status
├── agenda/route.ts        → GET/POST eventos
├── agenda/[id]/route.ts   → DELETE eventos
└── init/route.ts          → Inicialização automática
```

### Utilitários
```
lib/
├── db.ts                  → Conexão Neon e tipos
├── pdf-generator.ts       → Geração de PDFs
└── utils.ts               → Funções auxiliares

hooks/
└── use-init-db.ts         → Hook de inicialização
```

### Database
```
scripts/
└── create-schema.sql      → Schema PostgreSQL com 4 tabelas
```

---

## 🚀 Quick Commands

```bash
# Instalar
npm install

# Rodar desenvolvimento
npm run dev

# Build para produção
npm run build

# Start em produção
npm start

# Lint
npm run lint
```

---

## 📊 Tabelas do Banco de Dados

### clientes
```sql
id | nome | email | telefone | cpf_cnpj | endereco | cidade | estado | cep | criado_em
```

### orcamentos
```sql
id | cliente_id | numero_orcamento | valor_total | descricao | status | 
data_criacao | data_prazo | observacoes
```

### eventos_agenda
```sql
id | orcamento_id | titulo | descricao | data_evento | tipo
```

### status_definicoes
```sql
id | nome | ordem | cor
```

---

## 🎯 Os 8 Status do Pipeline

1. **prospect** - Contato inicial
2. **qualificado** - Cliente mostrou interesse
3. **proposta** - Enviou proposta
4. **negociacao** - Em negociação
5. **fechado_ganho** - VENDA! ✅
6. **fechado_perdido** - Perdeu a venda ❌
7. **em_producao** - Produzindo o móvel
8. **finalizado** - Projeto encerrado

---

## 📱 Telas e Funcionalidades

| Tela | Função | Componente |
|------|--------|-----------|
| **Dashboard** | Estatísticas | `dashboard.tsx` |
| **Clientes** | CRUD clientes | `clients-view.tsx` |
| **Orçamentos** | CRUD + PDF | `budgets-view.tsx` |
| **Pipeline** | Kanban 8 status | `pipeline-view.tsx` |
| **Agenda** | Calendário eventos | `agenda-view.tsx` |

---

## 🔄 Fluxo de Dados

```
User Interface (React)
        ↓
Next.js Pages/Components
        ↓
API Routes (/api)
        ↓
@neondatabase/serverless
        ↓
Neon PostgreSQL (Cloud)
```

---

## 🛠️ Stack de Tecnologias

| Função | Tecnologia |
|--------|-----------|
| Framework Web | Next.js 16 |
| Frontend | React 19 |
| Estilização | TailwindCSS |
| Componentes | shadcn/ui (53 componentes) |
| Ícones | Lucide React |
| Database | Neon PostgreSQL |
| Connector DB | @neondatabase/serverless |
| PDF | jsPDF |
| Formulários | React Hook Form |
| Linguagem | TypeScript |

---

## ✨ Features Especiais

- ✅ Cálculo automático de 45 dias úteis
- ✅ Geração de PDF profissional
- ✅ Pipeline Kanban com drag-and-drop
- ✅ Calendário interativo
- ✅ Busca inteligente
- ✅ Atualização em tempo real
- ✅ Banco de dados automático
- ✅ TypeScript completo

---

## 🚨 Primeiros Passos

### 1. Setup
```bash
npm install
echo "DATABASE_URL=postgresql://..." > .env.local
npm run dev
```

### 2. Criar Cliente
- Clique em "Clientes"
- "Novo Cliente"
- Preencha os dados
- "Salvar Cliente"

### 3. Criar Orçamento
- Clique em "Orçamentos"
- "Novo Orçamento"
- Selecione cliente
- Preencha e salve

### 4. Ver no Pipeline
- Clique em "Pipeline"
- Mude status com dropdown
- Acompanhe em tempo real

### 5. Gerar PDF
- Em "Orçamentos"
- Botão "PDF"
- Download automático

---

## 📞 Precisa de Ajuda?

1. **Erro ao iniciar?** → `VALIDATION.md` > Troubleshooting
2. **Não entendeu algo?** → `QUICK_START.md` > FAQ
3. **Quer detalhes técnicos?** → `README_CRM.md`
4. **Quer validar tudo?** → `VALIDATION.md` (checklist completo)

---

## 🎓 Entendendo o Código

### Exemplo: Criar Orçamento

1. **Frontend** (`components/budgets-view.tsx`)
   - Renderiza lista de orçamentos
   - Botão "Novo Orçamento" abre form

2. **Form** (`components/budget-form.tsx`)
   - Formulário React Hook Form
   - Valida e envia dados

3. **API** (`app/api/orcamentos/route.ts`)
   - Recebe POST
   - Calcula data_prazo
   - Insere no banco via `sql`

4. **Database** (`lib/db.ts`)
   - Query parameterizada (segura)
   - Retorna objeto criado

5. **UI Atualiza** (SWR/Fetch)
   - Refaz fetch da lista
   - Novo orçamento aparece

---

## 🌐 URLs Importantes

| Recurso | URL |
|---------|-----|
| App | http://localhost:3000 |
| API Clientes | http://localhost:3000/api/clientes |
| API Orçamentos | http://localhost:3000/api/orcamentos |
| API Agenda | http://localhost:3000/api/agenda |
| API Init | http://localhost:3000/api/init |

---

## 📊 Estrutura de Pastas Completa

```
/vercel/share/v0-project/
│
├── 📄 Documentação
│   ├── QUICK_START.md ⭐ (COMECE AQUI!)
│   ├── README_CRM.md
│   ├── VALIDATION.md
│   ├── DEVELOPMENT_SUMMARY.md
│   └── INDEX.md (você está aqui)
│
├── app/
│   ├── api/
│   │   ├── clientes/
│   │   ├── orcamentos/
│   │   ├── agenda/
│   │   └── init/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── sidebar.tsx
│   ├── dashboard.tsx
│   ├── clients-view.tsx
│   ├── budgets-view.tsx
│   ├── pipeline-view.tsx
│   ├── agenda-view.tsx
│   └── ui/ (53 componentes)
│
├── hooks/
│   └── use-init-db.ts
│
├── lib/
│   ├── db.ts
│   ├── pdf-generator.ts
│   └── utils.ts
│
├── scripts/
│   └── create-schema.sql
│
├── public/
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

---

## ⏱️ Timeline

| Hora | Etapa |
|------|-------|
| 1min | Ler QUICK_START.md |
| 3min | `npm install` |
| 2min | Configurar `.env.local` |
| 1min | `npm run dev` |
| 5min | Criar primeiro cliente |

**Total: 12 minutos para estar operacional!**

---

## ✅ Checklist de Entendimento

- [ ] Li QUICK_START.md
- [ ] Entendo a estrutura de pastas
- [ ] Entendo as 5 telas
- [ ] Entendo os 8 status
- [ ] Consegui fazer `npm run dev`
- [ ] Criei um cliente
- [ ] Criei um orçamento
- [ ] Mudei status no pipeline
- [ ] Gerei um PDF
- [ ] Agendar um evento

Se marcou tudo ✅, você domina o projeto!

---

## 🚀 Próximas Ações

1. Ler **QUICK_START.md** (5 min)
2. Executar `npm install && npm run dev` (5 min)
3. Criar alguns dados de teste (5 min)
4. Seguir checklist em **VALIDATION.md** (15 min)
5. Explorar o código (30 min)
6. Customizar conforme necessário (?) 

---

## 📝 Notas Importantes

- ✅ Banco de dados é criado automaticamente na primeira execução
- ✅ Todos os componentes UI estão prontos
- ✅ Nenhuma dependência faltando
- ✅ Seguro contra SQL injection (queries parameterizadas)
- ⚠️ Sem autenticação (implementar quando precisar múltiplos usuários)

---

**Pronto para começar? [Abra QUICK_START.md →](QUICK_START.md)**

---

*CRM Móveis Planejados v1.0*  
*Desenvolvido com Next.js 16 + Neon PostgreSQL*  
*📍 Fevereiro de 2026*
