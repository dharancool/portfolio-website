import type React from "react"
import type { Project } from "@/content/site"
import { ArrowUpRight, FileText, GitHub, Play } from "@/components/icons"

export const hasLinks = (p: Project) => Object.values(p.links).some(Boolean)

/* Renders only the links that exist. Set a link to null in content/site.ts to hide it. */
export function ProjectLinks({ project }: { project: Project }) {
  const { live, github, video, writeup } = project.links
  const items = [
    live && { href: live, label: "Live demo", icon: <ArrowUpRight size={14} /> },
    github && { href: github, label: "GitHub", icon: <GitHub size={14} /> },
    video && { href: video, label: "Video", icon: <Play size={14} /> },
    writeup && { href: writeup, label: "Write-up", icon: <FileText size={14} /> },
  ].filter(Boolean) as { href: string; label: string; icon: React.ReactNode }[]

  if (!items.length) return null

  return (
    <>
      {items.map((item) => (
        <a
          key={item.label}
          className="btn btn-sm"
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title}: ${item.label} (opens in a new tab)`}
        >
          {item.icon}
          {item.label}
        </a>
      ))}
    </>
  )
}
