import React, { useEffect } from "react";
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
  X,
} from "lucide-react";

export const AdminSidebar = ({
  currentTab,
  onTabChange,
  onLogout,
  onViewPublic,
  user,
  unreadCount = 0,
  isOpen = false,
  onClose = () => {},
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

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSelectTab = (tabId) => {
    onTabChange(tabId);
    onClose();
  };

  const renderNavContent = (isMobile = false) => (
    <>
      <div className="space-y-4">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-3 py-3 border-b border-neutral-800/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-neutral-950 font-bold shrink-0">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">Portfolio CMS</h2>
              <p className="text-[11px] font-mono text-cyan-400">MySQL Admin</p>
            </div>
          </div>
          {isMobile && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-850 cursor-pointer"
              title="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
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
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "bg-neutral-800 text-white font-semibold shadow-xs"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? "text-cyan-400" : "text-neutral-400"
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500 text-neutral-950 shrink-0">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / User & Logout */}
      <div className="pt-4 border-t border-neutral-800 space-y-2 mt-auto">
        <button
          type="button"
          onClick={() => {
            onViewPublic();
            if (isMobile) onClose();
          }}
          className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
        >
          <ExternalLink className="w-4 h-4 text-neutral-500 shrink-0" />
          <span>View Live Site</span>
        </button>

        <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between gap-2">
          <div className="overflow-hidden min-w-0">
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
            className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 transition-colors cursor-pointer shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:flex w-64 bg-neutral-950 border-r border-neutral-800 flex-col justify-between p-4 shrink-0 h-screen sticky top-0 z-30">
        {renderNavContent(false)}
      </aside>

      {/* Mobile / Tablet Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs lg:hidden transition-opacity duration-200"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile / Tablet Drawer Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-neutral-950 border-r border-neutral-800 flex flex-col justify-between p-4 shadow-2xl lg:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {renderNavContent(true)}
      </aside>
    </>
  );
};
