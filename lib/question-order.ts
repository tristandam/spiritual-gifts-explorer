import { QUESTIONS_PER_GIFT } from "@/lib/constants"
import { GIFT_IDS, type GiftId } from "@/lib/types"

interface OrderableQuestion {
  id: string
  giftId: GiftId
}

function questionsByGift(questions: readonly OrderableQuestion[]) {
  const grouped = new Map<GiftId, OrderableQuestion[]>()
  for (const question of questions) {
    const list = grouped.get(question.giftId) ?? []
    list.push(question)
    grouped.set(question.giftId, list)
  }
  return grouped
}

function giftSets(questions: readonly OrderableQuestion[]) {
  const grouped = questionsByGift(questions)
  return GIFT_IDS.map((giftId) => {
    const set = grouped.get(giftId)
    if (!set || set.length !== QUESTIONS_PER_GIFT) {
      throw new Error(`Gift ${giftId} does not have ${QUESTIONS_PER_GIFT} questions.`)
    }
    return set
  })
}

export function defaultQuestionOrder(questions: readonly OrderableQuestion[]): string[] {
  const sets = giftSets(questions)
  const order: string[] = []
  for (let item = 0; item < QUESTIONS_PER_GIFT; item += 1) {
    for (const set of sets) order.push(set[item].id)
  }
  return order
}

function mulberry32(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffle<T>(items: readonly T[], random: () => number): T[] {
  const copy = [...items]
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1))
    const current = copy[index]
    copy[index] = copy[swap]
    copy[swap] = current
  }
  return copy
}

export function questionOrderForSeed(
  questions: readonly OrderableQuestion[],
  seed: number,
): string[] {
  const random = mulberry32(seed || 1)
  const sets = giftSets(questions)
  const pass = shuffle(sets, random)
  const order: string[] = []
  for (let item = 0; item < QUESTIONS_PER_GIFT; item += 1) {
    for (const set of pass) order.push(set[item].id)
  }
  return order
}

export function minimumGiftSpacing(
  order: readonly string[],
  questions: readonly OrderableQuestion[],
) {
  const byId = new Map(questions.map((question) => [question.id, question.giftId]))
  const positions = new Map<GiftId, number[]>()
  order.forEach((id, index) => {
    const giftId = byId.get(id)
    if (!giftId) return
    const list = positions.get(giftId) ?? []
    list.push(index)
    positions.set(giftId, list)
  })

  let min = Number.POSITIVE_INFINITY
  for (const indexes of positions.values()) {
    const sorted = [...indexes].sort((a, b) => a - b)
    for (let index = 1; index < sorted.length; index += 1) {
      min = Math.min(min, sorted[index] - sorted[index - 1])
    }
  }
  return min
}
