import type { Metadata } from "next"
import { gifts } from "@/data/gifts"
import { GiftCard } from "@/components/gifts/GiftCard"

export const metadata: Metadata = {
  title: "Spiritual gifts",
  description: "Explore 25 charisms adapted from the Diocese of Cleveland Called by the Spirit inventory.",
}

export default function GiftsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <p className="text-sm font-semibold tracking-wide text-[#8A6A12]">25 charisms</p>
      <h1 className="mt-2 font-serif text-4xl text-[#17243A] sm:text-5xl">Explore the gifts</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[#3E4A5C]">
        Read what each gift can look like at school, at home, in a parish, and in VEYM. You can do this before or after the assessment.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gifts.map((gift) => (
          <GiftCard key={gift.id} gift={gift} />
        ))}
      </div>
    </div>
  )
}
