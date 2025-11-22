'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Apple, 
  Utensils, 
  Coffee,
  Salad,
  Pizza,
  Plus,
  Clock,
  Flame,
  TrendingUp
} from 'lucide-react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

export default function NutritionPage() {
  const [selectedDay, setSelectedDay] = useState('today')

  const nutritionStats = {
    calories: { consumed: 1850, target: 2200 },
    protein: { consumed: 120, target: 150 },
    carbs: { consumed: 180, target: 250 },
    fats: { consumed: 65, target: 75 }
  }

  const meals = [
    {
      id: 1,
      type: 'Café da Manhã',
      time: '08:00',
      icon: Coffee,
      color: 'from-yellow-500 to-orange-500',
      items: [
        { name: 'Ovos mexidos (3 unidades)', calories: 210, protein: 18 },
        { name: 'Pão integral (2 fatias)', calories: 160, protein: 8 },
        { name: 'Abacate (1/2)', calories: 120, protein: 2 },
        { name: 'Café com leite', calories: 80, protein: 4 }
      ],
      completed: true
    },
    {
      id: 2,
      type: 'Almoço',
      time: '12:30',
      icon: Utensils,
      color: 'from-green-500 to-emerald-500',
      items: [
        { name: 'Peito de frango grelhado (200g)', calories: 330, protein: 62 },
        { name: 'Arroz integral (1 xícara)', calories: 215, protein: 5 },
        { name: 'Brócolis no vapor', calories: 55, protein: 4 },
        { name: 'Salada verde', calories: 30, protein: 2 }
      ],
      completed: true
    },
    {
      id: 3,
      type: 'Lanche',
      time: '16:00',
      icon: Apple,
      color: 'from-pink-500 to-rose-500',
      items: [
        { name: 'Whey protein (1 scoop)', calories: 120, protein: 24 },
        { name: 'Banana', calories: 105, protein: 1 },
        { name: 'Pasta de amendoim (1 colher)', calories: 95, protein: 4 }
      ],
      completed: false
    },
    {
      id: 4,
      type: 'Jantar',
      time: '19:30',
      icon: Pizza,
      color: 'from-purple-500 to-indigo-500',
      items: [
        { name: 'Salmão grelhado (180g)', calories: 360, protein: 40 },
        { name: 'Batata doce (1 média)', calories: 130, protein: 2 },
        { name: 'Aspargos grelhados', calories: 40, protein: 4 },
        { name: 'Azeite (1 colher)', calories: 120, protein: 0 }
      ],
      completed: false
    }
  ]

  const calculateMealTotals = (items: any[]) => {
    return items.reduce((acc, item) => ({
      calories: acc.calories + item.calories,
      protein: acc.protein + item.protein
    }), { calories: 0, protein: 0 })
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white">Nutrição</h1>
            <p className="text-gray-400 text-lg mt-2">
              Acompanhe sua alimentação diária
            </p>
          </div>
          <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 gap-2">
            <Plus className="w-5 h-5" />
            Adicionar Refeição
          </Button>
        </div>

        {/* Nutrition Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-orange-500 to-red-600 border-0 p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Flame className="w-8 h-8 text-white" />
                <span className="text-white/80 text-sm">
                  {Math.round((nutritionStats.calories.consumed / nutritionStats.calories.target) * 100)}%
                </span>
              </div>
              <div>
                <p className="text-white/80 text-sm">Calorias</p>
                <p className="text-2xl font-bold text-white">
                  {nutritionStats.calories.consumed}
                  <span className="text-lg text-white/80">/{nutritionStats.calories.target}</span>
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-500 to-blue-600 border-0 p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <TrendingUp className="w-8 h-8 text-white" />
                <span className="text-white/80 text-sm">
                  {Math.round((nutritionStats.protein.consumed / nutritionStats.protein.target) * 100)}%
                </span>
              </div>
              <div>
                <p className="text-white/80 text-sm">Proteína</p>
                <p className="text-2xl font-bold text-white">
                  {nutritionStats.protein.consumed}g
                  <span className="text-lg text-white/80">/{nutritionStats.protein.target}g</span>
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 border-0 p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Salad className="w-8 h-8 text-white" />
                <span className="text-white/80 text-sm">
                  {Math.round((nutritionStats.carbs.consumed / nutritionStats.carbs.target) * 100)}%
                </span>
              </div>
              <div>
                <p className="text-white/80 text-sm">Carboidratos</p>
                <p className="text-2xl font-bold text-white">
                  {nutritionStats.carbs.consumed}g
                  <span className="text-lg text-white/80">/{nutritionStats.carbs.target}g</span>
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 border-0 p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Apple className="w-8 h-8 text-white" />
                <span className="text-white/80 text-sm">
                  {Math.round((nutritionStats.fats.consumed / nutritionStats.fats.target) * 100)}%
                </span>
              </div>
              <div>
                <p className="text-white/80 text-sm">Gorduras</p>
                <p className="text-2xl font-bold text-white">
                  {nutritionStats.fats.consumed}g
                  <span className="text-lg text-white/80">/{nutritionStats.fats.target}g</span>
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Meals */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Refeições de Hoje</h2>
          
          <div className="grid grid-cols-1 gap-6">
            {meals.map((meal) => {
              const totals = calculateMealTotals(meal.items)
              return (
                <Card 
                  key={meal.id}
                  className="bg-slate-800/50 border-slate-700 overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${meal.color}`} />
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${meal.color}`}>
                          <meal.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{meal.type}</h3>
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{meal.time}</span>
                          </div>
                        </div>
                      </div>
                      {meal.completed && (
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                          Concluído
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2">
                      {meal.items.map((item, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50"
                        >
                          <span className="text-gray-300">{item.name}</span>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-orange-400">{item.calories} cal</span>
                            <span className="text-cyan-400">{item.protein}g prot</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-6">
                        <div>
                          <p className="text-gray-400 text-sm">Total</p>
                          <p className="text-white font-bold">{totals.calories} cal</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Proteína</p>
                          <p className="text-cyan-400 font-bold">{totals.protein}g</p>
                        </div>
                      </div>
                      {!meal.completed && (
                        <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                          Marcar como Concluído
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
