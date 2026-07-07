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
      { name: "Bootstrap", icon: "bootstrap" },
      { name: "Three.js", icon: "threejs" },
    ],
  },
  {
    category: "BACKEND",
    items: [
      { name: "Python", icon: "python" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Node.js", icon: "nodejs" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "MySQL", icon: "mysql" },
      { name: "REST APIs", icon: "api" },
    ],
  },
  {
    category: "AI / ML",
    items: [
      { name: "OpenAI APIs", icon: "openai" },
      { name: "LangChain", icon: "langchain" },
      { name: "Machine Learning", icon: "ml" },
      { name: "Deep Learning", icon: "dl" },
      { name: "Computer Vision", icon: "cv" },
      { name: "OpenCV", icon: "opencv" },
      { name: "Prompt Engineering", icon: "prompt" },
      { name: "Agentic AI", icon: "agent" },
    ],
  },
  {
    category: "DESIGN & IOT",
    items: [
      { name: "Figma", icon: "figma" },
      { name: "UI/UX Design", icon: "uiux" },
      { name: "Canva", icon: "canva" },
      { name: "Arduino", icon: "arduino" },
      { name: "IoT", icon: "iot" },
      { name: "Android Studio", icon: "android" },
    ],
  },
  {
    category: "TOOLS",
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Postman", icon: "postman" },
      { name: "VS Code", icon: "vscode" },
      { name: "Vercel", icon: "vercel" },
      { name: "Vite", icon: "vite" },
    ],
  },
];

export const techStackFlat = techStack.flatMap((cat) =>
  cat.items.map((item) => ({ ...item, category: cat.category }))
);

export type TechStackCategory = typeof techStack[0];
export type TechStackItem = typeof techStackFlat[0];
