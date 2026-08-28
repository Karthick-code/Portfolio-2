import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const ThemeContext = createContext(undefined);

const getInitialTheme = () => {
  if (typeof window === "undefined") return "dark";

  // 1. Check if user explicitly set a preference earlier
  const saved = localStorage.getItem("portfolio_theme");
  if (saved === "light" || saved === "dark") {
    return saved;
  }

  // 2. Default to system preference
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
    return "light";
  }

  return "dark";
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => getInitialTheme());

  // Listen for OS system theme changes if user hasn't stored a manual preference
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = (e) => {
      const manualPref = localStorage.getItem("portfolio_theme_manual");
      if (!manualPref) {
        setThemeState(e.matches ? "dark" : "light");
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleSystemChange);
      return () => mediaQuery.removeEventListener("change", handleSystemChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleSystemChange);
      return () => mediaQuery.removeListener(handleSystemChange);
    }
  }, []);

  // Update DOM classes & attributes whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
      root.style.colorScheme = "light";
    }
    localStorage.setItem("portfolio_theme", theme);
  }, [theme]);

  // One-click toggle between light and dark
  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("portfolio_theme_manual", "true");
      return next;
    });
  }, []);

  const setTheme = useCallback((newTheme) => {
    localStorage.setItem("portfolio_theme_manual", "true");
    setThemeState(newTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
