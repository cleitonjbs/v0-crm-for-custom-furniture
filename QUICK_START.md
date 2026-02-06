# Quick Start - CRM Móveis Planejados

## ⚡ Início Rápido em 5 Minutos

### 1️⃣ Clone e Instale
```bash
npm install
```

### 2️⃣ Configure o Banco de Dados

Crie um arquivo `.env.local` na raiz do projeto:

```env
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
```

> Obtenha o `DATABASE_URL` no Neon Dashboard > Connection String

### 3️⃣ Rode o Servidor
```bash
npm run dev
```

### 4️⃣ Acesse a Aplicação
Abra http://localhost:3000 no navegador

---

## 🚀 Primeiros Passos

### Criar seu Primeiro Cliente
1. Clique em "Clientes" na sidebar
2. Clique em "Novo Cliente"
3. Preencha: Nome, Email, Telefone, CPF/CNPJ, Endereço, Cidade, Estado, CEP
4. Clique em "Salvar Cliente"

### Criar seu Primeiro Orçamento
1. Clique em "Orçamentos" na sidebar
2. Clique em "Novo Orçamento"
3. Selecione o cliente
4. Preencha: Número (ex: ORC-001), Valor, Descrição
5. Clique em "Salvar Orçamento"

### Ver no Pipeline
1. Clique em "Pipeline" na sidebar
2. Veja seu orçamento em "Prospect"
3. Mude para "Qualificado" usando o dropdown
4. Acompanhe o status em tempo real

### Gerar PDF
1. Em "Orçamentos", clique em "PDF"
2. Um documento profissional será baixado

### Agendar um Evento
1. Clique em "Agenda" na sidebar
2. Clique em "Novo Evento"
3. Selecione o orçamento
4. Preencha: Título, Data/Hora, Tipo (Reunião/Visita/Telefonema/Entrega)
5. Veja no calendário

---

## 📊 Dashboard

Ao acessar a aplicação, você vê automaticamente:
- **Total de Clientes**: Quantos clientes cadastrados
- **Orçamentos**: Todos os orçamentos criados
- **Abertos**: Orçamentos que ainda não finalizaram
- **Próximos 30 dias**: Eventos agendados próximo mês

---

## 🎯 Os 8 Status do Pipeline

```
1. Prospect          → Contato inicial
2. Qualificado       → Cliente mostrou interesse
3. Proposta          → Enviou proposta/orçamento
4. Negociação        → Negociando valores/prazos
5. Fechado Ganho     → VENDA CONFIRMADA! 🎉
6. Fechado Perdido   → Cliente recusou/foi para concorrente
7. Em Produção       → Móvel está sendo produzido
8. Finalizado        → Entregue e project encerrado
```

---

## 💾 Banco de Dados Automático

Ao iniciar pela primeira vez:
- ✅ Tabelas são criadas automaticamente
- ✅ Status padrão são inseridos
- ✅ Sistema está pronto para usar

Se precisar recriar do zero, execute no Neon:
```sql
-- Deletar schema e recriar (CUIDADO!)
DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;
```

Depois execute novamente o script `/scripts/create-schema.sql`

---

## 🔧 Tecnologias Usadas

| Stack | Tecnologia |
|-------|-----------|
| **Frontend** | Next.js 16, React 19, TailwindCSS |
| **UI** | shadcn/ui, Lucide Icons |
| **Backend** | Next.js API Routes |
| **Database** | Neon PostgreSQL (Serverless) |
| **PDF** | jsPDF |

---

## ❓ Perguntas Frequentes

### P: Posso usar em produção?
**R:** Sim! O sistema está completo e funcional. Recomenda-se adicionar autenticação para múltiplos usuários.

### P: Como adicionar múltiplos usuários?
**R:** Será necessário implementar Auth (Supabase, NextAuth, etc) - não está incluído na versão inicial.

### P: Posso customizar as cores?
**R:** Sim! Edite `tailwind.config.ts` e `components/sidebar.tsx`

### P: Como fazer backup?
**R:** No Neon Dashboard, use a função de export/backup automático.

### P: Posso rodar localmente sem Neon?
**R:** Não é recomendado, mas pode usar SQLite mudando a lib/db.ts

---

## 📞 Suporte

- Documentação completa: `README_CRM.md`
- Validação de funcionalidades: `VALIDATION.md`
- Problemas? Consulte `VALIDATION.md` > Troubleshooting

---

## ✨ Próximas Ideias

- [ ] Adicionar autenticação de usuários
- [ ] Criar relatórios em PDF
- [ ] Integração com WhatsApp
- [ ] Dashboard mobile
- [ ] Histórico de mudanças
- [ ] Análises de vendas

---

**Tudo pronto? Comece a usar agora!** 🎉
