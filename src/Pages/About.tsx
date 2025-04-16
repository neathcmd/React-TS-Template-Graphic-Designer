import { useState, useEffect, useRef } from "react";
import DefaultLayout from "../Layouts/DefaultLayout";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router";
import "../styles/globals.css";

interface Skill {
  name: string;
  level: number;
}

interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string;
}

interface Education {
  id: number;
  institution: string;
  degree: string;
  period: string;
}

const About: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState<string>("");
  const [isSkillsVisible, setIsSkillsVisible] = useState<boolean>(false);

  const heroRef = useRef<HTMLElement | null>(null);
  const skillsRef = useRef<HTMLElement | null>(null);
  const experienceRef = useRef<HTMLElement | null>(null);
  const educationRef = useRef<HTMLElement | null>(null);

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

  // Scroll tracking for animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.7;

      // Check which section is in view
      [
        { ref: heroRef, id: "hero" },
        { ref: skillsRef, id: "skills" },
        { ref: experienceRef, id: "experience" },
        { ref: educationRef, id: "education" },
      ].forEach(({ ref, id }) => {
        if (ref.current) {
          const element = ref.current;
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setActiveSection(id);
            if (id === "skills") {
              setIsSkillsVisible(true);
            }
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Design skills with proficiency level (0-100)
  const designSkills: Skill[] = [
    { name: "UI/UX Design", level: 95 },
    { name: "Brand Identity", level: 90 },
    { name: "Typography", level: 85 },
    { name: "Illustration", level: 80 },
  ];

  // Technical skills with proficiency level (0-100)
  const technicalSkills: Skill[] = [
    { name: "Adobe Creative Suite", level: 95 },
    { name: "Figma", level: 90 },
    { name: "HTML/CSS", level: 85 },
    { name: "JavaScript", level: 75 },
  ];

  // Work experience data
  const experiences: Experience[] = [
    {
      id: 1,
      company: "Creative Studios",
      role: "Senior UI/UX Designer",
      period: "2021 - Present",
      description:
        "Lead designer for enterprise web applications and mobile interfaces. Spearheaded the redesign of three major product lines, resulting in 40% improvement in user engagement metrics.",
    },
    {
      id: 2,
      company: "Design Collective",
      role: "Visual Designer",
      period: "2018 - 2021",
      description:
        "Developed brand identities and design systems for startups and established businesses. Collaborated closely with marketing teams to ensure consistent visual language across all channels.",
    },
    {
      id: 3,
      company: "Tech Innovations",
      role: "Junior Designer",
      period: "2016 - 2018",
      description:
        "Created user interfaces for web and mobile applications. Participated in user research and usability testing to inform design decisions.",
    },
  ];

  // Education data
  const education: Education[] = [
    {
      id: 1,
      institution: "Design Academy",
      degree: "Master of Design",
      period: "2014 - 2016",
    },
    {
      id: 2,
      institution: "State University",
      degree: "Bachelor of Arts in Visual Communication",
      period: "2010 - 2014",
    },
  ];

  // Render skill bars with animation
  const renderSkillBar = (skill: Skill, index: number) => {
    return (
      <div
        key={skill.name}
        className={`mb-4 transition-all duration-700 ${
          isSkillsVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-8"
        }`}
        style={{ transitionDelay: `${index * 150}ms` }}
      >
        <div className="flex justify-between mb-1">
          <span
            className={`font-medium ${
              isDark ? "text-gray-200" : "text-gray-700"
            }`}
          >
            {skill.name}
          </span>
          <span className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
            {skill.level}%
          </span>
        </div>
        <div
          className={`w-full h-2 rounded-full ${
            isDark ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          <div
            className={`h-2 rounded-full bg-blue-500 transition-all duration-1000 ease-out`}
            style={{
              width: isSkillsVisible ? `${skill.level}%` : "0%",
              transitionDelay: `${index * 150 + 300}ms`,
            }}
          ></div>
        </div>
      </div>
    );
  };

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
          className={`py-16 md:py-24 min-h-screen flex items-center relative overflow-hidden ${
            isDark
              ? "bg-gray-900 text-white"
              : "bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800"
          }`}
          aria-labelledby="about-title"
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
            className={`absolute inset-0 z-0 opacity-20 ${
              isDark
                ? 'bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath fill="%23ffffff" opacity="0.1" d="M0 0h60v60H0z"/%3E%3Ccircle cx="30" cy="30" r="3" fill="%23ffffff"/%3E%3C/svg%3E\')]'
                : 'bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath fill="%23dbeafe" opacity="0.2" d="M0 0h60v60H0z"/%3E%3Ccircle cx="30" cy="30" r="3" fill="%23dbeafe"/%3E%3C/svg%3E\')]'
            }`}
          ></div>

          <div className="container mx-auto max-w-6xl px-4 relative z-10">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
              <div className="w-full md:w-1/3 order-2 md:order-1">
                <div
                  className={`relative w-64 h-64 mx-auto md:w-full md:h-96 overflow-hidden rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                    isDark ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                  <img
                    src="/src/assets/profile.jpg"
                    alt="Designer portrait"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/400x600?text=Designer";
                    }}
                  />

                  {/* Interactive Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-center p-6 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white text-center">
                      <p className="font-bold text-lg">Alex Morgan</p>
                      <p className="text-sm text-gray-200">UI/UX Designer</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/3 order-1 md:order-2">
                <h1
                  id="about-title"
                  className={`text-3xl md:text-5xl font-bold mb-4 ${
                    activeSection === "hero" ? "animate-pulse-subtle" : ""
                  }`}
                >
                  About Me
                </h1>
                <div
                  className={`h-1 w-20 ${
                    isDark ? "bg-blue-500" : "bg-blue-600"
                  } mb-6`}
                ></div>
                <p
                  className={`text-lg md:text-xl mb-6 leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  I'm a passionate designer with over 8 years of experience
                  creating bold, user-centered digital experiences that blend
                  aesthetics with functionality.
                </p>
                <p
                  className={`text-lg md:text-xl mb-6 leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  My design philosophy centers around understanding the user's
                  needs and crafting visuals that not only captivate but also
                  communicate effectively. I believe that great design should
                  feel intuitive and purposeful, elevating the user experience
                  while meeting business objectives.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {[
                    "Innovative",
                    "Detail-oriented",
                    "Problem Solver",
                    "Team Player",
                  ].map((trait) => (
                    <span
                      key={trait}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-110 hover:shadow-md ${
                        isDark
                          ? "bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700"
                          : "bg-gray-100 text-gray-800 border border-gray-200 hover:bg-white"
                      }`}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 mt-6">
                  <Link
                    to="/contact"
                    className={`px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                      isDark
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    Get in Touch
                  </Link>
                  <Link
                    to="/projects"
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 border hover:shadow-md hover:scale-105 ${
                      isDark
                        ? "border-gray-600 text-white hover:bg-gray-700"
                        : "border-gray-300 text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    View Portfolio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          ref={skillsRef}
          className={`py-16 px-4 relative overflow-hidden ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
          aria-labelledby="skills-title"
        >
          {/* Interactive Grid Pattern */}
          <div
            className={`absolute inset-0 z-0 opacity-10 ${
              isDark
                ? "bg-[linear-gradient(to_right,_rgba(255,255,255,0.1)_1px,_transparent_1px),_linear-gradient(to_bottom,_rgba(255,255,255,0.1)_1px,_transparent_1px)]"
                : "bg-[linear-gradient(to_right,_rgba(0,0,0,0.1)_1px,_transparent_1px),_linear-gradient(to_bottom,_rgba(0,0,0,0.1)_1px,_transparent_1px)]"
            } bg-[size:40px_40px]`}
          ></div>

          <div className="container mx-auto max-w-6xl relative z-10">
            <h2
              id="skills-title"
              className={`text-3xl font-bold mb-10 text-center transition-all duration-500 ${
                isDark ? "text-white" : "text-gray-800"
              } ${activeSection === "skills" ? "scale-110" : "scale-100"}`}
            >
              Professional Skills
            </h2>
            <div className="grid md:grid-cols-2 gap-8 md:gap-16">
              <div
                className={`transition-all duration-700 ${
                  activeSection === "skills" ? "opacity-100" : "opacity-80"
                }`}
              >
                <h3
                  className={`text-xl font-semibold mb-6 ${
                    isDark ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  Design Skills
                </h3>
                {designSkills.map((skill, index) =>
                  renderSkillBar(skill, index)
                )}
              </div>
              <div
                className={`transition-all duration-700 ${
                  activeSection === "skills" ? "opacity-100" : "opacity-80"
                }`}
              >
                <h3
                  className={`text-xl font-semibold mb-6 ${
                    isDark ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  Technical Skills
                </h3>
                {technicalSkills.map((skill, index) =>
                  renderSkillBar(skill, index)
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          ref={experienceRef}
          className={`py-16 px-4 relative overflow-hidden ${
            isDark ? "bg-gray-900" : "bg-gray-50"
          }`}
          aria-labelledby="experience-title"
        >
          {/* Interactive Hatch Pattern */}
          <div
            className={`absolute inset-0 z-0 opacity-20 transition-all duration-500 ${
              isDark
                ? "bg-[linear-gradient(45deg,_rgba(255,255,255,0.05)_25%,_transparent_25%,_transparent_50%,_rgba(255,255,255,0.05)_50%,_rgba(255,255,255,0.05)_75%,_transparent_75%,_transparent)] bg-[size:40px_40px]"
                : "bg-[linear-gradient(45deg,_rgba(59,130,246,0.1)_25%,_transparent_25%,_transparent_50%,_rgba(59,130,246,0.1)_50%,_rgba(59,130,246,0.1)_75%,_transparent_75%,_transparent)] bg-[size:40px_40px]"
            }`}
          ></div>

          <div className="container mx-auto max-w-6xl relative z-10">
            <h2
              id="experience-title"
              className={`text-3xl font-bold mb-10 text-center transition-all duration-500 ${
                isDark ? "text-white" : "text-gray-800"
              } ${activeSection === "experience" ? "scale-110" : "scale-100"}`}
            >
              Work Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className={`p-6 rounded-lg shadow-md transition-all duration-500 hover:shadow-lg transform hover:-translate-y-1 ${
                    isDark
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-white hover:bg-gray-50"
                  } ${
                    activeSection === "experience"
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-8"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h3
                      className={`text-xl font-bold ${
                        isDark ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {exp.role}
                    </h3>
                    <span
                      className={`text-sm font-medium ${
                        isDark ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {exp.period}
                    </span>
                  </div>
                  <p
                    className={`text-lg font-medium mb-3 ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {exp.company}
                  </p>
                  <p
                    className={`${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section
          ref={educationRef}
          className={`py-16 px-4 relative overflow-hidden ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
          aria-labelledby="education-title"
        >
          {/* Interactive Gradient with Subtle Parallax */}
          <div
            className={`absolute inset-0 z-0 opacity-15 transform -skew-y-6 transition-transform duration-300 ${
              isDark
                ? "bg-gradient-to-r from-blue-900 to-purple-900"
                : "bg-gradient-to-r from-blue-200 to-purple-200"
            } ${
              activeSection === "education" ? "translate-y-2" : "translate-y-0"
            }`}
          ></div>

          <div className="container mx-auto max-w-6xl relative z-10">
            <h2
              id="education-title"
              className={`text-3xl font-bold mb-10 text-center transition-all duration-500 ${
                isDark ? "text-white" : "text-gray-800"
              } ${activeSection === "education" ? "scale-110" : "scale-100"}`}
            >
              Education
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {education.map((edu, index) => (
                <div
                  key={edu.id}
                  className={`p-6 rounded-lg shadow-md transition-all duration-500 hover:shadow-lg border-l-4 border-blue-500 transform hover:-translate-y-1 hover:rotate-1 ${
                    isDark ? "bg-gray-700" : "bg-gray-50"
                  } ${
                    activeSection === "education"
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="flex flex-col justify-between mb-2">
                    <h3
                      className={`text-xl font-bold ${
                        isDark ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {edu.degree}
                    </h3>
                    <span
                      className={`text-sm font-medium mt-1 ${
                        isDark ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {edu.period}
                    </span>
                  </div>
                  <p
                    className={`${isDark ? "text-gray-300" : "text-gray-600"}`}
                  >
                    {edu.institution}
                  </p>
                </div>
              ))}
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
              Let's Create Something Amazing Together
            </h2>
            <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas or
              opportunities to be part of your vision.
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-3 rounded-lg bg-white text-blue-600 font-medium transition-all duration-300 hover:bg-blue-50 hover:text-blue-700 hover:shadow-lg hover:scale-105"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </main>
    </DefaultLayout>
  );
};

export default About;
