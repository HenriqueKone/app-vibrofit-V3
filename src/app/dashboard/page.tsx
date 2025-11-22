'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Dumbbell, 
  Apple, 
  TrendingUp, 
  Target, 
  Calendar,
  Award,
  Flame,
  Activity
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }
    setUser(user)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    )
  }

  const stats = [
    {
      title: 'Treinos Concluídos',
      value: '24',
      icon: Dumbbell,
      color: 'from-cyan-500 to-blue-600',
      progress: 75
    },
    {
      title: 'Calorias Queimadas',
      value: '3,420',
      icon: Flame,
      color: 'from-orange-500 to-red-600',
      progress: 85
    },
    {
      title: 'Meta Semanal',
      value: '5/7',
      icon: Target,
      color: 'from-green-500 to-emerald-600',
      progress: 71
    },
    {
      title: 'Sequência',
      value: '12 dias',
      icon: Award,
      color: 'from-purple-500 to-pink-600',
      progress: 100
    }
  ]

  const recentWorkouts = [
    { name: 'Treino de Peito', duration: '45 min', calories: 320, date: 'Hoje' },
    { name: 'Cardio HIIT', duration: '30 min', calories: 280, date: 'Ontem' },
    { name: 'Treino de Costas', duration: '50 min', calories: 350, date: '2 dias atrás' }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">
            Bem-vindo de volta! 💪
          </h1>
          <p className="text-gray-400 text-lg">
            Continue sua jornada fitness hoje
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <Progress value={stat.progress} className="h-2" />
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-cyan-500 to-blue-600 border-0 hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => router.push('/workouts')}>
            <div className="p-6 space-y-4">
              <Dumbbell className="w-12 h-12 text-white" />
              <div>
                <h3 className="text-xl font-bold text-white">Iniciar Treino</h3>
                <p className="text-white/80">Comece seu treino agora</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 border-0 hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => router.push('/nutrition')}>
            <div className="p-6 space-y-4">
              <Apple className="w-12 h-12 text-white" />
              <div>
                <h3 className="text-xl font-bold text-white">Plano Alimentar</h3>
                <p className="text-white/80">Veja sua dieta do dia</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 border-0 hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => router.push('/progress')}>
            <div className="p-6 space-y-4">
              <Activity className="w-12 h-12 text-white" />
              <div>
                <h3 className="text-xl font-bold text-white">Meu Progresso</h3>
                <p className="text-white/80">Acompanhe sua evolução</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Workouts */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Treinos Recentes</h2>
              <Button 
                variant="ghost" 
                className="text-cyan-400 hover:text-cyan-300"
                onClick={() => router.push('/workouts')}
              >
                Ver todos
              </Button>
            </div>
            <div className="space-y-4">
              {recentWorkouts.map((workout, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
                      <Dumbbell className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{workout.name}</h3>
                      <p className="text-sm text-gray-400">{workout.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">{workout.duration}</p>
                    <p className="text-sm text-orange-400">{workout.calories} cal</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
