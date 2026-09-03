import React from "react";
import { X, Printer, Mail, Phone, MapPin, Globe } from "lucide-react";
 import { Download } from "lucide-react";
import html2pdf from "html2pdf.js";

export const ResumeModal = ({
  isOpen,
  onClose,
  profile,
  skills = [],
  experience = [],
  education = [],
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };
 
// -- download option will be implemented in future 
// const handleDownloadPDF = () => {
//   const element = document.getElementById("resume");

//   const options = {
//     margin: 0,
//     filename: "Resume.pdf",
//     image: {
//       type: "jpeg",
//       quality: 0.98,
//     },
//     html2canvas: {
//       scale: 2,
//       useCORS: true,
//     },
//     jsPDF: {
//       unit: "mm",
//       format: "a4",
//       orientation: "portrait",
//     },
//   };

//   html2pdf()
//     .set(options)
//     .from(element)
//     .save();
// };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="no-print flex items-center justify-between px-6 py-3.5 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xs text-neutral-700 dark:text-neutral-300">
              RESUME PREVIEW • {profile?.name || "[YOUR NAME]"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              <Download  className="w-3.5 h-3.5" />
              <span>Save as PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Close resume"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Content */}
        <div className="p-8 sm:p-12 overflow-y-auto bg-white text-neutral-900 selection:bg-neutral-200">
          {/* Header */}
          <div className="border-b-2 border-neutral-900 pb-6 mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 mb-1">
              {profile?.name || "[YOUR NAME]"}
            </h1>
            <p className="text-base font-semibold text-neutral-700 mb-4">
              {profile?.title || "Senior Full Stack Engineer"}
            </p>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-neutral-600 font-mono">
              {profile?.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3" /> {profile.email}
                </span>
              )}
              {profile?.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" /> {profile.phone}
                </span>
              )}
              {profile?.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {profile.location}
                </span>
              )}
              {profile?.website && (
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3" /> {profile.website}
                </span>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-6">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed">
              {profile?.bio ||
                "Accomplished Software Engineer specializing in full-stack engineering, scalable distributed architectures, and intuitive component libraries. Proven track record of architecting high-throughput REST APIs and database indexes."}
            </p>
          </div>

          {/* Technical Skills */}
          <div className="mb-6">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-2">
              Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-800">
              <div>
                <span className="font-bold">Languages &amp; Frontend:</span>{" "}
                {skills
                  .filter((s) => s.category === "Frontend")
                  .map((s) => s.name)
                  .join(", ") || "React, JavaScript, Tailwind CSS, HTML5, CSS3"}
              </div>
              <div>
                <span className="font-bold">Backend &amp; Cloud:</span>{" "}
                {skills
                  .filter((s) => s.category === "Backend" || s.category === "DevOps & Tools")
                  .map((s) => s.name)
                  .join(", ") || "Node.js, Express.js, Docker, REST APIs, Git"}
              </div>
              <div>
                <span className="font-bold">Databases &amp; Caching:</span>{" "}
                {skills
                  .filter((s) => s.category === "Database")
                  .map((s) => s.name)
                  .join(", ") || "MySQL, Redis, SQL"}
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="mb-6">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-3">
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp._id || exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <div>
                      <span className="font-bold text-sm text-neutral-950">{exp.position}</span>
                      <span className="text-xs text-neutral-700"> • {exp.company}</span>
                    </div>
                    <span className="text-xs font-mono text-neutral-600">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-xs text-neutral-700 italic mb-1.5">{exp.description}</p>
                  )}
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-xs text-neutral-800">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-300 pb-1 mb-3">
              Education &amp; Qualifications
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu._id || edu.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-xs sm:text-sm text-neutral-950">
                      {edu.degree} in {edu.field}
                    </span>
                    <span className="text-xs text-neutral-700"> — {edu.institution}</span>
                  </div>
                  <span className="text-xs font-mono text-neutral-600">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
