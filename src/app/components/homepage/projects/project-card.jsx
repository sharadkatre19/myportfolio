// @flow strict

import * as React from 'react';
import GlowCard from '../../helper/glow-card';
import Image from "next/image";

function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [hoveredCard, setHoveredCard] = React.useState(null);

  return (
    <GlowCard 
      key={project.id} 
      identifier={`project-${project.id}`}
      className="transform transition-all duration-300 hover:scale-[1.02] group"
    >
      <div
        className={`p-6 relative text-black cursor-pointer transition-all duration-300 ${
          hoveredCard === project.id 
            ? 'bg-gradient-to-r from-[#9fccfa]/20 to-[#0974f1]/20' 
            : ''
        }`}
        onMouseEnter={() => {
          setHoveredCard(project.id);
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setHoveredCard(null);
          setIsHovered(false);
        }}

        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
          }
        }}
        aria-describedby={`project-details-${project.id}`}
      >

        <Image
          src="/blur-23.svg"
          alt=""
          width={1080}
          height={200}
          className="absolute bottom-0 right-0 opacity-30"
          role="presentation"
        />

        <div className="relative z-10 p-6 lg:p-8">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-black group-hover:text-blue-300 transition-colors duration-300">
                  {project.name}
                </h3>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-black bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm">
                    {project.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Status indicator */}
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <span className="text-xs text-black font-medium">Active</span>
            </div>
          </div>

          {/* Description Section */}
          <div className="mb-6">
            <p className="text-black leading-relaxed text-base lg:text-lg">
              {project.description}
            </p>
          </div>

          {/* Technologies Section */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-black mb-3 flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 text-sm font-medium rounded-lg border border-blue-400/30 hover:border-blue-300/50 hover:shadow-sm hover:shadow-blue-400/20 transition-all duration-200 cursor-default backdrop-blur-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Action Section */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition-all duration-200 hover:scale-105">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>View Project</span>
              </button>

              <button className="flex items-center space-x-2 text-gray-400 hover:text-black font-medium text-sm transition-all duration-200 hover:scale-105">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span>Live Demo</span>
              </button>
            </div>

            {/* Hover indicator */}
            <div className={`flex items-center space-x-1 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
            }`}>
            </div>
          </div>
        </div>

        {/* Enhanced floating decorative elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-500 blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500 blur-lg"></div>
        
        {/* Additional glow effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </GlowCard>
  );
}

export default ProjectCard;