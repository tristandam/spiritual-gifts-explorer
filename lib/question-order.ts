import { GIFT_IDS, type GiftId } from "@/lib/types"

export const PASS_A: readonly number[] = [
  0, 13, 6, 19, 3, 16, 9, 22, 1, 14, 7, 20, 4, 17, 10, 23, 2, 15, 8, 21, 5, 18,
  11, 24, 12,
]

export const PASS_B: readonly number[] = [
  17, 10, 23, 2, 15, 8, 21, 5, 18, 11, 24, 12, 0, 13, 6, 19, 3, 16, 9, 22, 1,
  14, 7, 20, 4,
]

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

export function defaultQuestionOrder(
  questions: readonly OrderableQuestion[],
): string[] {
  const grouped = questionsByGift(questions)
  const order: string[] = []

  for (const index of PASS_A) {
    const giftId = GIFT_IDS[index]
    const pair = grouped.get(giftId)
    if (!pair || pair.length < 2) {
      throw new Error(`Gift ${giftId} does not have two questions.`)
    }
    order.push(pair[0].id)
  }

  for (const index of PASS_B) {
    const giftId = GIFT_IDS[index]
    const pair = grouped.get(giftId)
    if (!pair || pair.length < 2) {
      throw new Error(`Gift ${giftId} does not have two questions.`)
    }
    order.push(pair[1].id)
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
  const indexes = GIFT_IDS.map((_, index) => index)
  const passA = shuffle(indexes, random)
  const offset = 12
  const passB = new Array<number>(passA.length)
  passA.forEach((giftIndex, position) => {
    passB[(position + offset) % passA.length] = giftIndex
  })

  const grouped = questionsByGift(questions)
  const order: string[] = []
  for (const index of passA) {
    order.push(grouped.get(GIFT_IDS[index])![0].id)
  }
  for (const index of passB) {
    order.push(grouped.get(GIFT_IDS[index])![1].id)
  }
  return order
}

export function pairDistance(
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
    if (indexes.length < 2) continue
    min = Math.min(min, indexes[1] - indexes[0])
  }
  return min
}
