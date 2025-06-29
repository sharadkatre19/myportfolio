'use client'
import React, { useState, useEffect, useRef } from "react";
import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaFacebook, FaTwitterSquare } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { SiLeetcode } from "react-icons/si";

const HeroSection: React.FC = () => {
  const [typedText, setTypedText] = useState<string>("");
  const [showCursor, setShowCursor] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  const fullText: string = `Hello,
I'm ${personalData.name}, a Professional ${personalData.designation}.`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
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

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [fullText]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  // Component mount animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleImageLoad = (): void => {
    setIsImageLoaded(true);
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center min-h-screen py-6 px-4 sm:px-6 lg:px-6 overflow-hidden"
    >
      <Image
        src="/hero.svg"
        alt="Hero background illustration"
        width={1572}
        height={795}
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-20 sm:opacity-30"
        priority
      />

      <div className={`w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12 xl:gap-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        {/* Left Column - Text Content */}
        <div className="order-2 lg:order-1 flex flex-col items-start justify-center space-y-6 sm:space-y-8">
          <div className="w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.2rem] xl:text-[2.6rem] font-bold leading-tight sm:leading-normal md:leading-relaxed lg:leading-[3rem] xl:leading-[3.5rem] text-black md:font-extrabold min-h-[100px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-[160px] xl:min-h-[180px]">
              {typedText.split('\n').map((line: string, index: number) => (
                <span key={index}>
                  {index === 0 && line}
                  {index === 1 && (
                    <>
                      I&apos;m{' '}
                      <span className="text-blue-500 hover:text-sky-400 transition-colors duration-300">
                        {personalData.name}
                      </span>
                      {`, a Professional `}
                      <span className="text-[#16f2b3] hover:text-[#14d49f] transition-colors duration-300">
                        {personalData.designation}
                      </span>
                      .
                    </>
                  )}
                  {index < typedText.split('\n').length - 1 && <br />}
                </span>
              ))}
              <span className={`inline-block w-0.5 h-6 sm:h-7 md:h-8 bg-black ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
            </h1>
          </div>

          {/* Social Links with improved hover states */}
          <div className="flex items-center gap-4 sm:gap-5 flex-wrap justify-start">
            <Link
              href={personalData.github}
              target='_blank'
              className="group transition-all text-blue-500 hover:scale-110 sm:hover:scale-125 duration-300 relative"
              aria-label="Visit GitHub profile"
            >
              <BsGithub size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8 group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                GitHub
              </span>
            </Link>
            <Link
              href={personalData.linkedIn}
              target='_blank'
              className="group transition-all text-blue-500 hover:scale-110 sm:hover:scale-125 duration-300 relative"
              aria-label="Visit LinkedIn profile"
            >
              <BsLinkedin size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8 group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                LinkedIn
              </span>
            </Link>
            <Link
              href={personalData.facebook}
              target='_blank'
              className="group transition-all text-blue-500 hover:scale-110 sm:hover:scale-125 duration-300 relative"
              aria-label="Visit Facebook profile"
            >
              <FaFacebook size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8 group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Facebook
              </span>
            </Link>
            <Link
              href={personalData.leetcode}
              target='_blank'
              className="group transition-all text-blue-500 hover:scale-110 sm:hover:scale-125 duration-300 relative"
              aria-label="Visit LeetCode profile"
            >
              <SiLeetcode size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8 group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                LeetCode
              </span>
            </Link>
            <Link
              href={personalData.twitter}
              target='_blank'
              className="group transition-all text-blue-500 hover:scale-110 sm:hover:scale-125 duration-300 relative"
              aria-label="Visit Twitter profile"
            >
              <FaTwitterSquare size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8 group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Twitter
              </span>
            </Link>
          </div>

          {/* CTA Buttons with improved accessibility and animations */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap mt-8">
            <Link
              href="/#contact"
              onClick={handleContactClick}
              className="cursor-pointer bg-gradient-to-r from-[#9fccfa] to-[#0974f1] p-[1px] rounded-full transition-all duration-300 hover:from-[#9fccfa] hover:to-[#0974f1] hover:shadow-lg hover:shadow-[#9fccfa]/25 focus:ring-2 focus:ring-[#9fccfa] focus:ring-offset-2 focus:ring-offset-[#FFFFFF]"
              aria-label="Contact me"
            >
              <button className="px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-[#FFFFFF] rounded-full border-none text-center text-xs sm:text-sm font-medium uppercase tracking-wider text-[#000] no-underline transition-all duration-200 ease-out md:font-semibold flex items-center gap-1 hover:gap-3 group">
                <span>Contact me</span>
                <RiContactsFill size={14} className="sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-200" />
              </button>
            </Link>

            <Link
              className="group flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-[#9fccfa] to-[#0974f1] px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 text-center text-xs sm:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline hover:shadow-lg hover:shadow-[#0974f1]/25 md:font-semibold focus:ring-2 focus:ring-[#0974f1] focus:ring-offset-2 focus:ring-offset-[#FFFFFF]"
              role="button"
              target="_blank"
              href={personalData.resume}
              aria-label="Download resume"
            >
              <span>Get Resume</span>
              <MdDownload size={14} className="sm:w-4 sm:h-4 group-hover:scale-110 group-hover:animate-bounce transition-transform duration-200" />
            </Link>
          </div>
        </div>

        {/* Profile Image */}
        <div className={`order-1 lg:order-2 flex justify-center items-center transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative group">
            {/* Decorative rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0974f1] to-[#0974f1] p-1 animate-pulse opacity-75 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-full h-full rounded-full bg-[#FFFFFF]"></div>
            </div>

            {/* Outer glow effect */}
            <div className="absolute inset-0 rounded-full bg-[#0974f1]/20 blur-lg sm:blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

            {/* Main image container with responsive sizing */}
            <div className="relative w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden shadow-xl sm:shadow-2xl">
              {/* Loading skeleton */}
              {!isImageLoaded && (
                <div className="absolute inset-0 animate-pulse rounded-full bg-gray-200"></div>
              )}

              <Image
                src={personalData.profile}
                width={384}
                height={384}
                alt="SHARAD KATRE - Full Stack Developer"
                className={`w-full h-full object-cover transition-all duration-700 hover:scale-105 cursor-pointer ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={handleImageLoad}
                priority
              />

              {/* Overlay gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0974f1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </div>

            {/* Floating elements around image - responsive sizing */}
            <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-[#0974f1] rounded-full opacity-80 animate-bounce delay-100 group-hover:scale-125 transition-transform duration-300"></div>
            <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 bg-[#0974f1] rounded-full opacity-60 animate-bounce delay-300 group-hover:scale-125 transition-transform duration-300"></div>
            <div className="absolute top-4 -left-3 sm:top-8 sm:-left-6 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-[#9fccfa] rounded-full opacity-70 animate-bounce delay-500 group-hover:scale-125 transition-transform duration-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;