'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  Home,
  Dumbbell,
  Apple,
  TrendingUp,
  User,
  LogOut,
  Menu,
  X,
  Settings
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Treinos', href: '/workouts', icon: Dumbbell },
    { name: 'Nutrição', href: '/nutrition', icon: Apple },
    { name: 'Progresso', href: '/progress', icon: TrendingUp },
    { name: 'Perfil', href: '/profile', icon: User },
  ]

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            VibroFit
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white"
          >
            {sidebarOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-40 h-screen w-64 bg-slate-900/95 backdrop-blur-sm border-r border-slate-800
        transition-transform duration-300 lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="mb-8 hidden lg:block">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              VibroFit
            </h1>
            <p className="text-gray-400 text-sm mt-1">Fitness & Wellness</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 mt-16 lg:mt-0">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={`w-full justify-start gap-3 h-12 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600'
                      : 'text-gray-400 hover:text-white hover:bg-slate-800'
                  }`}
                  onClick={() => {
                    router.push(item.href)
                    setSidebarOpen(false)
                  }}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Button>
              )
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="space-y-2 pt-6 border-t border-slate-800">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 text-gray-400 hover:text-white hover:bg-slate-800"
              onClick={() => router.push('/settings')}
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Configurações</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 text-red-400 hover:text-red-300 hover:bg-red-950/50"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sair</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-20 lg:pt-0">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
