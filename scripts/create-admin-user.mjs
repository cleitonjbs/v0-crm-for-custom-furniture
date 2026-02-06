#!/bin/bash

# Script para criar o primeiro usuário do CRM
# Use: node scripts/create-admin-user.mjs

import bcrypt from 'bcryptjs'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

async function createAdminUser() {
  try {
    const email = 'admin@crm.com'
    const senha = 'admin123'
    const nome = 'Administrador'

    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10)

    // Verificar se já existe
    const existing = await sql`SELECT * FROM usuarios WHERE email = ${email}`

    if (existing.length > 0) {
      console.log('Usuário já existe!')
      return
    }

    // Inserir novo usuário
    await sql`
      INSERT INTO usuarios (email, senha, nome)
      VALUES (${email}, ${senhaHash}, ${nome})
    `

    console.log(`✅ Usuário criado com sucesso!`)
    console.log(`Email: ${email}`)
    console.log(`Senha: ${senha}`)
    console.log('')
    console.log('⚠️  Altere a senha no primeiro acesso!')
  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error)
    process.exit(1)
  }
}

createAdminUser()
