import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Writing } from "@/components/sections/Writing";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { getPosts } from "@/lib/medium";
import { getProjectsWithStars } from "@/lib/github";

export default async function Home() {
  // Both resolve at build time and both fall back to committed data on failure,
  // so a flaky third party can never break the deploy.
  const [posts, projects] = await Promise.all([getPosts(), getProjectsWithStars()]);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects projects={projects} />
        <Writing posts={posts} />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
