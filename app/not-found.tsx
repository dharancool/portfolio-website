import type { Metadata } from "next"

export const metadata: Metadata = { title: "Page not found", robots: { index: false } }

export default function NotFound() {
  return (
    <main id="main" className="container not-found">
      <p className="mono muted">404</p>
      <h1 className="section-title">Nothing here.</h1>
      <p className="section-lede">The page you were looking for doesn&apos;t exist, or it moved.</p>
      <a className="btn btn-primary" href="/">
        Back to the homepage
      </a>
    </main>
  )
}
