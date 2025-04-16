import { useState, useEffect, useRef } from "react";
import DefaultLayout from "../Layouts/DefaultLayout";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router";
import HeroProfile from "../assets/profile.png";
import FakeCV from "../CV/Fake-Resume.pdf";
import Profile2 from "../assets/Profile2.jpg";
import Profile3 from "../assets/Profile3.jpg";
import Profile4 from "../assets/Profile4.jpg";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
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
        const rect = (heroRef.current as HTMLElement).getBoundingClientRect();
        setCursorPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    // Fix: Define the mouseleave handler properly and capture rect inside it
    const handleMouseLeave = () => {
      if (heroRef.current) {
        const rect = (heroRef.current as HTMLElement).getBoundingClientRect();
        setCursorPos({ x: rect.width / 2, y: rect.height / 2 });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      (heroElement as HTMLElement).addEventListener(
        "mousemove",
        handleMouseMove
      );
      // Fixed: Added proper mouseleave handler with function reference
      (heroElement as HTMLElement).addEventListener(
        "mouseleave",
        handleMouseLeave
      );
    }

    return () => {
      if (heroElement) {
        (heroElement as HTMLElement).removeEventListener(
          "mousemove",
          handleMouseMove
        );
        // Fixed: Cleanup with the same function reference
        (heroElement as HTMLElement).removeEventListener(
          "mouseleave",
          handleMouseLeave
        );
      }
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "Brand Redesign",
      description: "Revamped corporate identity with modern aesthetics.",
      image: Profile2,
      alt: "Brand redesign project preview", // Added for accessibility
      link: "/projects/1",
    },
    {
      id: 2,
      title: "Mobile App UI",
      description: "Intuitive interface design for a fintech application.",
      image: Profile3,
      alt: "Mobile app UI project preview", // Added for accessibility
      link: "/projects/2",
    },
    {
      id: 3,
      title: "E-commerce Website",
      description: "Sleek online store with optimized user flow.",
      image: Profile4,
      alt: "E-commerce website project preview", // Added for accessibility
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
          className={`py-16 px-4 md:py-24 w-full min-h-screen flex flex-col justify-center relative overflow-hidden ${
            isDark
              ? "bg-gray-900 text-white"
              : "bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800"
          }`}
          aria-labelledby="hero-title"
        >
          {/* Interactive Cursor-Following Light */}
          <div
            className={`absolute inset-0 z-0 transition-opacity duration-300 ${
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
                ? 'bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath fill="%23ffffff" opacity="0.1" d="M0 0h60v60H0z"/%3E%3Ccircle cx="30" cy="30" r="3" fill="%23ffffff"/%3E%3C/svg%3E\')]'
                : 'bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath fill="%23dbeafe" opacity="0.2" d="M0 0h60v60H0z"/%3E%3Ccircle cx="30" cy="30" r="3" fill="%23dbeafe"/%3E%3C/svg%3E\')]'
            }`}
          ></div>
          <div className="container mx-auto max-w-6xl px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 space-y-6">
                <h1
                  id="hero-title"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                >
                  Creative Design
                  <span
                    className={`block mt-2 ${
                      isDark ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    Solutions
                  </span>
                </h1>
                <p
                  className={`text-lg md:text-xl leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Crafting bold, innovative visuals that captivate and inspire.
                </p>
                {/* call to action buttons */}
                <div className="flex flex-wrap gap-4">
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
              {/* profile section */}
              <div className="order-1 md:order-2 flex justify-center">
                <div
                  className="relative w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500"
                  role="presentation"
                >
                  <div
                    className={`absolute inset-4 rounded-full flex items-center justify-center ${
                      isDark ? "bg-gray-800/95" : "bg-white/95"
                    } backdrop-blur-md transition-all duration-300 hover:shadow-inner`}
                  >
                    <img src={HeroProfile} alt="user profile" />
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
                      alt={project.title}
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
                to="/projects"
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

        {/* Call to Action */}
        <section
          className={`py-16 px-4 relative overflow-hidden ${
            isDark ? "bg-blue-900" : "bg-blue-600"
          } text-white`}
          aria-labelledby="cta-title"
        >
          {/* Interactive Wave with Hover Glow */}
          <div
            className={`absolute inset-0 z-0 opacity-20 transition-opacity duration-500 hover:opacity-30 ${
              isDark
                ? 'bg-[url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"%3E%3Cpath fill="%23ffffff" fill-opacity="0.3" d="M0,160L48,170.7C96,181,192,203,288,192C384,181,480,139,576,138.7C672,139,768,181,864,186.7C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"%3E%3C/path%3E%3C/svg%3E\')]'
                : 'bg-[url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"%3E%3Cpath fill="%23dbeafe" fill-opacity="0.4" d="M0,160L48,170.7C96,181,192,203,288,192C384,181,480,139,576,138.7C672,139,768,181,864,186.7C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"%3E%3C/path%3E%3C/svg%3E\')]'
            } bg-[length:100%_100%] animate-slow-wave`}
          ></div>
          <div className="container mx-auto max-w-4xl text-center px-4 relative z-10">
            <h2 id="cta-title" className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Redefine Your Brand?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Partner with me to create designs that stand out and leave a
              lasting impression.
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-3 rounded-lg bg-white text-blue-600 font-medium transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 hover:shadow-lg hover:scale-105"
            >
              Start Creating
            </Link>
          </div>
        </section>
      </main>
    </DefaultLayout>
  );
};

export default Home;
