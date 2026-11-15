import Link from "next/link"
import { GiftIconMark } from "@/components/gifts/icons"
import { GiftResultNote } from "@/components/gifts/GiftResultNote"
import type { SpiritualGift } from "@/lib/types"

export function GiftDetail({ gift }: { gift: SpiritualGift }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/gifts"
        className="inline-flex min-h-11 items-center text-sm font-semibold text-[#17243A] underline decoration-[#F5C842] underline-offset-4"
      >
        All spiritual gifts
      </Link>
      <div className="mt-4 flex items-center gap-4">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-[#FFF3D6] text-[#17243A]">
          <GiftIconMark name={gift.icon} className="size-7" />
        </span>
        <h1 className="font-serif text-4xl text-[#17243A] sm:text-5xl">{gift.name}</h1>
      </div>
      <GiftResultNote giftId={gift.id} />
      <p className="mt-6 text-lg leading-relaxed text-[#17243A]">{gift.shortDescription}</p>

      <section className="mt-8">
        <h2 className="font-serif text-2xl text-[#17243A]">What does this gift mean?</h2>
        <p className="mt-3 leading-relaxed text-[#17243A]">{gift.detailedDescription}</p>
        {gift.discernmentNote && (
          <p className="mt-4 rounded-2xl bg-[#FFF3D6] p-4 text-sm leading-relaxed text-[#17243A]">
            {gift.discernmentNote}
          </p>
        )}
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-2xl text-[#17243A]">What might it look like in everyday life?</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-[#17243A]">
          {gift.everydayExamples.map((example) => (
            <li key={example}>{example}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-2xl text-[#17243A]">How can I use this gift to serve others?</h2>
        <p className="mt-3 leading-relaxed text-[#17243A]">{gift.tryThis}</p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-2xl text-[#17243A]">How might I explore this gift in VEYM?</h2>
        <p className="mt-2 text-sm text-[#667085]">
          These ideas are for the Vietnamese Eucharistic Youth Movement. Any parish youth group can use them too.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-[#17243A]">
          {gift.veymExamples.map((example) => (
            <li key={example}>{example}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-5 ring-1 ring-[#17243A]/10">
        <h2 className="font-serif text-2xl text-[#17243A]">What can I pray about?</h2>
        <p className="mt-3 leading-relaxed text-[#17243A]">{gift.reflectionQuestion}</p>
        <p className="mt-4 text-sm text-[#667085]">
          Patron named in the Diocese of Cleveland inventory: {gift.patronSaint}
        </p>
        <p className="mt-2 text-sm text-[#667085]">
          Scripture connected with this gift in that inventory: {gift.scriptureReferences.join(", ")}
        </p>
      </section>
    </article>
  )
}
