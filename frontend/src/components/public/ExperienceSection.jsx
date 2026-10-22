

import React from "react";
import { Calendar, MapPin, CheckCircle2 } from "lucide-react";

export const ExperienceSection = ({ experience = [], isLoading = false }) => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <p className="text-xs font-mono font-semibold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase mb-2">
            Career Timeline
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white mb-2">
            Professional Experience
          </h2>

          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            A track record of shipping resilient full-stack systems,
            architecting relational databases, and leading technical
            initiatives.
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-44 rounded-2xl bg-neutral-100 dark:bg-neutral-900 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Timeline List */}
        {!isLoading && (
          <div className="relative border-l-2 border-neutral-200 dark:border-neutral-800 ml-4 sm:ml-6 space-y-10">
            {experience.map((exp) => {
              // Convert "Present" to current month-year
              const endDate =
                exp.endDate === "Present"
                  ? `${new Date().toLocaleString("en-US", {
                      month: "short",
                    })}-${new Date().getFullYear()}`
                  : exp.endDate;

              return (
                <div
                  key={exp._id || exp.id}
                  className="relative pl-6 sm:pl-8 group"
                >
                  {/* Timeline Dot Indicator */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-neutral-950 border-2 border-cyan-500 group-hover:scale-125 transition-transform" />

                  <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800/80 shadow-xs hover:shadow-md transition-shadow">
                    {/* Company & Position Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-neutral-950 dark:text-white tracking-tight">
                          {exp.position}
                        </h3>

                        <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                          {exp.company}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-neutral-400" />

                          <span>
                            {exp.startDate} – {endDate}
                          </span>
                        </span>

                        {exp.location && (
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-neutral-400" />

                            <span>{exp.location}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Summary */}
                    {exp.description && (
                      <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                        {exp.description}
                      </p>
                    )}

                    {/* Responsibilities Bullets */}
                    {exp.responsibilities &&
                      exp.responsibilities.length > 0 && (
                        <ul className="space-y-2 mb-5">
                          {exp.responsibilities.map((resp, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300"
                            >
                              <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />

                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                    {/* Tech stack badges */}
                    {exp.technologies &&
                      exp.technologies.length > 0 && (
                        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] font-mono text-neutral-400 mr-1">
                            Stack:
                          </span>

                          {exp.technologies.map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
