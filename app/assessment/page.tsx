import type { Metadata } from "next"
import { AssessmentExperience } from "@/components/assessment/AssessmentExperience"

export const metadata: Metadata = {
  title: "Assessment",
  description: "A 50-question spiritual gifts reflection for Catholic high school students.",
}

export default function AssessmentPage() {
  return <AssessmentExperience />
}
