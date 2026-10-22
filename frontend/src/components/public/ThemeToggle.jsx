import React from "react";
import { useTheme } from "../../context/ThemeContext.jsx";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="p-2 rounded-xl text-neutral-700 dark:text-neutral-300 bg-neutral-100/80 dark:bg-neutral-850 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-750 transition-all duration-200 focus:outline-hidden flex items-center justify-center cursor-pointer shadow-xs active:scale-95"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-amber-400 hover:text-amber-300 transition-colors" />
      ) : (
        <Moon className="w-4 h-4 text-cyan-600 hover:text-cyan-700 transition-colors" />
      )}
    </button>
  );
};
