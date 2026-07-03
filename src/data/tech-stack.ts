export const techStack = [
  {
    category: "FRONTEND",
    items: [
      { name: "HTML5", icon: "html" },
      { name: "CSS3", icon: "css" },
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "TailwindCSS", icon: "tailwind" },
      { name: "Framer Motion", icon: "framer" },
    ],
  },
  {
    category: "BACKEND",
    items: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Express", icon: "express" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Python", icon: "python" },
      { name: "Java", icon: "java" },
      { name: "C++", icon: "cpp" },
    ],
  },
  {
    category: "AI / ML",
    items: [
      { name: "OpenAI", icon: "openai" },
      { name: "LangChain", icon: "langchain" },
      { name: "Sentence Transformers", icon: "transformers" },
      { name: "Vector Search", icon: "vector" },
      { name: "TensorFlow", icon: "tensorflow" },
      { name: "PyTorch", icon: "pytorch" },
    ],
  },
  {
    category: "DATABASES",
    items: [
      { name: "MongoDB", icon: "mongodb" },
      { name: "MySQL", icon: "mysql" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Redis", icon: "redis" },
      { name: "Pinecone", icon: "pinecone" },
      { name: "Weaviate", icon: "weaviate" },
    ],
  },
  {
    category: "TOOLS & DEVOPS",
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Postman", icon: "postman" },
      { name: "Docker", icon: "docker" },
      { name: "Vercel", icon: "vercel" },
      { name: "AWS", icon: "aws" },
      { name: "CI/CD", icon: "cicd" },
      { name: "Linux", icon: "linux" },
    ],
  },
];

export const techStackFlat = techStack.flatMap((cat) =>
  cat.items.map((item) => ({ ...item, category: cat.category }))
);

export type TechStackCategory = typeof techStack[0];
export type TechStackItem = typeof techStackFlat[0];