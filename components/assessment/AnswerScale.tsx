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
      <legend className="sr-only">How true is this statement for you? Choose 1 to 4.</legend>
      <div className="grid grid-cols-4 gap-2 sm:gap-3" role="presentation">
        {ANSWER_SCALE.map((option) => {
          const active = selected === option.value
          return (
            <label
              key={option.value}
              className={cn(
                "flex min-h-24 cursor-pointer flex-col items-center justify-center rounded-2xl border px-1 py-2 text-center transition-colors",
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
              <span className="font-serif text-2xl leading-none">{option.value}</span>
              <span className="mt-1 text-[11px] font-medium leading-tight sm:text-xs">{option.label}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
