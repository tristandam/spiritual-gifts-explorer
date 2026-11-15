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

export default async function GiftPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const gift = getGiftBySlug(slug)
  if (!gift) notFound()
  return <GiftDetail gift={gift} />
}
