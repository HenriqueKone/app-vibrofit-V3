import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Cria cliente apenas se as variáveis estiverem configuradas
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Função helper para verificar se o Supabase está configurado
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey)
}

export type UserPlan = 'basico' | 'intermediario' | 'completo'
export type UserGoal = 'emagrecer' | 'ganhar_peso' | 'ganhar_musculo' | 'definicao'

export interface User {
  id: string
  nome: string
  email: string
  peso: number
  altura: number
  meta: UserGoal
  tempo_estimado?: number
  plano: UserPlan
  data_registro: string
  status_pagamento: 'ativo' | 'inativo' | 'pendente'
  prox_renovacao?: string
}

export interface Diet {
  id: string
  user_id: string
  calorias: number
  proteinas: number
  carboidratos: number
  gorduras: number
  refeicao_cafe: string
  refeicao_lanche1: string
  refeicao_almoco: string
  refeicao_lanche2: string
  refeicao_jantar: string
  refeicao_ceia?: string
}

export interface Workout {
  id: string
  nome: string
  nivel: 'iniciante' | 'intermediario' | 'avancado'
  categoria: 'hipertrofia' | 'definicao' | 'emagrecimento'
  video_url: string
  descricao: string
  series: number
  repeticoes: string
  descanso: string
}

export interface DiaryEntry {
  id: string
  user_id: string
  peso_do_dia: number
  medidas: {
    barriga?: number
    peito?: number
    braco?: number
    perna?: number
  }
  foto_url?: string
  anotacoes?: string
  data: string
}

export interface Admin {
  id: string
  email: string
  senha: string
  created_at?: string
}

export interface Admin {
  id: string
  email: string
  senha: string
  created_at?: string
}

export interface Admin {
  id: string
  email: string
  senha: string
  created_at?: string
}

export interface Admin {
  id: string
  email: string
  senha: string
  created_at?: string
}

export interface Admin {
  id: string
  email: string
  senha: string
  created_at?: string
}
