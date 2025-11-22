'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Dumbbell, 
  Play, 
  Clock, 
  Flame,
  CheckCircle2,
  Plus,
  Filter
} from 'lucide-react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

export default function WorkoutsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'Todos', color: 'bg-slate-600' },
    { id: 'strength', name: 'Força', color: 'bg-cyan-500' },
    { id: 'cardio', name: 'Cardio', color: 'bg-orange-500' },
    { id: 'flexibility', name: 'Flexibilidade', color: 'bg-green-500' },
    { id: 'hiit', name: 'HIIT', color: 'bg-red-500' }
  ]

  const workouts = [
    {
      id: 1,
      title: 'Treino de Peito e Tríceps',
      category: 'strength',
      duration: '45 min',
      calories: 320,
      exercises: 8,
      difficulty: 'Intermediário',
      completed: false,
      image: 'from-cyan-500 to-blue-600'
    },
    {
      id: 2,
      title: 'HIIT Cardio Intenso',
      category: 'hiit',
      duration: '30 min',
      calories: 400,
      exercises: 6,
      difficulty: 'Avançado',
      completed: false,
      image: 'from-orange-500 to-red-600'
    },
    {
      id: 3,
      title: 'Treino de Costas e Bíceps',
      category: 'strength',
      duration: '50 min',
      calories: 350,
      exercises: 9,
      difficulty: 'Intermediário',
      completed: true,
      image: 'from-purple-500 to-pink-600'
    },
    {
      id: 4,
      title: 'Yoga e Alongamento',
      category: 'flexibility',
      duration: '35 min',
      calories: 150,
      exercises: 12,
      difficulty: 'Iniciante',
      completed: false,
      image: 'from-green-500 to-emerald-600'
    },
    {
      id: 5,
      title: 'Treino de Pernas',
      category: 'strength',
      duration: '55 min',
      calories: 380,
      exercises: 10,
      difficulty: 'Avançado',
      completed: false,
      image: 'from-yellow-500 to-orange-600'
    },
    {
      id: 6,
      title: 'Cardio Moderado',
      category: 'cardio',
      duration: '40 min',
      calories: 280,
      exercises: 5,
      difficulty: 'Iniciante',
      completed: false,
      image: 'from-blue-500 to-cyan-600'
    }
  ]

  const filteredWorkouts = selectedCategory === 'all' 
    ? workouts 
    : workouts.filter(w => w.category === selectedCategory)

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white">Treinos</h1>
            <p className="text-gray-400 text-lg mt-2">
              Escolha seu treino e comece agora
            </p>
          </div>
          <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 gap-2">
            <Plus className="w-5 h-5" />
            Criar Treino
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800/50 border-slate-700 p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-cyan-400" />
                <span className="text-gray-400 text-sm">Esta Semana</span>
              </div>
              <p className="text-2xl font-bold text-white">5 treinos</p>
            </div>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-400" />
                <span className="text-gray-400 text-sm">Tempo Total</span>
              </div>
              <p className="text-2xl font-bold text-white">3h 45min</p>
            </div>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-400" />
                <span className="text-gray-400 text-sm">Calorias</span>
              </div>
              <p className="text-2xl font-bold text-white">1,850</p>
            </div>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-gray-400 text-sm">Concluídos</span>
              </div>
              <p className="text-2xl font-bold text-white">24</p>
            </div>
          </Card>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              className={`flex-shrink-0 ${
                selectedCategory === category.id
                  ? `${category.color} text-white hover:opacity-90`
                  : 'border-slate-700 text-gray-400 hover:text-white hover:bg-slate-800'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Workouts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout) => (
            <Card 
              key={workout.id}
              className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 overflow-hidden group"
            >
              <div className={`h-32 bg-gradient-to-br ${workout.image} relative`}>
                {workout.completed && (
                  <div className="absolute top-3 right-3 bg-green-500 rounded-full p-2">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{workout.title}</h3>
                  <Badge variant="secondary" className="bg-slate-700 text-gray-300">
                    {workout.difficulty}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="flex items-center gap-1 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{workout.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span>{workout.calories}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Dumbbell className="w-4 h-4" />
                    <span>{workout.exercises} ex</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 gap-2"
                >
                  <Play className="w-4 h-4" />
                  {workout.completed ? 'Fazer Novamente' : 'Iniciar Treino'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
