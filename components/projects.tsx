import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "Real-Estate-Management-System",
    description:
      "A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard. Built with modern technologies for optimal performance.",
    image: "/modern-ecommerce-dashboard.png",
    technologies: ["Python","Bootstrap", "Django", "MySQL", "Relational Databases", "Bootstrap","PyMySQL"],
    github: "https://github.com/dharancool/Real-Estate-Management-System-Project",
    live: "https://example.com",
  },
  {
    title: "Calendar Scheduling App",
    description:
      "Collaborative project management application with real-time updates, task tracking, and team communication features.",
    image: "/Calendar.png",
    technologies: ["Java", "MVC", "JUnit4", "Unit Testing", "Git","Java Swing","Code Coverage", "Object-Oriented Programming", "Code Review"],
    github: "https://github.com/dharancool/Calendar-Application",
    live: "https://example.com",
  },
  {
    title: "Portfolio Website",
    description:
      "A responsive portfolio website built with Next.js and Tailwind CSS, showcasing my projects and skills.",
    image: "/Portfolio_Site.png",
    technologies: ["Next.js","JavaScript", "TypeScript", "Tailwind CSS"],
    github: "https://github.com",
    live: "https://example.com",
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 mb-12">
          <h2 className="text-sm uppercase tracking-wider text-muted-foreground">Projects</h2>
          <h3 className="text-4xl sm:text-5xl font-bold text-balance">Featured Work</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="border-border bg-card overflow-hidden group hover:border-primary/50 transition-colors"
            >
              <div className="aspect-video overflow-hidden bg-secondary">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6 space-y-4">
                <h4 className="text-xl font-semibold text-foreground">{project.title}</h4>
                <p className="text-muted-foreground leading-relaxed text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" asChild>
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
