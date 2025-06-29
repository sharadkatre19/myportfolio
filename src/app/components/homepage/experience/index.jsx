// @flow strict

import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import experience from '../../../assets/lottie/code.json';
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";
import { FiTrendingUp } from "react-icons/fi";

function Experience() {
  return (
    <div id="experience" className="relative z-50 border-t my-12 lg:my-24">
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      <div className="mt-12 mb-12 lg:mb-16 relative">
        <div className="w-[100px] h-[100px] bg-gradient-to-r from-[#0974f1]/30 to-blue-500/30 rounded-full absolute -top-4 left-0 translate-x-1/2 filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="flex items-center justify-start relative backdrop-blur-sm">
          <span className="bg-gradient-to-r from-[#9fccfa] to-[#0974f1] absolute right-0 w-fit text-white px-6 py-3 text-xl font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
            <FiTrendingUp className="w-5 h-5" />
            Experience
          </span>
          <span className="w-full h-[2px] bg-gradient-to-l from-[#9fccfa] via-[#0974f1]/50 to-transparent ml-2"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex justify-center items-start">
            <div className="w-full h-full">
              <AnimationLottie animationPath={experience} />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-6">
              {
                experiences.map(experience => (
                  <GlowCard key={experience.id} identifier={`experience-${experience.id}`}>
                    <div className="p-3 relative">
                      <Image
                        src="/blur-23.svg"
                        alt="Hero"
                        width={1080}
                        height={200}
                        className="absolute bottom-0 opacity-80"
                      />
                      <div className="flex justify-center">
                        <p className="text-xs sm:text-sm text-[#16f2b3]">
                          {experience.duration}
                        </p>
                      </div>
                      <div className="flex items-center gap-x-8 px-3 py-5">
                        <div className="text-[#0974f1]  transition-all duration-300 hover:scale-125">
                          <BsPersonWorkspace size={36} />
                        </div>
                        <div>
                          <p className="text-base sm:text-xl mb-2 font-medium uppercase">
                            {experience.title}
                          </p>
                          <p className="text-sm sm:text-base">
                            {experience.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;