import React, { useEffect } from "react";

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Set light mode by default on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark"); // force light
    }
  }, []);

  return (
    <div className="bg-white text-black dark:bg-[#121212] dark:text-white transition-colors duration-300 w-full min-h-screen flex flex-col">
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default DefaultLayout;
