'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'
import { PLANS } from '@/lib/stripe'
import { toast } from 'sonner'

export default function PlansPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const handleSubscribe = async (planType: 'basico' | 'intermediario' | 'completo') => {
    setLoading(true)
    try {
      const priceId = PLANS[planType][billingPeriod].priceId

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, planType }),
      })

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      toast.error('Erro ao processar pagamento')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Escolha seu Plano</h1>
          <p className="text-lg text-gray-600">Comece sua transformação hoje</p>
          
          <div className="flex justify-center gap-4 pt-4">
            <Button
              variant={billingPeriod === 'monthly' ? 'default' : 'outline'}
              onClick={() => setBillingPeriod('monthly')}
            >
              Mensal
            </Button>
            <Button
              variant={billingPeriod === 'yearly' ? 'default' : 'outline'}
              onClick={() => setBillingPeriod('yearly')}
            >
              Anual
              <Badge className="ml-2 bg-green-500">-20%</Badge>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Plano Básico */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-2xl">Plano Básico</CardTitle>
              <CardDescription>Ideal para começar</CardDescription>
              <div className="pt-4">
                <span className="text-4xl font-bold">
                  R$ {PLANS.basico[billingPeriod].price.toFixed(2)}
                </span>
                <span className="text-gray-600">/{billingPeriod === 'monthly' ? 'mês' : 'ano'}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {PLANS.basico.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                onClick={() => handleSubscribe('basico')}
                disabled={loading}
              >
                Assinar Agora
              </Button>
            </CardContent>
          </Card>

          {/* Plano Intermediário */}
          <Card className="relative border-purple-500 border-2 shadow-lg">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500">
              Mais Popular
            </Badge>
            <CardHeader>
              <CardTitle className="text-2xl">Plano Intermediário</CardTitle>
              <CardDescription>Para quem quer resultados</CardDescription>
              <div className="pt-4">
                <span className="text-4xl font-bold">
                  R$ {PLANS.intermediario[billingPeriod].price.toFixed(2)}
                </span>
                <span className="text-gray-600">/{billingPeriod === 'monthly' ? 'mês' : 'ano'}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {PLANS.intermediario.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => handleSubscribe('intermediario')}
                disabled={loading}
              >
                Assinar Agora
              </Button>
            </CardContent>
          </Card>

          {/* Plano Completo */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-2xl">Plano Completo</CardTitle>
              <CardDescription>Experiência premium</CardDescription>
              <div className="pt-4">
                <span className="text-4xl font-bold">
                  R$ {PLANS.completo[billingPeriod].price.toFixed(2)}
                </span>
                <span className="text-gray-600">/{billingPeriod === 'monthly' ? 'mês' : 'ano'}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {PLANS.completo.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                onClick={() => handleSubscribe('completo')}
                disabled={loading}
              >
                Assinar Agora
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
