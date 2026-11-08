import { publication as paper } from "@/content/site"
import { ArrowUpRight } from "@/components/icons"

export function Research() {
  return (
    <section id="research" className="section" aria-labelledby="research-title">
      <div className="container">
        <div className="section-head" data-reveal>
          <div>
            <h2 id="research-title" className="section-title">
              Research
            </h2>
            <p className="section-lede">A peer-reviewed paper from my undergraduate research internship.</p>
          </div>
        </div>

        <article className="card paper" aria-labelledby="paper-title" data-reveal>
          <p className="mono paper-venue">
            {paper.venue} · {paper.publisher} · {paper.date}
          </p>
          <h3 id="paper-title" className="paper-title">
            {paper.title}
          </h3>
          <p className="mono muted paper-authors">{paper.authors}</p>
          <p className="paper-summary">{paper.summary}</p>

          <dl className="paper-results">
            {paper.results.map((r) => (
              <div key={r.label} className="paper-result">
                <dt className="mono">{r.label}</dt>
                <dd className="paper-value">{r.value}</dd>
              </div>
            ))}
          </dl>

          <a className="btn btn-primary" href={paper.url} target="_blank" rel="noopener noreferrer">
            Read the paper on Springer
            <ArrowUpRight size={16} />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </article>
      </div>
    </section>
  )
}
