import { ANSWER_SCALE, type AnswerValue } from "@/lib/types"
import { cn } from "@/lib/utils"

export function AnswerScale({
  questionId,
  selected,
  onSelect,
}: {
  questionId: string
  selected?: AnswerValue
  onSelect: (value: AnswerValue) => void
}) {
  return (
    <fieldset>
      <legend className="sr-only">How much is this like you? Choose 1 to 4.</legend>
      <div className="grid grid-cols-4 gap-2 sm:gap-3" role="presentation">
        {ANSWER_SCALE.map((option) => {
          const active = selected === option.value
          return (
            <label
              key={option.value}
              className={cn(
                "flex min-h-16 cursor-pointer flex-col items-center justify-center rounded-2xl border text-lg font-semibold transition-colors sm:min-h-20 sm:text-2xl",
                active
                  ? "border-[#17243A] bg-[#17243A] text-[#FFFBF2] shadow-md"
                  : "border-[#17243A]/15 bg-white text-[#17243A] hover:border-[#F5C842] hover:bg-[#FFF3D6]",
              )}
            >
              <input
                type="radio"
                name={`answer-${questionId}`}
                value={option.value}
                checked={active}
                onChange={() => onSelect(option.value)}
                className="sr-only"
              />
              <span aria-hidden="true">{option.value}</span>
              <span className="sr-only">{option.label}</span>
            </label>
          )
        })}
      </div>
      <div className="mt-3 flex items-center justify-between gap-3 text-sm text-[#667085]">
        <span>Not like me</span>
        <span aria-hidden="true" className="h-px flex-1 bg-[#17243A]/15" />
        <span>Very much like me</span>
      </div>
    </fieldset>
  )
}
