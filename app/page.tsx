import { Hero, About, Skills, Projects, Academics, Contact } from "@/components";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Academics />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
