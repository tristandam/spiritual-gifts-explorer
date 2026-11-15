import { jsPDF } from "jspdf"
import {
  ATTRIBUTION,
  INDEPENDENT_DISCLAIMER,
  RESULTS_DISCLAIMER,
  SOURCE_NAME,
  SOURCE_URL,
} from "@/lib/constants"

export interface PdfGiftSection {
  name: string
  score: number
  description: string
  scripture: string[]
  tryThis: string
}

export interface PdfReflection {
  surprise: string
  joy: string
  service: string
}

export interface PdfInput {
  completedAtIso: string
  featured: PdfGiftSection[]
  ranking: { name: string; score: number }[]
  tieSummary: string
  reflections: PdfReflection | null
  includeReflections: boolean
}

export interface PdfLine {
  text: string
  size: number
  style: "normal" | "bold" | "italic"
  gapAfter: number
  color: [number, number, number]
}

const PAGE = {
  width: 612,
  height: 792,
  margin: 54,
}

const NAVY: [number, number, number] = [23, 36, 58]
const GOLD: [number, number, number] = [138, 106, 18]
const BODY: [number, number, number] = [23, 36, 58]
const MUTED: [number, number, number] = [74, 85, 104]

export function formatCompletedDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return "Date unavailable"
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

function line(
  text: string,
  size = 11,
  style: PdfLine["style"] = "normal",
  gapAfter = 8,
  color: [number, number, number] = BODY,
): PdfLine {
  return { text, size, style, gapAfter, color }
}

export function buildResultsLines(input: PdfInput): PdfLine[] {
  const lines: PdfLine[] = [
    line("Called by the Spirit", 22, "bold", 4, NAVY),
    line("Discover Your Spiritual Gifts", 13, "italic", 12, GOLD),
    line(`Completed ${formatCompletedDate(input.completedAtIso)}`, 11, "normal", 10, MUTED),
    line(input.tieSummary, 11, "normal", 8),
    line(RESULTS_DISCLAIMER, 10, "italic", 14, MUTED),
    line("Strongest responses", 16, "bold", 8, NAVY),
  ]

  if (input.featured.length === 0) {
    lines.push(line("No completed scores were available.", 11))
  }

  for (const gift of input.featured) {
    lines.push(line(`${gift.name}  ·  ${gift.score} of 8`, 13, "bold", 4, NAVY))
    lines.push(line(gift.description, 11, "normal", 4))
    lines.push(line(`Try this: ${gift.tryThis}`, 11, "italic", 4))
    lines.push(
      line(
        `Scripture: ${gift.scripture.join("; ")}`,
        10,
        "normal",
        12,
        MUTED,
      ),
    )
  }

  lines.push(line("All 25 gifts", 16, "bold", 8, NAVY))
  lines.push(
    line(
      "Matching scores are tied. A lower score is not a lack of God's grace.",
      10,
      "italic",
      8,
      MUTED,
    ),
  )

  for (const gift of input.ranking) {
    lines.push(line(`${gift.score}   ${gift.name}`, 11, "normal", 2))
  }

  if (input.includeReflections && input.reflections) {
    lines.push(line("Personal reflection", 16, "bold", 8, NAVY))
    lines.push(line("Which of these gifts surprised you?", 11, "bold", 3))
    lines.push(line(input.reflections.surprise || "No response written.", 11, "normal", 8))
    lines.push(line("When have you felt joy or peace while using one of these gifts?", 11, "bold", 3))
    lines.push(line(input.reflections.joy || "No response written.", 11, "normal", 8))
    lines.push(line("How can you use your gifts to serve someone this week?", 11, "bold", 3))
    lines.push(line(input.reflections.service || "No response written.", 11, "normal", 12))
  }

  lines.push(line("About this reflection", 14, "bold", 6, NAVY))
  lines.push(line(ATTRIBUTION, 10, "normal", 4))
  lines.push(line(`${SOURCE_NAME}: ${SOURCE_URL}`, 9, "normal", 4, MUTED))
  lines.push(line(INDEPENDENT_DISCLAIMER, 10, "normal", 4))
  lines.push(
    line(
      "This summary is an educational self-reflection. It is not a scientific, diagnostic, or official declaration of charisms.",
      10,
      "italic",
      0,
      MUTED,
    ),
  )

  return lines
}

export interface LaidPage {
  lines: { text: string; size: number; style: PdfLine["style"]; color: [number, number, number]; y: number }[]
}

export function layoutLines(
  source: readonly PdfLine[],
  measure: (text: string, size: number, style: PdfLine["style"]) => string[],
): LaidPage[] {
  const pages: LaidPage[] = [{ lines: [] }]
  let y = PAGE.margin

  const nextPage = () => {
    pages.push({ lines: [] })
    y = PAGE.margin
  }

  for (const block of source) {
    const wrapped = measure(block.text, block.size, block.style)
    const lineHeight = block.size + 4
    for (const text of wrapped) {
      if (y + lineHeight > PAGE.height - PAGE.margin - 28) nextPage()
      pages[pages.length - 1].lines.push({
        text,
        size: block.size,
        style: block.style,
        color: block.color,
        y,
      })
      y += lineHeight
    }
    y += block.gapAfter
    if (y > PAGE.height - PAGE.margin - 28) nextPage()
  }

  return pages
}

export function createResultsPdf(input: PdfInput): jsPDF {
  const doc = new jsPDF({ unit: "pt", format: "letter" })
  const maxWidth = PAGE.width - PAGE.margin * 2
  const blocks = buildResultsLines(input)
  const pages = layoutLines(blocks, (text, size, style) => {
    doc.setFont("times", style === "bold" ? "bold" : style === "italic" ? "italic" : "normal")
    doc.setFontSize(size)
    const wrapped = doc.splitTextToSize(text, maxWidth) as string[]
    return wrapped.length > 0 ? wrapped : [""]
  })

  pages.forEach((page, pageIndex) => {
    if (pageIndex > 0) doc.addPage()
    doc.setFillColor(255, 251, 242)
    doc.rect(0, 0, PAGE.width, PAGE.height, "F")
    doc.setDrawColor(...GOLD)
    doc.setLineWidth(2)
    doc.line(PAGE.margin, 36, PAGE.width - PAGE.margin, 36)

    for (const item of page.lines) {
      doc.setFont("times", item.style === "bold" ? "bold" : item.style === "italic" ? "italic" : "normal")
      doc.setFontSize(item.size)
      doc.setTextColor(...item.color)
      doc.text(item.text, PAGE.margin, item.y)
    }

    doc.setFont("times", "italic")
    doc.setFontSize(9)
    doc.setTextColor(...MUTED)
    doc.text(`${pageIndex + 1} of ${pages.length}`, PAGE.width - PAGE.margin, PAGE.height - 28, {
      align: "right",
    })
  })

  const linkPage = pages.length
  doc.setPage(linkPage)
  doc.setFontSize(9)
  const linkText = SOURCE_URL
  const linkWidth = doc.getTextWidth(linkText)
  const linkY = PAGE.height - 42
  doc.setTextColor(23, 36, 58)
  doc.textWithLink(linkText, PAGE.margin, linkY, { url: SOURCE_URL })
  doc.setDrawColor(...NAVY)
  doc.setLineWidth(0.4)
  doc.line(PAGE.margin, linkY + 2, PAGE.margin + linkWidth, linkY + 2)

  return doc
}

export function downloadResultsPdf(input: PdfInput) {
  const doc = createResultsPdf(input)
  doc.save("called-by-the-spirit-results.pdf")
}
