import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-transparent">
      <div className="flex items-center justify-between py-5">
        {/* Logo and Name */}
        <div className="flex flex-shrink-0 items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/image/logo.png"
              alt="Sharad Katre"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-[#0974f1] text-3xl font-bold">SHARAD KATRE</span>
          </Link>
        </div>

        {/* Navbar Links */}
        <ul className="mt-4 flex h-screen max-h-0 w-full flex-col items-start text-sm opacity-0 md:mt-0 md:h-auto md:max-h-screen md:w-auto md:flex-row md:space-x-1 md:border-0 md:opacity-100" id="navbar-default">
          {[
            { href: "/#about", label: "ABOUT" },
            { href: "/#experience", label: "EXPERIENCE" },
            { href: "/#skills", label: "SKILLS" },
            { href: "/#education", label: "EDUCATION" },
            { href: "/blog", label: "BLOGS" },
            { href: "/#projects", label: "PROJECTS" },
          ].map(({ href, label }) => (
            <li key={label}>
              <Link className="block px-4 py-2 no-underline outline-none hover:no-underline" href={href}>
                <div className="text-sm text-black transition-colors duration-300 hover:text-[#0974f1]">
                  {label}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
