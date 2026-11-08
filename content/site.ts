/* =============================================================================
   SITE CONTENT: edit this file to update the website.

   Every piece of text, every link, project and job on the site comes from
   here. Components never hardcode content, so you should not need to touch
   anything in /components to change what the site says.

   - Leave a link as `null` to hide its button.
   - Lines marked `TODO:` are things only you can fill in.
   - Keep facts in sync with Gangatharan_Idayachandiran_Resume.pdf.
   ========================================================================== */

export const site = {
  url: "https://gangatharan.netlify.app",
  title: "Gangatharan Idayachandiran: Software Engineer, Applied AI on AWS",
  description:
    "Software engineer building applied AI and full-stack products on AWS. M.S. Computer Science at Northeastern, graduating May 2027. Open to full-time software and AI/ML engineering roles.",
  // The resume lives in /public. Replace the file, keep the name.
  resume: "/Gangatharan_Idayachandiran_Resume.pdf",
}

export const profile = {
  name: "Gangatharan Idayachandiran",
  shortName: "Gangatharan",
  role: "Software engineer",
  tagline: "Software engineer · Applied AI · AWS",
  headline: "I build applied AI and full-stack products on AWS.",
  intro:
    "I'm a software engineering intern at TensorIoT, where I cut an edge-to-cloud AI pipeline's response time from 8s to 4s. I'm finishing an M.S. in Computer Science at Northeastern in May 2027 and looking for full-time software and AI/ML engineering roles.",
  location: "Boston, MA",
  availability: "Open to full-time roles from May 2027",
  email: "gangatharan8403@gmail.com",
  portrait: {
    src: "/images/portrait.webp",
    width: 535,
    height: 1024,
    alt: "Gangatharan in a dark suit, standing outdoors in front of trees",
  },
}

export const links = {
  github: "https://github.com/dharancool",
  linkedin: "https://www.linkedin.com/in/gangatharan08/",
  email: `mailto:${profile.email}`,
  source: "https://github.com/dharancool/portfolio-website",
}

/* The "at a glance" list beside the hero. `href` jumps to a section. */
export const glance = [
  { label: "Now", value: "Software Engineering Intern, TensorIoT", href: "#experience" },
  { label: "Leading", value: "Web team, NU Launch Labs", href: "#experience" },
  { label: "Studying", value: "M.S. CS, Northeastern · 3.60 GPA", href: "#education" },
  { label: "Published", value: "EPJ Special Topics, Springer 2025", href: "#research" },
  { label: "Certified", value: "AWS Cloud Practitioner · Azure AZ-104", href: "#skills" },
]

/* ---------------------------------------------------------------------------
   PROJECTS
   Order = display order. `categories` drives the filter above the grid.
   Add `caseStudy` to make a card open the full write-up sheet.
--------------------------------------------------------------------------- */

export type Category = "ai-cloud" | "full-stack" | "apps"

export const categories: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai-cloud", label: "AI & cloud" },
  { id: "full-stack", label: "Full-stack" },
  { id: "apps", label: "Mobile & desktop" },
]

export type Project = {
  id: string
  title: string
  kicker: string
  outcome: string
  role: string
  stack: string[]
  categories: Category[]
  featured?: boolean
  metric?: { value: string; label: string }
  note?: string
  links: { live: string | null; github: string | null; video: string | null; writeup?: string | null }
  image?: { src: string; width: number; height: number; alt: string }
  caseStudy?: {
    problem: string
    approach: string[]
    architecture: { nodes: string[]; highlight?: number; caption: string }
    decisions: string[]
    result: string
  }
}

export const projects: Project[] = [
  {
    id: "edge-ai-pipeline",
    title: "Edge-to-cloud AI pipeline",
    kicker: "TensorIoT · Client work · 2026",
    outcome:
      "Camera-to-spoken-response latency went from 8s to 4s on a retail security platform.",
    role: "Architecture, operator console, observability",
    stack: ["IoT Core", "MQTT", "Lambda", "Bedrock", "Polly", "CDK", "React", "DynamoDB"],
    categories: ["ai-cloud", "full-stack"],
    featured: true,
    metric: { value: "8s → 4s", label: "camera to spoken response" },
    note: "Client work. Details stay at the level of my resume.",
    links: { live: null, github: null, video: null },
    caseStudy: {
      problem:
        "A retail security platform turns what its edge cameras see into a spoken response. End to end, that took about 8 seconds, against a 2-second SLA.",
      approach: [
        "Architected the edge-to-cloud pipeline on AWS with IoT Core over MQTT, Lambda, Bedrock and Polly, defined in CDK.",
        "Built the multi-tenant operator console and customer dashboard on React, Lambda and DynamoDB, with MFA, role-based access, branded onboarding emails and an embedded third-party payment integration.",
        "Added per-stage latency and cost tracking, CloudWatch alerting, and DynamoDB and Redshift audit logging for multiple partners sharing the database.",
        "Set up a CI pipeline that scans commits for hardcoded secrets (TruffleHog, Gitleaks) and runs Playwright smoke tests before deployment.",
      ],
      architecture: {
        nodes: ["Edge devices", "IoT Core / MQTT", "Lambda", "Bedrock + Polly", "React console"],
        highlight: 3,
        caption: "Events flow from the edge to a spoken response and the operator console.",
      },
      decisions: [
        "Every stage reports its own latency and cost, so each hop has a number attached.",
        "I led design reviews with the client's executives and owned the technical decisions.",
      ],
      result:
        "Latency dropped from 8s to 4s, toward the 2s SLA, and CI catches hardcoded secrets and failing smoke tests before deployment.",
    },
  },
  {
    id: "ledger",
    title: "Ledger",
    kicker: "Project · 2026",
    outcome:
      "A bill-splitting app where every phone shows the same balances, because the server does the math.",
    role: "Schema, REST API, mobile app, deployment",
    stack: ["React Native", "Spring Boot", "PostgreSQL", "JWT", "Render"],
    categories: ["full-stack", "apps"],
    // TODO: add the Render live URL, a demo video, and a GitHub link if you make the repo public.
    links: { live: null, github: null, video: null },
    caseStudy: {
      problem:
        "Group expenses get messy when each phone works out balances on its own. I wanted one answer to \"who owes what\", no matter which device asks.",
      approach: [
        "React Native app for creating groups, logging shared expenses and settling up.",
        "Spring Boot REST API over PostgreSQL. I designed the schema and the endpoints.",
        "Deployed on Render and tested end to end on real devices.",
      ],
      architecture: {
        nodes: ["React Native app", "Spring Boot REST API", "PostgreSQL"],
        highlight: 1,
        caption: "Balances are computed server-side. Clients only render them.",
      },
      decisions: [
        "Balances are computed on the server, so every device sees the same settlement state.",
        "JWT auth with refresh-token rotation and hashed credentials.",
      ],
      result: "A working app on Render, tested on real phones, with one source of truth for every balance.",
    },
  },
  {
    id: "real-estate",
    title: "Real Estate Management System",
    kicker: "Project · Fall 2025",
    outcome:
      "A property management app whose business rules live in the database, in raw SQL instead of the ORM.",
    role: "Data layer, access control, deployment",
    stack: ["Python", "Django", "MySQL", "PyMySQL", "GitHub Actions", "Railway"],
    categories: ["full-stack"],
    // TODO: add the Railway live URL and a demo video.
    links: {
      live: null,
      github: "https://github.com/dharancool/Real-Estate-Management-System-Project",
      video: null,
    },
    image: {
      src: "/images/real-estate.webp",
      width: 1600,
      height: 862,
      alt: "Real estate app home page with a property search banner and featured listings",
    },
    caseStudy: {
      problem:
        "Build a property management web app for admins, agents and clients, with the data layer written in raw SQL rather than the Django ORM.",
      approach: [
        "Designed a 3NF schema of 10+ tables.",
        "Wrote stored procedures, triggers and user-defined functions, called through PyMySQL.",
        "Added role-based access for Admin, Agent and Client, CSRF protection, multi-filter property search and an analytics dashboard.",
      ],
      architecture: {
        nodes: ["Django views", "PyMySQL (raw SQL)", "MySQL procedures + triggers"],
        highlight: 2,
        caption: "Business rules are enforced at the query level, not in Python.",
      },
      decisions: [
        "Rules live in the database, so they hold no matter which code path writes the data.",
        "GitHub Actions handles CI/CD, and the app deploys to Railway.",
      ],
      result: "Deployed on Railway with a working CI/CD pipeline.",
    },
  },
  {
    id: "calendar",
    title: "Calendar app",
    kicker: "Course project · Fall 2025",
    outcome:
      "Multi-calendar Java app with timezone-aware events, recurring series, conflict detection and CSV/iCal export.",
    role: "Co-developer on a two-person team",
    stack: ["Java", "Swing", "MVC", "JUnit", "Gradle"],
    categories: ["apps"],
    links: { live: null, github: "https://github.com/dharancool/Calendar-Application", video: null },
    image: {
      src: "/images/calendar.webp",
      width: 1400,
      height: 943,
      alt: "Java Swing calendar window showing December 2025 with a day selected",
    },
  },
]

/* ---------------------------------------------------------------------------
   EXPERIENCE: newest first. `caseStudy` links a role to a project sheet.
--------------------------------------------------------------------------- */

export const experience = [
  {
    company: "TensorIoT",
    role: "Software Engineering Intern",
    period: "Jun 2026 – Present",
    location: "Boston, MA",
    caseStudy: "edge-ai-pipeline",
    points: [
      "Architected an edge-to-cloud AI pipeline on AWS for a retail security platform. Cut camera-to-spoken-response latency from 8s to 4s, toward a 2s SLA.",
      "Built the multi-tenant operator console and customer dashboard (React, Lambda, DynamoDB) with MFA, role-based access and embedded payments.",
      "Added per-stage latency and cost tracking, CloudWatch alerting, and DynamoDB and Redshift audit logging.",
      "Set up CI that catches hardcoded secrets (TruffleHog, Gitleaks) and runs Playwright smoke tests before deployment.",
      "Led design reviews with client executives.",
    ],
  },
  {
    company: "NU Launch Labs",
    role: "Web Development Lead",
    period: "Sep 2026 – Present",
    location: "Boston, MA",
    caseStudy: null,
    points: [
      "Lead a small team building the Launch Labs site for ~8,000 CS and research students. I own the specs, the data model and the phased delivery plan.",
      "Building a WCAG 2.1 AA front end on Next.js, TypeScript and Sanity, with an event calendar and a Postgres-backed RSVP flow with capacity limits and duplicate prevention.",
    ],
  },
  {
    company: "Centre for Cyber Physical Systems, VIT",
    role: "Research Intern",
    period: "Jun – Jul 2024",
    location: "Chennai, India",
    caseStudy: null,
    points: [
      "Designed a CNN-Transformer hybrid in PyTorch for mammogram classification: 88.69% accuracy and 0.95 AUC on CBIS-DDSM, 92.86% on the independent MIAS set.",
      "Co-authored the paper, published by Springer in 2025.",
    ],
  },
]

export const education = [
  {
    school: "Northeastern University, Khoury College",
    degree: "M.S. Computer Science · GPA 3.60",
    period: "Sep 2025 – May 2027",
    detail: "Data Structures & Algorithms, Database Management Systems, Cloud Computing, Programming Design Paradigms",
  },
  {
    school: "Vellore Institute of Technology, Chennai",
    degree: "B.Tech Computer Science and Engineering (AI & ML)",
    period: "Sep 2021 – Apr 2025",
    detail: null,
  },
]

/* ---------------------------------------------------------------------------
   SKILLS: plain grouped lists. No ratings, on purpose.
--------------------------------------------------------------------------- */

export const skills = [
  { group: "Languages", items: ["Java", "Python", "TypeScript", "JavaScript", "SQL", "HTML", "CSS"] },
  {
    group: "Frameworks",
    items: ["Spring Boot", "Django", "FastAPI", "React", "Next.js", "React Native", "PyTorch", "scikit-learn", "Pandas", "NumPy"],
  },
  {
    group: "AWS",
    items: ["CDK", "Lambda", "IoT Core", "API Gateway", "Bedrock", "Polly", "SageMaker", "CloudWatch", "S3", "IAM"],
  },
  { group: "Databases", items: ["PostgreSQL", "MySQL", "DynamoDB", "Redshift"] },
  {
    group: "Testing & CI/CD",
    items: ["JUnit 5", "Playwright", "Postman", "GitHub Actions", "TruffleHog", "Gitleaks"],
  },
  { group: "Tools", items: ["Git", "Docker", "Cursor", "Claude Code"] },
]

export const certifications = [
  "AWS Certified Cloud Practitioner",
  "Microsoft Azure Administrator Associate (AZ-104)",
]

/* ---------------------------------------------------------------------------
   RESEARCH
--------------------------------------------------------------------------- */

export const publication = {
  title:
    "Classification of benign and malignant breast lesions in mammograms using dense-unified multiscale attention network and data-efficient image transformers",
  venue: "The European Physical Journal Special Topics",
  publisher: "Springer",
  date: "April 2025",
  authors: "G. Idayachandiran, R. Karthik, S. Paavankumar, P. P. Deepthi Sri, T. Illakiya",
  summary:
    "A two-track network for mammograms. A DenseNet-based track with multiscale attention picks up local detail, and a data-efficient image transformer reads global context. I benchmarked the candidate models, built the PyTorch pipeline end to end, added SHAP explainability and co-wrote the paper.",
  url: "https://link.springer.com/article/10.1140/epjs/s11734-025-01618-8",
  results: [
    { value: "88.69%", label: "accuracy, CBIS-DDSM" },
    { value: "0.95", label: "AUC, CBIS-DDSM" },
    { value: "92.86%", label: "accuracy, MIAS (independent)" },
  ],
}

/* ---------------------------------------------------------------------------
   ABOUT: short and human. Rewrite freely in your own voice.
--------------------------------------------------------------------------- */

export const about = [
  "I studied computer science with an AI and ML focus at VIT Chennai, published a paper there, and moved to Boston for my master's at Northeastern.",
  "These days I spend most of my time on what sits around a model: the pipeline that feeds it, the API that serves it, and the screen someone actually uses. At TensorIoT that's AWS infrastructure and an operator console. At NU Launch Labs it's leading a small team building a site for ~8,000 students.",
  // TODO: add one sentence about life outside code (a sport, a hobby, where you're from). It's what people remember.
]
