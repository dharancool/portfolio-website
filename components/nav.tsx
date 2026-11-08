"use client"

import { useEffect, useState } from "react"
import { profile } from "@/content/site"
import { Moon, Search, Sun } from "@/components/icons"
import { ShortcutHint, useSiteUI } from "@/components/site-ui"

export const sections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "research", label: "Research" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
]

export function Nav() {
  const { openPalette, toggleTheme } = useSiteUI()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Highlight the section currently crossing the middle of the viewport.
  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)
    if (!targets.length || !("IntersectionObserver" in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    targets.forEach((el) => io.observe(el))
    const onTop = () => window.scrollY < 200 && setActive(null)
    window.addEventListener("scroll", onTop, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener("scroll", onTop)
    }
  }, [])

  return (
    <header className="nav" data-scrolled={scrolled}>
      <nav className="container nav-inner" aria-label="Primary">
        <a href="#top" className="nav-brand">
          {profile.shortName}
        </a>

        <ul className="nav-links" role="list">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="nav-link" aria-current={active === s.id ? "true" : undefined}>
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button type="button" className="nav-search" onClick={openPalette} aria-haspopup="dialog" aria-label="Open command menu">
            <Search size={15} />
            <span className="nav-search-label nav-search-label--wide">Search</span>
            <span className="nav-search-label nav-search-label--narrow">Menu</span>
            <ShortcutHint className="nav-search-kbd" />
          </button>
          <button type="button" className="icon-btn theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
            <Sun className="theme-icon theme-icon--sun" />
            <Moon className="theme-icon theme-icon--moon" />
          </button>
        </div>
      </nav>
    </header>
  )
}
