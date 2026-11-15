import Link from "next/link"
import { GiftIconMark } from "@/components/gifts/icons"
import { MAX_GIFT_SCORE } from "@/lib/constants"
import type { SpiritualGift } from "@/lib/types"

export function GiftResultCard({
  gift,
  score,
  tied,
}: {
  gift: SpiritualGift
  score: number
  tied: boolean
}) {
  return (
    <article className="flex h-full flex-col rounded-3xl bg-white p-5 shadow-[0_16px_40px_rgba(23,36,58,0.06)] ring-1 ring-[#17243A]/10">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-[#FFF3D6] text-[#17243A]">
          <GiftIconMark name={gift.icon} className="size-6" />
        </span>
        <p className="text-right">
          <span className="block font-serif text-3xl text-[#17243A]">{score}</span>
          <span className="text-xs tracking-wide text-[#667085]">out of {MAX_GIFT_SCORE}</span>
        </p>
      </div>
      <h3 className="mt-4 font-serif text-2xl text-[#17243A]">{gift.name}</h3>
      {tied && (
        <p className="mt-1 text-sm font-semibold text-[#8A6A12]">Tied with another gift at this score</p>
      )}
      <p className="mt-3 flex-1 leading-relaxed text-[#17243A]">{gift.shortDescription}</p>
      <p className="mt-4 rounded-2xl bg-[#FFFBF2] p-3 text-sm leading-relaxed text-[#17243A]">
        <span className="font-semibold">Try this: </span>
        {gift.tryThis}
      </p>
      {gift.discernmentNote && (
        <p className="mt-3 text-sm leading-relaxed text-[#667085]">{gift.discernmentNote}</p>
      )}
      <Link
        href={`/gifts/${gift.slug}`}
        className="mt-4 inline-flex min-h-11 items-center font-semibold text-[#17243A] underline decoration-[#F5C842] decoration-2 underline-offset-4"
      >
        Explore {gift.name}
      </Link>
    </article>
  )
}
