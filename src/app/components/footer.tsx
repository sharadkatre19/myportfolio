import Link from 'next/link';
import { CgGitFork } from "react-icons/cg";
import { IoStar, IoLogoLinkedin, IoLogoGithub } from "react-icons/io5";
import { HiExternalLink } from "react-icons/hi";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t bg-gradient-to-b from-white to-gray-50 border-gray-200 text-gray-800">
      <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-8 lg:py-12">
        {/* Top gradient line */}
        <div className="flex justify-center -z-40">
          <div className="absolute top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-[#0974f1] to-transparent opacity-60"></div>
        </div>
        
        {/* Main footer content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0">
          
          {/* Left section - Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center lg:text-left">
            <p className="text-sm text-gray-600">
              © {currentYear} Portfolio by{' '}
              <Link 
                target="_blank" 
                href="https://www.linkedin.com/in/sharad-katre/" 
                className="inline-flex items-center gap-1 text-[#0974f1] hover:text-[#075bb5] font-medium transition-colors duration-200 group"
                aria-label="Visit Sharad Katre's LinkedIn profile"
              >
                <span>SHARAD KATRE</span>
                <IoLogoLinkedin className="w-3 h-3 group-hover:scale-110 transition-transform duration-200" />
              </Link>
            </p>
            <span className="hidden sm:block text-gray-400">•</span>
            <p className="text-xs text-gray-500">
              Made with ❤️ and Next.js
            </p>
          </div>

          {/* Right section - Action buttons */}
          <div className="flex items-center gap-4">
            <Link
              target="_blank"
              href="https://github.com/sharadkatre19/myportfolio"
              className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-[#0974f1] hover:text-[#0974f1] transition-all duration-200 shadow-sm hover:shadow-md"
              aria-label="Star this project on GitHub"
            >
              <IoStar className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-medium">Star</span>
              <HiExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </Link>
            
            <Link
              target="_blank"
              href="https://github.com/sharadkatre19/myportfolio/fork"
              className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0974f1] hover:bg-[#075bb5] text-white transition-all duration-200 shadow-sm hover:shadow-md"
              aria-label="Fork this project on GitHub"
            >
              <CgGitFork className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-medium">Fork</span>
              <HiExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </Link>
          </div>
        </div>

        {/* Bottom section - Additional links */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <Link 
                href="/privacy" 
                className="hover:text-[#0974f1] transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <span>•</span>
              <Link 
                href="/terms" 
                className="hover:text-[#0974f1] transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Link
                target="_blank"
                href="https://github.com/sharadkatre19"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Visit GitHub profile"
              >
                <IoLogoGithub className="w-4 h-4 text-gray-600 hover:text-[#0974f1]" />
              </Link>
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/sharad-katre/"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Visit LinkedIn profile"
              >
                <IoLogoLinkedin className="w-4 h-4 text-gray-600 hover:text-[#0974f1]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;