import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AssessmentNavigation({
  onBack,
  onNext,
  canGoBack,
  nextLabel,
}: {
  onBack: () => void
  onNext: () => void
  canGoBack: boolean
  nextLabel: string
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button type="button" variant="outline" onClick={onBack} disabled={!canGoBack}>
        <ChevronLeft aria-hidden="true" />
        Back
      </Button>
      <Button type="button" onClick={onNext}>
        {nextLabel}
        <ChevronRight aria-hidden="true" />
      </Button>
    </div>
  )
}
