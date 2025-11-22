'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Dumbbell, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'

export default function WelcomePage() {
  const router = useRouter()
  const supabaseConfigured = isSupabaseConfigured()

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        window.location.href = '/dashboard'
      }
    } catch (error) {
      console.error('Error checking user:', error)
    }
  }

  function handleLogin() {
    window.location.href = '/login'
  }

  function handleRegister() {
    window.location.href = '/register'
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="text-center space-y-8 max-w-md w-full">
        <div className="flex justify-center">
          <div className="bg-gradient-to-br from-cyan-500 to-purple-500 p-8 rounded-3xl shadow-2xl animate-pulse">
            <Dumbbell className="w-24 h-24 text-white" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
            VibroFit
          </h1>
          <p className="text-2xl text-white/90 font-semibold">
            Sua jornada fitness começa aqui
          </p>
          <p className="text-gray-400">
            Treinos personalizados, nutrição balanceada e acompanhamento completo
          </p>
        </div>

        {!supabaseConfigured && (
          <Alert className="bg-yellow-500/90 border-yellow-600 text-white">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Configure suas credenciais do Supabase para começar a usar o aplicativo.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4 pt-8">
          <Button
            onClick={handleLogin}
            size="lg"
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold text-lg h-14 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Entrar
          </Button>
          <Button
            onClick={handleRegister}
            size="lg"
            variant="outline"
            className="w-full bg-transparent border-2 border-white/30 text-white hover:bg-white/10 font-semibold text-lg h-14 backdrop-blur-sm hover:scale-105 transition-all"
          >
            Criar Conta
          </Button>
        </div>

        <div className="pt-8 flex items-center justify-center gap-8 text-sm text-gray-400">
          <div className="text-center">
            <p className="text-2xl font-bold text-cyan-400">500+</p>
            <p>Treinos</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">10k+</p>
            <p>Usuários</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-pink-400">4.9★</p>
            <p>Avaliação</p>
          </div>
        </div>
      </div>
    </div>
  )
}
