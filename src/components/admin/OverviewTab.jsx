import React from "react";
import {
  FolderGit2,
  Wrench,
  Briefcase,
  MessageSquare,
  ArrowRight,
  Database,
  ExternalLink,
} from "lucide-react";

export const OverviewTab = ({
  onTabChange,
  onViewPublic,
  projects = [],
  skills = [],
  experience = [],
  messages = [],
}) => {
  const unreadMessages = messages.filter((m) => !m.read);
  const animatedSkillsCount = skills.filter((s) => s.animationEnabled !== false).length;

  const stats = [
    {
      title: "Projects Showcase",
      value: projects.length,
      sub: `${projects.filter((p) => p.featured).length} Featured in Spotlight`,
      icon: FolderGit2,
      tab: "projects",
      color: "text-cyan-400 bg-cyan-400/10",
    },
    {
      title: "MySQL Skills",
      value: skills.length,
      sub: `${animatedSkillsCount} Active in Floating Canvas`,
      icon: Wrench,
      tab: "skills",
      color: "text-emerald-400 bg-emerald-400/10",
    },
    {
      title: "Work History",
      value: experience.length,
      sub: "Production Roles Documented",
      icon: Briefcase,
      tab: "experience",
      color: "text-indigo-400 bg-indigo-400/10",
    },
    {
      title: "Inquiries & Messages",
      value: messages.length,
      sub: `${unreadMessages.length} Unread Direct Inquiries`,
      icon: MessageSquare,
      tab: "messages",
      color: "text-amber-400 bg-amber-400/10",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Portfolio Administration Overview
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Real-time state connected directly to MySQL database
          </p>
        </div>

        <button
          type="button"
          onClick={onViewPublic}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 transition-colors cursor-pointer"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Open Live Site</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              onClick={() => onTabChange(stat.tab)}
              className="p-4 sm:p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer transition-all hover:scale-[1.01] shadow-xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="text-xs font-medium text-neutral-400">{stat.title}</span>
                <div className={`p-2 rounded-xl ${stat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{stat.value}</p>
                <p className="text-[11px] font-mono text-neutral-400 mt-1">{stat.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Architecture Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 p-4 sm:p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Full Stack System Architecture</span>
          </h2>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Every section on the public portfolio is driven dynamically by MySQL database tables. Updating any field in this Admin CMS reflects immediately across the public UI and floating animations without rebuilds.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
              <span className="font-mono text-cyan-400 block mb-1">Floating Engine:</span>
              <span className="text-neutral-400">
                Skills with <code>animationEnabled=true</code> are calculated dynamically into the hero viewport with mouse parallax and smooth CSS transforms.
              </span>
            </div>
            <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
              <span className="font-mono text-emerald-400 block mb-1">Contact Gateway:</span>
              <span className="text-neutral-400">
                Contact submissions are validated and recorded directly in the MySQL messages table with timestamps and read status.
              </span>
            </div>
          </div>
        </div>

        {/* Recent Inquiries List */}
        <div className="p-4 sm:p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span>Recent Inquiries</span>
              </h2>
              <button
                type="button"
                onClick={() => onTabChange("messages")}
                className="text-[11px] font-mono text-cyan-400 hover:underline cursor-pointer"
              >
                View all
              </button>
            </div>

            {messages.length === 0 ? (
              <p className="text-xs text-neutral-500 py-6 text-center">
                No visitor inquiries yet.
              </p>
            ) : (
              <div className="space-y-2.5">
                {messages.slice(0, 3).map((m) => (
                  <div
                    key={m._id || m.id}
                    onClick={() => onTabChange("messages")}
                    className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-white truncate max-w-[140px] sm:max-w-[200px]">
                        {m.name}
                      </span>
                      {!m.read && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                      {m.subject || m.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => onTabChange("profile")}
            className="w-full mt-4 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
          >
            <span>Edit Profile Data</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
