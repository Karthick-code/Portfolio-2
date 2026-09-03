// import React from "react";
// import { X, ExternalLink, Github, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

// export const ProjectModal = ({ project, onClose }) => {
//   if (!project) return null;

//   const imageUrl = project.imageUrl || project.image;
//   const challenges = project.challenges || (project.problem ? [project.problem] : []);
//   const solutions = project.solutions || (project.solution ? [project.solution] : []);
//   const technologies = project.technologies || [];

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
//       onClick={onClose}
//     >
//       <div
//         className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header banner image */}
//         <div className="relative h-56 sm:h-72 w-full overflow-hidden rounded-t-2xl bg-neutral-950">
//           <img
//             src={imageUrl}
//             alt={project.title}
//             className="w-full h-full object-cover opacity-85"
//           />
//           <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

//           {/* Close button */}
//           <button
//             type="button"
//             onClick={onClose}
//             className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors focus:outline-hidden cursor-pointer"
//             aria-label="Close dialog"
//           >
//             <X className="w-5 h-5" />
//           </button>

//           {/* Title on Image */}
//           <div className="absolute bottom-4 left-6 right-6">
//             <span className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-cyan-600/80 text-white backdrop-blur-md mb-2 inline-block">
//               {project.category || "Full Stack"}
//             </span>
//             <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
//               {project.title}
//             </h3>
//           </div>
//         </div>

//         {/* Modal Body */}
//         <div className="p-6 sm:p-8 space-y-6">
//           {/* Quick Description */}
//           <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
//             {project.fullDescription || project.description}
//           </p>

//           {/* Problem & Solution Breakdown */}
//           {(challenges.length > 0 || solutions.length > 0) && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {challenges.length > 0 && (
//                 <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
//                   <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-1.5">
//                     <AlertCircle className="w-3.5 h-3.5" />
//                     The Challenges
//                   </h4>
//                   <ul className="space-y-1.5">
//                     {challenges.map((c, i) => (
//                       <li key={i} className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed flex items-start gap-1.5">
//                         <span className="text-amber-500 font-bold">•</span>
//                         <span>{c}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {solutions.length > 0 && (
//                 <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
//                   <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
//                     <Sparkles className="w-3.5 h-3.5" />
//                     Engineered Solutions
//                   </h4>
//                   <ul className="space-y-1.5">
//                     {solutions.map((s, i) => (
//                       <li key={i} className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed flex items-start gap-1.5">
//                         <span className="text-emerald-500 font-bold">•</span>
//                         <span>{s}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Key Architectural Features */}
//           {project.features && project.features.length > 0 && (
//             <div>
//               <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
//                 <CheckCircle2 className="w-4 h-4 text-cyan-500" />
//                 Key Capabilities &amp; Architecture
//               </h4>
//               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
//                 {project.features.map((feat, idx) => (
//                   <li
//                     key={idx}
//                     className="flex items-start gap-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300"
//                   >
//                     <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0" />
//                     <span>{feat}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Tech Stack Tags */}
//           <div>
//             <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
//               Technologies &amp; Architecture
//             </h4>
//             <div className="flex flex-wrap gap-2">
//               {technologies.map((tech, idx) => (
//                 <span
//                   key={idx}
//                   className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700"
//                 >
//                   {tech}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Action Links */}
//           <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
//             <div className="flex items-center gap-3">
//               {project.liveUrl && (
//                 <a
//                   href={project.liveUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 transition-colors"
//                 >
//                   <ExternalLink className="w-4 h-4" />
//                   <span>Live Demo</span>
//                 </a>
//               )}

//               {project.githubUrl && (
//                 <a
//                   href={project.githubUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 transition-colors"
//                 >
//                   <Github className="w-4 h-4" />
//                   <span>Source Code</span>
//                 </a>
//               )}
//             </div>

//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-xs font-medium text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 cursor-pointer"
//             >
//               Close Window
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React from "react";
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

export const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  const imageUrl = project.imageUrl || project.image;
  const challenges = project.challenges || (project.problem ? [project.problem] : []);
  const solutions = project.solutions || (project.solution ? [project.solution] : []);
  const technologies = project.technologies || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header banner image */}
        <div className="relative h-56 sm:h-72 w-full overflow-hidden rounded-t-2xl bg-neutral-950">
          <img
            src={imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"}
            alt={project.title}
            className="w-full h-full object-cover opacity-85"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop";
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors focus:outline-hidden cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on Image */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-cyan-600/80 text-white backdrop-blur-md mb-2 inline-block">
              {project.category || "Full Stack"}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Quick Description */}
          <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
            {project.fullDescription || project.description}
          </p>

          {/* Problem & Solution Breakdown */}
          {(challenges.length > 0 || solutions.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {challenges.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    The Challenges
                  </h4>
                  <ul className="space-y-1.5">
                    {challenges.map((c, i) => (
                      <li key={i} className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {solutions.length > 0 && (
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Engineered Solutions
                  </h4>
                  <ul className="space-y-1.5">
                    {solutions.map((s, i) => (
                      <li key={i} className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Key Architectural Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                Key Capabilities &amp; Architecture
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.features.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Tags */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
              Technologies &amp; Architecture
            </h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
