import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
})

export const PLANS = {
  basico: {
    name: 'Plano Básico',
    monthly: {
      price: 19.99,
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BASICO_MONTHLY!,
    },
    yearly: {
      price: 191.90, // 20% desconto
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BASICO_YEARLY!,
    },
    features: ['Dieta personalizada'],
  },
  intermediario: {
    name: 'Plano Intermediário',
    monthly: {
      price: 39.99,
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_INTERMEDIARIO_MONTHLY!,
    },
    yearly: {
      price: 383.90, // 20% desconto
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_INTERMEDIARIO_YEARLY!,
    },
    features: ['Dieta personalizada', 'Treinos com vídeos'],
  },
  completo: {
    name: 'Plano Completo',
    monthly: {
      price: 59.99,
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_COMPLETO_MONTHLY!,
    },
    yearly: {
      price: 575.90, // 20% desconto
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_COMPLETO_YEARLY!,
    },
    features: ['Dieta personalizada', 'Treinos com vídeos', 'Diário Fit'],
  },
}
