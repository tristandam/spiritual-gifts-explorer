"use client"

import { useState } from "react"
import Link from "next/link"
import { gifts } from "@/data/gifts"
import { GiftSources } from "@/components/gifts/GiftSources"
import { DownloadResultsButton } from "@/components/results/DownloadResultsButton"
import { GiftResultCard } from "@/components/results/GiftResultCard"
import { GiftScoreChart } from "@/components/results/GiftScoreChart"
import { ReflectionForm } from "@/components/results/ReflectionForm"
import { ShareButton } from "@/components/results/ShareButton"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  clearAssessment,
  isServerSnapshot,
  parseAssessment,
  useAssessmentRaw,
  type StoredAssessment,
} from "@/lib/assessment-storage"
import { RESULTS_DISCLAIMER } from "@/lib/constants"
import { scoreAssessment, scoreColor, type ScoreReport } from "@/lib/scoring"

const giftById = new Map(gifts.map((gift) => [gift.id, gift]))

export function ResultsExperience() {
  const raw = useAssessmentRaw()
  const [confirmReset, setConfirmReset] = useState(false)
  const [removed, setRemoved] = useState(false)

  if (isServerSnapshot(raw)) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="h-10 w-64 animate-pulse rounded-full bg-[#FFF3D6]" />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="h-64 animate-pulse rounded-3xl bg-white" />
          <div className="h-64 animate-pulse rounded-3xl bg-white" />
          <div className="h-64 animate-pulse rounded-3xl bg-white" />
        </div>
      </div>
    )
  }

  const loaded = removed ? { status: "empty" as const } : parseAssessment(raw || null)
  const record: StoredAssessment | null = loaded.status === "ok" ? loaded.data : null
  const report: ScoreReport | null =
    record && record.completedAt ? scoreAssessment(record.answers) : null
  const incomplete = record !== null && report === null

  if (!record || !report) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="font-serif text-4xl text-[#17243A]">Your results are not ready yet</h1>
        <p className="mt-4 text-lg leading-relaxed text-[#17243A]">
          {incomplete
            ? "You started the assessment, and your answers are still saved on this device. Finish every question to see your gifts."
            : "Finish the 75-question reflection to see a personal summary. Nothing is stored on a server."}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/assessment" className={buttonVariants()}>
            {incomplete ? "Continue Assessment" : "Begin Assessment"}
          </Link>
          <Link href="/gifts" className={buttonVariants({ variant: "outline" })}>
            Explore the gifts
          </Link>
        </div>
      </div>
    )
  }

  const featuredIds = new Set(report.featured.map((gift) => gift.giftId))
  const tiedScores = new Set(
    report.featured
      .filter((gift) => report.featured.filter((other) => other.score === gift.score).length > 1)
      .map((gift) => gift.score),
  )
  const singleScore = report.featured.every((gift) => gift.score === report.featured[0]?.score)
  const showChart = !(singleScore && report.featured.length > 6)

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <p className="text-sm font-semibold tracking-wide text-[#8A6A12]">Results</p>
      <h1 className="mt-2 font-serif text-4xl text-[#17243A] sm:text-5xl">Your Spiritual Talents</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[#17243A]">
        Here are some of the ways the Holy Spirit may be inviting you to serve.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#667085]">{report.tieSummary}</p>


      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {report.featured.map((item) => {
          const gift = giftById.get(item.giftId)
          if (!gift) return null
          return (
            <GiftResultCard
              key={item.giftId}
              gift={gift}
              score={item.score}
              tied={tiedScores.has(item.score)}
            />
          )
        })}
      </div>

      <section className="mt-10">
        <h2 className="font-serif text-3xl text-[#17243A]">Scripture, the Church, and possible roles</h2>
        <p className="mt-2 max-w-3xl text-base leading-relaxed text-[#17243A]">
          These lists come from the Diocese of Cleveland inventory for the gifts at the top of your results.
        </p>
        <div className="mt-5 space-y-4">
          {report.featured.map((item) => {
            const gift = giftById.get(item.giftId)
            if (!gift) return null
            return (
              <article key={gift.id} className="rounded-3xl bg-white p-5 ring-1 ring-[#17243A]/10 sm:p-6">
                <h3 className="font-serif text-2xl text-[#17243A]">{gift.name}</h3>
                <div className="mt-5">
                  <GiftSources gift={gift} />
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <div className="mt-8">
        {showChart ? (
          <GiftScoreChart gifts={report.featured} />
        ) : (
          <div className="rounded-3xl bg-white p-5 ring-1 ring-[#17243A]/10">
            <h2 className="font-serif text-2xl text-[#17243A]">One shared score</h2>
            <p className="mt-2 text-[#17243A]">
              {report.featured.length} gifts received the same score of {report.featured[0]?.score}. They are shown as equals.
            </p>
          </div>
        )}
      </div>

      <section className="mt-10">
        <h2 className="font-serif text-3xl text-[#17243A]">Put Your Gifts Into Action</h2>
        <p className="mt-2 max-w-3xl text-[#667085]">
          These ideas are written for the Vietnamese Eucharistic Youth Movement. If you are not in VEYM, use them in any parish, school, or family.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {report.featured.map((item) => {
            const gift = giftById.get(item.giftId)
            if (!gift) return null
            return (
              <article key={gift.id} className="rounded-3xl bg-white p-5 ring-1 ring-[#17243A]/10">
                <h3 className="font-serif text-2xl text-[#17243A]">{gift.name}</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[#17243A]">
                  {gift.veymExamples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-3xl text-[#17243A]">All 25 gifts</h2>
        <p className="mt-2 text-sm text-[#667085]">
          Gifts with the same score are tied. The list is alphabetical within each score so a tie is not treated as a ranking.
        </p>
        <ol className="mt-4 space-y-2">
          {report.ranked.map((item) => {
            const width = `${(item.score / item.maxScore) * 100}%`
            const peers = report.ranked.filter((other) => other.score === item.score).length
            return (
              <li key={item.giftId}>
                <Link
                  href={`/gifts/${item.giftId}`}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl bg-white px-3 py-3 ring-1 ring-[#17243A]/10"
                >
                  <span className="w-8 text-center font-semibold text-[#17243A]">{item.score}</span>
                  <span>
                    <span className="block font-semibold text-[#17243A]">{item.name}</span>
                    <span className="mt-1 block h-2 overflow-hidden rounded-full bg-[#FFF3D6]">
                      <span
                        className="block h-full rounded-full"
                        style={{ width, backgroundColor: scoreColor(item.score) }}
                      />
                    </span>
                  </span>
                  <span className="text-xs font-semibold text-[#8A6A12]">
                    {peers > 1 ? "Tied" : featuredIds.has(item.giftId) ? "Strong" : ""}
                  </span>
                </Link>
              </li>
            )
          })}
        </ol>
      </section>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <ReflectionForm record={record} onSaved={() => undefined} />
        <div className="space-y-4">
          <DownloadResultsButton record={record} report={report} />
          <div className="rounded-3xl bg-white p-5 ring-1 ring-[#17243A]/10">
            <h3 className="font-serif text-2xl text-[#17243A]">Invite a friend</h3>
            <p className="mt-2 text-sm text-[#667085]">
              Sharing sends only the website address. Your scores and reflections stay on this device.
            </p>
            <div className="mt-4">
              <ShareButton />
            </div>
          </div>
          <Button type="button" variant="outline" onClick={() => setConfirmReset(true)}>
            Delete my saved assessment
          </Button>
        </div>
      </div>

      <Dialog open={confirmReset} onOpenChange={setConfirmReset}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete saved answers?</DialogTitle>
            <DialogDescription>
              This removes your scores and reflection from this browser. Nothing was uploaded.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Button type="button" variant="outline" onClick={() => setConfirmReset(false)}>
              Keep my results
            </Button>
            <Button
              type="button"
              onClick={() => {
                clearAssessment()
                setRemoved(true)
                setConfirmReset(false)
              }}
            >
              Delete everything on this device
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
