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
      const [profileData, skillsData, projectsData, expData, eduData] = await Promise.all([
        api.getProfile().catch(() => null),
        api.getSkills().catch(() => []),
        api.getProjects().catch(() => []),
        api.getExperience().catch(() => []),
        api.getEducation().catch(() => []),
      ]);

      if (profileData) setProfile(profileData);
      setSkills(skillsData || []);
      setProjects(projectsData || []);
      setExperience(expData || []);
      setEducation(eduData || []);
    } catch (err) {
      console.error("Failed to load portfolio data from MySQL:", err);
      setError("Unable to load complete portfolio data from the server.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolioData();
  }, [fetchPortfolioData]);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
      <ScrollProgressBar />

      <Navbar
        profile={profile}
        onResumeClick={() => setResumeOpen(true)}
      />

      {error && (
        <div className="pt-24 px-4 max-w-4xl mx-auto w-full">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 flex items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={fetchPortfolioData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500 text-black hover:bg-amber-400 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          </div>
        </div>
      )}

      <main className="grow">
        <Hero
          profile={profile}
          skills={skills}
          isLoadingSkills={isLoading}
          onResumeClick={() => setResumeOpen(true)}
        />

        <About
          profile={profile}
          onResumeClick={() => setResumeOpen(true)}
        />

        <SkillsSection
          skills={skills}
          isLoading={isLoading}
          onRefresh={fetchPortfolioData}
        />

        <ProjectsSection
          projects={projects}
          isLoading={isLoading}
        />

        <ExperienceSection
          experience={experience}
          isLoading={isLoading}
        />

        <EducationSection
          education={education}
          isLoading={isLoading}
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
