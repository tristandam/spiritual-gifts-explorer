"use client"

import { useState } from "react"
import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ShareButton() {
  const [message, setMessage] = useState("")

  async function share() {
    const url = `${window.location.origin}/`
    const payload = {
      title: "Called by the Spirit",
      text: "Discover your spiritual gifts. A short reflection for Catholic high school students.",
      url,
    }
    try {
      if (navigator.share) {
        await navigator.share(payload)
        setMessage("Share sheet opened.")
        return
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return
    }
    try {
      await navigator.clipboard.writeText(url)
      setMessage("Link copied. It does not include your answers.")
    } catch {
      setMessage(url)
    }
  }

  return (
    <div>
      <Button type="button" variant="outline" onClick={() => void share()}>
        <Share2 aria-hidden="true" />
        Share this assessment
      </Button>
      {message && (
        <p className="mt-3 text-sm text-[#17243A]" role="status">
          {message}
        </p>
      )}
    </div>
  )
}
