"use client"

import type React from "react"
import { ChevronRight } from "@/components/icons"
import { useSiteUI } from "@/components/site-ui"

export function CaseLink({ id, children }: { id: string; children: React.ReactNode }) {
  const { openCase } = useSiteUI()
  return (
    <button type="button" className="btn-text" onClick={() => openCase(id)} aria-haspopup="dialog">
      {children}
      <ChevronRight size={14} />
    </button>
  )
}
