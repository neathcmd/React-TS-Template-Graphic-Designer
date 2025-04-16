import React from "react";
import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="text-xl p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <FiSun className="text-yellow-400" />
      ) : (
        <FiMoon className="text-gray-800" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
