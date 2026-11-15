import { useSyncExternalStore } from "react"
import { questions } from "@/data/questions"
import { ASSESSMENT_VERSION, STORAGE_KEY } from "@/lib/constants"
import { questionOrderForSeed } from "@/lib/question-order"
import { isAnswerValue } from "@/lib/scoring"
import type { AnswerValue } from "@/lib/types"

export interface ReflectionEntry {
  surprise: string
  joy: string
  service: string
  updatedAt: string
}

export interface StoredAssessment {
  version: number
  answers: Partial<Record<string, AnswerValue>>
  currentIndex: number
  questionOrder: string[]
  seed: number
  startedAt: string
  begun: boolean
  completedAt?: string
  reflections?: ReflectionEntry
}

export type LoadResult =
  | { status: "empty" }
  | { status: "corrupt" }
  | { status: "incompatible" }
  | { status: "ok"; data: StoredAssessment }

const questionIds = new Set(questions.map((question) => question.id))

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function sanitizeAnswers(value: unknown): Partial<Record<string, AnswerValue>> | null {
  if (!isRecord(value)) return null
  const answers: Partial<Record<string, AnswerValue>> = {}
  for (const [key, raw] of Object.entries(value)) {
    if (!questionIds.has(key)) continue
    if (!isAnswerValue(raw)) return null
    answers[key] = raw
  }
  return answers
}

function sameIds(order: unknown): order is string[] {
  if (!Array.isArray(order) || order.length !== questions.length) return false
  const seen = new Set<string>()
  for (const id of order) {
    if (typeof id !== "string" || !questionIds.has(id) || seen.has(id)) return false
    seen.add(id)
  }
  return seen.size === questions.length
}

export function createAssessment(seed = Math.floor(Math.random() * 0x7fffffff)): StoredAssessment {
  return {
    version: ASSESSMENT_VERSION,
    answers: {},
    currentIndex: 0,
    questionOrder: questionOrderForSeed(questions, seed),
    seed,
    startedAt: new Date().toISOString(),
    begun: false,
  }
}

export function parseAssessment(raw: string | null): LoadResult {
  if (raw === null || raw.trim() === "") return { status: "empty" }

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return { status: "corrupt" }
  }

  if (!isRecord(parsed)) return { status: "corrupt" }
  if (parsed.version !== ASSESSMENT_VERSION) return { status: "incompatible" }

  const answers = sanitizeAnswers(parsed.answers)
  if (!answers || !sameIds(parsed.questionOrder)) return { status: "incompatible" }
  if (typeof parsed.seed !== "number" || typeof parsed.startedAt !== "string") {
    return { status: "corrupt" }
  }

  const currentIndex = Number.isInteger(parsed.currentIndex)
    ? Math.min(Math.max(parsed.currentIndex as number, 0), questions.length - 1)
    : 0

  const data: StoredAssessment = {
    version: ASSESSMENT_VERSION,
    answers,
    currentIndex,
    questionOrder: parsed.questionOrder,
    seed: parsed.seed,
    startedAt: parsed.startedAt,
    begun: parsed.begun === true,
    completedAt: typeof parsed.completedAt === "string" ? parsed.completedAt : undefined,
  }

  if (isRecord(parsed.reflections)) {
    const reflections = parsed.reflections
    if (
      typeof reflections.surprise === "string" &&
      typeof reflections.joy === "string" &&
      typeof reflections.service === "string"
    ) {
      data.reflections = {
        surprise: reflections.surprise,
        joy: reflections.joy,
        service: reflections.service,
        updatedAt:
          typeof reflections.updatedAt === "string"
            ? reflections.updatedAt
            : new Date().toISOString(),
      }
    }
  }

  return { status: "ok", data }
}

const SERVER_SNAPSHOT = "\u0000server"
const listeners = new Set<() => void>()
let cachedRaw: string | undefined

function emit(raw: string) {
  cachedRaw = raw
  listeners.forEach((listener) => listener())
}

export function subscribeAssessment(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return
    cachedRaw = event.newValue ?? ""
    listener()
  }
  if (typeof window !== "undefined") {
    window.addEventListener("storage", onStorage)
  }
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", onStorage)
    }
  }
}

export function getAssessmentSnapshot(): string {
  if (cachedRaw === undefined) {
    cachedRaw = typeof window === "undefined" ? "" : (window.localStorage.getItem(STORAGE_KEY) ?? "")
  }
  return cachedRaw
}

export function getAssessmentServerSnapshot() {
  return SERVER_SNAPSHOT
}

export function useAssessmentRaw() {
  return useSyncExternalStore(
    subscribeAssessment,
    getAssessmentSnapshot,
    getAssessmentServerSnapshot,
  )
}

export function isServerSnapshot(raw: string) {
  return raw === SERVER_SNAPSHOT
}

export function loadAssessment(storage: Pick<Storage, "getItem"> = localStorage()): LoadResult {
  try {
    return parseAssessment(storage.getItem(STORAGE_KEY))
  } catch {
    return { status: "corrupt" }
  }
}

export function saveAssessment(
  data: StoredAssessment,
  storage: Pick<Storage, "setItem"> = localStorage(),
) {
  const raw = JSON.stringify(data)
  storage.setItem(STORAGE_KEY, raw)
  if (typeof window !== "undefined" && storage === window.localStorage) {
    emit(raw)
  }
}

export function clearAssessment(storage: Pick<Storage, "removeItem"> = localStorage()) {
  storage.removeItem(STORAGE_KEY)
  if (typeof window !== "undefined" && storage === window.localStorage) {
    emit("")
  }
}

function localStorage(): Storage {
  if (typeof window === "undefined") {
    throw new Error("Assessment storage is only available in the browser.")
  }
  return window.localStorage
}

export function answeredCount(data: StoredAssessment): number {
  return Object.keys(data.answers).length
}
