export const projects = [
  {
    id: 1,
    name: "AI Machine Marketplace Assistant",
    description:
      "An AI-powered platform that helps users discover, compare, and analyze industrial machines using semantic search, recommendation systems, conversational AI, and intelligent ranking algorithms.",
    techStack: ["FastAPI", "OpenAI", "MongoDB", "LangChain", "Python", "React"],
    image: "/images/projects/ai-marketplace.jpg",
    github: "",
    liveDemo: "https://infra-ai-assistant.vercel.app/",
    caseStudy: "",
    featured: true,
    category: "AI / Full Stack",
  },
  {
    id: 2,
    name: "Car Rental Management System",
    description:
      "A responsive web application for managing vehicle rentals, bookings, availability tracking, and customer interactions with a clean management workflow.",
    techStack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    image: "/images/projects/car-rental.jpg",
    github: "",
    liveDemo: "https://aurelia-car-rental.site.je/",
    caseStudy: "",
    featured: true,
    category: "Full Stack Web App",
  },
  {
    id: 3,
    name: "Driver Behaviour Monitoring System",
    description:
      "An IoT-based safety system using Arduino and MPU6050 sensors with real-time monitoring to detect harsh acceleration, braking, and unsafe driving patterns.",
    techStack: ["Arduino", "MPU6050", "IoT", "Face Recognition", "Embedded Systems"],
    image: "/images/projects/driver-monitoring.jpg",
    github: "",
    liveDemo: "",
    caseStudy: "",
    featured: true,
    category: "Robotics + AI",
  },
  {
    id: 4,
    name: "Food Delivery Application",
    description:
      "A UI/UX concept for a food delivery platform covering user flows, visual design, and interface exploration for ordering, tracking, and restaurant discovery.",
    techStack: ["Figma", "Canva", "UI/UX Design", "Wireframing"],
    image: "/images/projects/food-delivery.jpg",
    github: "",
    liveDemo: "",
    caseStudy: "",
    featured: false,
    category: "UI/UX",
  },
  {
    id: 5,
    name: "StudentEase Mobile App",
    description:
      "A campus-focused mobile application concept built with frontend fundamentals for student workflows, navigation, and responsive mobile layouts.",
    techStack: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    image: "/images/projects/studentease.jpg",
    github: "",
    liveDemo: "",
    caseStudy: "",
    featured: false,
    category: "Frontend Development",
  },
];

export type Project = typeof projects[0];
