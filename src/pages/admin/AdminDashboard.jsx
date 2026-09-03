// import React, { useState, useEffect, useCallback } from "react";
// import { useAuth } from "../../context/AuthContext.jsx";
// import { api } from "../../services/api.js";
// import { AdminSidebar } from "../../components/admin/AdminSidebar.jsx";
// import { OverviewTab } from "../../components/admin/OverviewTab.jsx";
// import { ProfileTab } from "../../components/admin/ProfileTab.jsx";
// import { SkillsTab } from "../../components/admin/SkillsTab.jsx";
// import { ProjectsTab } from "../../components/admin/ProjectsTab.jsx";
// import { ExperienceTab } from "../../components/admin/ExperienceTab.jsx";
// import { EducationTab } from "../../components/admin/EducationTab.jsx";
// import { MessagesTab } from "../../components/admin/MessagesTab.jsx";
// import { Loader2 } from "lucide-react";

// export const AdminDashboard = ({ onViewPublic }) => {
//   const { user, logout } = useAuth();
//   const [currentTab, setCurrentTab] = useState("overview");

//   const [profile, setProfile] = useState(null);
//   const [skills, setSkills] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [experience, setExperience] = useState([]);
//   const [education, setEducation] = useState([]);
//   const [messages, setMessages] = useState([]);

//   const [isLoading, setIsLoading] = useState(true);

//   const fetchAllData = useCallback(async () => {
//     try {
//       const [p, s, proj, exp, edu, msg] = await Promise.all([
//         api.getProfile().catch(() => null),
//         api.getSkills().catch(() => []),
//         api.getProjects().catch(() => []),
//         api.getExperience().catch(() => []),
//         api.getEducation().catch(() => []),
//         api.getMessages().catch(() => []),
//       ]);

//       if (p) setProfile(p);
//       setSkills(s || []);
//       setProjects(proj || []);
//       setExperience(exp || []);
//       setEducation(edu || []);
//       setMessages(msg || []);
//     } catch (err) {
//       console.error("Dashboard failed to load data from MySQL:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAllData();
//   }, [fetchAllData]);

//   const unreadMessagesCount = messages.filter((m) => !m.read).length;

//   return (
//     <div className="min-h-screen flex bg-neutral-900 text-neutral-100 selection:bg-cyan-500/30">
//       {/* Sidebar */}
//       <AdminSidebar
//         currentTab={currentTab}
//         onTabChange={setCurrentTab}
//         onLogout={logout}
//         onViewPublic={onViewPublic}
//         user={user}
//         unreadCount={unreadMessagesCount}
//       />

//       {/* Main Content Area */}
//       <main className="grow p-6 lg:p-10 max-h-screen overflow-y-auto">
//         {isLoading ? (
//           <div className="flex items-center justify-center h-64">
//             <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
//           </div>
//         ) : (
//           <>
//             {currentTab === "overview" && (
//               <OverviewTab
//                 onTabChange={setCurrentTab}
//                 onViewPublic={onViewPublic}
//                 projects={projects}
//                 skills={skills}
//                 experience={experience}
//                 education={education}
//                 messages={messages}
//               />
//             )}

//             {currentTab === "profile" && (
//               <ProfileTab
//                 profile={profile}
//                 onProfileUpdated={(updated) => setProfile(updated)}
//               />
//             )}

//             {currentTab === "skills" && (
//               <SkillsTab
//                 skills={skills}
//                 onSkillsUpdated={fetchAllData}
//               />
//             )}

//             {currentTab === "projects" && (
//               <ProjectsTab
//                 projects={projects}
//                 onProjectsUpdated={fetchAllData}
//               />
//             )}

//             {currentTab === "experience" && (
//               <ExperienceTab
//                 experience={experience}
//                 onExperienceUpdated={fetchAllData}
//               />
//             )}

//             {currentTab === "education" && (
//               <EducationTab
//                 education={education}
//                 onEducationUpdated={fetchAllData}
//               />
//             )}

//             {currentTab === "messages" && (
//               <MessagesTab
//                 messages={messages}
//                 onMessagesUpdated={fetchAllData}
//               />
//             )}
//           </>
//         )}
//       </main>
//     </div>
//   );
// };


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
import { Loader2, Menu, ExternalLink, LogOut, Code2 } from "lucide-react";

export const AdminDashboard = ({ onViewPublic }) => {
  const { user, logout } = useAuth();
  const [currentTab, setCurrentTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const tabTitles = {
    overview: "Overview",
    profile: "Profile & Identity",
    skills: "Skills & Tech",
    projects: "Projects",
    experience: "Experience",
    education: "Education",
    messages: "Messages",
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-neutral-900 text-neutral-100 selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Responsive Sidebar (Desktop sticky + Mobile drawer) */}
      <AdminSidebar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          setIsMobileMenuOpen(false);
        }}
        onLogout={logout}
        onViewPublic={onViewPublic}
        user={user}
        unreadCount={unreadMessagesCount}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area with Mobile Topbar */}
      <div className="flex flex-col grow min-w-0 min-h-screen lg:h-screen overflow-x-hidden">
        {/* Mobile Header Bar (Only visible on screens < lg) */}
        <header className="lg:hidden sticky top-0 z-30 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-1.5 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-850 active:bg-neutral-800 transition-colors relative cursor-pointer"
              title="Open menu"
            >
              <Menu className="w-5 h-5" />
              {unreadMessagesCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-2 ring-neutral-950" />
              )}
            </button>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-linear-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-white shrink-0">
                <Code2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white tracking-tight block">Portfolio CMS</span>
                <span className="text-[10px] font-mono text-cyan-400 capitalize block leading-none">
                  {tabTitles[currentTab] || currentTab}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onViewPublic}
              className="p-2 rounded-xl text-neutral-400 hover:text-cyan-400 hover:bg-neutral-900 transition-colors cursor-pointer"
              title="View Public Site"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={logout}
              className="p-2 rounded-xl text-neutral-400 hover:text-rose-400 hover:bg-neutral-900 transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Scrollable Content Container */}
        <main className="grow p-3.5 sm:p-6 lg:p-8 xl:p-10 w-full max-w-7xl mx-auto min-w-0 lg:overflow-y-auto">
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
    </div>
  );
};
