import { about, profile } from "@/content/site"

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container about-grid">
        <figure className="about-photo" data-reveal>
          <img
            src={profile.portrait.src}
            width={profile.portrait.width}
            height={profile.portrait.height}
            alt={profile.portrait.alt}
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div className="about-copy" data-reveal>
          <h2 id="about-title" className="section-title">
            About
          </h2>
          {about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
