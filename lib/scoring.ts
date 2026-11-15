import { gifts } from "@/data/gifts"
import { questions } from "@/data/questions"
import { FEATURED_MAXIMUM, FEATURED_MINIMUM, MAX_GIFT_SCORE } from "@/lib/constants"
import {
  GIFT_IDS,
  type AnswerValue,
  type GiftId,
} from "@/lib/types"

export interface ScoredGift {
  giftId: GiftId
  name: string
  score: number
  maxScore: number
}

export interface ScoreReport {
  ranked: ScoredGift[]
  featured: ScoredGift[]
  tieSummary: string
}

const nameById = new Map(gifts.map((gift) => [gift.id, gift.name]))

export function isAnswerValue(value: unknown): value is AnswerValue {
  return value === 1 || value === 2 || value === 3 || value === 4
}

export function isAssessmentComplete(
  answers: Readonly<Record<string, unknown>>,
): boolean {
  return questions.every((question) => isAnswerValue(answers[question.id]))
}

function bandsOf(ranked: readonly ScoredGift[]): ScoredGift[][] {
  const bands: ScoredGift[][] = []
  for (const gift of ranked) {
    const current = bands[bands.length - 1]
    if (!current || current[0].score !== gift.score) {
      bands.push([gift])
    } else {
      current.push(gift)
    }
  }
  return bands
}

export function selectFeatured(ranked: readonly ScoredGift[]): ScoredGift[] {
  if (ranked.length === 0) return []
  const boundary = ranked[Math.min(FEATURED_MINIMUM - 1, ranked.length - 1)].score
  const featured: ScoredGift[] = []
  for (const gift of ranked) {
    if (featured.length >= FEATURED_MAXIMUM) break
    if (featured.length >= FEATURED_MINIMUM && gift.score !== boundary) break
    featured.push(gift)
  }
  return featured
}

function omittedTieNote(
  featured: readonly ScoredGift[],
  ranked: readonly ScoredGift[],
): string {
  const boundary = featured[featured.length - 1]
  if (!boundary) return ""
  const extra =
    ranked.filter((gift) => gift.score === boundary.score).length -
    featured.filter((gift) => gift.score === boundary.score).length
  if (extra <= 0) return ""
  if (extra === 1) {
    return ` One more gift shares the score of ${boundary.score} and is included in the full list.`
  }
  return ` ${extra} more gifts share the score of ${boundary.score} and are included in the full list.`
}

export function describeTies(
  featured: readonly ScoredGift[],
  ranked: readonly ScoredGift[] = featured,
): string {
  const bands = bandsOf(featured)
  const note = omittedTieNote(featured, ranked)
  if (bands.length === 0) {
    return "Answer the full reflection to see your strongest responses."
  }

  if (bands.length === 1) {
    if (bands[0].length === 1) {
      return `${bands[0][0].name} received your strongest score today.${note}`
    }
    return `These ${bands[0].length} gifts share your strongest score. They are equally strong responses.${note}`
  }

  const [lead, ...rest] = bands
  const leadText =
    lead.length === 1
      ? `${lead[0].name} is your strongest response`
      : `${lead.map((gift) => gift.name).join(" and ")} are tied for your strongest response`

  const restText = rest
    .map((band) =>
      band.length === 1
        ? band[0].name
        : `${band.map((gift) => gift.name).join(" and ")} tied at ${band[0].score}`,
    )
    .join(", followed by ")

  return `${leadText}, followed by ${restText}. Gifts that share a score are equally strong.${note}`
}

export function scoreAssessment(
  answers: Readonly<Record<string, unknown>>,
): ScoreReport | null {
  if (!isAssessmentComplete(answers)) return null

  const totals = new Map<GiftId, number>()
  for (const giftId of GIFT_IDS) totals.set(giftId, 0)

  for (const question of questions) {
    const value = answers[question.id]
    if (!isAnswerValue(value) || !totals.has(question.giftId)) return null
    totals.set(question.giftId, (totals.get(question.giftId) ?? 0) + value)
  }

  const ranked = GIFT_IDS.map((giftId) => ({
    giftId,
    name: nameById.get(giftId) ?? giftId,
    score: totals.get(giftId) ?? 0,
    maxScore: MAX_GIFT_SCORE,
  })).sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))

  const featured = selectFeatured(ranked)

  return {
    ranked,
    featured,
    tieSummary: describeTies(featured, ranked),
  }
}

export function scoreColor(score: number): string {
  const colors: Record<number, string> = {
    12: "#17243A",
    11: "#1E3050",
    10: "#243656",
    9: "#2C4268",
    8: "#34507A",
    7: "#4A6288",
    6: "#8A6A12",
    5: "#A68420",
    4: "#C4A24A",
    3: "#C4B07A",
  }
  return colors[score] ?? "#667085"
}
