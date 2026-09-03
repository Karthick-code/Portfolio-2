import React, { useState, useMemo } from "react";
import { TechIcon } from "../../animations/TechIcon.jsx";
import { Layers, RefreshCw } from "lucide-react";

export const SkillsSection = ({ skills = [], isLoading = false, onRefresh }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(skills.map((s) => s.category).filter(Boolean)));
    return ["All", ...cats];
  }, [skills]);

  const filteredSkills = useMemo(() => {
    if (activeCategory === "All") return skills;
    return skills.filter((s) => s.category === activeCategory);
  }, [skills, activeCategory]);

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs font-mono font-semibold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase mb-2">
              Engineering Expertise
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white mb-2">
              Technical Skills &amp; Stack
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl">
              Dynamically fetched from MySQL. Every skill actively powers the interactive background atmosphere and production architectures.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-xs font-semibold"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-28 rounded-xl bg-neutral-100 dark:bg-neutral-900 animate-pulse border border-neutral-200 dark:border-neutral-800"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredSkills.length === 0 && (
          <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
            <Layers className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
              No skills found in this category
            </h3>
            <p className="text-xs text-neutral-500 max-w-md mx-auto mb-4">
              Add skills via the Admin Dashboard to have them automatically appear here and in the floating animation.
            </p>
            {onRefresh && (
              <button
                type="button"
                onClick={onRefresh}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Skills</span>
              </button>
            )}
          </div>
        )}

        {/* Skills Grid */}
        {!isLoading && filteredSkills.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredSkills.map((skill) => (
              <div
                key={skill._id || skill.id}
                className="group relative p-4 rounded-xl bg-white dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800/80 hover:border-cyan-500/40 dark:hover:border-cyan-400/40 transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300 group-hover:scale-110 transition-transform">
                        <TechIcon name={skill.icon || skill.name} size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-neutral-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                          {skill.name}
                        </h4>
                        <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                          {skill.category}
                        </span>
                      </div>
                    </div>

                    {skill.featured  ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                        Core
                      </span>
                    ):(<span className="px-2 py-0.5 rounded text-[10px] font-medium bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                        Basic
                      </span>)
                    }
                  </div>

                  {skill.description ? (
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-3">
                      {skill.description}
                    </p>
                  ) : (
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 italic mb-3">
                      Enterprise production tooling
                    </p>
                  )}
                </div>

                {/* Subtle Proficiency Bar */}
                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/60">
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 dark:text-neutral-400 mb-1">
                    <span>Proficiency</span>
                    <span>{skill.proficiency || 85}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${skill.proficiency || 85}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
