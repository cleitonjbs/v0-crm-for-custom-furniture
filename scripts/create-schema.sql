-- Clientes table
CREATE TABLE IF NOT EXISTS clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telefone VARCHAR(20),
  cpf_cnpj VARCHAR(20) UNIQUE,
  endereco TEXT,
  cidade VARCHAR(100),
  estado VARCHAR(2),
  cep VARCHAR(10),
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ativo BOOLEAN DEFAULT true
);

-- Orçamentos table
CREATE TABLE IF NOT EXISTS orcamentos (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER NOT NULL REFERENCES clientes(id),
  numero_orcamento VARCHAR(50) UNIQUE NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'Novo Contato',
  valor_total DECIMAL(12, 2),
  descricao TEXT,
  ambiente VARCHAR(255),
  observacoes TEXT,
  data_prazo DATE,
  arquivo_pdf TEXT
);

-- Pipeline status table (para rastreamento do Kanban)
CREATE TABLE IF NOT EXISTS pipeline_status (
  id SERIAL PRIMARY KEY,
  orcamento_id INTEGER NOT NULL REFERENCES orcamentos(id),
  status VARCHAR(50) NOT NULL,
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  usuario VARCHAR(100),
  UNIQUE(orcamento_id)
);

-- Tabela de status permitidos
CREATE TABLE IF NOT EXISTS status_permitidos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL UNIQUE,
  ordem INTEGER NOT NULL,
  cor VARCHAR(20)
);

-- Inserts dos status obrigatórios
INSERT INTO status_permitidos (nome, ordem, cor) VALUES
('Novo Contato', 1, 'blue'),
('Aguardando Resposta', 2, 'yellow'),
('Reunião Marcada', 3, 'purple'),
('Projeto em Desenvolvimento', 4, 'cyan'),
('Orçamento Enviado', 5, 'orange'),
('Aguardando Aprovação', 6, 'pink'),
('Aprovado', 7, 'green'),
('Finalizado', 8, 'gray')
ON CONFLICT DO NOTHING;

-- Agenda/Eventos table
CREATE TABLE IF NOT EXISTS eventos (
  id SERIAL PRIMARY KEY,
  orcamento_id INTEGER NOT NULL REFERENCES orcamentos(id),
  tipo_evento VARCHAR(100) NOT NULL,
  data_evento DATE NOT NULL,
  descricao TEXT,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_orcamentos_cliente ON orcamentos(cliente_id);
CREATE INDEX IF NOT EXISTS idx_orcamentos_status ON orcamentos(status);
CREATE INDEX IF NOT EXISTS idx_pipeline_orcamento ON pipeline_status(orcamento_id);
CREATE INDEX IF NOT EXISTS idx_eventos_orcamento ON eventos(orcamento_id);
