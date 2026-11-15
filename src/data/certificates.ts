/**
 * Achievements & Certificates data.
 * To add a new certificate:
 * 1. Place the image in /public/images/certificates/
 * 2. Add an entry below with the matching image path.
 *
 * Display order (mandatory):
 * Group 1 — priority Forage simulations
 * Group 2 — all NPTEL certificates
 * Group 3 — remaining certificates
 */
export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: string;
  image: string;
  description: string;
  technologies: string[];
  credentialId?: string;
  credentialUrl?: string;
  highlights: string[];
};

export const certificates: Certificate[] = [
  // ── Group 1: Priority Forage simulations ──────────────────────────
  {
    id: "walmart-ase",
    title: "Advanced Software Engineering Job Simulation",
    issuer: "Walmart Global Tech · Forage",
    year: "2026",
    category: "Job Simulation",
    image: "/images/certificates/walmart-advanced-software.jpeg",
    description:
      "Practical Forage job simulation with Walmart Global Tech covering advanced software engineering tasks.",
    technologies: ["Data Structures", "Software Architecture", "Database Design"],
    credentialId: "6af8119f36af9db3ebfd8516",
    highlights: [
      "Advanced Data Structures",
      "Software Architecture",
      "Relational Database Design",
      "Data Munging",
    ],
  },
  {
    id: "tata-genai",
    title: "GenAI Powered Data Analytics Job Simulation",
    issuer: "TATA · Forage",
    year: "2026",
    category: "Job Simulation",
    image: "/images/certificates/tata-genai-data-analytics.jpeg",
    description:
      "TATA GenAI-powered data analytics simulation via Forage, focused on exploratory analysis, prediction, and AI-driven strategy.",
    technologies: ["GenAI", "Data Analytics", "Data Storytelling"],
    credentialId: "6af81f12291935b560d1f171",
    highlights: [
      "Exploratory data analysis & risk profiling",
      "Predicting delinquency with AI",
      "Business report & data storytelling",
      "AI-driven collections strategy",
    ],
  },
  {
    id: "ba-engineering",
    title: "Engineering Job Simulation",
    issuer: "British Airways · Forage",
    year: "2026",
    category: "Job Simulation",
    image: "/images/certificates/british-airways-engineering.jpeg",
    description:
      "British Airways engineering simulation via Forage covering defect investigation and maintenance planning tasks.",
    technologies: ["Engineering Analysis", "Maintenance Planning"],
    credentialId: "6af80a9936af9db3ebfc53e7",
    highlights: [
      "Defect investigation and fix",
      "Forecast material requirements",
      "Maintenance planning",
    ],
  },
  {
    id: "cba-swe",
    title: "Software Engineering Job Simulation",
    issuer: "Commonwealth Bank · Forage",
    year: "2026",
    category: "Job Simulation",
    image: "/images/certificates/commonwealth-bank-software.jpeg",
    description:
      "Commonwealth Bank software engineering simulation via Forage covering backend, frontend, and pull-request workflows.",
    technologies: [".NET", "React", "Redux", "Pull Requests"],
    credentialId: "6af82576291935b560d2f436",
    highlights: [
      "Modify .NET backend",
      "Modify React/Redux frontend",
      "Client request changes",
      "Create a pull request",
    ],
  },

  // ── Group 2: All NPTEL certificates ───────────────────────────────
  {
    id: "nptel-hci",
    title: "Human Computer Interaction (In Hindi)",
    issuer: "NPTEL · IIIT Delhi / IIT Madras",
    year: "2026",
    category: "NPTEL · Elite",
    image: "/images/certificates/nptel-hci.jpg",
    description:
      "12-week NPTEL course covering human–computer interaction fundamentals, with Elite distinction and a consolidated score of 97%.",
    technologies: ["HCI", "UX Principles", "Interaction Design"],
    credentialId: "NPTEL26CS139S556500957",
    highlights: [
      "Elite · 97% consolidated score",
      "Assignments 25/25",
      "Proctored exam 72/75",
      "12-week course · Jul–Oct 2026",
    ],
  },
  {
    id: "nptel-soft-skill",
    title: "Soft Skill Development",
    issuer: "NPTEL · IIT Kharagpur",
    year: "2026",
    category: "NPTEL · Elite",
    image: "/images/certificates/nptel-soft-skill.jpg",
    description:
      "8-week NPTEL course on soft skill development, completed with Elite status and an 80% consolidated score.",
    technologies: ["Communication", "Professional Skills"],
    credentialId: "NPTEL26HS160S357900581",
    highlights: [
      "Elite · 80% consolidated score",
      "Assignments 24.42/25",
      "Proctored exam 54.75/75",
      "8-week course · Jul–Sep 2026",
    ],
  },
  {
    id: "nptel-python",
    title: "The Joy of Computing using Python",
    issuer: "NPTEL · IIT Madras",
    year: "2026",
    category: "NPTEL · Elite",
    image: "/images/certificates/nptel-joy-of-computing-python.jpg",
    description:
      "12-week Python computing course completed with Elite distinction and a consolidated score of 79%.",
    technologies: ["Python", "Problem Solving", "Computing Foundations"],
    credentialId: "NPTEL26CS84S356601676",
    highlights: [
      "Elite · 79% consolidated score",
      "Assignments 24.81/25",
      "Proctored exam 54/75",
      "12-week course · Jan–Apr 2026",
    ],
  },
  {
    id: "nptel-oop",
    title: "Fundamentals of Object Oriented Programming",
    issuer: "NPTEL · IIT Roorkee",
    year: "2025",
    category: "NPTEL · Elite",
    image: "/images/certificates/nptel-oop.jpg",
    description:
      "12-week NPTEL OOP course completed with Elite status and a consolidated score of 75%.",
    technologies: ["OOP", "Programming Foundations"],
    credentialId: "NPTEL25CS34S547400195",
    highlights: [
      "Elite · 75% consolidated score",
      "Assignments 23.75/25",
      "Proctored exam 51/75",
      "12-week course · Jan–Apr 2025",
    ],
  },
  {
    id: "nptel-entrepreneurship",
    title: "Entrepreneurship",
    issuer: "NPTEL · IIT Madras",
    year: "2025",
    category: "NPTEL · Elite",
    image: "/images/certificates/nptel-entrepreneurship.jpg",
    description:
      "12-week NPTEL Entrepreneurship course completed with Elite status and a consolidated score of 70%.",
    technologies: ["Entrepreneurship", "Business Fundamentals"],
    credentialId: "NPTEL25MG81S358600833",
    highlights: [
      "Elite · 70% consolidated score",
      "Assignments 24.69/25",
      "Proctored exam 45/75",
      "12-week course · Jul–Oct 2025",
    ],
  },
  {
    id: "nptel-german",
    title: "German - I",
    issuer: "NPTEL · IIT Madras",
    year: "2025",
    category: "NPTEL · Language",
    image: "/images/certificates/nptel-german-i.jpg",
    description:
      "12-week NPTEL German - I language course completed with a consolidated score of 54%.",
    technologies: ["German", "Language Learning"],
    credentialId: "NPTEL25HS25S1247400657",
    highlights: [
      "54% consolidated score",
      "Assignments 23.63/25",
      "12-week course · Jan–Apr 2025",
    ],
  },

  // ── Group 3: Remaining certificates ───────────────────────────────
  {
    id: "aws-prompt",
    title: "Essentials of Prompt Engineering",
    issuer: "AWS Training & Certification",
    year: "2026",
    category: "Cloud · AI",
    image: "/images/certificates/aws-prompt-engineering.jpeg",
    description:
      "AWS Training & Certification course on essentials of prompt engineering for large language model workflows.",
    technologies: ["Prompt Engineering", "LLMs", "AWS"],
    highlights: [
      "AWS Training & Certification",
      "Prompt engineering essentials",
      "Completed June 02, 2026",
    ],
  },
  {
    id: "analytics-vidhya-llm",
    title: "Building LLM Applications using Prompt Engineering",
    issuer: "Analytics Vidhya",
    year: "2026",
    category: "AI · Prompt Engineering",
    image: "/images/certificates/analytics-vidhya-prompt-engineering.jpeg",
    description:
      "Certificate of Completion for Analytics Vidhya’s free course on building LLM applications with prompt engineering.",
    technologies: ["LLMs", "Prompt Engineering"],
    credentialId: "vn3repbwb7",
    highlights: [
      "LLM application building",
      "Prompt engineering practices",
      "Issued 2026-06-02",
    ],
  },
  {
    id: "umd-ai-career",
    title: "AI and Career Empowerment",
    issuer: "University of Maryland · Robert H. Smith School of Business",
    year: "2026",
    category: "Career · AI",
    image: "/images/certificates/umd-ai-career-empowerment.jpeg",
    description:
      "Non-credit course on AI and career empowerment offered through the University of Maryland Robert H. Smith School of Business.",
    technologies: ["AI Literacy", "Career Development"],
    highlights: [
      "Completed May 25, 2026",
      "University of Maryland Smith School",
      "AI & career focus",
    ],
  },
  {
    id: "deloitte-da",
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte · Forage",
    year: "2026",
    category: "Job Simulation",
    image: "/images/certificates/deloitte-data-analytics.jpeg",
    description:
      "Deloitte Forage simulation covering practical tasks in data analysis and forensic technology.",
    technologies: ["Data Analysis", "Forensic Technology"],
    credentialId: "gMAsCXMpTCpwW9KAZ",
    highlights: ["Data analysis", "Forensic technology", "Completed June 2026"],
  },
  {
    id: "jj-robotics",
    title: "Robotics and Controls Job Simulation",
    issuer: "Johnson & Johnson MedTech · Forage",
    year: "2026",
    category: "Job Simulation",
    image: "/images/certificates/jj-robotics-controls.jpeg",
    description:
      "Johnson & Johnson MedTech robotics and controls simulation via Forage focused on surgical robot diagnostics and design optimization.",
    technologies: ["Robotics", "Controls", "Diagnostics"],
    credentialId: "6af80cbb36af9db3ebfcb5a9",
    highlights: [
      "Diagnosing surgical robot arm delays",
      "Design optimization for responsiveness",
    ],
  },
  {
    id: "apna-dsa",
    title: "Alpha (DSA with Java)",
    issuer: "Apna College",
    year: "2026",
    category: "Course Completion",
    image: "/images/certificates/apna-college-dsa-java.jpeg",
    description:
      "Certificate of Completion for Apna College’s Alpha course covering Data Structures and Algorithms with Java.",
    technologies: ["Java", "DSA", "Problem Solving"],
    credentialId: "698209877a3bf45ed10ed354",
    highlights: ["DSA with Java", "Apna College Alpha track"],
  },
  {
    id: "anthropic-mcp",
    title: "Introduction to Model Context Protocol",
    issuer: "Anthropic",
    year: "2026",
    category: "AI · Anthropic",
    image: "/images/certificates/anthropic-mcp-intro.jpeg",
    description:
      "Anthropic certificate of completion for Introduction to Model Context Protocol.",
    technologies: ["MCP", "AI Tooling"],
    highlights: ["Model Context Protocol fundamentals", "Anthropic training"],
  },
  {
    id: "anthropic-claude-101",
    title: "Claude 101",
    issuer: "Anthropic",
    year: "2026",
    category: "AI · Anthropic",
    image: "/images/certificates/anthropic-claude-101.jpeg",
    description: "Anthropic certificate of completion for Claude 101.",
    technologies: ["Claude", "AI Assistants"],
    highlights: ["Claude fundamentals", "Anthropic training"],
  },
  {
    id: "anthropic-fluency-framework",
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    year: "2026",
    category: "AI · Anthropic",
    image: "/images/certificates/anthropic-ai-fluency-framework.jpeg",
    description:
      "Anthropic certificate covering AI Fluency framework and foundations, in collaboration with partner institutions.",
    technologies: ["AI Fluency", "Responsible AI"],
    highlights: ["AI Fluency framework", "Foundations of AI literacy"],
  },
  {
    id: "anthropic-fluency-students",
    title: "AI Fluency for Students",
    issuer: "Anthropic",
    year: "2026",
    category: "AI · Anthropic",
    image: "/images/certificates/anthropic-ai-fluency-students.jpeg",
    description:
      "Anthropic certificate of completion for AI Fluency for students.",
    technologies: ["AI Fluency", "Education"],
    highlights: ["AI Fluency for students", "Anthropic training"],
  },
];
