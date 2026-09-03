

import React, { useState } from "react";
import { api } from "../../services/api.js";
import { TechIcon } from "../../animations/TechIcon.jsx";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  EyeOff,
  Loader2,
  X,
} from "lucide-react";

export const SkillsTab = ({ skills = [], onSkillsUpdated }) => {
  const [editingSkill, setEditingSkill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState({ type: null, msg: "" });

  const categories = ["Frontend", "Backend", "Database", "DevOps & Tools", "Other"];
  const popularIcons = [
    "react", "nodejs", "mongodb", "express", "typescript", "javascript",
    "tailwind", "docker", "git", "html", "css", "redis", "postgresql",
    "graphql", "nextjs", "aws", "vite", "webpack", "npm"
  ];

  const handleOpenNew = () => {
    setEditingSkill({
      name: "",
      category: "Frontend",
      proficiency: 85,
      icon: "react",
      description: "",
      featured: true,
      animationEnabled: true,
    });
    setIsModalOpen(true);
    setFeedback({ type: null, msg: "" });
  };

  const handleOpenEdit = (skill) => {
    setEditingSkill({ ...skill });
    setIsModalOpen(true);
    setFeedback({ type: null, msg: "" });
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}" from MySQL database?`)) return;

    try {
      await api.deleteSkill(id);
      setFeedback({ type: "success", msg: `Skill "${name}" deleted.` });
      onSkillsUpdated();
    } catch (err) {
      setFeedback({ type: "error", msg: err.message || "Failed to delete skill." });
    }
  };

  const handleToggleAnimation = async (skill) => {
    try {
      const skillId = skill._id || skill.id;
      await api.updateSkill(skillId, {
        animationEnabled: !skill.animationEnabled,
      });
      onSkillsUpdated();
    } catch (err) {
      setFeedback({ type: "error", msg: "Failed to update animation state." });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingSkill || !editingSkill.name) return;

    setIsSaving(true);
    try {
      const skillId = editingSkill._id || editingSkill.id;
      if (skillId) {
        await api.updateSkill(skillId, editingSkill);
        setFeedback({ type: "success", msg: `Skill "${editingSkill.name}" updated.` });
      } else {
        await api.createSkill(editingSkill);
        setFeedback({ type: "success", msg: `Skill "${editingSkill.name}" created.` });
      }
      setIsModalOpen(false);
      setEditingSkill(null);
      onSkillsUpdated();
    } catch (err) {
      setFeedback({ type: "error", msg: err.message || "Failed to save skill." });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Skills &amp; Floating Ecosystem
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Manage technical proficiencies and configure which skills float in the interactive background
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-cyan-500 hover:bg-cyan-400 text-neutral-950 transition-colors shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Technology</span>
        </button>
      </div>

      {feedback.type && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 text-xs ${
            feedback.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
              : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{feedback.msg}</span>
        </div>
      )}

      {/* Skills Container */}
      <div className="p-4 sm:p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
        {skills.length === 0 ? (
          <div className="py-12 text-center text-neutral-500 text-xs font-mono">
            No skills recorded in MySQL. Click &quot;Add New Technology&quot; to begin.
          </div>
        ) : (
          <>
            {/* Mobile Card Layout (Visible on < md screens) */}
            <div className="block md:hidden space-y-3">
              {skills.map((skill) => {
                const skillId = skill._id || skill.id;
                return (
                  <div
                    key={skillId}
                    className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center text-white shrink-0 border border-neutral-800">
                          <TechIcon name={skill.icon || skill.name} size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-white text-sm truncate">{skill.name}</p>
                          <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-900 text-neutral-300 border border-neutral-800">
                            {skill.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(skill)}
                          className="p-2 rounded-lg text-neutral-400 hover:text-cyan-400 hover:bg-neutral-900 transition-colors cursor-pointer"
                          title="Edit Skill"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(skillId, skill.name)}
                          className="p-2 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-neutral-900 transition-colors cursor-pointer"
                          title="Delete Skill"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {skill.description && (
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        {skill.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between gap-2 pt-1 border-t border-neutral-900">
                      <div className="flex items-center gap-2 grow max-w-[200px]">
                        <div className="grow h-2 bg-neutral-850 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-cyan-500 rounded-full"
                            style={{ width: `${skill.proficiency || 80}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-mono text-neutral-400 shrink-0">
                          {skill.proficiency || 80}%
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleAnimation(skill)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer shrink-0 ${
                          skill.animationEnabled !== false
                            ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                            : "bg-neutral-900 text-neutral-500 border border-neutral-800"
                        }`}
                      >
                        {skill.animationEnabled !== false ? (
                          <>
                            <Sparkles className="w-3 h-3" />
                            <span>Floating</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Hidden</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop / Tablet Table Layout (Visible on >= md screens) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[560px]">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400 font-mono">
                    <th className="pb-3 px-3">Technology</th>
                    <th className="pb-3 px-3">Category</th>
                    <th className="pb-3 px-3">Proficiency</th>
                    <th className="pb-3 px-3 text-center">Floating Canvas</th>
                    <th className="pb-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {skills.map((skill) => {
                    const skillId = skill._id || skill.id;
                    return (
                      <tr key={skillId} className="hover:bg-neutral-800/40 transition-colors">
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-neutral-950 flex items-center justify-center text-white shrink-0">
                              <TechIcon name={skill.icon || skill.name} size={18} />
                            </div>
                            <div>
                              <p className="font-semibold text-white">{skill.name}</p>
                              <p className="text-[11px] text-neutral-400 truncate max-w-xs">
                                {skill.description || "Core proficiency"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-neutral-950 text-neutral-300 border border-neutral-800">
                            {skill.category}
                          </span>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-neutral-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-cyan-500 rounded-full"
                                style={{ width: `${skill.proficiency || 80}%` }}
                              />
                            </div>
                            <span className="font-mono text-neutral-400">{skill.proficiency || 80}%</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleToggleAnimation(skill)}
                            title={
                              skill.animationEnabled !== false
                                ? "Skill is floating in Hero animation"
                                : "Skill is disabled in Hero animation"
                            }
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer ${
                              skill.animationEnabled !== false
                                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                                : "bg-neutral-800 text-neutral-500 border border-neutral-700"
                            }`}
                          >
                            {skill.animationEnabled !== false ? (
                              <>
                                <Sparkles className="w-3 h-3" />
                                <span>Active</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3 h-3" />
                                <span>Hidden</span>
                              </>
                            )}
                          </button>
                        </td>

                        <td className="py-3.5 px-3 text-right">
                          <div className="inline-flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(skill)}
                              className="p-1.5 rounded-lg text-neutral-400 hover:text-cyan-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                              title="Edit Skill"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(skillId, skill.name)}
                              className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                              title="Delete Skill"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Add / Edit Skill Modal */}
      {isModalOpen && editingSkill && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
              <h3 className="text-base sm:text-lg font-bold text-white">
                {(editingSkill._id || editingSkill.id) ? "Edit Technology Skill" : "Add New Technology Skill"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-neutral-500 hover:text-white hover:bg-neutral-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1">
                  Skill / Technology Name
                </label>
                <input
                  type="text"
                  value={editingSkill.name || ""}
                  onChange={(e) =>
                    setEditingSkill((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g. Next.js, Redis, Docker, TypeScript"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    Category
                  </label>
                  <select
                    value={editingSkill.category || "Frontend"}
                    onChange={(e) =>
                      setEditingSkill((prev) => ({ ...prev, category: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    Icon Identifier
                  </label>
                  <input
                    type="text"
                    value={editingSkill.icon || ""}
                    onChange={(e) =>
                      setEditingSkill((prev) => ({ ...prev, icon: e.target.value }))
                    }
                    placeholder="e.g. react, nodejs, mongodb"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50 font-mono"
                  />
                </div>
              </div>

              {/* Quick Icon Selector Helper */}
              <div>
                <span className="text-[11px] font-mono text-neutral-400 block mb-1.5">
                  Popular icon presets:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {popularIcons.map((ic) => (
                    <button
                      key={ic}
                      type="button"
                      onClick={() => setEditingSkill((prev) => ({ ...prev, icon: ic }))}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                        editingSkill.icon === ic
                          ? "bg-cyan-500 text-neutral-950 font-bold"
                          : "bg-neutral-950 text-neutral-400 hover:text-white"
                      }`}
                    >
                      {ic}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-mono text-neutral-300">
                    Proficiency ({editingSkill.proficiency || 80}%)
                  </label>
                </div>
                <input
                  type="range"
                  min={20}
                  max={100}
                  step={5}
                  value={editingSkill.proficiency || 80}
                  onChange={(e) =>
                    setEditingSkill((prev) => ({
                      ...prev,
                      proficiency: parseInt(e.target.value),
                    }))
                  }
                  className="w-full accent-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1">
                  Short Technical Description
                </label>
                <input
                  type="text"
                  value={editingSkill.description || ""}
                  onChange={(e) =>
                    setEditingSkill((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Architectural role / usage in stack"
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              {/* Toggles */}
              <div className="pt-2 space-y-2">
                <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingSkill.animationEnabled !== false}
                    onChange={(e) =>
                      setEditingSkill((prev) => ({
                        ...prev,
                        animationEnabled: e.target.checked,
                      }))
                    }
                    className="rounded text-cyan-500 bg-neutral-950 border-neutral-700"
                  />
                  <span>Enable in Interactive Floating Hero Animation</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingSkill.featured || false}
                    onChange={(e) =>
                      setEditingSkill((prev) => ({
                        ...prev,
                        featured: e.target.checked,
                      }))
                    }
                    className="rounded text-cyan-500 bg-neutral-950 border-neutral-700"
                  />
                  <span>Mark as Core Featured Skill</span>
                </label>
              </div>

              <div className="pt-4 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer text-center"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium bg-cyan-500 hover:bg-cyan-400 text-neutral-950 transition-colors shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Skill</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
