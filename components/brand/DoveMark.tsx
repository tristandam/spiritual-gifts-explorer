import { Flame } from "lucide-react"
import { cn } from "@/lib/utils"

export function DoveMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-14 items-center justify-center rounded-full bg-[#FFF3D6] text-[#17243A] ring-1 ring-[#F5C842]",
        className,
      )}
    >
      <Flame className="size-7" aria-hidden="true" />
    </span>
  )
}
