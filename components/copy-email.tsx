"use client"

import { Copy } from "@/components/icons"
import { useSiteUI } from "@/components/site-ui"

export function CopyEmailButton() {
  const { copyEmail } = useSiteUI()
  return (
    <button type="button" className="icon-btn contact-copy" onClick={copyEmail} aria-label="Copy email address">
      <Copy size={16} />
    </button>
  )
}
