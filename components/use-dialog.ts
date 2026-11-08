"use client"

/* Drives a native <dialog> from React state with enter/exit animations.
   The dialog element provides focus trapping, Esc handling and an inert
   page behind it; CSS animates on [data-state]. */

import { useCallback, useEffect, useRef, useState } from "react"
import type React from "react"

type State = "closed" | "open" | "closing"

export function useAnimatedDialog(open: boolean, requestClose: () => void, exitMs = 320) {
  const ref = useRef<HTMLDialogElement>(null)
  const [state, setState] = useState<State>("closed")
  const openRef = useRef(open)
  const closeRef = useRef(requestClose)
  const downOnBackdrop = useRef(false)

  openRef.current = open
  closeRef.current = requestClose

  useEffect(() => {
    const d = ref.current
    if (!d) return

    if (open) {
      if (!d.open) d.showModal()
      // Two frames so the closed styles paint before the open transition starts.
      let inner = 0
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setState("open"))
      })
      return () => {
        cancelAnimationFrame(outer)
        cancelAnimationFrame(inner)
      }
    }

    if (!d.open) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!exitMs || reduce) {
      d.close()
      setState("closed")
      return
    }
    setState("closing")
    const t = window.setTimeout(() => {
      d.close()
      setState("closed")
    }, exitMs)
    return () => window.clearTimeout(t)
  }, [open, exitMs])

  // Esc fires "cancel": keep the dialog open long enough to animate out.
  // If the browser force-closes anyway, sync React state.
  useEffect(() => {
    const d = ref.current
    if (!d) return
    const onCancel = (e: Event) => {
      e.preventDefault()
      closeRef.current()
    }
    const onClose = () => {
      if (openRef.current) closeRef.current()
      setState("closed")
    }
    d.addEventListener("cancel", onCancel)
    d.addEventListener("close", onClose)
    return () => {
      d.removeEventListener("cancel", onCancel)
      d.removeEventListener("close", onClose)
    }
  }, [])

  // Close on a click that both starts and ends on the scrim (the dialog itself).
  const backdropProps = {
    onPointerDown: (e: React.PointerEvent) => {
      downOnBackdrop.current = e.target === e.currentTarget
    },
    onClick: useCallback((e: React.MouseEvent) => {
      if (downOnBackdrop.current && e.target === e.currentTarget) closeRef.current()
      downOnBackdrop.current = false
    }, []),
  }

  return { ref, state, backdropProps }
}
