"use client"

import Link from "next/link"
import {
  isServerSnapshot,
  parseAssessment,
  useAssessmentRaw,
} from "@/lib/assessment-storage"
import { MAX_GIFT_SCORE } from "@/lib/constants"
import { scoreAssessment } from "@/lib/scoring"
import type { GiftId } from "@/lib/types"

export function GiftResultNote({ giftId }: { giftId: GiftId }) {
  const raw = useAssessmentRaw()
  if (isServerSnapshot(raw)) return null
  const loaded = parseAssessment(raw || null)
  if (loaded.status !== "ok") return null
  const report = scoreAssessment(loaded.data.answers)
  if (!report) return null
  const match = report.ranked.find((gift) => gift.giftId === giftId)
  if (!match) return null
  const featured = report.featured.some((gift) => gift.giftId === giftId)
  const note = featured
    ? `On your saved reflection, ${match.name} is one of your strongest responses, with a score of ${match.score} out of ${MAX_GIFT_SCORE}.`
    : `On your saved reflection, ${match.name} scored ${match.score} out of ${MAX_GIFT_SCORE}.`

  return (
    <p className="mt-5 rounded-2xl bg-[#FFF3D6] px-4 py-3 text-sm leading-relaxed text-[#17243A]">
      {note}{" "}
      <Link href="/results" className="font-semibold underline underline-offset-4">
        See your full results
      </Link>
    </p>
  )
}
