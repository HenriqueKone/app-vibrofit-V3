'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { Shield, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function AdminLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // Verifica se o Supabase está configurado
  if (!supabase) {
    return (
      <Card className="w-full max-w-md border-red-500/50">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Admin - VibroFit</CardTitle>
          <CardDescription className="text-gray-300">Acesso administrativo</CardDescription>
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

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Login no Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Verifica se o usuário é admin na tabela admins
      const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .select('*')
        .eq('email', email)
        .single()

      if (adminError || !adminData) {
        // Se não for admin, faz logout
        await supabase.auth.signOut()
        throw new Error('Acesso negado. Você não tem permissões de administrador.')
      }

      toast.success('Login admin realizado com sucesso!')
      router.push('/admin/dashboard')
    } catch (error: any) {
      toast.error(error.message || 'Erro ao fazer login como admin')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Shield className="h-12 w-12 text-blue-500" />
        </div>
        <CardTitle className="text-2xl font-bold text-white">Admin - VibroFit</CardTitle>
        <CardDescription className="text-gray-300">Acesso administrativo do sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-email" className="text-gray-200">E-mail do Administrador</Label>
            <Input
              id="admin-email"
              type="email"
              placeholder="admin@vibrofit.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password" className="text-gray-200">Senha</Label>
            <Input
              id="admin-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700" 
            disabled={loading}
          >
            {loading ? 'Verificando...' : 'Acessar Painel Admin'}
          </Button>
          <div className="text-center text-sm text-gray-400 mt-4">
            <p>Acesso restrito a administradores</p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
