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

  return (
    <section 
      ref={sectionRef}
      className="relative flex flex-col items-center justify-between py-4 lg:py-12 overflow-hidden"
    >
      <Image
        src="/hero.svg"
        alt="Hero background illustration"
        width={1572}
        height={795}
        className="absolute -top-[98px] -z-10 opacity-30"
        priority
      />

      <div className={`grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-12 gap-y-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        {/* Left Column - Text Content */}
        <div className="order-2 lg:order-1 flex flex-col items-start justify-center p-2 pb-20 md:pb-10 lg:pt-10">
          <div className="mb-6">
            <h1 className="text-3xl font-bold leading-10 text-black md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem] min-h-[140px] lg:min-h-[180px]">
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
              <span className={`inline-block w-0.5 h-8 bg-black ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
            </h1>
          </div>

          {/* Social Links with improved hover states */}
          <div className="my-12 flex items-center gap-5">
            <Link
              href={personalData.github}
              target='_blank'
              className="group transition-all text-blue-500 hover:scale-125 duration-300 relative"
              aria-label="Visit GitHub profile"
            >
              <BsGithub size={30} className="group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                GitHub
              </span>
            </Link>
            <Link
              href={personalData.linkedIn}
              target='_blank'
              className="group transition-all text-blue-500 hover:scale-125 duration-300 relative"
              aria-label="Visit LinkedIn profile"
            >
              <BsLinkedin size={30} className="group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                LinkedIn
              </span>
            </Link>
            <Link
              href={personalData.facebook}
              target='_blank'
              className="group transition-all text-blue-500 hover:scale-125 duration-300 relative"
              aria-label="Visit Facebook profile"
            >
              <FaFacebook size={30} className="group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Facebook
              </span>
            </Link>
            <Link
              href={personalData.leetcode}
              target='_blank'
              className="group transition-all text-blue-500 hover:scale-125 duration-300 relative"
              aria-label="Visit LeetCode profile"
            >
              <SiLeetcode size={30} className="group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                LeetCode
              </span>
            </Link>
            <Link
              href={personalData.twitter}
              target='_blank'
              className="group transition-all text-blue-500 hover:scale-125 duration-300 relative"
              aria-label="Visit Twitter profile"
            >
              <FaTwitterSquare size={30} className="group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Twitter
              </span>
            </Link>
          </div>

          {/* CTA Buttons with improved accessibility and animations */}
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/#contact"
              className="bg-gradient-to-r from-[#9fccfa] to-[#0974f1] p-[1px] rounded-full transition-all duration-300 hover:from-[#9fccfa] hover:to-[#0974f1] hover:shadow-lg hover:shadow-[#9fccfa]/25 focus:ring-2 focus:ring-[#9fccfa] focus:ring-offset-2 focus:ring-offset-[#FFFFFF]"
              aria-label="Contact me"
            >
              <button className="px-3 text-xs md:px-8 py-3 md:py-4 bg-[#FFFFFF] rounded-full border-none text-center md:text-sm font-medium uppercase tracking-wider text-[#000] no-underline transition-all duration-200 ease-out md:font-semibold flex items-center gap-1 hover:gap-3 group">
                <span>Contact me</span>
                <RiContactsFill size={16} className="group-hover:scale-110 transition-transform duration-200" />
              </button>
            </Link>

            <Link
              className="group flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-[#9fccfa] to-[#0974f1] px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline hover:shadow-lg hover:shadow-[#0974f1]/25 md:font-semibold focus:ring-2 focus:ring-[#0974f1] focus:ring-offset-2 focus:ring-offset-[#FFFFFF]"
              role="button"
              target="_blank"
              href={personalData.resume}
              aria-label="Download resume"
            >
              <span>Get Resume</span>
              <MdDownload size={16} className="group-hover:scale-110 group-hover:animate-bounce transition-transform duration-200" />
            </Link>
          </div>
        </div>

        {/* Profile Image */}
        <div className={`flex justify-center order-1 flex justify-center items-center lg:order-2 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <div className="relative group mt-16 mr-16">
            {/* Decorative rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0974f1] to-[#0974f1] p-1 animate-pulse opacity-75 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-full h-full rounded-full bg-[#FFFFFF]"></div>
            </div>

            {/* Outer glow effect */}
            <div className="absolute inset-0 rounded-full bg-[#0974f1]/20 blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

            {/* Main image container */}
            <div className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl">
              {/* Loading skeleton */}
              {!isImageLoaded && (
                <div className="absolute inset-0 animate-pulse rounded-full"></div>
              )}

              <Image
                src={personalData.profile}
                width={320}
                height={320}
                alt="SHARAD KATRE - Full Stack Developer"
                className={`w-full h-full object-cover transition-all duration-700 hover:scale-190 cursor-pointer ${isImageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                onLoad={handleImageLoad}
                priority
              />

              {/* Overlay gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0974f1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </div>

            {/* Floating elements around image */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#0974f1] rounded-full opacity-80 animate-bounce delay-100 group-hover:scale-125 transition-transform duration-300"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#0974f1] rounded-full opacity-60 animate-bounce delay-300 group-hover:scale-125 transition-transform duration-300"></div>
            <div className="absolute top-8 -left-6 w-4 h-4 bg-[#9fccfa] rounded-full opacity-70 animate-bounce delay-500 group-hover:scale-125 transition-transform duration-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;