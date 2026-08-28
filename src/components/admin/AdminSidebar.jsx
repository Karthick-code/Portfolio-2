import React from "react";
import {
  LayoutDashboard,
  User,
  Wrench,
  FolderGit2,
  Briefcase,
  GraduationCap,
  MessageSquare,
  LogOut,
  ExternalLink,
  Code2,
} from "lucide-react";

export const AdminSidebar = ({
  currentTab,
  onTabChange,
  onLogout,
  onViewPublic,
  user,
  unreadCount = 0,
}) => {
  const menuItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "profile", label: "Profile & Identity", icon: User },
    { id: "skills", label: "Skills & Animations", icon: Wrench },
    { id: "projects", label: "Projects Showcase", icon: FolderGit2 },
    { id: "experience", label: "Career Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "messages", label: "Visitor Messages", icon: MessageSquare, badge: unreadCount },
  ];

  return (
    <aside className="w-64 bg-neutral-950 border-r border-neutral-800 flex flex-col justify-between p-4 shrink-0 h-screen sticky top-0">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-3 py-4 mb-4 border-b border-neutral-800/80">
          <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-neutral-950 font-bold">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">Portfolio CMS</h2>
            <p className="text-[11px] font-mono text-cyan-400">MySQL Admin</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "bg-neutral-800 text-white font-semibold"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-cyan-400" : "text-neutral-400"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500 text-neutral-950">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / User & Logout */}
      <div className="pt-4 border-t border-neutral-800 space-y-2">
        <button
          type="button"
          onClick={onViewPublic}
          className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
        >
          <ExternalLink className="w-4 h-4 text-neutral-500" />
          <span>View Public Site</span>
        </button>

        <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between">
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-white truncate">
              {user?.name || "Admin"}
            </p>
            <p className="text-[10px] font-mono text-neutral-500 truncate">
              {user?.email || "admin@portfolio.local"}
            </p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            title="Logout"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
