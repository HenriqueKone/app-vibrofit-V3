'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit,
  Camera,
  Save,
  X
} from 'lucide-react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 98765-4321',
    birthDate: '1990-05-15',
    location: 'São Paulo, SP',
    bio: 'Apaixonado por fitness e vida saudável. Buscando sempre evoluir!',
    goals: 'Perder 10kg e ganhar massa muscular',
    height: '175',
    weight: '77',
    targetWeight: '75'
  })

  const stats = [
    { label: 'Treinos Totais', value: '124', color: 'from-cyan-500 to-blue-600' },
    { label: 'Dias Ativos', value: '89', color: 'from-green-500 to-emerald-600' },
    { label: 'Calorias Queimadas', value: '45.2k', color: 'from-orange-500 to-red-600' },
    { label: 'Sequência Atual', value: '12 dias', color: 'from-purple-500 to-pink-600' }
  ]

  const handleSave = () => {
    setIsEditing(false)
    // Aqui você salvaria os dados no backend
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white">Meu Perfil</h1>
          <p className="text-gray-400 text-lg mt-2">
            Gerencie suas informações pessoais
          </p>
        </div>

        {/* Profile Card */}
        <Card className="bg-slate-800/50 border-slate-700">
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-slate-700">
                    <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop" />
                    <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-500 text-white text-3xl">
                      JS
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
                  <p className="text-gray-400">Membro desde Jan 2024</p>
                </div>
              </div>

              {/* Info Section */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Informações Pessoais</h3>
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Editar
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSave}
                        className="bg-green-500 hover:bg-green-600 gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Salvar
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="border-slate-700 text-gray-400 hover:text-white gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancelar
                      </Button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-400 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    {isEditing ? (
                      <Input
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    ) : (
                      <p className="text-white">{profile.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-400 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Telefone
                    </Label>
                    {isEditing ? (
                      <Input
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    ) : (
                      <p className="text-white">{profile.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-400 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Data de Nascimento
                    </Label>
                    {isEditing ? (
                      <Input
                        type="date"
                        value={profile.birthDate}
                        onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    ) : (
                      <p className="text-white">{new Date(profile.birthDate).toLocaleDateString('pt-BR')}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-400 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Localização
                    </Label>
                    {isEditing ? (
                      <Input
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    ) : (
                      <p className="text-white">{profile.location}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 p-6">
              <div className="space-y-2">
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Physical Info */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-xl font-bold text-white mb-6">Informações Físicas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="text-gray-400">Altura (cm)</Label>
              {isEditing ? (
                <Input
                  value={profile.height}
                  onChange={(e) => setProfile({ ...profile, height: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              ) : (
                <p className="text-2xl font-bold text-white">{profile.height} cm</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-400">Peso Atual (kg)</Label>
              {isEditing ? (
                <Input
                  value={profile.weight}
                  onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              ) : (
                <p className="text-2xl font-bold text-white">{profile.weight} kg</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-400">Meta de Peso (kg)</Label>
              {isEditing ? (
                <Input
                  value={profile.targetWeight}
                  onChange={(e) => setProfile({ ...profile, targetWeight: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              ) : (
                <p className="text-2xl font-bold text-white">{profile.targetWeight} kg</p>
              )}
            </div>
          </div>
        </Card>

        {/* Goals */}
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Objetivos</h3>
          {isEditing ? (
            <textarea
              value={profile.goals}
              onChange={(e) => setProfile({ ...profile, goals: e.target.value })}
              className="w-full h-24 bg-slate-700 border-slate-600 text-white rounded-lg p-4 resize-none"
            />
          ) : (
            <p className="text-gray-300">{profile.goals}</p>
          )}
        </Card>
      </div>
    </DashboardLayout>
  )
}
