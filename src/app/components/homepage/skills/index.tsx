import { skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { FaCode } from "react-icons/fa";

const Skills: React.FC = () => {
  return (
    <div id="skills" className="relative z-50 border-t my-12 lg:my-24">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center w-full px-4">
          <span className="flex-1 h-[2px] bg-gradient-to-l from-[#9fccfa] via-[#0974f1]/50 to-transparent"></span>
          <span className="bg-gradient-to-r from-[#9fccfa] to-[#0974f1] w-fit text-white p-2 px-5 text-xl rounded-md flex items-center gap-2">
            <FaCode className="w-5 h-5" />
            Skills
          </span>
          <span className="flex-1 h-[2px] bg-gradient-to-r from-[#9fccfa] via-[#0974f1]/50 to-transparent"></span>
        </div>
      </div>

      <div className="w-full my-12">
        <Marquee
          gradient={false}
          speed={80}
          pauseOnHover={true}
          pauseOnClick={true}
          delay={0}
          play={true}
          direction="left"
        >
          {skillsData.map((skill: string, id: number) => (
            <div className="w-36 min-w-fit h-fit flex flex-col items-center justify-center transition-all duration-500 m-3 sm:m-5 rounded-lg group relative hover:scale-[1.15] cursor-pointer"
              key={id}>
              <div className="h-full w-full rounded-lg border border-[#1f223c] bg-[#11152c] shadow-none shadow-gray-50 group-hover:border-[#0974f1] transition-all duration-500">
                <div className="flex -translate-y-[1px] justify-center">
                  <div className="w-3/4">
                    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#0974f1] to-transparent" />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-3 p-6">
                  <div className="h-8 sm:h-10">
                    <Image
                      src={skillsImage(skill) || ''}
                      alt={skill}
                      width={40}
                      height={40}
                      className="h-full w-auto rounded-lg"
                    />
                  </div>
                  <p className="text-white text-sm sm:text-lg">
                    {skill}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Skills;