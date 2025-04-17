import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import DefaultLayout from "../../Layouts/DefaultLayout";
import { useTheme } from "../../context/ThemeContext";
import ProfilePhoto from "../../assets/Profile2.jpg";

const About: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const heroRef = useRef<HTMLElement | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Handle loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Track cursor position for Hero section
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setCursorPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const handleMouseLeave = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setCursorPos({ x: rect.width / 2, y: rect.height / 2 });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
      heroElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove);
        heroElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <DefaultLayout>
      <main
        className={`transition-all duration-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        role="main"
      >
        {/* Hero Section */}
        <section
          ref={heroRef}
          className={`py-12 sm:py-16 md:py-20 lg:py-24 min-h-screen flex items-center relative overflow-hidden ${
            isDark
              ? "bg-gray-900 text-white"
              : "bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800"
          }`}
          aria-labelledby="about-title"
        >
          {/* Interactive Cursor-Following Light */}
          <div
            className={`absolute inset-0 z-0 transition-opacity duration-300 pointer-events-none ${
              isDark
                ? "bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.3)_0%,_transparent_50%)]"
                : "bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.2)_0%,_transparent_50%)]"
            }`}
            style={{
              background: `radial-gradient(circle at ${cursorPos.x}px ${
                cursorPos.y
              }px, ${
                isDark ? "rgba(59,130,246,0.3)" : "rgba(59,130,246,0.2)"
              } 0%, transparent 50%)`,
            }}
          ></div>
          {/* Subtle Dot Pattern */}
          <div
            className={`absolute inset-0 z-0 opacity-20 animate-subtle-pulse ${
              isDark
                ? 'bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath fill="%23ffffff" opacity="0.1" d="M0 0h60v60H0z"/%3E%3Ccircle cx="30" cy="30" r="3" fill="%23ffffff"/%3E%3C/svg%3E")]'
                : 'bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath fill="%23dbeafe" opacity="0.2" d="M0 0h60v60H0z"/%3E%3Ccircle cx="30" cy="30" r="3" fill="%23dbeafe"/%3E%3C/svg%3E")]'
            }`}
          ></div>
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row gap-8 sm:gap-12 lg:gap-16 items-center">
              <div className="w-full md:w-1/3 order-2 md:order-1">
                <div
                  className={`relative w-56 h-56 sm:w-64 sm:h-64 md:w-full md:h-[24rem] lg:h-[28rem] mx-auto overflow-hidden rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                    isDark ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                  <img
                    src="/src/assets/profile.jpg"
                    alt="Portrait of Alex Morgan, UI/UX Designer"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = ProfilePhoto;
                    }}
                  />
                  {/* Interactive Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-center p-4 sm:p-6 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white text-center">
                      <p className="font-bold text-base sm:text-lg">
                        Alex Morgan
                      </p>
                      <p className="text-xs sm:text-sm text-gray-200">
                        UI/UX Designer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/3 order-1 md:order-2 space-y-6 text-center md:text-left">
                <h1
                  id="about-title"
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
                >
                  About Me
                </h1>
                <div className="flex justify-center md:justify-start">
                  <div
                    className={`h-1 w-16 sm:w-20 ${
                      isDark ? "bg-blue-500" : "bg-blue-600"
                    } mb-4 sm:mb-6`}
                  ></div>
                </div>
                <p
                  className={`text-base sm:text-lg md:text-xl leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  I'm a passionate designer with over 8 years of experience
                  creating bold, user-centered digital experiences that blend
                  aesthetics with functionality.
                </p>
                <p
                  className={`text-base sm:text-lg md:text-xl leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  My design philosophy centers around understanding the user's
                  needs and crafting visuals that not only captivate but also
                  communicate effectively. I believe that great design should
                  feel intuitive and purposeful, elevating the user experience
                  while meeting business objectives.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                  {[
                    "Innovative",
                    "Detail-oriented",
                    "Problem Solver",
                    "Team Player",
                  ].map((trait) => (
                    <span
                      key={trait}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-110 hover:shadow-md ${
                        isDark
                          ? "bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700"
                          : "bg-gray-100 text-gray-800 border border-gray-200 hover:bg-white"
                      }`}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-4 sm:mt-6">
                  <Link
                    to="/contact"
                    className={`px-6 py-2.5 sm:py-3 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                      isDark
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    Get in Touch
                  </Link>
                  <Link
                    to="/project"
                    className={`px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-300 border hover:shadow-md hover:scale-105 ${
                      isDark
                        ? "border-gray-600 text-white hover:bg-gray-700"
                        : "border-gray-300 text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </DefaultLayout>
  );
};

export default About;
