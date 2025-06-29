// @flow strict
'use client';
import { personalData } from "@/utils/data/personal-data";
import { useState, useEffect, useRef } from "react";

function AboutSection() {
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div 
      id="about" 
      className="my-12 lg:my-16 relative"
      ref={sectionRef}
    >
      {/* Side Label - Enhanced with animation */}
      <div className={`hidden lg:flex flex-col items-center absolute top-16 -right-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      }`}>
        <span className="bg-gradient-to-r from-[#9fccfa] to-[#0974f1]  w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md hover:bg-[#005f8a] transition-colors duration-300 shadow-lg hover:shadow-xl">
          ABOUT ME
        </span>
        <span className="h-72 w-[2px] bg-gradient-to-b from-[#0974f1] to-transparent"></span>
      </div>

      <div className="items-center mr-lg">
        
        {/* Text Content */}
        <div className={`order-2 lg:order-1 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="space-y-6">
            <div className="relative">
              <p className="font-medium mb-5 text-[#0974f1] text-xl uppercase tracking-wider relative inline-block">
                Who I am?
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0974f1] transition-all duration-500 group-hover:w-full"></span>
              </p>
            </div>
            
            <div className="relative">
              <p className="text-black text-sm lg:text-lg mr-16 leading-relaxed lg:leading-loose relative z-10">
                {personalData.description}
              </p>
              {/* Subtle background accent */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0974f1]/5 to-transparent rounded-lg -z-10 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Additional interactive elements */}
            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-500 text-sm">Available for opportunities</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div className={`mt-16 flex justify-center transition-all duration-700 delay-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#0974f1] to-transparent"></div>
      </div>
    </div>
  );
};

export default AboutSection;