const skillCategories = [
  {
    name: "Frontend",
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"],
  },
  {
    name: "Tools & Others",
    skills: ["Git", "Docker", "AWS", "Vercel", "Figma", "Jest", "CI/CD", "Agile"],
  },
]

export function Skills() {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4 mb-12">
          <h2 className="text-sm uppercase tracking-wider text-muted-foreground">Skills</h2>
          <h3 className="text-4xl sm:text-5xl font-bold text-balance">Technologies & Tools</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="space-y-4">
              <h4 className="text-xl font-semibold text-foreground border-b border-border pb-2">{category.name}</h4>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-2 text-sm font-medium bg-card border border-border text-card-foreground rounded-lg hover:border-primary/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
