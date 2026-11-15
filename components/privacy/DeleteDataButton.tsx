"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { clearAssessment } from "@/lib/assessment-storage"

export function DeleteDataButton() {
  const [open, setOpen] = useState(false)
  const [cleared, setCleared] = useState(false)

  return (
    <div>
      <Button type="button" variant="outline" onClick={() => setOpen(true)}>
        Delete my saved assessment
      </Button>
      {cleared && (
        <p className="mt-3 text-sm font-semibold text-[#17243A]" role="status">
          Saved answers and reflections were removed from this browser.
        </p>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete saved answers?</DialogTitle>
            <DialogDescription>
              This clears the assessment and reflection stored in this browser only.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => {
                clearAssessment()
                setCleared(true)
                setOpen(false)
              }}
            >
              Delete data on this device
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
