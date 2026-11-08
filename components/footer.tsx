import { links, profile } from "@/content/site"
import { ShortcutHint } from "@/components/site-ui"

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <ul className="footer-links" role="list">
          <li>
            <a href={links.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={links.source} target="_blank" rel="noopener noreferrer">
              Source
            </a>
          </li>
          <li className="footer-hint">
            <ShortcutHint /> <span>menu</span>
          </li>
        </ul>
      </div>
    </footer>
  )
}
