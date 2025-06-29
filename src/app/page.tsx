import React from "react";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";

export default async function Home(): Promise<React.ReactNode> {
  return (
    <div suppressHydrationWarning>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Blog blogs={[]} />
      <div id="contact">
        <ContactSection />
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}