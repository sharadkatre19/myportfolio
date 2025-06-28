import React from "react";
import { personalData } from "@/utils/data/personal-data";
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

// Define the type for blog article data
interface BlogArticle {
  id: number;
  title: string;
  description: string;
  cover_image: string;
  url: string;
  published_at: string;
  tag_list: string[];
  reading_time_minutes: number;
  [key: string]: unknown; // Allow for additional properties
}

async function getData(): Promise<BlogArticle[]> {
  const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data: BlogArticle[] = await res.json();

  const filtered = data.filter((item: BlogArticle) => item?.cover_image).sort(() => Math.random() - 0.5);

  return filtered;
}

export default async function Home(): Promise<React.ReactNode> {
  const blogs: BlogArticle[] = await getData();

  return (
    <div suppressHydrationWarning>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Blog blogs={blogs} />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
}