import { UserGoal } from './supabase'

export function calculateCalories(
  peso: number,
  altura: number,
  meta: UserGoal
): number {
  // Cálculo básico de TMB (Taxa Metabólica Basal) - Fórmula de Harris-Benedict simplificada
  const tmb = 10 * peso + 6.25 * altura - 5 * 30 + 5 // Assumindo idade média de 30 anos

  switch (meta) {
    case 'emagrecer':
      return Math.round(tmb * 1.2 - 500) // Déficit calórico
    case 'ganhar_peso':
      return Math.round(tmb * 1.5 + 500) // Superávit calórico
    case 'ganhar_musculo':
      return Math.round(tmb * 1.6 + 300) // Superávit moderado
    case 'definicao':
      return Math.round(tmb * 1.4 - 200) // Déficit leve
    default:
      return Math.round(tmb * 1.5)
  }
}

export function generateMealPlan(
  calorias: number,
  meta: UserGoal
): {
  cafe: string
  lanche1: string
  almoco: string
  lanche2: string
  jantar: string
  ceia: string
  macros: { proteinas: number; carboidratos: number; gorduras: number }
} {
  // Distribuição de macronutrientes baseada na meta
  let proteinPercent = 0.3
  let carbPercent = 0.4
  let fatPercent = 0.3

  if (meta === 'ganhar_musculo') {
    proteinPercent = 0.35
    carbPercent = 0.45
    fatPercent = 0.2
  } else if (meta === 'emagrecer') {
    proteinPercent = 0.4
    carbPercent = 0.3
    fatPercent = 0.3
  }

  const proteinas = Math.round((calorias * proteinPercent) / 4)
  const carboidratos = Math.round((calorias * carbPercent) / 4)
  const gorduras = Math.round((calorias * fatPercent) / 9)

  // Planos de refeição baseados nas calorias
  const calPerMeal = {
    cafe: Math.round(calorias * 0.25),
    lanche1: Math.round(calorias * 0.1),
    almoco: Math.round(calorias * 0.35),
    lanche2: Math.round(calorias * 0.1),
    jantar: Math.round(calorias * 0.15),
    ceia: Math.round(calorias * 0.05),
  }

  return {
    cafe: `Café da Manhã (${calPerMeal.cafe} kcal):\n- 2 ovos mexidos\n- 2 fatias de pão integral\n- 1 banana\n- Café com leite desnatado`,
    lanche1: `Lanche da Manhã (${calPerMeal.lanche1} kcal):\n- 1 iogurte grego natural\n- 1 colher de sopa de granola`,
    almoco: `Almoço (${calPerMeal.almoco} kcal):\n- 150g de frango grelhado\n- 4 colheres de arroz integral\n- Salada verde à vontade\n- 2 colheres de feijão`,
    lanche2: `Lanche da Tarde (${calPerMeal.lanche2} kcal):\n- 1 maçã\n- 10 amêndoas`,
    jantar: `Jantar (${calPerMeal.jantar} kcal):\n- 120g de peixe grelhado\n- Legumes cozidos\n- Salada verde`,
    ceia: `Ceia (${calPerMeal.ceia} kcal):\n- 1 copo de leite desnatado\n- 2 castanhas`,
    macros: { proteinas, carboidratos, gorduras },
  }
}

export function generateShoppingList(mealPlan: {
  cafe: string
  lanche1: string
  almoco: string
  lanche2: string
  jantar: string
  ceia: string
}): string[] {
  return [
    'Ovos (1 dúzia)',
    'Pão integral (1 pacote)',
    'Bananas (7 unidades)',
    'Leite desnatado (2 litros)',
    'Iogurte grego natural (7 unidades)',
    'Granola (1 pacote)',
    'Frango (1kg)',
    'Arroz integral (1kg)',
    'Feijão (500g)',
    'Verduras variadas',
    'Maçãs (7 unidades)',
    'Amêndoas (200g)',
    'Peixe (800g)',
    'Legumes variados',
    'Castanhas (100g)',
  ]
}
