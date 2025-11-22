import { AdminLoginForm } from '@/components/admin/admin-login-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login Admin - VibroFit',
  description: 'Acesso administrativo do VibroFit',
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <AdminLoginForm />
    </div>
  )
}
