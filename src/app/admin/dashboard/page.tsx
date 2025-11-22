'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Dumbbell, 
  UtensilsCrossed, 
  DollarSign, 
  BarChart3, 
  Settings,
  LogOut,
  Shield
} from 'lucide-react'
import { toast } from 'sonner'

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [adminEmail, setAdminEmail] = useState('')

  useEffect(() => {
    checkAdminAuth()
  }, [])

  const checkAdminAuth = async () => {
    try {
      if (!supabase) {
        router.push('/admin/login')
        return
      }

      // Verifica se está autenticado
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/admin/login')
        return
      }

      // Verifica se é admin
      const { data: adminData, error } = await supabase
        .from('admins')
        .select('*')
        .eq('email', user.email)
        .single()

      if (error || !adminData) {
        toast.error('Acesso negado')
        await supabase.auth.signOut()
        router.push('/admin/login')
        return
      }

      setAdminEmail(user.email || '')
      setLoading(false)
    } catch (error) {
      router.push('/admin/login')
    }
  }

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut()
    }
    toast.success('Logout realizado com sucesso')
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-10 w-10 text-blue-500" />
            <div>
              <h1 className="text-3xl font-bold text-white">Painel Administrativo</h1>
              <p className="text-gray-400">VibroFit - Gestão Completa</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Logado como</p>
              <p className="text-white font-medium">{adminEmail}</p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Gerenciar Usuários */}
        <Card className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-colors cursor-pointer">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Users className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">0</span>
            </div>
            <CardTitle className="text-white">Usuários</CardTitle>
            <CardDescription className="text-gray-400">
              Gerenciar todos os usuários do app
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Ver Usuários
            </Button>
          </CardContent>
        </Card>

        {/* Gerenciar Treinos */}
        <Card className="bg-slate-800 border-slate-700 hover:border-purple-500 transition-colors cursor-pointer">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Dumbbell className="h-8 w-8 text-purple-500" />
              <span className="text-2xl font-bold text-white">0</span>
            </div>
            <CardTitle className="text-white">Treinos</CardTitle>
            <CardDescription className="text-gray-400">
              Criar e editar treinos e vídeos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Gerenciar Treinos
            </Button>
          </CardContent>
        </Card>

        {/* Gerenciar Dietas */}
        <Card className="bg-slate-800 border-slate-700 hover:border-green-500 transition-colors cursor-pointer">
          <CardHeader>
            <div className="flex items-center justify-between">
              <UtensilsCrossed className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold text-white">0</span>
            </div>
            <CardTitle className="text-white">Dietas</CardTitle>
            <CardDescription className="text-gray-400">
              Criar e editar cardápios modelos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Gerenciar Dietas
            </Button>
          </CardContent>
        </Card>

        {/* Assinaturas */}
        <Card className="bg-slate-800 border-slate-700 hover:border-yellow-500 transition-colors cursor-pointer">
          <CardHeader>
            <div className="flex items-center justify-between">
              <DollarSign className="h-8 w-8 text-yellow-500" />
              <span className="text-2xl font-bold text-white">R$ 0</span>
            </div>
            <CardTitle className="text-white">Assinaturas</CardTitle>
            <CardDescription className="text-gray-400">
              Ver assinaturas ativas (Stripe)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
              Ver Assinaturas
            </Button>
          </CardContent>
        </Card>

        {/* Estatísticas */}
        <Card className="bg-slate-800 border-slate-700 hover:border-cyan-500 transition-colors cursor-pointer">
          <CardHeader>
            <div className="flex items-center justify-between">
              <BarChart3 className="h-8 w-8 text-cyan-500" />
              <span className="text-2xl font-bold text-white">--</span>
            </div>
            <CardTitle className="text-white">Estatísticas</CardTitle>
            <CardDescription className="text-gray-400">
              Relatórios e métricas do app
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
              Ver Estatísticas
            </Button>
          </CardContent>
        </Card>

        {/* Configurações */}
        <Card className="bg-slate-800 border-slate-700 hover:border-orange-500 transition-colors cursor-pointer">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Settings className="h-8 w-8 text-orange-500" />
            </div>
            <CardTitle className="text-white">Configurações</CardTitle>
            <CardDescription className="text-gray-400">
              Gerenciar preços e configurações
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-orange-600 hover:bg-orange-700">
              Configurações
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
