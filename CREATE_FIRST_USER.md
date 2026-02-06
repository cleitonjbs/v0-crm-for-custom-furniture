# Como Criar o Primeiro Usuário

## Opção 1: Usando a Interface (Recomendado)

1. Abra http://localhost:3000/login
2. Clique em "Criar agora" para ir para a página de registro
3. Preencha:
   - Nome: Seu nome
   - Email: seu-email@exemplo.com
   - Senha: sua-senha-segura
4. Clique em "Criar Conta"
5. Será redirecionado para o login
6. Use as mesmas credenciais para fazer login

## Opção 2: Usando cURL (Para testes)

```bash
# Criar usuário
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Admin",
    "email": "admin@test.com",
    "senha": "senha123"
  }'

# Fazer login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "senha": "senha123"
  }'
```

## Credenciais de Teste

Se preferir, pode usar:
- Email: `teste@exemplo.com`
- Senha: `senha123`

## Funcionalidades de Segurança

- Senhas são hasheadas com bcryptjs
- Cookies HTTP-only para sessões
- Proteção CSRF/SameSite
- Autenticação obrigatória para acessar o CRM
