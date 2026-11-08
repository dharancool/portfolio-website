import { Fragment } from "react"
import { glance, profile, site } from "@/content/site"
import { ArrowRight, ChevronRight, Download } from "@/components/icons"
import { ShortcutHint } from "@/components/site-ui"

export function Hero() {
  const [first, ...rest] = profile.name.split(" ")

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="hero-id">
            <img
              className="hero-avatar"
              src={profile.headshot.src}
              width={profile.headshot.width}
              height={profile.headshot.height}
              alt={profile.headshot.alt}
              fetchPriority="high"
              decoding="async"
            />
            <p className="mono hero-tag">
              {/* Each part stays on one line, so wraps only happen at the separators. */}
              {profile.tagline.split(" · ").map((part, i, all) => (
                <Fragment key={part}>
                  <span>
                    {part}
                    {i < all.length - 1 && " ·"}
                  </span>
                  {i < all.length - 1 && " "}
                </Fragment>
              ))}
            </p>
          </div>
          <h1 id="hero-title" className="hero-name">
            <span>{first}</span> <span>{rest.join(" ")}</span>
          </h1>
          <p className="hero-headline">{profile.headline}</p>
          <p className="hero-intro">{profile.intro}</p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#work">
              View work
              <ArrowRight size={16} />
            </a>
            <a className="btn" href={site.resume} download="Gangatharan_Idayachandiran_Resume.pdf">
              <Download size={16} />
              Download resume
            </a>
          </div>

          <p className="hero-hint mono">
            <span>Press</span> <ShortcutHint /> <span>to jump anywhere</span>
          </p>
        </div>

        <aside className="hero-glance" aria-labelledby="glance-title" data-reveal>
          <h2 id="glance-title" className="group-label">
            At a glance
          </h2>
          <ul className="group" role="list">
            {glance.map((item) => (
              <li key={item.label}>
                <a className="row glance-row" href={item.href}>
                  <span className="mono glance-label">{item.label}</span>
                  <span className="glance-value">{item.value}</span>
                  <ChevronRight size={16} className="row-chevron" />
                </a>
              </li>
            ))}
          </ul>
          <p className="glance-status">
            <span className="status-dot" aria-hidden="true" />
            {profile.availability} · {profile.location}
          </p>
        </aside>
      </div>
    </section>
  )
}
