"use client"

/* Command palette (⌘K / Ctrl+K, or "/"). Also serves as the menu on phones.
   Commands are built from content/site.ts, so new projects and links show
   up here automatically. */

import { useEffect, useMemo, useRef, useState } from "react"
import type React from "react"
import { links, projects, publication, site } from "@/content/site"
import {
  ArrowUpRight,
  Contrast,
  Copy,
  Download,
  FileText,
  GitHub,
  Hash,
  Layers,
  LinkedIn,
  Mail,
  Search,
} from "@/components/icons"
import { sections } from "@/components/nav"
import { useSiteUI } from "@/components/site-ui"
import { useAnimatedDialog } from "@/components/use-dialog"

type Group = "Jump to" | "Case studies" | "Actions" | "Links"
type Command = {
  id: string
  group: Group
  label: string
  keywords?: string
  hint?: string
  icon: React.ReactNode
  run: () => void
}

const GROUPS: Group[] = ["Jump to", "Case studies", "Actions", "Links"]

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function jumpTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  history.replaceState(null, "", `#${id}`)
  el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" })
  // Move keyboard focus to the section heading once the dialog has closed.
  window.setTimeout(() => {
    const heading = el.querySelector<HTMLElement>("h2, h3") ?? el
    heading.setAttribute("tabindex", "-1")
    heading.focus({ preventScroll: true })
  }, 0)
}

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer")
}

function download(href: string, filename: string) {
  const a = document.createElement("a")
  a.href = href
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
}

function score(cmd: Command, terms: string[]) {
  if (!terms.length) return 1
  const label = cmd.label.toLowerCase()
  const hay = `${label} ${cmd.keywords ?? ""} ${cmd.group}`.toLowerCase()
  if (!terms.every((t) => hay.includes(t))) return 0
  return label.startsWith(terms[0]) ? 3 : label.includes(terms[0]) ? 2 : 1
}

export function CommandPalette() {
  const { paletteOpen, closePalette, openCase, copyEmail, toggleTheme, followSystemTheme } = useSiteUI()
  const { ref, state, backdropProps } = useAnimatedDialog(paletteOpen, closePalette, 0)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)
  const input = useRef<HTMLInputElement>(null)
  const list = useRef<HTMLDivElement>(null)

  const commands = useMemo<Command[]>(
    () => [
      ...sections.map((s) => ({
        id: `go-${s.id}`,
        group: "Jump to" as const,
        label: s.label === "Work" ? "Selected work" : s.label,
        keywords: `section ${s.id} go scroll`,
        hint: `#${s.id}`,
        icon: <Hash size={15} />,
        run: () => jumpTo(s.id),
      })),
      {
        id: "go-education",
        group: "Jump to",
        label: "Education",
        keywords: "northeastern vit degree school",
        hint: "#education",
        icon: <Hash size={15} />,
        run: () => jumpTo("education"),
      },
      ...projects
        .filter((p) => p.caseStudy)
        .map((p) => ({
          id: `case-${p.id}`,
          group: "Case studies" as const,
          label: p.title,
          keywords: `project ${p.stack.join(" ")} ${p.kicker}`,
          hint: "Case study",
          icon: <Layers size={15} />,
          run: () => openCase(p.id),
        })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        keywords: "contact mail clipboard",
        icon: <Copy size={15} />,
        run: copyEmail,
      },
      {
        id: "resume",
        group: "Actions",
        label: "Download resume",
        keywords: "cv pdf",
        hint: "PDF",
        icon: <Download size={15} />,
        run: () => download(site.resume, "Gangatharan_Idayachandiran_Resume.pdf"),
      },
      {
        id: "theme",
        group: "Actions",
        label: "Toggle light / dark mode",
        keywords: "theme appearance color night",
        icon: <Contrast size={15} />,
        run: toggleTheme,
      },
      {
        id: "theme-system",
        group: "Actions",
        label: "Use system theme",
        keywords: "theme appearance auto reset",
        icon: <Contrast size={15} />,
        run: followSystemTheme,
      },
      {
        id: "email",
        group: "Links",
        label: "Send an email",
        keywords: "contact mail",
        hint: "mailto",
        icon: <Mail size={15} />,
        run: () => (window.location.href = links.email),
      },
      {
        id: "linkedin",
        group: "Links",
        label: "LinkedIn",
        keywords: "profile social",
        hint: "linkedin.com",
        icon: <LinkedIn size={15} />,
        run: () => openExternal(links.linkedin),
      },
      {
        id: "github",
        group: "Links",
        label: "GitHub",
        keywords: "code repos profile",
        hint: "github.com",
        icon: <GitHub size={15} />,
        run: () => openExternal(links.github),
      },
      {
        id: "paper",
        group: "Links",
        label: "Read the paper",
        keywords: "research springer publication mammogram",
        hint: "springer.com",
        icon: <FileText size={15} />,
        run: () => openExternal(publication.url),
      },
      ...projects
        .filter((p) => p.links.github)
        .map((p) => ({
          id: `repo-${p.id}`,
          group: "Links" as const,
          label: `${p.title} on GitHub`,
          keywords: `repo code ${p.stack.join(" ")}`,
          hint: "github.com",
          icon: <ArrowUpRight size={15} />,
          run: () => openExternal(p.links.github as string),
        })),
      {
        id: "source",
        group: "Links",
        label: "Source code for this site",
        keywords: "repo github next.js portfolio",
        hint: "github.com",
        icon: <ArrowUpRight size={15} />,
        run: () => openExternal(links.source),
      },
    ],
    [openCase, copyEmail, toggleTheme, followSystemTheme],
  )

  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const grouped = GROUPS.map((group) => ({
    group,
    items: commands
      .filter((c) => c.group === group)
      .map((c) => ({ c, s: score(c, terms) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .map((x) => x.c),
  })).filter((g) => g.items.length)
  const flat = grouped.flatMap((g) => g.items)
  const current = flat[Math.min(active, flat.length - 1)]

  // Fresh state each time the palette opens.
  useEffect(() => {
    if (paletteOpen) {
      setQuery("")
      setActive(0)
      input.current?.focus()
    }
  }, [paletteOpen])

  useEffect(() => setActive(0), [query])

  useEffect(() => {
    if (!current) return
    list.current?.querySelector(`#cmd-${current.id}`)?.scrollIntoView({ block: "nearest" })
  }, [current])

  function run(cmd: Command | undefined) {
    if (!cmd) return
    closePalette()
    cmd.run()
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const n = flat.length
    if (!n) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((i) => (i + 1) % n)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((i) => (i - 1 + n) % n)
    } else if (e.key === "Home" && e.ctrlKey) {
      e.preventDefault()
      setActive(0)
    } else if (e.key === "End" && e.ctrlKey) {
      e.preventDefault()
      setActive(n - 1)
    } else if (e.key === "Enter") {
      e.preventDefault()
      run(current)
    }
  }

  return (
    <dialog ref={ref} className="overlay palette" data-state={state} aria-label="Command menu" {...backdropProps}>
      <div className="palette-panel">
        <div className="palette-search">
          <Search size={18} />
          <input
            ref={input}
            className="palette-input"
            type="search"
            placeholder="Jump to a section, project or link…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-autocomplete="list"
            aria-activedescendant={current ? `cmd-${current.id}` : undefined}
            aria-label="Search commands"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <kbd>esc</kbd>
        </div>

        <div className="palette-list" id="palette-list" role="listbox" aria-label="Commands" ref={list}>
          {grouped.map(({ group, items }) => (
            <div key={group} role="group" aria-labelledby={`grp-${group.replace(/\W/g, "")}`}>
              <div id={`grp-${group.replace(/\W/g, "")}`} className="palette-group" role="presentation">
                {group}
              </div>
              {items.map((cmd) => {
                const selected = cmd === current
                return (
                  <div
                    key={cmd.id}
                    id={`cmd-${cmd.id}`}
                    role="option"
                    aria-selected={selected}
                    className="palette-item"
                    onMouseMove={() => !selected && setActive(flat.indexOf(cmd))}
                    onClick={() => run(cmd)}
                  >
                    <span className="palette-icon" aria-hidden="true">
                      {cmd.icon}
                    </span>
                    <span>{cmd.label}</span>
                    {cmd.hint && <span className="palette-hint">{cmd.hint}</span>}
                  </div>
                )
              })}
            </div>
          ))}
          {!flat.length && <p className="palette-empty">Nothing matches &ldquo;{query}&rdquo;.</p>}
        </div>

        <div className="palette-foot" aria-hidden="true">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> move
          </span>
          <span>
            <kbd>↵</kbd> open
          </span>
          <span>
            <kbd>esc</kbd> close
          </span>
        </div>
      </div>
    </dialog>
  )
}
