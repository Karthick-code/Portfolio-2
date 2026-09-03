// import React from "react";
// import { GraduationCap, Calendar, MapPin } from "lucide-react";

// export const EducationSection = ({ education = [], isLoading = false }) => {
//   return (
//     <section id="education" className="py-20 relative bg-neutral-100/50 dark:bg-neutral-900/30">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="max-w-3xl mb-14">
//           <p className="text-xs font-mono font-semibold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase mb-2">
//             Academic &amp; Qualifications
//           </p>
//           <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white mb-2">
//             Education &amp; Certifications
//           </h2>
//           <p className="text-sm text-neutral-600 dark:text-neutral-400">
//             Computer science foundations, database specializations, and continuous engineering development.
//           </p>
//         </div>

//         {/* Loading */}
//         {isLoading && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {Array.from({ length: 2 }).map((_, i) => (
//               <div key={i} className="h-44 rounded-2xl bg-neutral-200 dark:bg-neutral-900 animate-pulse" />
//             ))}
//           </div>
//         )}

//         {/* Education Cards */}
//         {!isLoading && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {education.map((edu) => (
//               <div
//                 key={edu._id || edu.id}
//                 className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
//               >
//                 <div>
//                   <div className="flex items-start justify-between gap-3 mb-3">
//                     <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
//                       <GraduationCap className="w-5 h-5" />
//                     </div>

//                     <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/80 px-2.5 py-1 rounded-full">
//                       <Calendar className="w-3 h-3" />
//                       <span>
//                         {edu.startDate} – {edu.endDate}
//                       </span>
//                     </div>
//                   </div>

//                   <h3 className="text-lg font-bold text-neutral-950 dark:text-white tracking-tight mb-1">
//                     {edu.degree} in {edu.field}
//                   </h3>
//                   <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-3">
//                     {edu.institution}
//                   </p>

//                   {edu.description && (
//                     <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
//                       {edu.description}
//                     </p>
//                   )}
//                 </div>

//                 {edu.location && (
//                   <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
//                     <MapPin className="w-3.5 h-3.5" />
//                     <span>{edu.location}</span>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

import React from "react";
import { GraduationCap, Award, Calendar, MapPin } from "lucide-react";

export const EducationSection = ({ education = [], isLoading = false }) => {
  return (
    <section id="education" className="py-20 relative bg-neutral-100/50 dark:bg-neutral-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <p className="text-xs font-mono font-semibold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase mb-2">
            Academic &amp; Qualifications
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white mb-2">
            Education &amp; Certifications
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Computer science foundations, database specializations, and continuous engineering development.
          </p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-44 rounded-2xl bg-neutral-200 dark:bg-neutral-900 animate-pulse" />
            ))}
          </div>
        )}

        {/* Education Cards */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu) => {
              const isCertificate = Boolean(
                (edu.category && edu.category.toLowerCase().includes("cert")) ||
                (edu.catgry && edu.catgry.toLowerCase().includes("cert")) ||
                (edu.degree && edu.degree.toLowerCase().includes("cert"))
              );

              const displayDate =
                edu.endDate && edu.endDate.trim()
                  ? `${edu.startDate} – ${edu.endDate.trim()}`
                  : edu.startDate;

              return (
                <div
                  key={edu._id || edu.id}
                  className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isCertificate
                            ? "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60"
                            : "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60"
                        }`}
                        title={isCertificate ? "Certificate / Qualification" : "Degree / Education"}
                      >
                        {isCertificate ? (
                          <Award className="w-5 h-5" />
                        ) : (
                          <GraduationCap className="w-5 h-5" />
                        )}
                      </div>

                      <div className="flex items-center gap-2 flex-wrap justify-end">
                        <span
                          className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-md ${
                            isCertificate
                              ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20"
                              : "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20"
                          }`}
                        >
                          {isCertificate ? "Certificate" : "Education"}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/80 px-2.5 py-1 rounded-full">
                          <Calendar className="w-3 h-3" />
                          <span>{displayDate}</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-neutral-950 dark:text-white tracking-tight mb-1">
                      {edu.degree}
                      {edu.field ? ` in ${edu.field}` : ""}
                    </h3>
                    <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-3">
                      {edu.institution}
                    </p>

                    {edu.description && (
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        {edu.description}
                      </p>
                    )}
                  </div>

                  {edu.location && (
                    <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{edu.location}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

