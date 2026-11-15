"use client"

import type { Ref } from "react"
import { AnswerScale } from "@/components/assessment/AnswerScale"
import type { AnswerValue, AssessmentQuestion } from "@/lib/types"

export function QuestionCard({
  question,
  selected,
  onSelect,
  headingRef,
}: {
  question: AssessmentQuestion
  selected?: AnswerValue
  onSelect: (value: AnswerValue) => void
  headingRef?: Ref<HTMLHeadingElement>
}) {
  return (
    <article className="rounded-3xl bg-white p-5 shadow-[0_18px_50px_rgba(23,36,58,0.08)] ring-1 ring-[#17243A]/10 sm:p-8">
      <h2
        ref={headingRef}
        tabIndex={-1}
        id="current-question"
        className="font-serif text-2xl leading-snug text-[#17243A] outline-none sm:text-3xl"
      >
        {question.text}
      </h2>
      <div className="mt-8">
        <AnswerScale questionId={question.id} selected={selected} onSelect={onSelect} />
      </div>
    </article>
  )
}
