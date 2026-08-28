import React, { useState, useEffect, useCallback } from "react";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { PublicPortfolio } from "./pages/PublicPortfolio.jsx";
import { AdminLogin } from "./pages/admin/AdminLogin.jsx";
import { AdminDashboard } from "./pages/admin/AdminDashboard.jsx";

// Check if current location points to a creator endpoint
const isCreatorEndpoint = () => {
  if (typeof window === "undefined") return false;

  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();

  const isHashAdmin =
    hash.startsWith("#admin") ||
    hash.startsWith("#/admin") ||
    hash.startsWith("#creator") ||
    hash.startsWith("#/creator") ||
    hash.startsWith("#portal") ||
    hash.startsWith("#/portal") ||
    hash.startsWith("#login") ||
    hash.startsWith("#/login");

  const isPathAdmin =
    path.startsWith("/admin") ||
    path.startsWith("/creator") ||
    path.startsWith("/portal") ||
    path.startsWith("/login");

  const isQueryAdmin =
    search.includes("admin=1") ||
    search.includes("admin=true") ||
    search.includes("creator=1") ||
    search.includes("creator=true");

  return isHashAdmin || isPathAdmin || isQueryAdmin;
};

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState(() => {
    if (isCreatorEndpoint()) {
      return "admin-login";
    }
    return "public";
  });

  // Sync view when authentication loads or changes
  useEffect(() => {
    if (!isLoading) {
      if (isCreatorEndpoint() || currentView !== "public") {
        setCurrentView(isAuthenticated ? "admin-dashboard" : "admin-login");
      }
    }
  }, [isAuthenticated, isLoading, currentView]);

  // Route & URL listener (popstate, hashchange)
  useEffect(() => {
    const handleUrlChange = () => {
      if (isCreatorEndpoint()) {
        setCurrentView(isAuthenticated ? "admin-dashboard" : "admin-login");
      } else {
        if (currentView !== "public") {
          setCurrentView("public");
        }
      }
    };

    window.addEventListener("hashchange", handleUrlChange);
    window.addEventListener("popstate", handleUrlChange);
    return () => {
      window.removeEventListener("hashchange", handleUrlChange);
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, [isAuthenticated, currentView]);

  // Secret Creator Access: Keyboard Shortcuts
  // 1. Ctrl + Shift + A (or Cmd + Shift + A)
  // 2. Typing sequence "admin" when not in an input/textarea
  useEffect(() => {
    let keyBuffer = "";
    let bufferTimer = null;

    const handleKeyDown = (e) => {
      // 1. Shortcut: Ctrl+Shift+A or Cmd+Shift+A or Alt+Shift+A
      if (
        (e.ctrlKey || e.metaKey || e.altKey) &&
        e.shiftKey &&
        (e.key === "a" || e.key === "A")
      ) {
        e.preventDefault();
        window.location.hash = "#admin";
        setCurrentView(isAuthenticated ? "admin-dashboard" : "admin-login");
        return;
      }

      // Ignore typed keys if currently in an input, textarea or contenteditable element
      const target = e.target;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      // 2. Secret sequence typing "admin"
      if (e.key && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        keyBuffer += e.key.toLowerCase();
        if (keyBuffer.endsWith("admin") || keyBuffer.endsWith("creator")) {
          keyBuffer = "";
          window.location.hash = "#admin";
          setCurrentView(isAuthenticated ? "admin-dashboard" : "admin-login");
        }

        clearTimeout(bufferTimer);
        bufferTimer = setTimeout(() => {
          keyBuffer = "";
        }, 1500);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(bufferTimer);
    };
  }, [isAuthenticated]);

  const navigateToPublic = useCallback(() => {
    // Clear admin hash and search
    if (window.location.hash.startsWith("#admin") || window.location.hash.startsWith("#creator") || window.location.hash.startsWith("#portal")) {
      window.location.hash = "";
    }
    if (window.location.pathname.startsWith("/admin") || window.location.pathname.startsWith("/creator") || window.location.pathname.startsWith("/portal")) {
      window.history.pushState(null, "", "/");
    }
    setCurrentView("public");
  }, []);

  if (currentView === "admin-dashboard") {
    if (!isAuthenticated) {
      return (
        <AdminLogin
          onBackToPublic={navigateToPublic}
          onLoginSuccess={() => setCurrentView("admin-dashboard")}
        />
      );
    }
    return <AdminDashboard onViewPublic={navigateToPublic} />;
  }

  if (currentView === "admin-login") {
    return (
      <AdminLogin
        onBackToPublic={navigateToPublic}
        onLoginSuccess={() => setCurrentView("admin-dashboard")}
      />
    );
  }

  return <PublicPortfolio />;
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
