import type { Metadata } from "next"
import { ResultsExperience } from "@/components/results/ResultsExperience"

export const metadata: Metadata = {
  title: "Your results",
  description: "A private summary of your spiritual gifts reflection, stored only on this device.",
}

export default function ResultsPage() {
  return <ResultsExperience />
}
