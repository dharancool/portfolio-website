import { Card, CardContent } from "@/components/ui/card";

const experiences = [
  {
    period: "Jun 2024 —  Jul 2024",
    title: "Research Intern",
    company: "Centre for Cyber Physical Systems - VIT Chennai",
    description: `
During my research internship, I designed and implemented a novel CNN–Transformer hybrid architecture to improve the classification accuracy of malignant and benign breast cancer cases using the CBIS-DDSM dataset. I conducted a comparative analysis of pretrained CNN and Transformer models to identify optimal components and integrate them into an efficient deep learning pipeline.

My work involved end-to-end data preprocessing, model training, and result visualization using NumPy, Matplotlib, and PyTorch, achieving performance improvements over baseline approaches. I actively participated in weekly research discussions to refine model design, optimize workflows, and iterate on implementation strategies.

In addition, I contributed significantly to authoring, reviewing, and revising the research manuscript, which ultimately led to the successful publication of our findings in Springer Nature’s *The European Physical Journal Special Topics*.
`,
    skills: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "Deep Learning",
      "CNN & Transformer Architectures",
      "Model Training & Evaluation",
      "Data Preprocessing & Cleaning",
      "Hyperparameter Tuning",
      "Experimental Design",
      "Performance Metrics & Analysis",
      "Research Publication & Manuscript Preparation",
    ],
  },

  {
    period: "Aug 2023 — Oct 2023",
    title: "Student Intern",
    company: "Wipro Ltd",
    description:
      "During my internship at Wipro, I worked on components of an internal GenAI-powered chat assistant developed to support presales teams by automating information retrieval and preliminary client interactions. I contributed to preparing conversational datasets by performing data cleaning, tokenization, text normalization, and basic feature extraction to improve model inputs. I also supported the training and evaluation of NLP models for intent classification and response generation, gaining hands-on experience with how conversational AI systems are built and tested in an enterprise environment. Additionally, I collaborated with the team in an agile workflow, participating in design discussions, testing cycles, and iterative improvements, which helped me understand real-world development practices for internal AI-driven business tools.",

    skills: [
      "Natural Language Processing",
      "Text Preprocessing",
      "Tokenization & Normalization",
      "Agile Methodologies",
    ],
  },
  {
    period: "2020 — 2022",
    title: "Frontend Developer",
    company: "Digital Agency",
    description:
      "Created responsive websites and web applications for clients across multiple industries. Collaborated with designers to implement pixel-perfect interfaces and ensure seamless user experiences.",
    skills: ["HTML", "CSS", "JavaScript", "Vue.js"],
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30"
    >
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4 mb-12">
          <h2 className="text-sm uppercase tracking-wider text-muted-foreground">
            Experience
          </h2>
          <h3 className="text-4xl sm:text-5xl font-bold text-balance">
            Professional Journey
          </h3>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className="border-border bg-card/50 backdrop-blur"
            >
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
                  <div className="text-sm text-muted-foreground whitespace-nowrap min-w-[140px]">
                    {exp.period}
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="text-xl font-semibold text-foreground">
                      {exp.title}
                    </h4>
                    <p className="text-primary font-medium">{exp.company}</p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4 sm:ml-[156px]">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2 sm:ml-[156px]">
                  {exp.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium bg-accent/20 text-accent rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
