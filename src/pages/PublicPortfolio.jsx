// import React, { useEffect, useState, useCallback } from "react";
// import { api } from "../services/api.js";
// import { Navbar } from "../components/public/Navbar.jsx";
// import { ScrollProgressBar } from "../components/public/ScrollProgressBar.jsx";
// import { Hero } from "../components/public/Hero.jsx";
// import { About } from "../components/public/About.jsx";
// import { SkillsSection } from "../components/public/SkillsSection.jsx";
// import { ProjectsSection } from "../components/public/ProjectsSection.jsx";
// import { ExperienceSection } from "../components/public/ExperienceSection.jsx";
// import { EducationSection } from "../components/public/EducationSection.jsx";
// import { ContactSection } from "../components/public/ContactSection.jsx";
// import { ResumeModal } from "../components/public/ResumeModal.jsx";
// import { Footer } from "../components/public/Footer.jsx";
// import { AlertCircle, RefreshCw } from "lucide-react";

// export const PublicPortfolio = () => {
//   const [profile, setProfile] = useState(null);
//   const [skills, setSkills] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [experience, setExperience] = useState([]);
//   const [education, setEducation] = useState([]);

//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [resumeOpen, setResumeOpen] = useState(false);

//   const fetchPortfolioData = useCallback(async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const [profileData, skillsData, projectsData, expData, eduData] = await Promise.all([
//         api.getProfile().catch(() => null),
//         api.getSkills().catch(() => []),
//         api.getProjects().catch(() => []),
//         api.getExperience().catch(() => []),
//         api.getEducation().catch(() => []),
//       ]);

//       if (profileData) setProfile(profileData);
//       setSkills(skillsData || []);
//       setProjects(projectsData || []);
//       setExperience(expData || []);
//       setEducation(eduData || []);
//     } catch (err) {
//       console.error("Failed to load portfolio data from MySQL:", err);
//       setError("Unable to load complete portfolio data from the server.");
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchPortfolioData();
//   }, [fetchPortfolioData]);

//   return (
//     <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
//       <ScrollProgressBar />

//       <Navbar
//         profile={profile}
//         onResumeClick={() => setResumeOpen(true)}
//       />

//       {error && (
//         <div className="pt-24 px-4 max-w-4xl mx-auto w-full">
//           <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 flex items-center justify-between gap-3 text-sm">
//             <div className="flex items-center gap-2">
//               <AlertCircle className="w-5 h-5 shrink-0" />
//               <span>{error}</span>
//             </div>
//             <button
//               type="button"
//               onClick={fetchPortfolioData}
//               className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500 text-black hover:bg-amber-400 cursor-pointer"
//             >
//               <RefreshCw className="w-3.5 h-3.5" />
//               <span>Retry</span>
//             </button>
//           </div>
//         </div>
//       )}

//       <main className="grow">
//         <Hero
//           profile={profile}
//           skills={skills}
//           isLoadingSkills={isLoading}
//           onResumeClick={() => setResumeOpen(true)}
//         />

//         <About
//           profile={profile}
//           onResumeClick={() => setResumeOpen(true)}
//         />

//         <SkillsSection
//           skills={skills}
//           isLoading={isLoading}
//           onRefresh={fetchPortfolioData}
//         />

//         <ProjectsSection
//           projects={projects}
//           isLoading={isLoading}
//         />

//         <ExperienceSection
//           experience={experience}
//           isLoading={isLoading}
//         />

//         <EducationSection
//           education={education}
//           isLoading={isLoading}
//         />

//         <ContactSection
//           profile={profile}
//         />
//       </main>

//       <Footer
//         profile={profile}
//       />

//       <ResumeModal
//         isOpen={resumeOpen}
//         onClose={() => setResumeOpen(false)}
//         profile={profile}
//         skills={skills}
//         experience={experience}
//         education={education}
//       />
//     </div>
//   );
// };

import React, { useEffect, useState, useCallback } from "react";
import { api } from "../services/api.js";

import { Navbar } from "../components/public/Navbar.jsx";
import { ScrollProgressBar } from "../components/public/ScrollProgressBar.jsx";
import { Hero } from "../components/public/Hero.jsx";
import { About } from "../components/public/About.jsx";
import { SkillsSection } from "../components/public/SkillsSection.jsx";
import { ProjectsSection } from "../components/public/ProjectsSection.jsx";
import { ExperienceSection } from "../components/public/ExperienceSection.jsx";
import { EducationSection } from "../components/public/EducationSection.jsx";
import { ContactSection } from "../components/public/ContactSection.jsx";
import { ResumeModal } from "../components/public/ResumeModal.jsx";
import { Footer } from "../components/public/Footer.jsx";

import { AlertCircle, RefreshCw } from "lucide-react";

export const PublicPortfolio = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  const fetchPortfolioData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [
        profileData,
        skillsData,
        projectsData,
        expData,
        eduData,
      ] = await Promise.all([
        api.getProfile(),
        api.getSkills(),
        api.getProjects(),
        api.getExperience(),
        api.getEducation(),
      ]);

      setProfile(profileData || null);
      setSkills(skillsData || []);
      setProjects(projectsData || []);
      setExperience(expData || []);
      setEducation(eduData || []);
    } catch (err) {
      console.error(
        "Failed to load portfolio data from MySQL:",
        err
      );

      setProfile(null);
      setSkills([]);
      setProjects([]);
      setExperience([]);
      setEducation([]);

      setError(
        "Unable to load portfolio data from the server."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolioData();
  }, [fetchPortfolioData]);

  /*
   * ---------------------------------------------------------
   * LOADING SCREEN
   * ---------------------------------------------------------
   *
   * The entire loading group is centered on the page.
   * "Loading profile" appears above the horizontal
   * animated loading line.
   */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <div className="w-full max-w-xs flex flex-col items-center gap-4">
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Loading profile
          </p>

          <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-neutral-900 dark:bg-white rounded-full animate-loading-bar" />
          </div>
        </div>

        <style>{`
          @keyframes loadingBar {
            0% {
              transform: translateX(-150%);
            }

            50% {
              transform: translateX(150%);
            }

            100% {
              transform: translateX(350%);
            }
          }

          .animate-loading-bar {
            animation: loadingBar 1.4s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  /*
   * ---------------------------------------------------------
   * ERROR SCREEN
   * ---------------------------------------------------------
   */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4">
        <div className="w-full max-w-md">
          <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  Unable to load portfolio
                </h2>

                <p className="mt-1 text-sm opacity-80">
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={fetchPortfolioData}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-amber-500 text-black hover:bg-amber-400 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retry</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /*
   * ---------------------------------------------------------
   * MAIN PORTFOLIO
   * ---------------------------------------------------------
   */
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
      <ScrollProgressBar />

      <Navbar
        profile={profile}
        onResumeClick={() => setResumeOpen(true)}
      />

      <main className="grow">
        <Hero
          profile={profile}
          skills={skills}
          onResumeClick={() => setResumeOpen(true)}
        />

        <About
          profile={profile}
          onResumeClick={() => setResumeOpen(true)}
        />

        <SkillsSection
          skills={skills}
          onRefresh={fetchPortfolioData}
        />

        <ProjectsSection
          projects={projects}
        />

        <ExperienceSection
          experience={experience}
        />

        <EducationSection
          education={education}
        />

        <ContactSection
          profile={profile}
        />
      </main>

      <Footer
        profile={profile}
      />

      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        profile={profile}
        skills={skills}
        experience={experience}
        education={education}
      />
    </div>
  );
};