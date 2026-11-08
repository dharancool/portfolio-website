"use client"

/* Contact form, sent through EmailJS. Needs these env vars on Netlify:
   NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY. Template params: from_name, from_email, message. */

import { useState } from "react"
import type React from "react"
import { profile } from "@/content/site"

type Status = { kind: "idle" | "sending" | "sent" | "error"; message: string }

const SERVICE = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
const TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle", message: "" })

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot: real people never fill this hidden field.
    if (data.get("company")) {
      form.reset()
      setStatus({ kind: "sent", message: "Thanks, your message is on its way." })
      return
    }

    if (!SERVICE || !TEMPLATE || !PUBLIC_KEY) {
      setStatus({ kind: "error", message: `The form isn't set up yet. Please email me at ${profile.email}.` })
      return
    }

    setStatus({ kind: "sending", message: "Sending…" })
    try {
      const emailjs = (await import("@emailjs/browser")).default
      await emailjs.send(
        SERVICE,
        TEMPLATE,
        {
          from_name: String(data.get("name") ?? ""),
          from_email: String(data.get("email") ?? ""),
          message: String(data.get("message") ?? ""),
        },
        { publicKey: PUBLIC_KEY },
      )
      form.reset()
      setStatus({ kind: "sent", message: "Thanks, your message is on its way. I'll reply by email." })
    } catch {
      setStatus({ kind: "error", message: `That didn't send. Please email me directly at ${profile.email}.` })
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} aria-labelledby="form-title">
      <h3 id="form-title" className="group-label">
        Or send a message
      </h3>
      <div className="group form-group">
        <label className="field">
          <span className="mono muted">Name</span>
          <input name="name" type="text" autoComplete="name" required maxLength={120} />
        </label>
        <label className="field">
          <span className="mono muted">Email</span>
          <input name="email" type="email" autoComplete="email" required maxLength={200} />
        </label>
        <label className="field">
          <span className="mono muted">Message</span>
          <textarea name="message" rows={5} required maxLength={5000} />
        </label>
        <label className="sr-only" aria-hidden="true">
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button type="submit" className="btn btn-primary form-submit" disabled={status.kind === "sending"}>
        {status.kind === "sending" ? "Sending…" : "Send message"}
      </button>
      <p className={`form-status form-status--${status.kind}`} role="status" aria-live="polite">
        {status.kind !== "sending" ? status.message : ""}
      </p>
    </form>
  )
}
