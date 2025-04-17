import ThemeToggleButton from "./ThemeToggleButton";
import { useTheme } from "../context/ThemeContext";
import { useState, useEffect, useRef, useMemo } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router";

const Header = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Memoize constants to prevent unnecessary re-renders
  const { navItems, headerClasses, logoClasses } = useMemo(
    () => ({
      logoImg: "/src/assets/Logo.png",
      navItems: [
        { label: "Home", link: "/" },
        { label: "About", link: "/about" },
        { label: "Projects", link: "/project" },
        { label: "Contact", link: "/contact" },
      ],
      headerClasses: `sticky top-0 z-50 shadow-md px-4 py-3 transition-all duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`,
      logoClasses: `flex items-center gap-3 text-xl font-bold transition-opacity hover:opacity-80 ${
        isDark ? "text-white" : "text-gray-800"
      }`,
    }),
    [isDark]
  );

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  // Extract to component for better organization
  const NavLink = ({ item }: { item: { label: string; link: string } }) => {
    const isActive = location.pathname === item.link;
    const linkClasses = `
      relative px-2 py-1 text-base font-medium transition-all duration-200
      ${
        isActive
          ? isDark
            ? "text-blue-400"
            : "text-blue-600 font-bold"
          : isDark
          ? "text-gray-200 hover:text-blue-400"
          : "text-gray-700 hover:text-blue-600"
      }
      after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 
      after:bg-current after:transition-all after:duration-300 hover:after:w-full
    `;

    return (
      <li key={item.label}>
        <a
          href={item.link}
          className={linkClasses}
          aria-current={isActive ? "page" : undefined}
        >
          {item.label}
        </a>
      </li>
    );
  };

  const MobileNavLink = ({
    item,
  }: {
    item: { label: string; link: string };
  }) => {
    const isActive = location.pathname === item.link;
    return (
      <li key={item.label}>
        <a
          href={item.link}
          className={`
            block py-2 px-4 rounded-lg text-base font-medium transition-all duration-200
            ${
              isDark
                ? "text-white hover:bg-gray-700"
                : "text-gray-800 hover:bg-gray-200"
            }
            ${isActive ? "bg-opacity-20 bg-blue-400" : ""}
          `}
          onClick={() => setIsMenuOpen(false)}
          aria-current={isActive ? "page" : undefined}
        >
          {item.label}
        </a>
      </li>
    );
  };

  return (
    <header className={headerClasses} role="banner">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a
            href="/"
            className={logoClasses}
            aria-label="Graphic Designer Home"
          >
            <img
              src="/src/assets/Logo.png"
              alt="Graphic Designer Logo"
              className="w-10 h-10 object-contain"
              loading="lazy"
              width="40"
              height="40"
            />
            <span className="hidden sm:inline">Graphic Designer</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Main navigation"
        >
          <ul className="flex gap-6">
            {navItems.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </ul>
          <ThemeToggleButton />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggleButton />
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <X
                size={24}
                aria-hidden="true"
                className={isDark ? "text-white" : "text-gray-800"}
              />
            ) : (
              <Menu
                size={24}
                aria-hidden="true"
                className={isDark ? "text-white" : "text-gray-800"}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        ref={navRef}
        className={`
          md:hidden overflow-hidden transition-all duration-300
          ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 invisible"}
          ${isDark ? "bg-gray-800" : "bg-gray-50"}
        `}
        aria-hidden={!isMenuOpen}
      >
        <ul className="flex flex-col py-4 px-2 space-y-2">
          {navItems.map((item) => (
            <MobileNavLink key={item.label} item={item} />
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
