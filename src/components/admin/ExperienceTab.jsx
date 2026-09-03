
import React, { useState } from "react";
import { api } from "../../services/api.js";
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Calendar,
  MapPin,
  Loader2,
  X,
} from "lucide-react";

export const ExperienceTab = ({ experience = [], onExperienceUpdated }) => {
  const [editingExp, setEditingExp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [techInput, setTechInput] = useState("");
  const [respInput, setRespInput] = useState("");
  const [feedback, setFeedback] = useState({ type: null, msg: "" });

  const handleOpenNew = () => {
    setEditingExp({
      company: "",
      position: "",
      location: "San Francisco, CA",
      startDate: "2023",
      endDate: "Present",
      description: "",
      responsibilities: ["Architected microservices with Node.js and MySQL"],
      technologies: ["Node.js", "Express", "MySQL", "React", "JavaScript"],
    });
    setIsModalOpen(true);
    setFeedback({ type: null, msg: "" });
  };

  const handleOpenEdit = (exp) => {
    setEditingExp({ ...exp });
    setIsModalOpen(true);
    setFeedback({ type: null, msg: "" });
  };

  const handleDelete = async (id, company) => {
    if (!window.confirm(`Are you sure you want to delete experience at "${company}" from MySQL?`)) return;

    try {
      await api.deleteExperience(id);
      setFeedback({ type: "success", msg: `Experience at "${company}" deleted.` });
      onExperienceUpdated();
    } catch (err) {
      setFeedback({ type: "error", msg: err.message || "Failed to delete experience." });
    }
  };

  const handleAddTech = () => {
    if (!techInput.trim()) return;
    setEditingExp((prev) => ({
      ...prev,
      technologies: [...(prev?.technologies || []), techInput.trim()],
    }));
    setTechInput("");
  };

  const handleRemoveTech = (index) => {
    setEditingExp((prev) => ({
      ...prev,
      technologies: prev?.technologies?.filter((_, i) => i !== index),
    }));
  };

  const handleAddResp = () => {
    if (!respInput.trim()) return;
    setEditingExp((prev) => ({
      ...prev,
      responsibilities: [...(prev?.responsibilities || []), respInput.trim()],
    }));
    setRespInput("");
  };

  const handleRemoveResp = (index) => {
    setEditingExp((prev) => ({
      ...prev,
      responsibilities: prev?.responsibilities?.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingExp || !editingExp.company || !editingExp.position) return;

    setIsSaving(true);
    try {
      const expId = editingExp._id || editingExp.id;
      if (expId) {
        await api.updateExperience(expId, editingExp);
        setFeedback({ type: "success", msg: `Experience at "${editingExp.company}" updated.` });
      } else {
        await api.createExperience(editingExp);
        setFeedback({ type: "success", msg: `Experience at "${editingExp.company}" created.` });
      }
      setIsModalOpen(false);
      setEditingExp(null);
      onExperienceUpdated();
    } catch (err) {
      setFeedback({ type: "error", msg: err.message || "Failed to save experience." });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Work Experience</h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Manage your career history, achievements, responsibilities, and technologies in MySQL
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-cyan-500 hover:bg-cyan-400 text-neutral-950 transition-colors shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Work Experience</span>
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

      {/* Experience List */}
      <div className="space-y-4">
        {experience.map((exp) => {
          const expId = exp._id || exp.id;
          return (
            <div
              key={expId}
              className="p-4 sm:p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
            >
              <div className="space-y-2 grow min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <h3 className="text-base font-bold text-white">{exp.position}</h3>
                  <span className="text-sm font-semibold text-cyan-400">@ {exp.company}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-mono text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.startDate} – {exp.endDate}
                  </span>
                  {exp.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  )}
                </div>

                {exp.description && (
                  <p className="text-xs text-neutral-300 leading-relaxed max-w-2xl">
                    {exp.description}
                  </p>
                )}

                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-xs text-neutral-400 pt-1">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} className="leading-relaxed">{r}</li>
                    ))}
                  </ul>
                )}

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2">
                    {exp.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-950 text-neutral-300 border border-neutral-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1.5 self-end sm:self-start shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-850 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(exp)}
                  className="p-2 rounded-xl text-neutral-400 hover:text-cyan-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                  title="Edit Experience"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(expId, exp.company)}
                  className="p-2 rounded-xl text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                  title="Delete Experience"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Experience Modal */}
      {isModalOpen && editingExp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
              <h3 className="text-base sm:text-lg font-bold text-white">
                {(editingExp._id || editingExp.id) ? "Edit Work Experience" : "Add Work Experience"}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={editingExp.company || ""}
                    onChange={(e) =>
                      setEditingExp((prev) => ({ ...prev, company: e.target.value }))
                    }
                    placeholder="e.g. Acme Cloud Corp"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    Job Title / Role *
                  </label>
                  <input
                    type="text"
                    value={editingExp.position || ""}
                    onChange={(e) =>
                      setEditingExp((prev) => ({ ...prev, position: e.target.value }))
                    }
                    placeholder="e.g. Senior Full Stack Engineer"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={editingExp.startDate || ""}
                    onChange={(e) =>
                      setEditingExp((prev) => ({ ...prev, startDate: e.target.value }))
                    }
                    placeholder="e.g. 2022"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    End Date
                  </label>
                  <input
                    type="text"
                    value={editingExp.endDate || ""}
                    onChange={(e) =>
                      setEditingExp((prev) => ({ ...prev, endDate: e.target.value }))
                    }
                    placeholder="e.g. Present"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingExp.location || ""}
                    onChange={(e) =>
                      setEditingExp((prev) => ({ ...prev, location: e.target.value }))
                    }
                    placeholder="e.g. Remote / SF"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1">
                  Role Summary
                </label>
                <textarea
                  rows={2}
                  value={editingExp.description || ""}
                  onChange={(e) =>
                    setEditingExp((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="High-level engineering scope..."
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50 resize-none"
                />
              </div>

              {/* Responsibilities */}
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1">
                  Key Achievements &amp; Responsibilities
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={respInput}
                    onChange={(e) => setRespInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddResp();
                      }
                    }}
                    placeholder="Add bullet (e.g. Reduced API latency by 45%)"
                    className="grow px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddResp}
                    className="px-4 py-2 rounded-xl text-xs bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-1">
                  {editingExp.responsibilities?.map((r, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-neutral-950 text-xs text-neutral-300"
                    >
                      <span className="truncate pr-2">• {r}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveResp(idx)}
                        className="text-neutral-500 hover:text-rose-400 cursor-pointer shrink-0"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1">
                  Technologies Utilized
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTech();
                      }
                    }}
                    placeholder="Add technology (e.g. React, Node.js)"
                    className="grow px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddTech}
                    className="px-4 py-2 rounded-xl text-xs bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {editingExp.technologies?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs bg-neutral-950 border border-neutral-800 text-neutral-300"
                    >
                      <span>{tech}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTech(idx)}
                        className="text-neutral-500 hover:text-rose-400 cursor-pointer"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
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
                    <span>Save Experience</span>
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

