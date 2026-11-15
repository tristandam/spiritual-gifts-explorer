"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { gifts } from "@/data/gifts"
import { downloadResultsPdf } from "@/lib/pdf-export"
import type { ScoreReport } from "@/lib/scoring"
import type { StoredAssessment } from "@/lib/assessment-storage"

export function DownloadResultsButton({
  record,
  report,
}: {
  record: StoredAssessment
  report: ScoreReport
}) {
  const [includeReflections, setIncludeReflections] = useState(false)
  const [error, setError] = useState(false)
  const giftById = new Map(gifts.map((gift) => [gift.id, gift]))

  function download() {
    try {
      downloadResultsPdf({
        completedAtIso: record.completedAt ?? new Date().toISOString(),
        tieSummary: report.tieSummary,
        featured: report.featured.map((item) => {
          const gift = giftById.get(item.giftId)
          return {
            name: item.name,
            score: item.score,
            description: gift?.shortDescription ?? "",
            scripture: gift?.scriptureReferences ?? [],
            tryThis: gift?.tryThis ?? "",
          }
        }),
        ranking: report.ranked.map((item) => ({ name: item.name, score: item.score })),
        reflections: record.reflections
          ? {
              surprise: record.reflections.surprise,
              joy: record.reflections.joy,
              service: record.reflections.service,
            }
          : null,
        includeReflections,
      })
      setError(false)
    } catch {
      setError(true)
    }
  }

  return (
    <div className="rounded-3xl bg-white p-5 ring-1 ring-[#17243A]/10">
      <h3 className="font-serif text-2xl text-[#17243A]">Keep a copy</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#667085]">
        Download a printable summary. Reflections are left out unless you choose to include them.
      </p>
      <label className="mt-4 flex min-h-11 items-start gap-3 text-sm text-[#17243A]">
        <input
          type="checkbox"
          className="mt-1 size-5 accent-[#17243A]"
          checked={includeReflections}
          onChange={(event) => setIncludeReflections(event.target.checked)}
        />
        <span>Include my personal reflection in the PDF</span>
      </label>
      <Button type="button" className="mt-4" onClick={download}>
        <Download aria-hidden="true" />
        Download my results
      </Button>
      {error && (
        <p className="mt-3 text-sm text-[#17243A]" role="status">
          We could not create the PDF in this browser. You can still read your results here or use your browser&apos;s print option.
        </p>
      )}
    </div>
  )
}
