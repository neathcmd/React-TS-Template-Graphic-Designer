import React, { useState, useEffect, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Award,
  Briefcase,
  User,
  Code,
  Github,
} from "lucide-react";
import DefaultLayout from "../../Layouts/DefaultLayout";
import { useTheme } from "../../context/ThemeContext";
import profile2 from "../../assets/Profile2.jpg";
import profile3 from "../../assets/Profile3.jpg";
import profile4 from "../../assets/Profile4.jpg";

interface ProjectData {
  id: number;
  title: string;
  category: string;
  description: string;
  tools: string[];
  image: string;
  link?: string;
  github?: string;
}

interface ExperienceData {
  position: string;
  company: string;
  period: string;
  description: string;
}

interface EducationData {
  degree: string;
  institution: string;
  period: string;
}

interface SkillData {
  name: string;
  level: number;
}

const Project: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "projects" | "experience" | "education" | "skills"
  >("projects");
  const [currentProject, setCurrentProject] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const { darkMode } = useTheme();

  useEffect(() => {
    setIsLoaded(true);
    // Preload images
    projects.forEach((project) => {
      const img = new Image();
      img.src = project.image;
    });
  }, []);

  const projects: ProjectData[] = useMemo(
    () => [
      {
        id: 1,
        title: "Brand Identity - Oceanic",
        category: "Branding",
        description:
          "Complete visual identity system for Oceanic, an eco-friendly swimwear brand focusing on sustainability and ocean preservation.",
        tools: ["Photoshop", "Illustrator", "After Effects"],
        image: profile2,
        link: "https://oceanic.example.com",
        github: "https://github.com/oceanic-brand",
      },
      {
        id: 2,
        title: "UI/UX Design - Mindful App",
        category: "UI/UX",
        description:
          "User interface and experience design for a meditation app with a focus on accessibility and clean aesthetics.",
        tools: ["Figma", "Sketch", "Principle"],
        image: profile3,
      },
      {
        id: 3,
        title: "Campaign - Urban Footprint",
        category: "Advertising",
        description:
          "Multi-platform advertising campaign for a sustainable urban footwear brand targeting environmentally conscious consumers.",
        tools: ["InDesign", "Illustrator", "Premiere Pro"],
        image: profile4,
      },
    ],
    []
  );

  const experiences: ExperienceData[] = useMemo(
    () => [
      {
        position: "Senior Graphic Designer",
        company: "Creative Studio X",
        period: "2021 - Present",
        description:
          "Lead designer for major client projects, focusing on brand identity systems and advertising campaigns.",
      },
      {
        position: "UI/UX Designer",
        company: "TechVision Inc.",
        period: "2018 - 2021",
        description:
          "Designed user interfaces for web and mobile applications with a focus on user experience and accessibility.",
      },
      {
        position: "Junior Graphic Designer",
        company: "DesignHub Agency",
        period: "2016 - 2018",
        description:
          "Created visual assets for print and digital media, collaborated with the marketing team on brand campaigns.",
      },
    ],
    []
  );

  const education: EducationData[] = useMemo(
    () => [
      {
        degree: "Master of Fine Arts in Graphic Design",
        institution: "Rhode Island School of Design",
        period: "2014 - 2016",
      },
      {
        degree: "Bachelor of Arts in Visual Communication",
        institution: "Parsons School of Design",
        period: "2010 - 2014",
      },
      {
        degree: "Certificate in User Experience Design",
        institution: "Interaction Design Foundation",
        period: "2017",
      },
    ],
    []
  );

  const skills: SkillData[] = useMemo(
    () => [
      { name: "Adobe Creative Suite", level: 95 },
      { name: "UI/UX Design", level: 90 },
      { name: "Brand Identity", level: 85 },
      { name: "Motion Graphics", level: 80 },
      { name: "Typography", level: 90 },
      { name: "Figma", level: 85 },
    ],
    []
  );

  const nextProject = () =>
    setCurrentProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  const prevProject = () =>
    setCurrentProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1));

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <DefaultLayout>
      <div
        className={`w-full min-h-screen transition-colors duration-300 ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
        }`}
      >
        <main
          className={`transition-all duration-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12`}
        >
          {/* Navigation Tabs */}
          <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-12"
          >
            <div
              className={`flex p-1 rounded-full ${
                darkMode ? "bg-gray-800" : "bg-gray-200"
              } shadow-lg`}
            >
              {["projects", "experience", "education", "skills"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as typeof activeTab)}
                  className={`relative px-4 py-2 rounded-full font-medium capitalize transition-all duration-300 text-sm sm:text-base
                    ${
                      activeTab === tab
                        ? darkMode
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-white shadow-md"
                        : darkMode
                        ? "hover:bg-gray-700"
                        : "hover:bg-gray-300"
                    }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute inset-0 rounded-full bg-indigo-600 z-0"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {tab === "projects" && <Code size={16} />}
                    {tab === "experience" && <Briefcase size={16} />}
                    {tab === "education" && <Award size={16} />}
                    {tab === "skills" && <User size={16} />}
                    {tab}
                  </span>
                </button>
              ))}
            </div>
          </motion.nav>

          {/* Projects Tab */}
          <AnimatePresence mode="wait">
            {activeTab === "projects" && (
              <motion.div
                key="projects"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <motion.div
                    className="w-full lg:w-1/2 relative overflow-hidden rounded-2xl shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={projects[currentProject].image}
                      alt={projects[currentProject].title}
                      className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-500"
                      loading="lazy"
                    />
                    <div
                      className={`absolute inset-0 ${
                        darkMode
                          ? "bg-gradient-to-t from-gray-900/70"
                          : "bg-gradient-to-t from-gray-800/70"
                      }`}
                    />
                  </motion.div>

                  <div className="w-full lg:w-1/2 space-y-6">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${
                        darkMode
                          ? "bg-indigo-900/50 text-indigo-200"
                          : "bg-indigo-100 text-indigo-800"
                      }`}
                    >
                      {projects[currentProject].category}
                    </motion.div>
                    <motion.h2
                      className="text-2xl sm:text-3xl font-bold"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {projects[currentProject].title}
                    </motion.h2>
                    <motion.p
                      className={`text-base ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {projects[currentProject].description}
                    </motion.p>

                    <motion.div
                      className="space-y-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h3 className="text-lg font-medium">Tools Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {projects[currentProject].tools.map((tool) => (
                          <span
                            key={tool}
                            className={`px-3 py-1 rounded-full text-sm ${
                              darkMode
                                ? "bg-gray-800/50 text-gray-200"
                                : "bg-gray-200 text-gray-700"
                            } transition-colors hover:bg-opacity-80`}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex gap-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      {projects[currentProject].link && (
                        <a
                          href={projects[currentProject].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-5 py-2 rounded-lg flex items-center gap-2 ${
                            darkMode
                              ? "bg-indigo-600 hover:bg-indigo-700"
                              : "bg-indigo-500 hover:bg-indigo-600"
                          } text-white transition-colors text-sm sm:text-base`}
                        >
                          View Details <ExternalLink size={16} />
                        </a>
                      )}
                      {projects[currentProject].github && (
                        <a
                          href={projects[currentProject].github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-5 py-2 rounded-lg flex items-center gap-2 ${
                            darkMode
                              ? "bg-gray-800 hover:bg-gray-700"
                              : "bg-gray-200 hover:bg-gray-300"
                          } transition-colors text-sm sm:text-base`}
                        >
                          Source Code <Github size={16} />
                        </a>
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* Project Navigation */}
                <div className="flex items-center justify-between mt-8">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevProject}
                    className={`p-3 rounded-full ${
                      darkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gray-200 hover:bg-gray-300"
                    } transition-colors`}
                  >
                    <ChevronLeft size={20} />
                  </motion.button>
                  <div className="flex gap-2">
                    {projects.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentProject(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          currentProject === index
                            ? darkMode
                              ? "bg-indigo-500"
                              : "bg-indigo-600"
                            : darkMode
                            ? "bg-gray-700"
                            : "bg-gray-300"
                        }`}
                        whileHover={{ scale: 1.2 }}
                      />
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextProject}
                    className={`p-3 rounded-full ${
                      darkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gray-200 hover:bg-gray-300"
                    } transition-colors`}
                  >
                    <ChevronRight size={20} />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Experience Tab */}
            {activeTab === "experience" && (
              <motion.div
                key="experience"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-3xl font-bold mb-8 text-center">
                  Work Experience
                </h2>
                <div className="space-y-12">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      className={`relative pl-8 ${
                        index !== experiences.length - 1 ? "pb-12" : ""
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {index !== experiences.length - 1 && (
                        <div
                          className={`absolute left-3 top-8 w-0.5 h-full ${
                            darkMode ? "bg-gray-700" : "bg-gray-300"
                          }`}
                        />
                      )}
                      <motion.div
                        className={`absolute left-0 top-1 w-6 h-6 rounded-full ${
                          darkMode ? "bg-indigo-600" : "bg-indigo-500"
                        } flex items-center justify-center`}
                        whileHover={{ scale: 1.2 }}
                      >
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </motion.div>
                      <motion.div
                        className={`p-6 rounded-xl shadow-lg ${
                          darkMode ? "bg-gray-800" : "bg-white"
                        } transition-shadow hover:shadow-xl`}
                        whileHover={{ y: -4 }}
                      >
                        <h3 className="text-xl font-bold">{exp.position}</h3>
                        <div
                          className={`flex items-center mt-1 mb-4 ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <span className="font-medium">{exp.company}</span>
                          <span className="mx-2">•</span>
                          <span>{exp.period}</span>
                        </div>
                        <p
                          className={
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }
                        >
                          {exp.description}
                        </p>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Education Tab */}
            {activeTab === "education" && (
              <motion.div
                key="education"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-3xl font-bold mb-8 text-center">
                  Education & Certifications
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {education.map((edu, index) => (
                    <motion.div
                      key={index}
                      className={`p-6 rounded-xl shadow-lg ${
                        darkMode ? "bg-gray-800" : "bg-white"
                      } transition-all duration-300`}
                      whileHover={{ y: -4, scale: 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div
                        className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center ${
                          darkMode
                            ? "bg-indigo-900 text-indigo-300"
                            : "bg-indigo-100 text-indigo-700"
                        }`}
                      >
                        <Award size={24} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                      <p
                        className={`font-medium ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {edu.institution}
                      </p>
                      <p
                        className={`mt-1 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {edu.period}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Skills Tab */}
            {activeTab === "skills" && (
              <motion.div
                key="skills"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-3xl font-bold mb-8 text-center">
                  Skills & Expertise
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      className={`p-6 rounded-xl ${
                        darkMode ? "bg-gray-800" : "bg-white"
                      } shadow-lg`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">{skill.name}</h3>
                        <span>{skill.level}%</span>
                      </div>
                      <div
                        className={`w-full h-2 rounded-full ${
                          darkMode ? "bg-gray-700" : "bg-gray-200"
                        }`}
                      >
                        <motion.div
                          className={`h-full rounded-full ${
                            darkMode ? "bg-indigo-500" : "bg-indigo-600"
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className={`mt-12 p-6 rounded-xl ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } shadow-lg text-center`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl font-bold mb-6">Creative Process</h3>
                  <div className="flex flex-wrap justify-center gap-4 sm:gap-0">
                    {["Research", "Concept", "Design", "Refine", "Deliver"].map(
                      (step, index) => (
                        <motion.div
                          key={index}
                          className="flex flex-col items-center w-full sm:w-1/5"
                          whileHover={{ scale: 1.05 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div
                            className={`w-12 h-12 rounded-full mb-2 flex items-center justify-center ${
                              darkMode
                                ? "bg-indigo-900 text-indigo-200"
                                : "bg-indigo-100 text-indigo-700"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <p className="font-medium">{step}</p>
                          {index < 4 && (
                            <div className="hidden sm:block w-full h-0.5 mt-6 relative">
                              <div
                                className={`absolute w-full top-0 ${
                                  darkMode ? "bg-gray-700" : "bg-gray-300"
                                }`}
                                style={{ height: "1px" }}
                              />
                            </div>
                          )}
                        </motion.div>
                      )
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </DefaultLayout>
  );
};

export default memo(Project);
