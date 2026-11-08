"use client"

/* Shared client state: theme, command palette, case-study sheet, toasts,
   keyboard shortcuts and scroll reveal. Sections stay server-rendered and
   reach this through useSiteUI(). */

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import type React from "react"
import { profile } from "@/content/site"
import { CommandPalette } from "@/components/command-palette"
import { CaseSheet } from "@/components/case-sheet"

type Theme = "light" | "dark"

type SiteUI = {
  paletteOpen: boolean
  openPalette: () => void
  closePalette: () => void
  caseId: string | null
  openCase: (id: string) => void
  closeCase: () => void
  toast: (message: string) => void
  toggleTheme: () => void
  followSystemTheme: () => void
  copyEmail: () => void
  isMac: boolean
}

const SiteUIContext = createContext<SiteUI | null>(null)

export function useSiteUI() {
  const ctx = useContext(SiteUIContext)
  if (!ctx) throw new Error("useSiteUI must be used inside <SiteUIProvider>")
  return ctx
}

function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme
  if (set === "light" || set === "dark") return set
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function store(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, value)
  } catch {
    /* private mode or storage blocked: the choice just won't persist */
  }
}

async function writeClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const area = document.createElement("textarea")
    area.value = text
    area.setAttribute("readonly", "")
    area.style.position = "fixed"
    area.style.opacity = "0"
    document.body.appendChild(area)
    area.select()
    const ok = document.execCommand("copy")
    area.remove()
    return ok
  }
}

export function SiteUIProvider({ children }: { children: React.ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [caseId, setCaseId] = useState<string | null>(null)
  const [toastState, setToastState] = useState<{ message: string; key: number } | null>(null)
  const [isMac, setIsMac] = useState(true)
  const toastTimer = useRef<number | undefined>(undefined)

  const toast = useCallback((message: string) => {
    window.clearTimeout(toastTimer.current)
    setToastState({ message, key: Date.now() })
    toastTimer.current = window.setTimeout(() => setToastState(null), 2400)
  }, [])

  const toggleTheme = useCallback(() => {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark"
    document.documentElement.dataset.theme = next
    store("theme", next)
  }, [])

  const followSystemTheme = useCallback(() => {
    delete document.documentElement.dataset.theme
    store("theme", null)
    toast("Following your system theme")
  }, [toast])

  const copyEmail = useCallback(async () => {
    const ok = await writeClipboard(profile.email)
    toast(ok ? "Email address copied" : profile.email)
  }, [toast])

  // Platform-specific shortcut label (⌘K vs Ctrl K).
  useEffect(() => {
    const platform = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform
    setIsMac(/mac|iphone|ipad/i.test(platform || navigator.platform || navigator.userAgent))
  }, [])

  // Global shortcuts: ⌘K / Ctrl+K toggles the palette, "/" opens it.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setPaletteOpen((open) => !open)
        return
      }
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const el = e.target as HTMLElement | null
        const typing = el && (el.isContentEditable || /^(input|textarea|select)$/i.test(el.tagName))
        if (!typing && !document.querySelector("dialog[open]")) {
          e.preventDefault()
          setPaletteOpen(true)
        }
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // Scroll reveal for anything marked data-reveal.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in")
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const value = useMemo<SiteUI>(
    () => ({
      paletteOpen,
      openPalette: () => setPaletteOpen(true),
      closePalette: () => setPaletteOpen(false),
      caseId,
      openCase: (id: string) => {
        setPaletteOpen(false)
        setCaseId(id)
      },
      closeCase: () => setCaseId(null),
      toast,
      toggleTheme,
      followSystemTheme,
      copyEmail,
      isMac,
    }),
    [paletteOpen, caseId, toast, toggleTheme, followSystemTheme, copyEmail, isMac],
  )

  return (
    <SiteUIContext.Provider value={value}>
      {children}
      <CommandPalette />
      <CaseSheet />
      <div className="toast-region" role="status" aria-live="polite">
        {toastState && (
          <div className="toast" key={toastState.key}>
            {toastState.message}
          </div>
        )}
      </div>
    </SiteUIContext.Provider>
  )
}

/* Shortcut hint that renders ⌘K on Apple devices and Ctrl K elsewhere. */
export function ShortcutHint({ className }: { className?: string }) {
  const { isMac } = useSiteUI()
  return (
    <kbd className={className} aria-hidden="true">
      {isMac ? "⌘K" : "Ctrl K"}
    </kbd>
  )
}
