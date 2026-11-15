export const GIFT_IDS = [
  "administration",
  "craftsmanship",
  "digital-media",
  "discernment",
  "encouragement",
  "evangelism",
  "faith",
  "giving",
  "healing",
  "helping",
  "hospitality",
  "intercession",
  "knowledge",
  "leadership",
  "mercy",
  "global-cultural-engagement",
  "musicianship",
  "shepherding",
  "peacemaking",
  "prophecy",
  "service",
  "teaching",
  "voluntary-poverty",
  "wisdom",
  "writing",
] as const

export type GiftId = (typeof GIFT_IDS)[number]

export type AnswerValue = 1 | 2 | 3 | 4

export type GiftIcon =
  | "clipboard-list"
  | "hammer"
  | "smartphone"
  | "compass"
  | "message-heart"
  | "megaphone"
  | "anchor"
  | "hand-coins"
  | "heart-pulse"
  | "hand-helping"
  | "door-open"
  | "flame"
  | "book-open"
  | "users"
  | "heart"
  | "globe"
  | "music"
  | "footprints"
  | "scale"
  | "sunrise"
  | "sparkles"
  | "graduation-cap"
  | "leaf"
  | "lightbulb"
  | "pen-line"

export interface SpiritualGift {
  id: GiftId
  slug: string
  name: string
  shortDescription: string
  detailedDescription: string
  scriptureReferences: string[]
  catechismReferences: string[]
  possibleRoles: string[]
  patronSaint: string
  everydayExamples: string[]
  veymExamples: string[]
  reflectionQuestion: string
  icon: GiftIcon
  tryThis: string
  discernmentNote?: string
}

export interface AssessmentQuestion {
  id: string
  text: string
  giftId: GiftId
  prompt: number
  displayOrder: number
}

export const ANSWER_SCALE: readonly { value: AnswerValue; label: string }[] = [
  { value: 1, label: "Not true" },
  { value: 2, label: "Somewhat true" },
  { value: 3, label: "Mostly true" },
  { value: 4, label: "Very true" },
]
