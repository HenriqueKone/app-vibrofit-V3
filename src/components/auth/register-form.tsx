'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { supabase, UserGoal } from '@/lib/supabase'
import { toast } from 'sonner'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function RegisterForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    peso: '',
    altura: '',
    meta: '' as UserGoal,
    tempo_estimado: '',
  })
  const [loading, setLoading] = useState(false)

  // Verifica se o Supabase está configurado
  if (!supabase) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Criar Conta</CardTitle>
          <CardDescription>Comece sua jornada fitness hoje</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Configuração do banco de dados pendente. Configure suas credenciais do Supabase nas variáveis de ambiente.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (authError) throw authError

      // Criar perfil do usuário
      const { error: profileError } = await supabase.from('usuarios').insert({
        id: authData.user?.id,
        nome: formData.nome,
        email: formData.email,
        peso: parseFloat(formData.peso),
        altura: parseFloat(formData.altura),
        meta: formData.meta,
        tempo_estimado: formData.tempo_estimado ? parseInt(formData.tempo_estimado) : null,
        plano: 'basico',
        status_pagamento: 'pendente',
        data_registro: new Date().toISOString(),
      })

      if (profileError) throw profileError

      toast.success('Conta criada com sucesso!')
      router.push('/plans')
    } catch (error: any) {
      toast.error(error.message || 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Criar Conta</CardTitle>
        <CardDescription>Comece sua jornada fitness hoje</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo</Label>
            <Input
              id="nome"
              placeholder="Seu nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={6}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="peso">Peso (kg)</Label>
              <Input
                id="peso"
                type="number"
                placeholder="70"
                value={formData.peso}
                onChange={(e) => setFormData({ ...formData, peso: e.target.value })}
                required
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="altura">Altura (cm)</Label>
              <Input
                id="altura"
                type="number"
                placeholder="170"
                value={formData.altura}
                onChange={(e) => setFormData({ ...formData, altura: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="meta">Meta</Label>
            <Select
              value={formData.meta}
              onValueChange={(value) => setFormData({ ...formData, meta: value as UserGoal })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione sua meta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="emagrecer">Emagrecer</SelectItem>
                <SelectItem value="ganhar_peso">Ganhar Peso</SelectItem>
                <SelectItem value="ganhar_musculo">Ganhar Músculo</SelectItem>
                <SelectItem value="definicao">Definição</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tempo">Tempo Estimado (meses) - Opcional</Label>
            <Input
              id="tempo"
              type="number"
              placeholder="3"
              value={formData.tempo_estimado}
              onChange={(e) => setFormData({ ...formData, tempo_estimado: e.target.value })}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar Conta'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
