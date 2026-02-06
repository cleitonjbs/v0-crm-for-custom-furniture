-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  nome VARCHAR(255) NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar índice para email (para login mais rápido)
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
