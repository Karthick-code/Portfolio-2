import React, { useState } from "react";
import { api } from "../../services/api.js";
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
} from "lucide-react";

export const ProjectsTab = ({ projects = [], onProjectsUpdated }) => {
  const [editingProject, setEditingProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [techInput, setTechInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [feedback, setFeedback] = useState({ type: null, msg: "" });

  const handleOpenNew = () => {
    setEditingProject({
      title: "",
      description: "",
      problem: "",
      solution: "",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
      technologies: ["React", "Node.js", "Express", "MySQL"],
      features: ["Decoupled microservices", "Optimized schema indices"],
      category: "Full Stack",
      featured: false,
      liveUrl: "",
      githubUrl: "",
    });
    setIsModalOpen(true);
    setFeedback({ type: null, msg: "" });
  };

  const handleOpenEdit = (project) => {
    setEditingProject({ ...project });
    setIsModalOpen(true);
    setFeedback({ type: null, msg: "" });
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete project "${title}" from MySQL?`)) return;

    try {
      await api.deleteProject(id);
      setFeedback({ type: "success", msg: `Project "${title}" deleted.` });
      onProjectsUpdated();
    } catch (err) {
      setFeedback({ type: "error", msg: err.message || "Failed to delete project." });
    }
  };

  const handleAddTech = () => {
    if (!techInput.trim()) return;
    setEditingProject((prev) => ({
      ...prev,
      technologies: [...(prev?.technologies || []), techInput.trim()],
    }));
    setTechInput("");
  };

  const handleRemoveTech = (index) => {
    setEditingProject((prev) => ({
      ...prev,
      technologies: prev?.technologies?.filter((_, i) => i !== index),
    }));
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setEditingProject((prev) => ({
      ...prev,
      features: [...(prev?.features || []), featureInput.trim()],
    }));
    setFeatureInput("");
  };

  const handleRemoveFeature = (index) => {
    setEditingProject((prev) => ({
      ...prev,
      features: prev?.features?.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title || !editingProject.description) return;

    setIsSaving(true);
    try {
      const projId = editingProject._id || editingProject.id;
      if (projId) {
        await api.updateProject(projId, editingProject);
        setFeedback({ type: "success", msg: `Project "${editingProject.title}" updated.` });
      } else {
        await api.createProject(editingProject);
        setFeedback({ type: "success", msg: `Project "${editingProject.title}" created.` });
      }
      setIsModalOpen(false);
      setEditingProject(null);
      onProjectsUpdated();
    } catch (err) {
      setFeedback({ type: "error", msg: err.message || "Failed to save project." });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Projects &amp; Case Studies
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Manage projects showcase, technical architectures, and spotlight features in MySQL
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-cyan-500 hover:bg-cyan-400 text-neutral-950 transition-colors shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => {
          const projId = p._id || p.id;
          return (
            <div
              key={projId}
              className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-36 rounded-xl overflow-hidden mb-3 bg-neutral-950">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  {p.featured && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500 text-neutral-950 font-bold">
                      Featured Spotlight
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono text-cyan-400">{p.category}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-3">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {p.technologies?.slice(0, 3).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-950 text-neutral-300"
                    >
                      {t}
                    </span>
                  ))}
                  {p.technologies?.length > 3 && (
                    <span className="text-[10px] font-mono text-neutral-500">
                      +{p.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded text-neutral-400 hover:text-white"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded text-neutral-400 hover:text-white"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(p)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-cyan-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(projId, p.title)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Project Modal */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
              <h3 className="text-lg font-bold text-white">
                {(editingProject._id || editingProject.id) ? "Edit Project Case Study" : "Add New Project Case Study"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-500 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={editingProject.title || ""}
                    onChange={(e) =>
                      setEditingProject((prev) => ({ ...prev, title: e.target.value }))
                    }
                    placeholder="e.g. Distributed Task Orchestrator"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingProject.category || "Full Stack"}
                    onChange={(e) =>
                      setEditingProject((prev) => ({ ...prev, category: e.target.value }))
                    }
                    placeholder="Full Stack / Cloud / Systems"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1">
                  Summary Description *
                </label>
                <textarea
                  rows={2}
                  value={editingProject.description || ""}
                  onChange={(e) =>
                    setEditingProject((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Concise overview of what the application does..."
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    The Problem / Challenge
                  </label>
                  <textarea
                    rows={3}
                    value={editingProject.problem || ""}
                    onChange={(e) =>
                      setEditingProject((prev) => ({ ...prev, problem: e.target.value }))
                    }
                    placeholder="What friction or architectural limitation did this address?"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    The Engineered Solution
                  </label>
                  <textarea
                    rows={3}
                    value={editingProject.solution || ""}
                    onChange={(e) =>
                      setEditingProject((prev) => ({ ...prev, solution: e.target.value }))
                    }
                    placeholder="How was it engineered and scaled?"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50 resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1">
                  Preview Image URL
                </label>
                <input
                  type="url"
                  value={editingProject.image || ""}
                  onChange={(e) =>
                    setEditingProject((prev) => ({ ...prev, image: e.target.value }))
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              {/* Technologies Tags */}
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1">
                  Technologies &amp; Libraries
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
                    placeholder="Add technology (e.g. MySQL, Redis, Docker)"
                    className="grow px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddTech}
                    className="px-3 py-2 rounded-xl text-xs bg-neutral-800 text-white cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {editingProject.technologies?.map((tech, idx) => (
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

              {/* Key Features Bullets */}
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1">
                  Key Architectural Features
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                    placeholder="Add bullet (e.g. Decoupled async job processing with Redis queue)"
                    className="grow px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-3 py-2 rounded-xl text-xs bg-neutral-800 text-white cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-1">
                  {editingProject.features?.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-neutral-950 text-xs text-neutral-300"
                    >
                      <span>• {feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-neutral-500 hover:text-rose-400 cursor-pointer"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={editingProject.liveUrl || ""}
                    onChange={(e) =>
                      setEditingProject((prev) => ({ ...prev, liveUrl: e.target.value }))
                    }
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    GitHub Repo URL
                  </label>
                  <input
                    type="url"
                    value={editingProject.githubUrl || ""}
                    onChange={(e) =>
                      setEditingProject((prev) => ({ ...prev, githubUrl: e.target.value }))
                    }
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>
              </div>

              {/* Spotlight Toggle */}
              <div className="pt-2">
                <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.featured || false}
                    onChange={(e) =>
                      setEditingProject((prev) => ({ ...prev, featured: e.target.checked }))
                    }
                    className="rounded text-cyan-500 bg-neutral-950 border-neutral-700"
                  />
                  <span>Spotlight this project as the Featured Showcase on the homepage</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium bg-cyan-500 hover:bg-cyan-400 text-neutral-950 transition-colors shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving to MySQL...</span>
                    </>
                  ) : (
                    <span>Save Project</span>
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
