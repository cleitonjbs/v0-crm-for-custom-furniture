'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    nome: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const url = isLogin ? '/api/auth/login' : '/api/auth/register'
      const payload = isLogin ? { email: formData.email, senha: formData.senha } : formData

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Erro na autenticação')
        return
      }

      // Redirect to dashboard
      router.push('/')
    } catch (err) {
      setError('Erro na conexão')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold text-slate-900">
            {isLogin ? 'Bem-vindo' : 'Criar Conta'}
          </CardTitle>
          <CardDescription>
            {isLogin ? 'Acesse o CRM de Móveis Planejados' : 'Crie sua conta para começar'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  required
                  disabled={loading}
                />
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                required
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                name="senha"
                type="password"
                value={formData.senha}
                onChange={handleChange}
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Criar Conta'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-slate-600">
              {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}{' '}
              <button
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError('')
                  setFormData({ email: '', senha: '', nome: '' })
                }}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                {isLogin ? 'Criar agora' : 'Entrar'}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
