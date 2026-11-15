"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  saveAssessment,
  type ReflectionEntry,
  type StoredAssessment,
} from "@/lib/assessment-storage"

const fields = [
  {
    key: "surprise",
    label: "Which of these gifts surprised you? Why?",
  },
  {
    key: "joy",
    label: "When have you experienced joy or peace while using one of these gifts?",
  },
  {
    key: "service",
    label: "What is one way you can use your gifts to serve someone this week?",
  },
] as const

export function ReflectionForm({
  record,
  onSaved,
}: {
  record: StoredAssessment
  onSaved: (next: StoredAssessment) => void
}) {
  const [values, setValues] = useState({
    surprise: record.reflections?.surprise ?? "",
    joy: record.reflections?.joy ?? "",
    service: record.reflections?.service ?? "",
  })
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(false)

  function save() {
    const reflections: ReflectionEntry = {
      ...values,
      updatedAt: new Date().toISOString(),
    }
    const next = { ...record, reflections }
    try {
      saveAssessment(next)
      onSaved(next)
      setSaved(true)
      setError(false)
    } catch {
      setError(true)
    }
  }

  return (
    <form
      className="rounded-3xl bg-white p-5 ring-1 ring-[#17243A]/10 sm:p-6"
      onSubmit={(event) => {
        event.preventDefault()
        save()
      }}
    >
      <h3 className="font-serif text-2xl text-[#17243A]">A quiet reflection</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#667085]">
        These notes stay on this device. You do not have to share a private spiritual experience with anyone.
      </p>
      <div className="mt-5 space-y-5">
        {fields.map((field) => (
          <label key={field.key} className="block text-base font-semibold text-[#17243A]">
            {field.label}
            <Textarea
              value={values[field.key]}
              onChange={(event) => {
                setSaved(false)
                setValues((current) => ({ ...current, [field.key]: event.target.value }))
              }}
              className="mt-2 min-h-28 bg-[#FFFBF2] text-base"
              maxLength={2000}
            />
          </label>
        ))}
      </div>
      <Button type="submit" className="mt-5">
        Save My Reflection
      </Button>
      {saved && (
        <p className="mt-3 text-sm font-semibold text-[#17243A]" role="status">
          Saved on this device.
        </p>
      )}
      {error && (
        <p className="mt-3 text-sm text-[#17243A]" role="status">
          This browser could not store the reflection.
        </p>
      )}
    </form>
  )
}
