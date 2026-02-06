# 🚀 CRM Móveis Planejados - COMECE AQUI!

```
╔══════════════════════════════════════════════════════════════════════╗
║                                                                      ║
║              🏠 CRM MÓVEIS PLANEJADOS - VERSÃO 1.0                  ║
║                                                                      ║
║              ✅ Completo | 🔒 Seguro | 📚 Documentado              ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

## ⚡ 3 Passos para Começar

### 1️⃣ Instalar
```bash
npm install
```

### 2️⃣ Configurar
```bash
# Criar arquivo .env.local
echo "DATABASE_URL=postgresql://seu-neon-url-aqui" > .env.local
```

> Obtenha a URL em: https://console.neon.tech/app/projects

### 3️⃣ Rodar
```bash
npm run dev
# Abrir http://localhost:3000 no navegador
```

✅ **Pronto!** Sua aplicação está rodando!

---

## 📖 Documentação Rápida

Escolha seu caminho:

### 🎯 "Quero começar AGORA"
→ Vá para [QUICK_START.md](QUICK_START.md) (5 minutos)

### 📚 "Quero entender tudo"
→ Vá para [INDEX.md](INDEX.md) (10 minutos)

### 🔧 "Quero detalhes técnicos"
→ Vá para [README_CRM.md](README_CRM.md)

### ✅ "Quero validar tudo"
→ Vá para [VALIDATION.md](VALIDATION.md)

### 📋 "Quero uma referência rápida"
→ Vá para [CHEATSHEET.md](CHEATSHEET.md)

---

## 🎨 O Que Você Tem

```
┌─────────────────────────────────────────────────────┐
│  📊 DASHBOARD                                       │
│  • Estatísticas em tempo real                      │
│  • 4 cards com KPIs principais                     │
│  • Atualiza automaticamente                        │
├─────────────────────────────────────────────────────┤
│  👥 CLIENTES                                        │
│  • Cadastro de clientes                            │
│  • 8 campos obrigatórios                           │
│  • Busca inteligente                               │
├─────────────────────────────────────────────────────┤
│  📋 ORÇAMENTOS                                      │
│  • Criar orçamentos                                │
│  • Gerar PDF profissional                          │
│  • Status automático (45 dias úteis)               │
├─────────────────────────────────────────────────────┤
│  🎯 PIPELINE (Kanban)                              │
│  • 8 status obrigatórios                           │
│  • Drag-and-drop via dropdown                      │
│  • Totalizações automáticas                        │
├─────────────────────────────────────────────────────┤
│  📅 AGENDA                                          │
│  • Calendário mensal                               │
│  • Agendar eventos                                 │
│  • Próximos eventos destacados                     │
└─────────────────────────────────────────────────────┘
```

---

## 🗄️ Banco de Dados Integrado

```
Neon PostgreSQL (Serverless)
      ↓
  4 Tabelas
  ├── clientes (clientes cadastrados)
  ├── orcamentos (orçamentos e status)
  ├── eventos_agenda (eventos agendados)
  └── status_definicoes (8 status)
      ↓
  Schema criado automaticamente
  na primeira execução!
```

---

## 🎯 Fluxo de Vendas (8 Status)

```
prospect
    ↓
qualificado
    ↓
proposta
    ↓
negociacao
    ↓
    ├─→ fechado_ganho ✅ (VENDA!)
    │
    └─→ fechado_perdido ❌ (Perdeu)
        ↓
    em_producao
        ↓
    finalizado 🏁 (Fim)
```

---

## 📚 Documentação Incluída

```
✅ START_HERE.md           ← Você está aqui
✅ QUICK_START.md          ← Comece aqui!
✅ INDEX.md                ← Índice completo
✅ README_CRM.md           ← Documentação técnica
✅ VALIDATION.md           ← Checklist de testes
✅ CHEATSHEET.md           ← Referência rápida
✅ DELIVERY.md             ← Sumário de entrega
✅ MANIFEST.md             ← Lista de arquivos
```

**Total: ~1.500 linhas de documentação**

---

## 💻 Stack Técnico

```
Frontend         Backend          Database
───────────────  ─────────────────  ──────────────
Next.js 16       API Routes         Neon PostgreSQL
React 19         TypeScript         4 Tabelas
TypeScript       Node.js            Indexes
TailwindCSS      @neondatabase      Automático
shadcn/ui        
Lucide Icons     
jsPDF            
```

---

## ✨ Features Especiais

```
✅ Cálculo automático de 45 dias úteis
   └─ Inserido na criação do orçamento

✅ Geração de PDF profissional
   └─ Logo, data, prazo, valores

✅ Pipeline Kanban com 8 status
   └─ Atualização em tempo real

✅ Calendário com eventos
   └─ 4 tipos: reunião, visita, telefonema, entrega

✅ Busca inteligente
   └─ Case-insensitive, por nome e email

✅ Inicialização automática
   └─ Banco criado na primeira execução
```

---

## 🚀 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm run start

# Lint
npm run lint

# Testar DB
curl http://localhost:3000/api/health
```

---

## 📊 Números

```
Telas:                5
Status:               8
Tabelas:              4
Componentes:          8
APIs:                 7
Linhas de código:  ~2.000
Documentação:     ~1.500
Total de arquivos:   27
```

---

## 🎓 Próximos Passos

### Agora:
1. [ ] `npm install`
2. [ ] Configurar `.env.local`
3. [ ] `npm run dev`
4. [ ] Abrir http://localhost:3000

### Depois:
1. [ ] Ler [QUICK_START.md](QUICK_START.md)
2. [ ] Criar primeiro cliente
3. [ ] Criar primeiro orçamento
4. [ ] Explorar pipeline
5. [ ] Gerar PDF
6. [ ] Agendar evento

### Validar:
1. [ ] Seguir checklist em [VALIDATION.md](VALIDATION.md)
2. [ ] Testar todas as funcionalidades
3. [ ] Verificar banco de dados

---

## ❓ FAQ Rápido

**P: Preciso fazer mais alguma coisa?**  
R: Não! Apenas execute os 3 passos acima.

**P: E o banco de dados?**  
R: É criado automaticamente na primeira execução.

**P: Qual banco você usa?**  
R: Neon PostgreSQL (serverless, gratuito)

**P: Posso usar em produção?**  
R: Sim! Está pronto para Vercel.

**P: Como adiciono mais usuários?**  
R: Implementar Auth (não incluído na v1)

**P: Qual a porta?**  
R: 3000 (ou configure com `-p 3001`)

---

## 🔒 Segurança

```
✅ SQL Injection prevention (queries parameterizadas)
✅ Type Safety (TypeScript completo)
✅ Environment variables (.env.local)
✅ HTTPS ready (Vercel compatible)
⚠️ Sem autenticação (adicionar depois se quiser)
```

---

## 📞 Precisa de Ajuda?

| Problema | Solução |
|----------|---------|
| DATABASE_URL not set | Adicionar em `.env.local` |
| Tabelas não existem | Executar `scripts/create-schema.sql` |
| Port 3000 em uso | `npm run dev -- -p 3001` |
| Componentes quebrados | `npm install` novamente |

→ Mais detalhes em [VALIDATION.md](VALIDATION.md)

---

## 🎉 Sucesso!

Se você conseguiu fazer os 3 passos acima, parabéns! 🎉

Sua aplicação CRM está **100% funcional** e pronta para usar!

---

## 📖 Próxima Leitura

**Recomendado**: [QUICK_START.md](QUICK_START.md)

Nele você aprenderá:
- Como criar clientes
- Como criar orçamentos
- Como usar o pipeline
- Como gerar PDFs
- Como agendar eventos

---

## 🚀 Vamos Começar?

```bash
npm install
npm run dev
# Abrir http://localhost:3000
```

---

```
╔══════════════════════════════════════════════════════════════════════╗
║                                                                      ║
║                    BEM-VINDO AO CRM MÓVEIS! 🎉                      ║
║                                                                      ║
║                   Você está pronto para gerenciar                   ║
║                suas vendas de móveis planejados!                    ║
║                                                                      ║
║                        Boa sorte! 🚀                                 ║
║                                                                      ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

**Próximo:** [→ QUICK_START.md](QUICK_START.md)

*CRM Móveis Planejados © 2026*
