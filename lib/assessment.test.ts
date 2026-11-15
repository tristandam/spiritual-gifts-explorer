import { describe, expect, it } from "vitest"
import { gifts } from "@/data/gifts"
import { questions } from "@/data/questions"
import {
  clearAssessment,
  createAssessment,
  parseAssessment,
  saveAssessment,
} from "@/lib/assessment-storage"
import { ASSESSMENT_VERSION, GIFT_COUNT, QUESTION_COUNT } from "@/lib/constants"
import { pairDistance, questionOrderForSeed } from "@/lib/question-order"
import {
  isAnswerValue,
  isAssessmentComplete,
  scoreAssessment,
} from "@/lib/scoring"
import { ANSWER_SCALE, GIFT_IDS } from "@/lib/types"
import { buildResultsLines, createResultsPdf, layoutLines } from "@/lib/pdf-export"

function memoryStorage() {
  const map = new Map<string, string>()
  return {
    getItem: (key: string) => map.get(key) ?? null,
    setItem: (key: string, value: string) => {
      map.set(key, value)
    },
    removeItem: (key: string) => {
      map.delete(key)
    },
    dump: () => map,
  }
}

function answersWith(value: 1 | 2 | 3 | 4, overrides: Record<string, 1 | 2 | 3 | 4> = {}) {
  return Object.fromEntries(
    questions.map((question) => [question.id, overrides[question.id] ?? value]),
  )
}

describe("assessment content", () => {
  it("has 50 questions and 25 gifts", () => {
    expect(questions).toHaveLength(QUESTION_COUNT)
    expect(gifts).toHaveLength(GIFT_COUNT)
    expect(new Set(questions.map((question) => question.id)).size).toBe(50)
    expect(new Set(gifts.map((gift) => gift.id)).size).toBe(25)
  })

  it("gives every gift exactly two valid questions", () => {
    for (const giftId of GIFT_IDS) {
      const matches = questions.filter((question) => question.giftId === giftId)
      expect(matches).toHaveLength(2)
      for (const question of matches) {
        expect(question.text.length).toBeGreaterThan(20)
        expect(question.displayOrder).toBeGreaterThanOrEqual(0)
      }
    }
  })

  it("uses only the four-point scale", () => {
    expect(ANSWER_SCALE.map((option) => option.value)).toEqual([1, 2, 3, 4])
    for (const option of ANSWER_SCALE) {
      expect(isAnswerValue(option.value)).toBe(true)
    }
    expect(isAnswerValue(0)).toBe(false)
    expect(isAnswerValue(5)).toBe(false)
    expect(isAnswerValue(1.5)).toBe(false)
    expect(isAnswerValue("4")).toBe(false)
  })

  it("keeps the two questions for a gift apart", () => {
    const ordered = [...questions]
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((question) => question.id)
    expect(new Set(questions.map((question) => question.displayOrder)).size).toBe(50)
    expect(pairDistance(ordered, questions)).toBeGreaterThanOrEqual(12)
    for (const seed of [1, 7, 42, 99, 2026]) {
      const seeded = questionOrderForSeed(questions, seed)
      expect(new Set(seeded).size).toBe(50)
      expect(pairDistance(seeded, questions)).toBeGreaterThanOrEqual(12)
    }
  })
})

describe("scoring", () => {
  it("sums the two answers for each gift", () => {
    const report = scoreAssessment(answersWith(3, { "encouragement-1": 4, "encouragement-2": 4 }))
    expect(report?.ranked.find((gift) => gift.giftId === "encouragement")?.score).toBe(8)
    expect(report?.ranked.find((gift) => gift.giftId === "service")?.score).toBe(6)
  })

  it("refuses an incomplete or invalid assessment", () => {
    const partial = answersWith(2)
    delete partial["wisdom-2"]
    expect(isAssessmentComplete(partial)).toBe(false)
    expect(scoreAssessment(partial)).toBeNull()
    expect(scoreAssessment({ ...answersWith(2), "faith-1": 5 })).toBeNull()
  })

  it("keeps tied gifts together and deterministic", () => {
    const high = ["administration", "hospitality", "mercy", "writing"]
    const overrides: Record<string, 1 | 2 | 3 | 4> = {}
    for (const giftId of high) {
      overrides[`${giftId}-1`] = 4
      overrides[`${giftId}-2`] = 4
    }
    const report = scoreAssessment(answersWith(1, overrides))
    expect(report).not.toBeNull()
    const featuredIds = report!.featured.map((gift) => gift.giftId)
    expect(featuredIds).toHaveLength(4)
    expect(new Set(report!.featured.map((gift) => gift.score))).toEqual(new Set([8]))
    expect(report!.tieSummary).toContain("equally strong")
    const again = scoreAssessment(answersWith(1, overrides))
    expect(again!.featured.map((gift) => gift.name)).toEqual(report!.featured.map((gift) => gift.name))
    const names = report!.featured.map((gift) => gift.name)
    expect([...names].sort((a, b) => a.localeCompare(b))).toEqual(names)
  })

  it("does not split a tie just to show three gifts", () => {
    const overrides: Record<string, 1 | 2 | 3 | 4> = {
      "teaching-1": 4,
      "teaching-2": 4,
      "service-1": 4,
      "service-2": 3,
      "helping-1": 4,
      "helping-2": 3,
      "mercy-1": 4,
      "mercy-2": 3,
    }
    const report = scoreAssessment(answersWith(1, overrides))
    expect(report!.featured.map((gift) => gift.score)).toEqual([8, 7, 7, 7])
  })
})

describe("storage", () => {
  it("saves progress and reads it back", () => {
    const storage = memoryStorage()
    const created = createAssessment(42)
    created.begun = true
    created.currentIndex = 4
    created.answers = { "administration-1": 3 }
    saveAssessment(created, storage)
    const loaded = parseAssessment(storage.getItem("called-by-the-spirit.assessment.v1"))
    expect(loaded.status).toBe("ok")
    if (loaded.status !== "ok") return
    expect(loaded.data.currentIndex).toBe(4)
    expect(loaded.data.answers["administration-1"]).toBe(3)
    expect(loaded.data.questionOrder).toEqual(created.questionOrder)
    expect(loaded.data.version).toBe(ASSESSMENT_VERSION)
  })

  it("resets saved data", () => {
    const storage = memoryStorage()
    saveAssessment(createAssessment(3), storage)
    clearAssessment(storage)
    expect(storage.getItem("called-by-the-spirit.assessment.v1")).toBeNull()
  })

  it("rejects a mismatched version and corrupt JSON", () => {
    expect(parseAssessment("{")).toEqual({ status: "corrupt" })
    expect(parseAssessment(null)).toEqual({ status: "empty" })
    expect(parseAssessment(JSON.stringify({ version: 999 }))).toEqual({ status: "incompatible" })
  })
})

describe("pdf export", () => {
  const input = {
    completedAtIso: "2026-04-26T15:00:00.000Z",
    tieSummary: "Encouragement is your strongest response.",
    featured: [
      {
        name: "Encouragement",
        score: 8,
        description: "You listen well.",
        scripture: ["Romans 12:8"],
        tryThis: "Reach out to someone.",
      },
    ],
    ranking: [{ name: "Encouragement", score: 8 }],
    reflections: {
      surprise: "TOKEN-SURPRISE",
      joy: "A quiet choir practice.",
      service: "I can set up chairs.",
    },
    includeReflections: false,
  }

  it("leaves reflections out unless requested", () => {
    const hidden = buildResultsLines(input).map((line) => line.text).join(" ")
    expect(hidden).not.toContain("TOKEN-SURPRISE")
    const shown = buildResultsLines({ ...input, includeReflections: true })
      .map((line) => line.text)
      .join(" ")
    expect(shown).toContain("TOKEN-SURPRISE")
    expect(shown).toContain("Diocese of Cleveland")
  })

  it("paginates long text without dropping it", () => {
    const long = `${"A long reflection sentence about service and prayer. ".repeat(80)}ENDTOKEN`
    const lines = buildResultsLines({
      ...input,
      includeReflections: true,
      reflections: { surprise: long, joy: long, service: long },
    })
    const pages = layoutLines(lines, (text) => {
      const chunks: string[] = []
      for (let index = 0; index < text.length; index += 40) {
        chunks.push(text.slice(index, index + 40))
      }
      return chunks.length > 0 ? chunks : [""]
    })
    expect(pages.length).toBeGreaterThan(1)
    const joined = pages.flatMap((page) => page.lines.map((line) => line.text)).join("")
    expect(joined).toContain("ENDTOKEN")
    expect(joined).toContain("long reflection")
  })

  it("builds a letter-size PDF", () => {
    const pdf = createResultsPdf({ ...input, includeReflections: true })
    expect(pdf.getNumberOfPages()).toBeGreaterThan(0)
    const bytes = new Uint8Array(pdf.output("arraybuffer") as ArrayBuffer)
    const header = String.fromCharCode(...bytes.slice(0, 5))
    expect(header).toBe("%PDF-")
  })
})
