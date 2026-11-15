import type { Metadata } from "next"
import { AssessmentExperience } from "@/components/assessment/AssessmentExperience"

export const metadata: Metadata = {
  title: "Assessment",
  description: "The 75-question Called by the Spirit gifts inventory.",
}

export default function AssessmentPage() {
  return <AssessmentExperience />
}
