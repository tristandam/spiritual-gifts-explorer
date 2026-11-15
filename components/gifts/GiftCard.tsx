import Link from "next/link"
import { GiftIconMark } from "@/components/gifts/icons"
import type { SpiritualGift } from "@/lib/types"

export function GiftCard({ gift }: { gift: SpiritualGift }) {
  return (
    <Link
      href={`/gifts/${gift.slug}`}
      className="flex h-full flex-col rounded-3xl bg-white p-5 ring-1 ring-[#17243A]/10 transition-transform hover:-translate-y-0.5 hover:ring-[#F5C842]"
    >
      <span className="flex size-12 items-center justify-center rounded-2xl bg-[#FFF3D6] text-[#17243A]">
        <GiftIconMark name={gift.icon} className="size-6" />
      </span>
      <h2 className="mt-4 font-serif text-2xl text-[#17243A]">{gift.name}</h2>
      <p className="mt-2 flex-1 leading-relaxed text-[#3E4A5C]">{gift.shortDescription}</p>
      <span className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-[#17243A]">
        Read more
      </span>
    </Link>
  )
}
