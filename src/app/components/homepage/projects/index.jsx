'use client';
import { projectsData } from '@/utils/data/projects-data';
import { useState, useEffect, useRef } from 'react';
import { FiExternalLink, FiGithub, FiEye, FiStar, FiCode, FiUsers, FiCalendar } from 'react-icons/fi';
import { BiTrendingUp } from 'react-icons/bi';
import ProjectCard from './project-card';

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState(new Set());
  const [activeProject, setActiveProject] = useState(null);
  const sectionRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleProjects(prev => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '50px'
      }
    );

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div id='projects' className="relative z-50 my-12 lg:my-24" ref={sectionRef}>
      {/* Enhanced Section Header */}
      <div className="">
        <div className="w-[100px] h-[100px] bg-gradient-to-r from-[#0974f1]/30 to-blue-500/30 rounded-full absolute -top-4 left-0 translate-x-1/2 filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="flex items-center justify-start relative backdrop-blur-sm">
          <span className="bg-gradient-to-r from-[#9fccfa] to-[#0974f1] absolute left-0 w-fit text-white px-6 py-3 text-xl font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
            <FiCode className="w-5 h-5" />
            PROJECTS
          </span>
          <span className="w-full h-[2px] bg-gradient-to-r from-[#9fccfa] via-[#0974f1]/50 to-transparent ml-2"></span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="pt-24">
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Description */}
          <div className="text-center mb-12">
            <p className="text-black text-lg max-w-2xl mx-auto">
              Here are some of my featured projects that showcase my skills in full-stack development, 
              problem-solving, and creating impactful digital solutions.
            </p>
          </div>

          {/* Projects Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projectsData.slice(0, 4).map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>

          {/* View More Projects Button */}
          {projectsData.length > 4 && (
            <div className="text-center mt-12">
              <button className="bg-gradient-to-r from-[#0974f1] to-blue-500 text-black px-8 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-[#0974f1]/25 transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto">
                <FiExternalLink className="w-5 h-5" />
                View All Projects ({projectsData.length})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;