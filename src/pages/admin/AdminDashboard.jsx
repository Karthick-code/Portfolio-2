import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { api } from "../../services/api.js";
import { AdminSidebar } from "../../components/admin/AdminSidebar.jsx";
import { OverviewTab } from "../../components/admin/OverviewTab.jsx";
import { ProfileTab } from "../../components/admin/ProfileTab.jsx";
import { SkillsTab } from "../../components/admin/SkillsTab.jsx";
import { ProjectsTab } from "../../components/admin/ProjectsTab.jsx";
import { ExperienceTab } from "../../components/admin/ExperienceTab.jsx";
import { EducationTab } from "../../components/admin/EducationTab.jsx";
import { MessagesTab } from "../../components/admin/MessagesTab.jsx";
import { Loader2 } from "lucide-react";

export const AdminDashboard = ({ onViewPublic }) => {
  const { user, logout } = useAuth();
  const [currentTab, setCurrentTab] = useState("overview");

  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [messages, setMessages] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const fetchAllData = useCallback(async () => {
    try {
      const [p, s, proj, exp, edu, msg] = await Promise.all([
        api.getProfile().catch(() => null),
        api.getSkills().catch(() => []),
        api.getProjects().catch(() => []),
        api.getExperience().catch(() => []),
        api.getEducation().catch(() => []),
        api.getMessages().catch(() => []),
      ]);

      if (p) setProfile(p);
      setSkills(s || []);
      setProjects(proj || []);
      setExperience(exp || []);
      setEducation(edu || []);
      setMessages(msg || []);
    } catch (err) {
      console.error("Dashboard failed to load data from MySQL:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const unreadMessagesCount = messages.filter((m) => !m.read).length;

  return (
    <div className="min-h-screen flex bg-neutral-900 text-neutral-100 selection:bg-cyan-500/30">
      {/* Sidebar */}
      <AdminSidebar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onLogout={logout}
        onViewPublic={onViewPublic}
        user={user}
        unreadCount={unreadMessagesCount}
      />

      {/* Main Content Area */}
      <main className="grow p-6 lg:p-10 max-h-screen overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
          </div>
        ) : (
          <>
            {currentTab === "overview" && (
              <OverviewTab
                onTabChange={setCurrentTab}
                onViewPublic={onViewPublic}
                projects={projects}
                skills={skills}
                experience={experience}
                education={education}
                messages={messages}
              />
            )}

            {currentTab === "profile" && (
              <ProfileTab
                profile={profile}
                onProfileUpdated={(updated) => setProfile(updated)}
              />
            )}

            {currentTab === "skills" && (
              <SkillsTab
                skills={skills}
                onSkillsUpdated={fetchAllData}
              />
            )}

            {currentTab === "projects" && (
              <ProjectsTab
                projects={projects}
                onProjectsUpdated={fetchAllData}
              />
            )}

            {currentTab === "experience" && (
              <ExperienceTab
                experience={experience}
                onExperienceUpdated={fetchAllData}
              />
            )}

            {currentTab === "education" && (
              <EducationTab
                education={education}
                onEducationUpdated={fetchAllData}
              />
            )}

            {currentTab === "messages" && (
              <MessagesTab
                messages={messages}
                onMessagesUpdated={fetchAllData}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};
