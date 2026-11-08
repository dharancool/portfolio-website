import { certifications, skills } from "@/content/site"

export function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <div className="section-head" data-reveal>
          <div>
            <h2 id="skills-title" className="section-title">
              Skills
            </h2>
            <p className="section-lede">What I use day to day, grouped by where it sits in the stack.</p>
          </div>
        </div>

        <div className="skills-grid" data-reveal>
          <dl className="group skills-list">
            {skills.map((s) => (
              <div key={s.group} className="row skill-row">
                <dt className="mono skill-group">{s.group}</dt>
                <dd className="skill-items">{s.items.join(", ")}</dd>
              </div>
            ))}
          </dl>

          <div className="certs">
            <h3 className="group-label">Certified</h3>
            <ul className="group" role="list">
              {certifications.map((c) => (
                <li key={c} className="row cert-row">
                  <span className="cert-mark" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="m2.5 6.2 2.3 2.3 4.7-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
