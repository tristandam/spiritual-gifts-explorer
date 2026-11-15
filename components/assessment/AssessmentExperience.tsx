"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { questions } from "@/data/questions"
import { OPENING_PRAYER } from "@/data/prayer"
import { AssessmentNavigation } from "@/components/assessment/AssessmentNavigation"
import { ProgressBar } from "@/components/assessment/ProgressBar"
import { QuestionCard } from "@/components/assessment/QuestionCard"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  answeredCount,
  clearAssessment,
  createAssessment,
  getAssessmentSnapshot,
  isServerSnapshot,
  parseAssessment,
  saveAssessment,
  useAssessmentRaw,
  type StoredAssessment,
} from "@/lib/assessment-storage"
import { isAnswerValue, isAssessmentComplete } from "@/lib/scoring"
import type { AnswerValue } from "@/lib/types"

type Phase = "resume" | "incompatible" | "corrupt" | "prayer" | "question" | "complete"

const questionById = new Map(questions.map((question) => [question.id, question]))

function currentRecord(): StoredAssessment | null {
  const loaded = parseAssessment(getAssessmentSnapshot() || null)
  return loaded.status === "ok" ? loaded.data : null
}

export function AssessmentExperience() {
  const reduce = useReducedMotion()
  const raw = useAssessmentRaw()
  const [acknowledged, setAcknowledged] = useState(false)
  const [reviewing, setReviewing] = useState(false)
  const [needAnswer, setNeedAnswer] = useState(false)
  const [saveError, setSaveError] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [])

  const loaded = isServerSnapshot(raw) ? null : parseAssessment(raw || null)
  const record = loaded?.status === "ok" ? loaded.data : null

  let phase: Phase | "loading" = "loading"
  if (isServerSnapshot(raw)) phase = "loading"
  else if (loaded?.status === "corrupt") phase = "corrupt"
  else if (loaded?.status === "incompatible") phase = "incompatible"
  else if (!record || !record.begun) phase = "prayer"
  else if (record.completedAt && !reviewing) phase = "complete"
  else if (!acknowledged) phase = "resume"
  else phase = "question"

  useEffect(() => {
    if (phase === "question") headingRef.current?.focus()
  }, [phase, record?.currentIndex])

  function persist(next: StoredAssessment) {
    try {
      saveAssessment(next)
      setSaveError(false)
    } catch {
      setSaveError(true)
    }
  }

  function begin() {
    const next = { ...(record ?? createAssessment()), begun: true }
    setAcknowledged(true)
    setReviewing(true)
    persist(next)
  }

  function reset() {
    if (timer.current) window.clearTimeout(timer.current)
    clearAssessment()
    setAcknowledged(false)
    setReviewing(false)
    setNeedAnswer(false)
    setConfirmReset(false)
  }

  function selectAnswer(value: AnswerValue) {
    const latest = currentRecord()
    if (!latest) return
    const id = latest.questionOrder[latest.currentIndex]
    const answers = { ...latest.answers, [id]: value }
    const complete = isAssessmentComplete(answers)
    persist({
      ...latest,
      answers,
      completedAt: complete ? (latest.completedAt ?? new Date().toISOString()) : undefined,
    })
    setNeedAnswer(false)
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      const after = currentRecord()
      if (!after || after.questionOrder[after.currentIndex] !== id) return
      if (after.currentIndex >= after.questionOrder.length - 1) {
        setReviewing(false)
        return
      }
      persist({ ...after, currentIndex: after.currentIndex + 1 })
    }, reduce ? 0 : 360)
  }

  function goBack() {
    const latest = currentRecord()
    if (!latest || latest.currentIndex === 0) return
    if (timer.current) window.clearTimeout(timer.current)
    persist({ ...latest, currentIndex: latest.currentIndex - 1 })
    setNeedAnswer(false)
    setReviewing(true)
    setAcknowledged(true)
  }

  function goNext() {
    const latest = currentRecord()
    if (!latest) return
    const id = latest.questionOrder[latest.currentIndex]
    if (!isAnswerValue(latest.answers[id])) {
      setNeedAnswer(true)
      return
    }
    if (timer.current) window.clearTimeout(timer.current)
    if (latest.currentIndex >= latest.questionOrder.length - 1) {
      setReviewing(false)
      return
    }
    persist({ ...latest, currentIndex: latest.currentIndex + 1 })
  }

  const actions = useRef({ goBack, goNext, selectAnswer })

  useEffect(() => {
    actions.current = { goBack, goNext, selectAnswer }
  })

  useEffect(() => {
    if (phase !== "question") return
    function onKey(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        actions.current.goBack()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        actions.current.goNext()
      } else if (["1", "2", "3", "4"].includes(event.key)) {
        actions.current.selectAnswer(Number(event.key) as AnswerValue)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [phase])

  const currentQuestion = record
    ? questionById.get(record.questionOrder[record.currentIndex])
    : undefined

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-8 pb-44">
      <p className="text-sm font-semibold tracking-wide text-[#8A6A12]">Assessment</p>
      <h1 className="mt-2 font-serif text-4xl text-[#17243A]">Listen for a moment</h1>
      <p className="sr-only" aria-live="polite">
        {phase === "question" && record
          ? `Question ${record.currentIndex + 1} of ${questions.length}`
          : ""}
      </p>

      {phase === "loading" && (
        <div className="mt-8 space-y-4" aria-hidden="true">
          <div className="h-4 w-40 animate-pulse rounded-full bg-[#FFF3D6]" />
          <div className="h-56 animate-pulse rounded-3xl bg-white" />
        </div>
      )}

      {phase === "resume" && record && (
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#17243A]/10">
          <h2 className="font-serif text-3xl text-[#17243A]">Welcome back!</h2>
          <p className="mt-3 text-lg leading-relaxed text-[#17243A]">
            Would you like to continue where you left off?
          </p>
          <p className="mt-2 text-[#667085]">
            You answered {answeredCount(record)} of {questions.length} questions. Your progress is saved on this device.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Button type="button" onClick={() => setAcknowledged(true)}>
              Continue Assessment
            </Button>
            <Button type="button" variant="outline" onClick={() => setConfirmReset(true)}>
              Start Over
            </Button>
          </div>
        </section>
      )}

      {(phase === "incompatible" || phase === "corrupt") && (
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#17243A]/10">
          <h2 className="font-serif text-3xl text-[#17243A]">
            {phase === "corrupt" ? "We could not read your saved answers" : "This reflection was updated"}
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-[#17243A]">
            {phase === "corrupt"
              ? "The saved assessment on this device is damaged, so it cannot be scored."
              : "Earlier answers on this device do not match the current questions, so they cannot be scored."}
          </p>
          <Button type="button" className="mt-6" onClick={reset}>
            Start fresh
          </Button>
        </section>
      )}

      {phase === "prayer" && (
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#17243A]/10 sm:p-8">
          <h2 className="font-serif text-3xl text-[#17243A]">Opening prayer</h2>
          <div className="mt-4 space-y-3 font-serif text-lg leading-relaxed text-[#17243A] sm:text-xl">
            {OPENING_PRAYER.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <p className="mt-5 text-sm leading-relaxed text-[#667085]">
            There are no wrong answers. A lower score does not mean you lack God&apos;s love or grace. Answer for who you are today.
          </p>
        </section>
      )}

      {phase === "question" && record && currentQuestion && (
        <div className="mt-6">
          <ProgressBar
            current={record.currentIndex + 1}
            total={questions.length}
            answered={answeredCount(record)}
          />
          <motion.div
            key={currentQuestion.id}
            className="mt-5"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <QuestionCard
              question={currentQuestion}
              selected={record.answers[currentQuestion.id]}
              onSelect={selectAnswer}
              headingRef={headingRef}
            />
          </motion.div>
          {needAnswer && (
            <p className="mt-3 text-sm font-semibold text-[#17243A]" role="status">
              Choose an answer to continue.
            </p>
          )}
          <p className="mt-3 text-sm text-[#667085]">
            On a keyboard, press 1 to 4 to answer, the left arrow to go back, and the right arrow to go forward.
          </p>
        </div>
      )}

      {phase === "complete" && (
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-[#17243A]/10 sm:p-8">
          <p className="text-sm font-semibold tracking-wide text-[#8A6A12]">You finished</p>
          <h2 className="mt-2 font-serif text-4xl text-[#17243A]">Thank you for answering honestly.</h2>
          <p className="mt-4 text-lg leading-relaxed text-[#17243A]">
            Your results are a place to start praying and serving. They are not a label you have to wear, and they are not a final word about your gifts.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Button render={<Link href="/results" />}>See my gifts</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setReviewing(true)
                setAcknowledged(true)
              }}
            >
              Review my answers
            </Button>
          </div>
        </section>
      )}

      {saveError && (
        <p className="mt-4 text-sm text-[#17243A]" role="status">
          This browser could not save your progress. You can keep going, but a refresh may clear these answers.
        </p>
      )}

      {phase === "prayer" && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#17243A]/10 bg-[#FFFBF2]/95 px-4 py-3 backdrop-blur-md">
          <div className="mx-auto flex max-w-2xl flex-col gap-2 pb-[env(safe-area-inset-bottom)]">
            <Button type="button" onClick={begin}>
              Begin Assessment
            </Button>
            <Button type="button" variant="outline" onClick={begin}>
              Skip for now
            </Button>
          </div>
        </div>
      )}

      {phase === "question" && record && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#17243A]/10 bg-[#FFFBF2]/95 px-4 py-3 backdrop-blur-md">
          <div className="mx-auto max-w-2xl space-y-3 pb-[env(safe-area-inset-bottom)]">
            <AssessmentNavigation
              onBack={goBack}
              onNext={goNext}
              canGoBack={record.currentIndex > 0}
              nextLabel={record.currentIndex === questions.length - 1 ? "Finish" : "Next"}
            />
            <button
              type="button"
              className="min-h-11 text-sm font-semibold text-[#667085] underline-offset-4 hover:underline"
              onClick={() => setConfirmReset(true)}
            >
              Start over
            </button>
          </div>
        </div>
      )}

      <Dialog open={confirmReset} onOpenChange={setConfirmReset}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start over?</DialogTitle>
            <DialogDescription>
              This deletes your answers and any reflection saved on this device.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Button type="button" variant="outline" onClick={() => setConfirmReset(false)}>
              Keep my answers
            </Button>
            <Button type="button" onClick={reset}>
              Delete and start over
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
