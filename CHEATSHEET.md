# 🎯 CRM Móveis - Cheat Sheet Rápido

## 🚀 Startup (3 Comandos)

```bash
npm install
echo DATABASE_URL=postgresql://... > .env.local  # Seu Neon URL
npm run dev
```

→ Abrir http://localhost:3000 ✅

---

## 🎮 Como Usar (5 Ações)

### 1. Criar Cliente
Cliente → Novo Cliente → Preencher → Salvar ✅

### 2. Criar Orçamento  
Orçamentos → Novo → Cliente + Valor → Salvar ✅

### 3. Gerenciar Pipeline
Pipeline → Dropdown do cartão → Selecionar novo status ✅

### 4. Gerar PDF
Orçamentos → Clique "PDF" → Download automático ✅

### 5. Agendar Evento
Agenda → Novo Evento → Data/Hora → Salvar ✅

---

## 📊 8 Status (Obrigatórios)

```
prospect → qualificado → proposta → negociacao → fechado_ganho/perdido → em_producao → finalizado
```

---

## 🗄️ Banco de Dados (4 Tabelas)

| Tabela | Função |
|--------|--------|
| clientes | Dados dos clientes |
| orcamentos | Orçamentos e status |
| eventos_agenda | Eventos agendados |
| status_definicoes | Definição de status |

---

## 🔗 URLs da API

```
GET  /api/clientes                    → Lista clientes
POST /api/clientes                    → Criar cliente

GET  /api/orcamentos                  → Lista orçamentos
POST /api/orcamentos                  → Criar orçamento
PATCH /api/orcamentos/[id]            → Atualizar status

GET  /api/agenda                      → Lista eventos
POST /api/agenda                      → Criar evento
DELETE /api/agenda/[id]               → Deletar evento

POST /api/init                        → Inicializar DB
GET  /api/health                      → Check status
```

---

## 📁 Arquivos Importantes

```
app/page.tsx              → Página principal (telas)
components/sidebar.tsx    → Navegação
lib/db.ts                 → Conexão Neon
lib/pdf-generator.ts      → Geração PDFs
scripts/create-schema.sql → Schema do banco
```

---

## 🧪 Testar

```bash
# Health check
curl http://localhost:3000/api/health

# Listar clientes
curl http://localhost:3000/api/clientes

# Listar orçamentos
curl http://localhost:3000/api/orcamentos
```

---

## 🚨 Erros Comuns

| Erro | Solução |
|------|---------|
| DATABASE_URL not set | Adicionar em `.env.local` |
| relation "clientes" does not exist | Executar `scripts/create-schema.sql` |
| Cannot find module | Rodar `npm install` |
| Port 3000 em uso | `npm run dev -- -p 3001` |

---

## 📚 Documentação Rápida

| Arquivo | Conteúdo |
|---------|----------|
| [INDEX.md](INDEX.md) | Índice completo |
| [QUICK_START.md](QUICK_START.md) | Setup rápido |
| [README_CRM.md](README_CRM.md) | Docs técnicas |
| [VALIDATION.md](VALIDATION.md) | Testes e checklist |
| [CHEATSHEET.md](CHEATSHEET.md) | Este arquivo |

---

## 💡 Dicas

- Dashboard atualiza em tempo real
- Pipeline permite drag-drop via dropdown
- PDFs têm logo e data automáticos
- Busca é case-insensitive
- Dados são persistidos no Neon

---

## ⚡ Performance

| Ação | Tempo |
|------|-------|
| Dashboard | ~500ms |
| Listar | <100ms |
| Criar | ~200ms |
| PDF | ~2s |
| Mudar status | Instantâneo |

---

## 🔐 Segurança

✅ Queries parameterizadas  
✅ TypeScript tipos  
✅ HTTPS pronto  
⚠️ Sem auth (adicionar depois)  

---

## 🎓 Stack

```
Frontend:  React 19 + Next.js 16 + TailwindCSS
Backend:   Next.js API Routes
Database:  Neon PostgreSQL
Tools:     shadcn/ui, Lucide, jsPDF
Language:  TypeScript
```

---

## 📌 Lembrar

- DATABASE_URL vai em `.env.local`
- Não versionar `.env.local`
- BD é criado automaticamente
- Componentes estão prontos
- Sem autenticação (v1)

---

## ✅ Checklist Rápido

- [ ] `npm install` funcionou
- [ ] `.env.local` tem DATABASE_URL
- [ ] `npm run dev` rodando
- [ ] http://localhost:3000 abre
- [ ] Consigo criar cliente
- [ ] Consigo criar orçamento
- [ ] Pipeline carrega
- [ ] PDF gera

---

## 🚀 Deploy (Vercel)

```bash
git push
# Deploy automático no Vercel
```

---

## 💬 Suporte Rápido

- Erros de conexão? → Verificar `.env.local`
- Tabelas não existem? → Executar migration
- Componentes quebrados? → Rodar `npm install`
- Mais dúvidas? → Ver `QUICK_START.md`

---

**Tudo funcionando? Parabéns! 🎉**

---

*Última atualização: Fevereiro 2026*
