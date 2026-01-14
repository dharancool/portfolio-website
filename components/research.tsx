import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, ExternalLink, Share2 } from "lucide-react"

const publications = [
  {
    title: "Proof-of-Trust-in-Expertise (PoTE): A Consensus Mechanism for Healthcare based Consortium Blockchains",
    authors: "Your Name, Co-Author Name",
    venue: "Proceedings of the International Conference on Innovative Computing & Communication (ICICC 2024)",
    year: "2024",
    ssrn: "4804243",
    abstract:
      "The growing adoption of blockchain in healthcare promotes reliable patient data management. Establishing a consortium blockchain network interconnecting hospitals, diagnostic laboratories, and pharmaceutical entities ensures real-time tamper-evident access to patient records. This consortium model enhances data exchange efficiency and fortifies security through immutable audit trails. Beyond expediting emergency access to comprehensive medical histories, blockchains prevent authoritative data control and commercial exploitation. Patient empowerment and trust are pivotal, prompting our paper to introduce Proof-of-Trust-in-Expertise (PoTE), a consensus mechanism leveraging medical professionals' trust and expertise, an innovative departure from Proof-of-Work (PoW) and Proof-of-Stake (PoS).",
    keywords: [
      "Blockchain",
      "Consensus Mechanism",
      "Healthcare",
      "Proof-of-Trust",
      "Consortium Blockchain",
      "Trust Management",
    ],
    stats: {
      downloads: "50+",
      citations: "1",
      views: "300+",
    },
    status: ["Published", "Conference Paper"],
    statusColors: ["bg-emerald-500/10 text-emerald-400", "bg-blue-500/10 text-blue-400"],
  },
  // Add more publications here
]

export function Research() {
  return (
    <section id="research" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold">Research & Publications</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Exploring the frontiers of artificial intelligence through rigorous research, with focus on machine
            learning, computer vision, and practical AI applications.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-semibold">Published Research</h3>
          </div>

          {publications.map((pub, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 sm:p-8 hover:border-primary/50 transition-colors"
            >
              <div className="space-y-6">
                {/* Status Badges and Stats */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {pub.status.map((status, idx) => (
                      <Badge key={idx} className={pub.statusColors[idx]}>
                        {status}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-6 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{pub.stats.downloads}</div>
                      <div className="text-muted-foreground">Downloads</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{pub.stats.citations}</div>
                      <div className="text-muted-foreground">Citations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{pub.stats.views}</div>
                      <div className="text-muted-foreground">Views</div>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-xl sm:text-2xl font-semibold leading-snug">{pub.title}</h4>

                {/* Authors */}
                <p className="text-muted-foreground">{pub.authors}</p>

                {/* Venue */}
                <p className="text-sm text-muted-foreground">
                  {pub.venue} • {pub.year} • SSRN ID: {pub.ssrn}
                </p>

                {/* Abstract */}
                <div className="space-y-2">
                  <h5 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Abstract</h5>
                  <p className="text-muted-foreground leading-relaxed">{pub.abstract}</p>
                </div>

                {/* Keywords */}
                <div className="space-y-3">
                  <h5 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Keywords</h5>
                  <div className="flex flex-wrap gap-2">
                    {pub.keywords.map((keyword, idx) => (
                      <Badge key={idx} variant="secondary">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button asChild>
                    <a href={`https://ssrn.com/abstract=${pub.ssrn}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View on SSRN
                    </a>
                  </Button>
                  <Button variant="outline">
                    <Share2 className="mr-2 h-4 w-4" />
                    Cite Paper
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
