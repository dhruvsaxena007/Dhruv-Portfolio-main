import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TextArt } from "@/components/sections/TextArt";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { ExtraCurricular } from "@/components/sections/ExtraCurricular";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#030307] text-foreground">
      <Navbar />
      <main>
        <Hero />
        <TextArt />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <ExtraCurricular />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
