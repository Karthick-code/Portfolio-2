import React from "react";
import {
  Code,
  Layers,
  Compass,
  Zap,
  CheckCircle2,
  FileDown,
} from "lucide-react";

export const About = ({ profile, onResumeClick }) => {
  const interests = profile?.interests || [
    "Full-Stack Distributed Systems",
    "MySQL Database Optimization & Indexing",
    "Component Systems & Micro-Interactions",
    "REST API Design & Developer Tooling",
    "Cloud Architecture & Containerization",
  ];

  return (
    <section id="about" className="py-20 relative bg-neutral-100/50 dark:bg-neutral-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <p className="text-xs font-mono font-semibold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase mb-2">
            Engineering Identity
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white mb-4">
            About &amp; Technical Philosophy
          </h2>
          <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Engineering resilient full-stack architectures with deep focus on clean code, decoupled systems, and intuitive user experiences.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Bio & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                <Code className="w-5 h-5 text-cyan-500" />
                Professional Introduction
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-sm sm:text-base">
                {profile?.bio ||
                  "I am a dedicated software engineer with an emphasis on full-stack web architectures, relational database modeling with MySQL, and high-performance user interfaces. I engineer end-to-end systems that bridge resilient server architectures with intuitive digital products."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 shadow-xs">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-indigo-500" />
                  Development Philosophy
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {profile?.philosophy ||
                    "Software craftsmanship requires balanced attention to detail: clean data modeling on the server, deterministic state handling, and delightful, accessible user experiences."}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 shadow-xs">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  Problem Solving Approach
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {profile?.approach ||
                    "I bridge deep backend architecture with thoughtful interface engineering. Every feature begins with architectural clarity, resilient API contracts, and performant data structures."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Focus Areas & Fast Facts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-500" />
                Technical Focus &amp; Interests
              </h3>
              <ul className="space-y-3">
                {interests.map((interest, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{interest}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Location</p>
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {profile?.location }
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onResumeClick}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white transition-colors cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Resume</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
