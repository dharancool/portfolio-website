import { education, experience } from "@/content/site"
import { CaseLink } from "@/components/case-link"

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <div className="section-head" data-reveal>
          <div>
            <h2 id="experience-title" className="section-title">
              Experience
            </h2>
            <p className="section-lede">Two current roles alongside my master&apos;s, and the research internship before them.</p>
          </div>
        </div>

        <ol className="card timeline" role="list" data-reveal>
          {experience.map((job) => {
            const current = job.period.includes("Present")
            return (
              <li key={job.company} className="job">
                <div className="job-meta">
                  <p className="mono job-period">
                    {current && (
                      <span className="job-now">
                        <span className="status-dot" aria-hidden="true" />
                        Now
                      </span>
                    )}
                    {job.period}
                  </p>
                  <p className="mono muted">{job.location}</p>
                </div>
                <div className="job-body">
                  <h3 className="job-company">{job.company}</h3>
                  <p className="job-role">{job.role}</p>
                  <ul className="job-points">
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  {job.caseStudy && <CaseLink id={job.caseStudy}>Read the case study</CaseLink>}
                </div>
              </li>
            )
          })}
        </ol>

        <div id="education" className="edu" data-reveal>
          <h3 className="group-label">Education</h3>
          <ul className="group" role="list">
            {education.map((e) => (
              <li key={e.school}>
                <div className="row edu-row">
                  <div className="edu-text">
                    <p className="edu-school">{e.school}</p>
                    <p className="edu-degree">{e.degree}</p>
                    {e.detail && <p className="mono muted edu-detail">{e.detail}</p>}
                  </div>
                  <p className="mono muted edu-period">{e.period}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
