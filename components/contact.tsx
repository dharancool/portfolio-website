import { links, profile, site } from "@/content/site"
import { ArrowUpRight, ChevronRight, Download, GitHub, LinkedIn, Mail } from "@/components/icons"
import { ContactForm } from "@/components/contact-form"
import { CopyEmailButton } from "@/components/copy-email"

const rows = [
  { label: "LinkedIn", value: "linkedin.com/in/gangatharan08", href: links.linkedin, icon: <LinkedIn size={16} />, external: true },
  { label: "GitHub", value: "github.com/dharancool", href: links.github, icon: <GitHub size={16} />, external: true },
]

export function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <div className="section-head" data-reveal>
          <div>
            <h2 id="contact-title" className="section-title">
              Contact
            </h2>
            <p className="section-lede">
              I&apos;m looking for full-time software and AI/ML engineering roles starting May 2027. Email is the fastest
              way to reach me.
            </p>
          </div>
        </div>

        <div className="contact-grid" data-reveal>
          <div>
            <ul className="group" role="list">
              <li className="contact-email">
                <a className="row contact-row" href={links.email}>
                  <span className="contact-icon">
                    <Mail size={16} />
                  </span>
                  <span className="contact-text">
                    <span className="mono muted">Email</span>
                    <span className="contact-value">{profile.email}</span>
                  </span>
                </a>
                <CopyEmailButton />
              </li>
              {rows.map((r) => (
                <li key={r.label}>
                  <a className="row contact-row" href={r.href} target="_blank" rel="noopener noreferrer">
                    <span className="contact-icon">{r.icon}</span>
                    <span className="contact-text">
                      <span className="mono muted">{r.label}</span>
                      <span className="contact-value">{r.value}</span>
                    </span>
                    <ArrowUpRight size={16} className="row-chevron" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li>
                <a className="row contact-row" href={site.resume} download="Gangatharan_Idayachandiran_Resume.pdf">
                  <span className="contact-icon">
                    <Download size={16} />
                  </span>
                  <span className="contact-text">
                    <span className="mono muted">Resume</span>
                    <span className="contact-value">Download PDF</span>
                  </span>
                  <ChevronRight size={16} className="row-chevron" />
                </a>
              </li>
            </ul>
            <p className="mono muted contact-location">Based in {profile.location}</p>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}
