## Sistema de Autenticação - Guia de Setup

### O que foi implementado?

✅ **Autenticação Segura com:**
- Criptografia de senha com bcryptjs (10 rounds de salt)
- Cookies HTTP-only para sessão
- Proteção nas rotas (redireciona para login se não autenticado)
- Login e Registro separados
- Logout com limpeza de cookies

### Tabela de Usuários

Criada tabela `usuarios` com:
- `id` (SERIAL PRIMARY KEY)
- `email` (VARCHAR UNIQUE) - identidade do usuário
- `senha` (VARCHAR) - hash bcryptjs da senha
- `nome` (VARCHAR) - nome completo
- `criado_em` (TIMESTAMP) - data de criação

### Fluxo de Autenticação

**1. Registro (Register)**
   - URL: `/api/auth/register` (POST)
   - Body: `{ email, senha, nome }`
   - Response: usuário criado com cookies de sessão

**2. Login**
   - URL: `/api/auth/login` (POST)
   - Body: `{ email, senha }`
   - Response: autenticação sucesso com cookies de sessão

**3. Verificação**
   - URL: `/api/auth/check` (GET)
   - Verifica se cookies existem
   - Response: dados do usuário autenticado

**4. Logout**
   - URL: `/api/auth/logout` (POST)
   - Remove cookies
   - Response: sucesso no logout

### Como Usar

#### 1. **Primeira Execução - Criar Usuário Admin**

Você tem duas opções:

**Opção A: Usar a página de Registro**
1. Abra http://localhost:3000
2. Será redirecionado para /login
3. Clique em "Criar agora"
4. Preencha: email, senha e nome
5. Clique em "Criar Conta"

**Opção B: Criar Admin via SQL**
```sql
-- Execute no Neon Console
INSERT INTO usuarios (email, senha, nome)
VALUES (
  'admin@crm.com',
  '$2a$10$...',  -- hash bcryptjs de sua escolha
  'Administrador'
);
```

#### 2. **Login**
1. Vá para http://localhost:3000
2. Será redirecionado para /login
3. Digite email e senha
4. Clique em "Entrar"

#### 3. **Usar a Aplicação**
- Quando autenticado, acessa o dashboard normalmente
- Todos os dados são protegidos
- Clique em "Sair" para fazer logout

### Segurança

✅ **Implementado:**
- Senhas hasheadas com bcryptjs
- Cookies HTTP-only (não acessíveis via JavaScript)
- Cookies com SameSite=Lax
- Proteção contra CSRF (pelo Next.js)
- Validação de email e senha

⚠️ **Boas Práticas:**
- Altere a senha do primeiro acesso
- Use HTTPS em produção (cookies secure: true)
- Implemente rate limiting em /api/auth/login (evita brute force)
- Considere adicionar autenticação 2FA no futuro

### Próximas Etapas Opcionais

Se quiser melhorar a segurança:

1. **Rate Limiting** no login
```bash
npm install @vercel/kv
```

2. **Autenticação 2FA** com TOTP
3. **Recuperação de Senha** por email
4. **Sessão com Expirações** mais granulares
5. **Auditoria de Login** (logs de acesso)

### Troubleshooting

**Problema:** "Email ou senha inválidos" mesmo com dados corretos
- Verificar se o usuário existe na tabela `usuarios`
- Testar hash bcryptjs manualmente

**Problema:** Não consegue fazer login após criar usuário
- Limpar cookies do navegador (Devtools > Application > Cookies)
- Verificar se cookies estão habilitados

**Problema:** Redirecionamento em loop
- Verificar se `/api/auth/check` está respondendo corretamente
- Verificar logs no console do navegador

### Arquivos Criados

```
app/
  api/auth/
    login/route.ts      - POST login
    register/route.ts   - POST registrar
    logout/route.ts     - POST logout
    check/route.ts      - GET verificar autenticação
  login/
    page.tsx            - Página de Login/Registro
  page.tsx              - Página principal (protegida)

components/
  sidebar.tsx           - Atualizado com botão Sair

hooks/
  use-auth.ts           - Hook para verificar autenticação

scripts/
  add-users-table.sql   - Migration tabela usuários

package.json            - Adicionado bcryptjs
```

---

**Status:** ✅ Sistema de autenticação completo e pronto para usar!
