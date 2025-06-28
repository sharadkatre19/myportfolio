// @flow strict
'use client'
import { educations } from "@/utils/data/educations";
import Image from "next/image";
import { useState } from "react";
import { BsPersonWorkspace, BsCalendar3, BsBuilding, BsAward } from "react-icons/bs";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import lottieFile from '../../../assets/lottie/study.json';
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";

function Education() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const formatDuration = (duration) => {
    // Add formatting for better readability
    return duration.replace(/(\d{4})/g, '$1');
  };

  const getEducationLevel = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('phd') || lowerTitle.includes('doctorate')) return 'Doctorate';
    if (lowerTitle.includes('master') || lowerTitle.includes('msc') || lowerTitle.includes('ma')) return 'Master\'s';
    if (lowerTitle.includes('bachelor') || lowerTitle.includes('bsc') || lowerTitle.includes('ba')) return 'Bachelor\'s';
    if (lowerTitle.includes('diploma')) return 'Diploma';
    if (lowerTitle.includes('certificate')) return 'Certificate';
    return 'Education';
  };

  return (
    <section 
      id="education" 
      className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]"
      aria-labelledby="education-heading"
    >
      <Image
        src="/section.svg"
        alt=""
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
        role="presentation"
      />
      
      {/* Decorative border */}
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#25213b] to-transparent" />
        </div>
      </div>

      {/* Section Header */}
      <div className="flex justify-center my-8 lg:py-12">
        <div className="flex items-center group">
          <span className="w-16 sm:w-24 h-[2px] bg-gradient-to-r from-transparent to-[#0974f1] transition-all duration-500 group-hover:w-32"></span>
          <div className="bg-gradient-to-r from-[#9fccfa] to-[#0974f1] w-fit text-white p-2 px-6 text-xl sm:text-2xl font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <h2 id="education-heading" className="flex items-center gap-2">
              <BsAward className="text-lg" />
              Education
            </h2>
          </div>
          <span className="w-16 sm:w-24 h-[2px] bg-gradient-to-l from-transparent to-[#0974f1] transition-all duration-500 group-hover:w-32"></span>
        </div>
      </div>

      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Animation Section */}
            <div className="flex justify-center items-center order-2 lg:order-1">
              <div className="w-full max-w-md relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#9fccfa]/20 to-[#0974f1]/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="relative z-10 transform transition-all duration-700 hover:scale-105">
                  <AnimationLottie animationPath={lottieFile} />
                </div>
              </div>
            </div>

            {/* Education Cards */}
            <div className="order-1 lg:order-2">
              <div className="space-y-6">

                {/* Education Timeline */}
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-r from-[#9fccfa] to-[#0974f1] opacity-30"></div>
                  
                  {educations.map((education, index) => (
                    <div key={education.id} className="relative mb-6 last:mb-0">
                      {/* Timeline dot */}
                      <div className="absolute left-4 top-8 w-4 h-4 bg-gradient-to-r from-[#9fccfa] to-[#0974f1] rounded-full border-2 border-gray-500 shadow-lg z-10"></div>
                      
                      <div className="ml-12">
                        <GlowCard 
                          identifier={`education-${education.id}`}
                          className="transform transition-all duration-300 hover:scale-[1.02]"
                        >
                          <div 
                            className={`p-6 relative text-white cursor-pointer transition-all duration-300 ${
                              hoveredCard === education.id ? 'bg-gradient-to-r from-[#9fccfa]/20 to-[#0974f1]/20' : ''
                            }`}
                            onMouseEnter={() => setHoveredCard(education.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                            onClick={() => toggleCard(education.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                toggleCard(education.id);
                              }
                            }}
                            aria-expanded={expandedCard === education.id}
                            aria-describedby={`education-details-${education.id}`}
                          >
                            <Image
                              src="/blur-23.svg"
                              alt=""
                              width={1080}
                              height={200}
                              className="absolute bottom-0 right-0 opacity-30"
                              role="presentation"
                            />
                            
                            {/* Header */}
                            <div className="relative z-10">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="p-3 bg-gradient-to-r from-[#9fccfa] to-[#0974f1] rounded-xl shadow-lg">
                                    <BsPersonWorkspace size={24} className="text-white" />
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-xs font-medium text-[#0974f1] bg-[#9fccfa]/10 px-2 py-1 rounded-full w-fit mb-2">
                                      {getEducationLevel(education.title)}
                                    </span>
                                    <span className="text-sm text-black flex items-center gap-1">
                                      <BsCalendar3 size={12} />
                                      {formatDuration(education.duration)}
                                    </span>
                                  </div>
                                </div>
                                <button 
                                  className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
                                  aria-label={expandedCard === education.id ? "Collapse details" : "Expand details"}
                                >
                                  {expandedCard === education.id ? 
                                    <FiChevronUp size={20} className="text-[#0974f1]" /> : 
                                    <FiChevronDown size={20} className="text-black" />
                                  }
                                </button>
                              </div>

                              {/* Main Content */}
                              <div className="space-y-3">
                                <h3 className="text-lg sm:text-xl font-bold text-black leading-tight">
                                  {education.title}
                                </h3>
                                <div className="flex items-center gap-2 text-black">
                                  <BsBuilding size={14} />
                                  <span className="text-sm sm:text-base">{education.institution}</span>
                                </div>
                              </div>

                              {/* Expandable Content */}
                              <div 
                                className={`overflow-hidden transition-all duration-300 ${
                                  expandedCard === education.id ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                                }`}
                                id={`education-details-${education.id}`}
                              >
                                <div className="pt-4 border-t border-gray-600/30">
                                  {education.description && (
                                    <p className="text-black text-sm leading-relaxed mb-3">
                                      {education.description}
                                    </p>
                                  )}
                                  {education.achievements && (
                                    <div>
                                      <h4 className="text-sm font-semibold text-[#0974f1] mb-2">Key Achievements:</h4>
                                      <ul className="text-sm text-black space-y-1">
                                        {education.achievements.map((achievement, idx) => (
                                          <li key={idx} className="flex items-start gap-2">
                                            <span className="text-[#0974f1] mt-1">•</span>
                                            <span>{achievement}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  {education.gpa && (
                                    <div className="mt-3 p-3 bg-gradient-to-r from-[#9fccfa]/20 to-[#0974f1]/20 rounded-lg">
                                      <span className="text-sm font-medium text-[#16f2b3]">
                                        GPA: {education.gpa}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </GlowCard>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;