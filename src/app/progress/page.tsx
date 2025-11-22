'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp,
  Calendar,
  Weight,
  Ruler,
  Target,
  Award,
  Activity,
  Zap
} from 'lucide-react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

export default function ProgressPage() {
  const progressData = {
    weight: [
      { month: 'Jan', value: 85 },
      { month: 'Fev', value: 83 },
      { month: 'Mar', value: 81 },
      { month: 'Abr', value: 80 },
      { month: 'Mai', value: 78 },
      { month: 'Jun', value: 77 }
    ],
    workouts: [
      { week: 'Sem 1', value: 3 },
      { week: 'Sem 2', value: 4 },
      { week: 'Sem 3', value: 5 },
      { week: 'Sem 4', value: 4 }
    ]
  }

  const achievements = [
    {
      title: 'Primeira Semana',
      description: 'Complete 7 dias consecutivos',
      icon: Award,
      color: 'from-yellow-500 to-orange-500',
      completed: true
    },
    {
      title: 'Maratonista',
      description: 'Complete 50 treinos',
      icon: Zap,
      color: 'from-cyan-500 to-blue-600',
      completed: true
    },
    {
      title: 'Disciplinado',
      description: 'Mantenha sequência de 30 dias',
      icon: Target,
      color: 'from-green-500 to-emerald-600',
      completed: false,
      progress: 40
    },
    {
      title: 'Transformação',
      description: 'Perca 10kg',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-600',
      completed: false,
      progress: 80
    }
  ]

  const measurements = [
    { label: 'Peso Atual', value: '77 kg', change: '-8 kg', icon: Weight, color: 'text-green-400' },
    { label: 'IMC', value: '23.5', change: '-2.8', icon: Activity, color: 'text-cyan-400' },
    { label: 'Gordura Corporal', value: '15%', change: '-5%', icon: TrendingUp, color: 'text-orange-400' },
    { label: 'Massa Muscular', value: '65 kg', change: '+3 kg', icon: Zap, color: 'text-purple-400' }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white">Meu Progresso</h1>
          <p className="text-gray-400 text-lg mt-2">
            Acompanhe sua evolução e conquistas
          </p>
        </div>

        {/* Measurements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {measurements.map((measurement, index) => (
            <Card 
              key={index}
              className="bg-slate-800/50 border-slate-700 p-6 hover:bg-slate-800/70 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <measurement.icon className={`w-8 h-8 ${measurement.color}`} />
                  <span className="text-green-400 text-sm font-semibold">
                    {measurement.change}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{measurement.label}</p>
                  <p className="text-3xl font-bold text-white mt-1">{measurement.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weight Progress */}
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Evolução do Peso</h2>
                <Button variant="ghost" size="sm" className="text-cyan-400">
                  Ver Detalhes
                </Button>
              </div>
              
              <div className="space-y-4">
                {progressData.weight.map((data, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{data.month}</span>
                      <span className="text-white font-semibold">{data.value} kg</span>
                    </div>
                    <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-500"
                        style={{ width: `${(data.value / 85) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Progresso Total</p>
                    <p className="text-2xl font-bold text-green-400">-8 kg</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">Meta</p>
                    <p className="text-2xl font-bold text-white">75 kg</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Workout Frequency */}
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Frequência de Treinos</h2>
                <Button variant="ghost" size="sm" className="text-purple-400">
                  Este Mês
                </Button>
              </div>

              <div className="flex items-end justify-between gap-4 h-48">
                {progressData.workouts.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex items-end justify-center h-full">
                      <div 
                        className="w-full bg-gradient-to-t from-purple-500 to-pink-600 rounded-t-lg transition-all duration-500 hover:opacity-80"
                        style={{ height: `${(data.value / 5) * 100}%` }}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold">{data.value}</p>
                      <p className="text-gray-400 text-xs">{data.week}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Média Semanal</p>
                    <p className="text-2xl font-bold text-purple-400">4 treinos</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">Meta Semanal</p>
                    <p className="text-2xl font-bold text-white">5 treinos</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Achievements */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Conquistas</h2>
            <Button variant="ghost" className="text-cyan-400">
              Ver Todas
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card 
                key={index}
                className={`border-slate-700 overflow-hidden ${
                  achievement.completed 
                    ? 'bg-slate-800/50' 
                    : 'bg-slate-800/30'
                }`}
              >
                <div className={`h-2 bg-gradient-to-r ${achievement.color}`} />
                <div className="p-6 space-y-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${achievement.color} w-fit ${
                    !achievement.completed && 'opacity-50'
                  }`}>
                    <achievement.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">{achievement.title}</h3>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                  </div>
                  {!achievement.completed && achievement.progress && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Progresso</span>
                        <span className="text-white font-semibold">{achievement.progress}%</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${achievement.color} rounded-full`}
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {achievement.completed && (
                    <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
                      <Award className="w-4 h-4" />
                      <span>Conquistado!</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
