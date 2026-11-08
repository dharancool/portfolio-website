"use client"

/* Case-study sheet: slides up from the bottom like an iOS sheet.
   Close with the button, Esc, a click on the scrim, or by dragging the
   handle down. */

import { useEffect, useRef, useState } from "react"
import type React from "react"
import { projects, type Project } from "@/content/site"
import { ArrowRight, Close } from "@/components/icons"
import { Pipeline } from "@/components/pipeline"
import { hasLinks, ProjectLinks } from "@/components/project-links"
import { useSiteUI } from "@/components/site-ui"
import { useAnimatedDialog } from "@/components/use-dialog"

const studies = projects.filter((p) => p.caseStudy)
const DISMISS_PX = 110

export function CaseSheet() {
  const { caseId, closeCase, openCase } = useSiteUI()
  const current = studies.find((p) => p.id === caseId) ?? null
  // Keep rendering the last project while the sheet animates out.
  const [shown, setShown] = useState<Project | null>(null)
  const { ref, state, backdropProps } = useAnimatedDialog(current !== null, closeCase, 360)
  const panel = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const drag = useRef<{ startY: number; dy: number } | null>(null)

  useEffect(() => {
    if (current) setShown(current)
    scroller.current?.scrollTo({ top: 0 })
  }, [current])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || !panel.current) return
    drag.current = { startY: e.clientY, dy: 0 }
    e.currentTarget.setPointerCapture(e.pointerId)
    panel.current.style.transition = "none"
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current || !panel.current) return
    const raw = e.clientY - drag.current.startY
    // Resist upward drags, follow downward ones.
    const dy = raw < 0 ? raw / 6 : raw
    drag.current.dy = dy
    panel.current.style.transform = `translateY(${dy}px)`
  }

  const endDrag = () => {
    const d = drag.current
    drag.current = null
    if (!panel.current) return
    panel.current.style.transition = ""
    panel.current.style.transform = ""
    if (d && d.dy > DISMISS_PX) closeCase()
  }

  const index = shown ? studies.findIndex((p) => p.id === shown.id) : -1
  const next = index >= 0 ? studies[(index + 1) % studies.length] : null
  const cs = shown?.caseStudy

  return (
    <dialog ref={ref} className="overlay sheet" data-state={state} aria-labelledby="sheet-title" {...backdropProps}>
      <div className="sheet-panel" ref={panel}>
        <div
          className="sheet-grabber"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          aria-hidden="true"
        >
          <span className="sheet-handle" />
        </div>
        <button type="button" className="icon-btn sheet-close" onClick={closeCase} aria-label="Close case study">
          <Close size={16} />
        </button>

        {shown && cs && (
          <div className="sheet-scroll" ref={scroller}>
            <header className="sheet-head">
              <p className="mono project-kicker">{shown.kicker}</p>
              <h2 id="sheet-title" className="sheet-title">
                {shown.title}
              </h2>
              <p className="sheet-outcome">{shown.outcome}</p>

              <dl className="sheet-facts">
                {shown.metric && (
                  <div className="sheet-fact sheet-fact--metric">
                    <dt className="mono">Result</dt>
                    <dd>
                      <span className="metric-value">{shown.metric.value}</span>
                      <span className="mono metric-label">{shown.metric.label}</span>
                    </dd>
                  </div>
                )}
                <div className="sheet-fact">
                  <dt className="mono">Role</dt>
                  <dd>{shown.role}</dd>
                </div>
                <div className="sheet-fact">
                  <dt className="mono">Stack</dt>
                  <dd>
                    <ul className="chips" role="list">
                      {shown.stack.map((s) => (
                        <li key={s} className="chip">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>

              {hasLinks(shown) && (
                <div className="project-actions">
                  <ProjectLinks project={shown} />
                </div>
              )}
            </header>

            <section className="sheet-section">
              <h3 className="sheet-h">Problem</h3>
              <p>{cs.problem}</p>
            </section>

            <section className="sheet-section">
              <h3 className="sheet-h">Approach</h3>
              <ul className="sheet-list">
                {cs.approach.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </section>

            <section className="sheet-section">
              <h3 className="sheet-h">Architecture</h3>
              <Pipeline nodes={cs.architecture.nodes} highlight={cs.architecture.highlight} size="lg" />
              <p className="mono sheet-caption">{cs.architecture.caption}</p>
            </section>

            {shown.image && (
              <figure className="sheet-figure">
                <img
                  src={shown.image.src}
                  width={shown.image.width}
                  height={shown.image.height}
                  alt={shown.image.alt}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            )}

            <section className="sheet-section">
              <h3 className="sheet-h">Key decisions</h3>
              <ul className="sheet-list">
                {cs.decisions.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </section>

            <section className="sheet-section">
              <h3 className="sheet-h">Result</h3>
              <p>{cs.result}</p>
            </section>

            {shown.note && <p className="mono project-note">{shown.note}</p>}

            {next && next.id !== shown.id && (
              <button type="button" className="row sheet-next" onClick={() => openCase(next.id)}>
                <span>
                  <span className="mono muted">Next case study</span>
                  <span className="sheet-next-title">{next.title}</span>
                </span>
                <ArrowRight size={18} className="row-chevron" />
              </button>
            )}
          </div>
        )}
      </div>
    </dialog>
  )
}
