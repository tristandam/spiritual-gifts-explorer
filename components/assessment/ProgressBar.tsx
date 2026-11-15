import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"

export function ProgressBar({
  current,
  total,
  answered,
}: {
  current: number
  total: number
  answered: number
}) {
  const value = Math.round((current / total) * 100)

  return (
    <Progress value={value} aria-label="Assessment progress">
      <ProgressLabel className="text-[#17243A]">
        Question {current} of {total}
      </ProgressLabel>
      <ProgressValue>
        {() => <span>{answered} answered</span>}
      </ProgressValue>
    </Progress>
  )
}
