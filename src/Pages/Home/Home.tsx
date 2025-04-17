import React, { useState, useEffect, useRef } from "react";
import DefaultLayout from "../../Layouts/DefaultLayout";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router";
import "../../styles/animetion.css";
import HeroProfile from "../../assets/profile.png";
import FakeCV from "../../CV/Fake-Resume.pdf";
import Profile2 from "../../assets/Profile2.jpg";
import Profile3 from "../../assets/Profile3.jpg";
import Profile4 from "../../assets/Profile4.jpg";

const Home: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [displayedText, setDisplayedText] = useState("");
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [typingState, setTypingState] = useState<
    "typing" | "pausing" | "deleting"
  >("typing");

  // typing text effect - expanded with more roles
  const roles = ["UX/UI Designer", "Graphic Designer"];

  useEffect(() => {
    // Dynamic speeds for natural-feeling typing
    const getTypingSpeed = () => Math.floor(Math.random() * 50) + 80; // 80-130ms
    const getDeletingSpeed = () => Math.floor(Math.random() * 20) + 40; // 40-60ms
    const pauseDuration = 500; // Duration to pause after typing

    let typingTimer: ReturnType<typeof setTimeout> | null = null;
    const currentRole = roles[currentRoleIndex];

    const typeNextChar = () => {
      setDisplayedText((prev) => {
        if (prev.length < currentRole.length) {
          return currentRole.substring(0, prev.length + 1);
        }
        return prev;
      });

      if (displayedText.length < currentRole.length - 1) {
        typingTimer = setTimeout(typeNextChar, getTypingSpeed());
      } else {
        setTypingState("pausing");
        typingTimer = setTimeout(
          () => setTypingState("deleting"),
          pauseDuration
        );
      }
    };

    const deleteChar = () => {
      setDisplayedText((prev) => {
        if (prev.length > 0) {
          return prev.substring(0, prev.length - 1);
        }
        return "";
      });

      if (displayedText.length > 1) {
        typingTimer = setTimeout(deleteChar, getDeletingSpeed());
      } else {
        setTypingState("typing");
        setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
      }
    };

    // State machine for typing animation
    if (typingState === "typing" && displayedText.length < currentRole.length) {
      typingTimer = setTimeout(typeNextChar, getTypingSpeed());
    } else if (typingState === "deleting" && displayedText.length > 0) {
      typingTimer = setTimeout(deleteChar, getDeletingSpeed());
    } else if (typingState === "typing" && displayedText.length === 0) {
      typingTimer = setTimeout(typeNextChar, 1000); // Delay before starting new word
    }

    return () => {
      if (typingTimer) clearTimeout(typingTimer);
    };
  }, [displayedText, currentRoleIndex, typingState, roles]);

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

  const projects = [
    {
      id: 1,
      title: "Brand Redesign",
      description: "Revamped corporate identity with modern aesthetics.",
      image: Profile2,
      alt: "Brand redesign project preview",
      link: "/projects/1",
    },
    {
      id: 2,
      title: "Mobile App UI",
      description: "Intuitive interface design for a fintech application.",
      image: Profile3,
      alt: "Mobile app UI project preview",
      link: "/projects/2",
    },
    {
      id: 3,
      title: "E-commerce Website",
      description: "Sleek online store with optimized user flow.",
      image: Profile4,
      alt: "E-commerce website project preview",
      link: "/projects/3",
    },
  ];

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
          className={`py-12 px-4 sm:py-16 md:py-20 lg:py-24 w-full min-h-screen flex flex-col justify-center relative overflow-hidden ${
            isDark
              ? "bg-gray-900 text-white"
              : "bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800"
          }`}
          aria-labelledby="hero-title"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              <div className="order-2 md:order-1 space-y-6 text-center md:text-left">
                <h1 className="text-4xl font-bold">
                  <span className="text-2xl font-bold">---Hello</span> I'm Neath
                </h1>

                {/* Improved typing effect container */}
                <div className="relative h-8 mb-4">
                  <div
                    className={`inline-flex items-center ${
                      isDark ? "text-blue-300" : "text-blue-500"
                    } font-medium text-xl`}
                    data-aos="fade-right"
                    data-aos-delay="200"
                  >
                    <span className="inline-block">I'm a </span>
                    <div className="relative ml-2 min-w-[12ch] md:min-w-[16ch]">
                      <span className="inline-block">{displayedText}</span>
                      <span
                        className={`ml-0.5 inline-block w-0.5 sm:w-1 h-6 ${
                          typingState === "pausing" ? "animate-blink" : ""
                        } bg-[#00ff99] align-middle`}
                        style={{
                          opacity:
                            typingState === "pausing"
                              ? Date.now() % 1000 > 500
                                ? 1
                                : 0
                              : 1,
                        }}
                      ></span>
                    </div>
                  </div>
                </div>

                <h1
                  id="hero-title"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                >
                  Creating Digital
                  <span
                    className={`block mt-2 ${
                      isDark ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    Solutions
                  </span>
                </h1>

                <p
                  className={`text-base sm:text-lg md:text-xl leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Crafting bold, innovative visuals that captivate and inspire.
                </p>

                {/* Call to Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                  <a
                    href={FakeCV}
                    className={`px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                      isDark
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    Download CV
                  </a>
                  <a
                    href="#view-work"
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 border hover:shadow-md hover:scale-105 ${
                      isDark
                        ? "border-gray-600 text-white hover:bg-gray-700"
                        : "border-gray-300 text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    View Work
                  </a>
                </div>
              </div>
              {/* Profile Section */}
              <div className="order-1 md:order-2 flex justify-center relative">
                <div
                  className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 group"
                  role="presentation"
                >
                  {/* Background aura effect */}
                  <div className="absolute inset-[-20px] bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-3xl animate-pulse-slow opacity-70 group-hover:opacity-90"></div>

                  {/* Orbiting dots effect with neon glow */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full relative animate-spin-slow">
                      {/* Dot 1 */}
                      <div className="absolute w-4 h-4 bg-cyan-400 rounded-full top-0 left-1/2 -translate-x-1/2 animate-neon-glow shadow-[0_0_12px_2px_rgba(0,255,255,0.8)]"></div>
                      {/* Dot 2 */}
                      <div className="absolute w-3 h-3 bg-pink-400 rounded-full bottom-0 left-1/2 -translate-x-1/2 animate-neon-glow delay-200 shadow-[0_0_10px_2px_rgba(255,105,180,0.8)]"></div>
                      {/* Dot 3 */}
                      <div className="absolute w-3.5 h-3.5 bg-purple-400 rounded-full top-1/2 left-0 -translate-y-1/2 animate-neon-glow delay-400 shadow-[0_0_10px_2px_rgba(147,51,234,0.8)]"></div>
                      {/* Dot 4 */}
                      <div className="absolute w-2.5 h-2.5 bg-yellow-400 rounded-full top-1/2 right-0 -translate-y-1/2 animate-neon-glow delay-600 shadow-[0_0_8px_2px_rgba(234,179,8,0.8)]"></div>
                    </div>
                  </div>

                  {/* Inner profile container with gradient border */}
                  <div
                    className={`absolute inset-3 sm:inset-4 rounded-full flex items-center justify-center ${
                      isDark ? "bg-gray-800/90" : "bg-white/90"
                    } backdrop-blur-md transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] border-2 border-transparent bg-clip-padding bg-gradient-to-br from-blue-500 to-purple-600`}
                  >
                    <img
                      src={HeroProfile}
                      alt="User profile"
                      className="w-full h-full object-cover rounded-full transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Work Section */}
        <section
          id="view-work"
          className={`py-16 px-4 relative ${
            isDark ? "bg-gray-800" : "bg-gray-50"
          }`}
          aria-labelledby="projects-title"
        >
          <div className="container mx-auto max-w-6xl px-4 relative z-10">
            <h2
              id="projects-title"
              className={`text-3xl md:text-4xl font-bold mb-12 text-center ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              Featured Projects
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 group">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                    isDark ? "bg-gray-700" : "bg-white"
                  }`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.alt}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      loading="lazy"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-all duration-300 flex items-end p-4 ${
                        isDark ? "text-white" : "text-white"
                      }`}
                    >
                      <span className="text-sm font-medium">
                        {project.description}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3
                      className={`text-xl font-semibold mb-2 ${
                        isDark ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`mb-4 line-clamp-2 ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {project.description}
                    </p>
                    <Link
                      to={project.link}
                      className={`inline-flex items-center font-medium transition-colors duration-200 hover:underline ${
                        isDark
                          ? "text-blue-400 hover:text-blue-300"
                          : "text-blue-600 hover:text-blue-700"
                      }`}
                    >
                      View Details
                      <span className="ml-2">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                to="/project"
                className={`inline-block px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:scale-105 ${
                  isDark
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Discover More
              </Link>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          className={`py-16 px-4 relative overflow-hidden ${
            isDark ? "bg-gray-900" : "bg-white"
          }`}
          aria-labelledby="skills-title"
        >
          {/* Interactive Gradient with Subtle Parallax */}
          <div
            className={`absolute inset-0 z-0 opacity-15 transform -skew-y-6 transition-transform duration-300 ${
              isDark
                ? "bg-gradient-to-r from-blue-900 to-purple-900"
                : "bg-gradient-to-r from-blue-200 to-purple-200"
            } hover:translate-y-2`}
          ></div>
          <div className="container mx-auto max-w-6xl px-4 relative z-10">
            <h2
              id="skills-title"
              className={`text-3xl md:text-4xl font-bold mb-12 text-center ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              Design Expertise
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { name: "UI/UX Design", icon: "🎨" },
                { name: "Brand Identity", icon: "🏷️" },
                { name: "Illustration", icon: "✍️" },
                { name: "Typography", icon: "🔤" },
                { name: "Motion Graphics", icon: "🎬" },
                { name: "Web Design", icon: "🌐" },
                { name: "Print Design", icon: "🖨️" },
                { name: "Photo Editing", icon: "📸" },
              ].map((skill, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg text-center border transition-all duration-300 hover:scale-105 hover:shadow-lg hover:rotate-1 ${
                    isDark
                      ? "bg-gray-800/80 border-gray-700 text-gray-200 hover:bg-gray-700"
                      : "bg-gray-50/80 border-gray-200 text-gray-700 hover:bg-gray-100"
                  } backdrop-blur-sm`}
                >
                  <span className="text-2xl block mb-2 animate-pulse-on-hover">
                    {skill.icon}
                  </span>
                  <span className="font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                to="/about"
                className={`inline-block px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:scale-105 ${
                  isDark
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Explore more
              </Link>
            </div>
          </div>
        </section>
      </main>
    </DefaultLayout>
  );
};

export default Home;
