import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, ExternalLink, Share2 } from "lucide-react"

const publications = [
  {
    title: "Classification of benign and malignant breast lesions in mammograms using dense-unified multiscale attention network and data-efficient image transformers",
    authors: " Gangatharan Idayachandiran,  R. Karthik, S. Paavankumar, Pulaparthi Penchala Deepthi Sri ,  T. Illakiya",
    venue: "",
    Published: "16 April 2025",
    abstract:
      "Breast cancer is a common and a serious health problem and it is the major cause of morbidity and mortality for women. Early detection of the disease is particularly challenging because abnormalities such as masses and microcalcifications exhibit subtle and diverse characteristics that are often difficult to identify in mammograms. In recent years, advancement in artificial intelligence, particularly deep learning (DL), has shown to improve diagnostic accuracy and early-stage tumor detection. This study aims to improve performance of DL models by considering both masses and microcalcifications in the proposed work to classify breast cancer abnormalities. The proposed work introduces a novel dual-track network that employs a combination of dense-unified multiscale attention fusion (UMAF) track and data-efficient image transformer (DeiT). The DeiT track processes the entire image simultaneously using patch embeddings, enabling them to capture multiscale representations and dependencies across the entire image. Simultaneously, the Dense-UMAF track focuses on extracting localized features while utilizing connectivity of DenseNet architecture to enable effective feature reuse. This approach generates relevant input features through residual connections of varying lengths, thereby effectively addressing the vanishing gradient problem. The UMAF improves feature extraction by capturing multiscale information, resulting in a better representation of the input data. This dual-track architecture is specifically designed to capture the characteristics of mass and calcification abnormalities in mammograms, which display both localized features and global contextual patterns. The proposed network was evaluated on the Curated Breast Imaging Subset of Digital Database for Screening Mammography dataset, obtaining a classification accuracy of 88.69%.",
    keywords: [
      "Breast Cancer",
      "Deep Learning",
      "Healthcare",
      "CNN",
      "Transformers",
      "PyTorch",
      "TnsorFlow",
      "Medical Imaging",
      "Mammography",
      "Image Classification",

    ],
    stats: {
      citations: "2",
      views: "400+",
    },
    status: ["Published", "Journal Paper"],
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
            Explore my research contributions and published works in the field of computer science, focusing on deep learning in healthcare domain.
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
                <div className="space-y-2">
                  <p className="text-muted-foreground leading-relaxed"> Published: {pub.Published}</p>
                </div>

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
                    <a href={`https://link.springer.com/article/10.1140/epjs/s11734-025-01618-8`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Paper
                    </a>
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
