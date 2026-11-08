"use client"

import { useLayoutEffect, useRef, useState } from "react"
import type React from "react"
import { categories, projects, type Category, type Project } from "@/content/site"
import { ArrowUpRight, ChevronRight } from "@/components/icons"
import { Pipeline } from "@/components/pipeline"
import { ProjectLinks } from "@/components/project-links"
import { useSiteUI } from "@/components/site-ui"

type Filter = "all" | Category

export function Work() {
  const [filter, setFilter] = useState<Filter>("all")
  const visible = projects.filter((p) => filter === "all" || p.categories.includes(filter))
  const cards = visible.filter((p) => p.caseStudy)
  const more = visible.filter((p) => !p.caseStudy)

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <div className="section-head" data-reveal>
          <div>
            <h2 id="work-title" className="section-title">
              Selected work
            </h2>
            <p className="section-lede">What I built, how, and what changed. Open a project for the full write-up.</p>
          </div>
          <Segmented value={filter} onChange={setFilter} />
        </div>

        <p className="sr-only" aria-live="polite">
          {`Showing ${visible.length} ${visible.length === 1 ? "project" : "projects"}`}
        </p>

        <div className="work-grid" data-reveal>
          {cards.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>

        {more.length > 0 && (
          <div className="work-more">
            <h3 className="group-label">Also built</h3>
            <ul className="group" role="list">
              {more.map((p) => (
                <li key={p.id}>
                  <MoreRow project={p} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

/* iOS-style segmented control. Buttons with aria-pressed; the thumb slides
   to the active segment. */
function Segmented({ value, onChange }: { value: Filter; onChange: (f: Filter) => void }) {
  const wrap = useRef<HTMLDivElement>(null)
  const [thumb, setThumb] = useState<{ x: number; w: number } | null>(null)

  useLayoutEffect(() => {
    const measure = () => {
      const el = wrap.current?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')
      if (el) setThumb({ x: el.offsetLeft, w: el.offsetWidth })
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [value])

  return (
    <div className="segmented" role="group" aria-label="Filter projects" ref={wrap}>
      {thumb && (
        <span
          className="segmented-thumb"
          aria-hidden="true"
          style={{ transform: `translateX(${thumb.x}px)`, width: thumb.w } as React.CSSProperties}
        />
      )}
      {categories.map((c) => (
        <button
          key={c.id}
          type="button"
          className="segmented-item"
          aria-pressed={value === c.id}
          onClick={() => onChange(c.id)}
        >
          {c.label}
        </button>
      ))}
    </div>
  )
}

function ProjectCard({ project: p }: { project: Project }) {
  const { openCase } = useSiteUI()

  // Clicking anywhere on the card opens the write-up; links and buttons keep their own behavior.
  const onCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a, button")) return
    if (window.getSelection()?.toString()) return
    openCase(p.id)
  }

  return (
    <article
      className={`card project${p.featured ? " project--featured" : ""}`}
      aria-labelledby={`${p.id}-title`}
      onClick={onCardClick}
    >
      <div className="project-body">
        <p className="mono project-kicker">{p.kicker}</p>
        <h3 id={`${p.id}-title`} className="project-title">
          {p.title}
        </h3>
        <p className="project-outcome">{p.outcome}</p>

        {!p.featured && p.caseStudy && <Pipeline nodes={p.caseStudy.architecture.nodes} highlight={p.caseStudy.architecture.highlight} />}

        <dl className="project-meta">
          <dt className="mono">Role</dt>
          <dd>{p.role}</dd>
        </dl>

        <ul className="chips" aria-label="Stack">
          {p.stack.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>

        <div className="project-actions">
          <button type="button" className="btn btn-sm btn-primary" onClick={() => openCase(p.id)} aria-haspopup="dialog">
            Read case study
            <ChevronRight size={14} />
          </button>
          <ProjectLinks project={p} />
        </div>
        {p.note && <p className="mono project-note">{p.note}</p>}
      </div>

      {p.featured && p.caseStudy && (
        <div className="project-visual">
          {p.metric && (
            <p className="metric">
              <span className="metric-value">{p.metric.value}</span>
              <span className="mono metric-label">{p.metric.label}</span>
            </p>
          )}
          <Pipeline
            nodes={p.caseStudy.architecture.nodes}
            highlight={p.caseStudy.architecture.highlight}
            size="stack"
            live
          />
        </div>
      )}
    </article>
  )
}

function MoreRow({ project: p }: { project: Project }) {
  const href = p.links.github ?? p.links.live
  const inner = (
    <>
      {p.image && (
        <img
          className="more-thumb"
          src={p.image.src}
          width={p.image.width}
          height={p.image.height}
          alt=""
          loading="lazy"
          decoding="async"
        />
      )}
      <span className="more-text">
        <span className="more-title">{p.title}</span>
        <span className="mono muted">{p.kicker}</span>
        <span className="more-outcome">{p.outcome}</span>
        <span className="mono more-stack">{p.stack.join(" · ")}</span>
        {href && <span className="sr-only"> (GitHub, opens in a new tab)</span>}
      </span>
      {href && <ArrowUpRight size={16} className="row-chevron" />}
    </>
  )

  return href ? (
    <a className="row more-row" href={href} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <div className="row more-row">{inner}</div>
  )
}
