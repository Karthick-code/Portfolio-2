import React from "react";
import { ArrowRight, Mail, Download, Terminal } from "lucide-react";
import { FloatingSkills } from "../../animations/FloatingSkills.jsx";

export const Hero = ({
  profile,
  skills = [],
  isLoadingSkills = false,
  onResumeClick,
}) => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Signature Dynamic Animated Floating Technology Background from MySQL */}
      <FloatingSkills skills={skills} isLoading={isLoadingSkills} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Status Pill Indicator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 backdrop-blur-md shadow-xs mb-8">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300">
            {profile?.statusText || "Available for opportunities"}
          </span>
        </div>

        {/* Intro Tag */}
        <p className="text-sm sm:text-base font-mono font-medium text-cyan-600 dark:text-cyan-400 mb-3 tracking-wide">
          Hi, I&apos;m
        </p>

        {/* Name Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-950 dark:text-white mb-4">
          {profile?.name || "[YOUR NAME]"}
        </h1>

        {/* Professional Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-neutral-600 dark:text-neutral-300 mb-6">
          {profile?.title || "Full Stack Developer"}
        </h2>

        {/* Core Tagline / Philosophy */}
        <p className="max-w-2xl text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed mb-10">
          {profile?.tagline ||
            "I build modern, scalable and meaningful web applications using clean architecture and practical technology."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 w-full max-w-md">
          <button
            type="button"
            onClick={() => scrollTo("projects")}
            className="flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 transition-all shadow-sm hover:shadow group focus:outline-hidden"
          >
            <span>View My Work</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className="flex-1 min-w-[150px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm bg-white/90 dark:bg-neutral-900/90 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 transition-all shadow-xs focus:outline-hidden"
          >
            <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Contact Me</span>
          </button>

          <button
            type="button"
            onClick={onResumeClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors focus:outline-hidden"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Resume</span>
          </button>
        </div>

        {/* Tech Stack Indicator Note */}
        <div className="mt-14 inline-flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-500">
          <Terminal className="w-3.5 h-3.5 text-cyan-500" />
          <span>Interactive floating ecosystem dynamically connected to MySQL</span>
        </div>
      </div>
    </section>
  );
};
