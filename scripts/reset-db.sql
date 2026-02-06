-- Drop all tables if they exist
DROP TABLE IF EXISTS eventos_agenda CASCADE;
DROP TABLE IF EXISTS pipeline_status CASCADE;
DROP TABLE IF EXISTS orcamentos CASCADE;
DROP TABLE IF EXISTS status_definicoes CASCADE;
DROP TABLE IF EXISTS clientes CASCADE;

-- Clientes table
CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telefone VARCHAR(20),
  cpf_cnpj VARCHAR(20) UNIQUE,
  endereco TEXT,
  cidade VARCHAR(100),
  estado VARCHAR(2),
  cep VARCHAR(10),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ativo BOOLEAN DEFAULT true
);

-- Status definitions table
CREATE TABLE status_definicoes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL UNIQUE,
  ordem INTEGER NOT NULL,
  cor VARCHAR(20)
);

-- Insert the 8 required statuses
INSERT INTO status_definicoes (nome, ordem, cor) VALUES
('Novo Contato', 1, 'blue'),
('Aguardando Resposta', 2, 'yellow'),
('Reunião Marcada', 3, 'purple'),
('Projeto em Desenvolvimento', 4, 'cyan'),
('Orçamento Enviado', 5, 'orange'),
('Aguardando Aprovação', 6, 'pink'),
('Aprovado', 7, 'green'),
('Finalizado', 8, 'gray');

-- Orcamentos table
CREATE TABLE orcamentos (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  numero_orcamento VARCHAR(50) UNIQUE NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'Novo Contato',
  valor_total DECIMAL(12, 2),
  descricao TEXT,
  ambiente VARCHAR(255),
  observacoes TEXT,
  data_prazo DATE,
  arquivo_pdf TEXT,
  FOREIGN KEY (status) REFERENCES status_definicoes(nome)
);

-- Eventos/Agenda table
CREATE TABLE eventos_agenda (
  id SERIAL PRIMARY KEY,
  orcamento_id INTEGER NOT NULL REFERENCES orcamentos(id) ON DELETE CASCADE,
  tipo_evento VARCHAR(100) NOT NULL,
  data_evento DATE NOT NULL,
  descricao TEXT,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_clientes_email ON clientes(email);
CREATE INDEX idx_clientes_criado_em ON clientes(criado_em);
CREATE INDEX idx_orcamentos_cliente ON orcamentos(cliente_id);
CREATE INDEX idx_orcamentos_status ON orcamentos(status);
CREATE INDEX idx_orcamentos_data_criacao ON orcamentos(data_criacao);
CREATE INDEX idx_eventos_orcamento ON eventos_agenda(orcamento_id);
CREATE INDEX idx_eventos_data ON eventos_agenda(data_evento);
