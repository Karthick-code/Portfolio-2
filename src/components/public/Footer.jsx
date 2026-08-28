import React from "react";
import { ArrowUp, Code2 } from "lucide-react";

export const Footer = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-white flex items-center justify-center text-white dark:text-neutral-950">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <p className="font-mono font-bold text-sm text-neutral-900 dark:text-neutral-100">
                {profile?.name || "[YOUR NAME]"}
              </p>
              <p className="text-xs text-neutral-500 font-mono">
                Full Stack Web &amp; MySQL Architecture
              </p>
            </div>
          </div>

          {/* Center Links / Notice */}
          <div className="flex items-center gap-6 text-xs text-neutral-600 dark:text-neutral-400 font-mono">
            <span>Powered by MySQL • Express • React • Node</span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Back to top */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-900 text-center text-xs text-neutral-500 font-mono">
          &copy; {new Date().getFullYear()} {profile?.name || "[YOUR NAME]"}. Engineered with MySQL database &amp; dynamic background ecosystem.
        </div>
      </div>
    </footer>
  );
};
