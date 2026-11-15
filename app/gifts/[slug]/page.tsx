import { Suspense } from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { gifts, getGiftBySlug } from "@/data/gifts"
import { GiftDetail } from "@/components/gifts/GiftDetail"

export function generateStaticParams() {
  return gifts.map((gift) => ({ slug: gift.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const gift = getGiftBySlug(slug)
  return {
    title: gift?.name ?? "Spiritual gift",
    description: gift?.shortDescription,
  }
}

async function GiftContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const gift = getGiftBySlug(slug)
  if (!gift) notFound()
  return <GiftDetail gift={gift} />
}

export default function GiftPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-10">
          <div className="h-8 w-48 animate-pulse rounded-full bg-[#FFF3D6]" />
          <div className="mt-6 h-40 animate-pulse rounded-3xl bg-white" />
        </div>
      }
    >
      <GiftContent params={params} />
    </Suspense>
  )
}
