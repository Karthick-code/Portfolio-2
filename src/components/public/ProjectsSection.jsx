import React, { useState, useMemo } from "react";
import { ExternalLink, Github, Sparkles, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { ProjectModal } from "./ProjectModal.jsx";

export const ProjectsSection = ({ projects = [], isLoading = false }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category || "Full Stack").filter(Boolean)));
    return ["All", ...cats];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => (p.category || "Full Stack") === activeCategory);
  }, [projects, activeCategory]);

  const featuredProject = useMemo(() => {
    return projects.find((p) => p.featured) || projects[0] || null;
  }, [projects]);

  const regularProjects = useMemo(() => {
    if (activeCategory !== "All") return filteredProjects;
    if (!featuredProject) return filteredProjects;
    const featuredId = featuredProject._id || featuredProject.id;
    return filteredProjects.filter((p) => (p._id || p.id) !== featuredId);
  }, [filteredProjects, featuredProject, activeCategory]);

  return (
    <section id="projects" className="py-20 relative bg-neutral-100/50 dark:bg-neutral-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs font-mono font-semibold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase mb-2">
              Featured Engineering
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white mb-2">
              Production Projects &amp; Systems
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl">
              Architected for scalability, concurrency, and intuitive developer and user experiences.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-200/70 dark:bg-neutral-900 rounded-xl border border-neutral-300/60 dark:border-neutral-800">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
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
          <div className="space-y-6">
            <div className="h-96 rounded-2xl bg-neutral-200 dark:bg-neutral-900 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-80 rounded-2xl bg-neutral-200 dark:bg-neutral-900 animate-pulse" />
              ))}
            </div>
          </div>
        )}

        {/* Featured Project Showcase (When viewing All) */}
        {!isLoading && activeCategory === "All" && featuredProject && (
          <div className="mb-12 rounded-3xl bg-white dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Image Banner */}
              <div
                className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[320px] overflow-hidden bg-neutral-950 cursor-pointer group"
                onClick={() => setSelectedProject(featuredProject)}
              >
                <img
                  src={featuredProject.imageUrl || featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent lg:bg-linear-to-r lg:from-transparent lg:to-black/30" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-500 text-neutral-950 shadow-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    Featured Architecture
                  </span>
                </div>
              </div>

              {/* Featured Project Content */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                      {featuredProject.category || "Full Stack"}
                    </span>
                  </div>

                  <h3
                    onClick={() => setSelectedProject(featuredProject)}
                    className="text-2xl font-bold text-neutral-950 dark:text-white tracking-tight mb-3 cursor-pointer hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    {featuredProject.title}
                  </h3>

                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                    {featuredProject.description}
                  </p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {(featuredProject.technologies || []).map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded text-xs font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {featuredProject.liveUrl && (
                      <a
                        href={featuredProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {featuredProject.githubUrl && (
                      <a
                        href={featuredProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(featuredProject)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
                  >
                    <span>Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Projects Grid */}
        {!isLoading && regularProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularProjects.map((project) => (
              <div
                key={project._id || project.id}
                className="group flex flex-col justify-between rounded-2xl bg-white dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800/80 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Thumbnail Image */}
                  <div
                    className="relative h-48 w-full overflow-hidden bg-neutral-950 cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <img
                      src={project.imageUrl || project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-black/60 text-white backdrop-blur-md">
                        {project.category || "Full Stack"}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <h3
                      onClick={() => setSelectedProject(project)}
                      className="font-bold text-base text-neutral-950 dark:text-white tracking-tight mb-2 cursor-pointer group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-1"
                    >
                      {project.title}
                    </h3>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2 mb-4">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {(project.technologies || []).slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                      {(project.technologies || []).length > 4 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono text-neutral-400">
                          +{(project.technologies || []).length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800/60 mt-2">
                  <div className="flex items-center gap-2 pt-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Live Demo"
                        className="p-1.5 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Source Code"
                        className="p-1.5 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="pt-3 text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
