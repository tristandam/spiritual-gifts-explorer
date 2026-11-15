import Link from "next/link"
import { ATTRIBUTION, INDEPENDENT_DISCLAIMER, SOURCE_URL } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#17243A]/10 bg-[#17243A] text-[#FFFBF2]">
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-10 text-sm leading-6 sm:grid-cols-[1.4fr_0.8fr]">
        <div>
          <p className="font-serif text-xl">Called by the Spirit</p>
          <p className="mt-3 text-[#FFF3D6]">{ATTRIBUTION}</p>
          <p className="mt-3 text-[#FFFBF2]/80">{INDEPENDENT_DISCLAIMER}</p>
          <a
            href={SOURCE_URL}
            className="mt-3 inline-flex min-h-11 items-center text-[#F5C842] underline decoration-[#F5C842]/50 underline-offset-4"
          >
            Read the original Diocese of Cleveland inventory (PDF)
          </a>
        </div>
        <div className="flex flex-col gap-1">
          <Link className="inline-flex min-h-11 items-center hover:text-[#F5C842]" href="/about">
            About, scoring, and privacy
          </Link>
          <Link className="inline-flex min-h-11 items-center hover:text-[#F5C842]" href="/gifts">
            Explore all 25 gifts
          </Link>
          <Link className="inline-flex min-h-11 items-center hover:text-[#F5C842]" href="/assessment">
            Begin the assessment
          </Link>
        </div>
      </div>
    </footer>
  )
}
