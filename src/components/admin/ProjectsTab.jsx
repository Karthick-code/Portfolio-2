

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
    const defaultImg = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop";
    setEditingProject({
      title: "",
      description: "",
      problem: "",
      solution: "",
      image: defaultImg,
      imageUrl: defaultImg,
      technologies: ["React", "Node.js", "Express", "MySQL"],
      features: ["Decoupled microservices", "Optimized schema indices"],
      catgry: "",
      category: "",
      featured: false,
      liveUrl: "",
      githubUrl: "",
    });
    setIsModalOpen(true);
    setFeedback({ type: null, msg: "" });
  };

  const handleOpenEdit = (project) => {
    const img = project.image || project.imageUrl || "";
    const prob = project.problem || (Array.isArray(project.challenges) && project.challenges.length > 0 ? project.challenges.join("\n\n") : "");
    const sol = project.solution || (Array.isArray(project.solutions) && project.solutions.length > 0 ? project.solutions.join("\n\n") : "");
    const feats = Array.isArray(project.features) && project.features.length > 0
      ? project.features
      : (Array.isArray(project.solutions) ? project.solutions : []);
    const projCatgry = project.catgry !== undefined ? project.catgry : (project.category || "");

    setEditingProject({
      ...project,
      image: img,
      imageUrl: img,
      problem: prob,
      solution: sol,
      features: feats,
      catgry: projCatgry,
      category: projCatgry,
    });
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
      const targetImg = (editingProject.image || editingProject.imageUrl || "").trim();
      const rawCatgry = editingProject.catgry !== undefined ? editingProject.catgry : (editingProject.category !== undefined ? editingProject.category : "");
      const targetCatgry = typeof rawCatgry === "string" ? rawCatgry.trim() : (rawCatgry || "");
      const payload = {
        ...editingProject,
        image: targetImg,
        imageUrl: targetImg,
        catgry: targetCatgry,
        category: targetCatgry,
        challenges: editingProject.problem
          ? [editingProject.problem]
          : (editingProject.challenges || []),
        solutions: editingProject.features && editingProject.features.length > 0
          ? editingProject.features
          : (editingProject.solution ? [editingProject.solution] : (editingProject.solutions || [])),
      };

      if (projId) {
        await api.updateProject(projId, payload);
        setFeedback({ type: "success", msg: `Project "${editingProject.title}" updated successfully in MySQL.` });
      } else {
        await api.createProject(payload);
        setFeedback({ type: "success", msg: `Project "${editingProject.title}" created successfully in MySQL.` });
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Projects &amp; Case Studies
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Manage projects showcase, technical architectures, and spotlight features in MySQL
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-cyan-500 hover:bg-cyan-400 text-neutral-950 transition-colors shadow-md cursor-pointer shrink-0"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => {
          const projId = p._id || p.id;
          return (
            <div
              key={projId}
              className="p-4 sm:p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-40 sm:h-36 rounded-xl overflow-hidden mb-3 bg-neutral-950">
                  <img
                    src={p.image || p.imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop";
                    }}
                  />
                  {p.featured && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500 text-neutral-950 font-bold">
                      Featured Spotlight
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono text-cyan-400">
                    {p.catgry || p.category || "Uncategorized"}
                  </span>
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
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-850"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-850"
                      title="Source Code"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(p)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-cyan-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                    title="Edit Project"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(projId, p.title)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                    title="Delete Project"
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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
              <h3 className="text-base sm:text-lg font-bold text-white">
                {(editingProject._id || editingProject.id) ? "Edit Project Case Study" : "Add New Project Case Study"}
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
                    Category (catgry)
                  </label>
                  <input
                    type="text"
                    name="catgry"
                    value={editingProject.catgry !== undefined ? editingProject.catgry : (editingProject.category || "")}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditingProject((prev) => ({ ...prev, catgry: val, category: val }));
                    }}
                    placeholder="Enter category (e.g. Full Stack, Backend, Frontend...)"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
                  />
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {["Full Stack", "Frontend", "Backend", "Mobile", "DevOps & Cloud", "AI / ML"].map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() =>
                          setEditingProject((prev) => ({ ...prev, catgry: chip, category: chip }))
                        }
                        className={`text-[10px] font-mono px-2 py-0.5 rounded cursor-pointer transition-colors ${
                          (editingProject.catgry || editingProject.category) === chip
                            ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                            : "bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800"
                        }`}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-mono text-neutral-300">
                    Preview Image URL
                  </label>
                  {(editingProject.image || editingProject.imageUrl) && (
                    <button
                      type="button"
                      onClick={() =>
                        setEditingProject((prev) => ({ ...prev, image: "", imageUrl: "" }))
                      }
                      className="text-[11px] font-mono text-neutral-400 hover:text-rose-400 cursor-pointer transition-colors"
                    >
                      Clear image
                    </button>
                  )}
                </div>
                <input
                  type="url"
                  value={editingProject.image || editingProject.imageUrl || ""}
                  onChange={(e) => {
                    const url = e.target.value;
                    setEditingProject((prev) => ({ ...prev, image: url, imageUrl: url }));
                  }}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
                />

                {/* Instant visual preview */}
                {(editingProject.image || editingProject.imageUrl) && (
                  <div className="mt-2.5 p-2 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-3">
                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800 shrink-0">
                      <img
                        src={editingProject.image || editingProject.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop";
                        }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-mono text-cyan-400 truncate">
                        Preview active
                      </p>
                      <p className="text-[10px] text-neutral-400 truncate font-mono">
                        {editingProject.image || editingProject.imageUrl}
                      </p>
                    </div>
                  </div>
                )}
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
                    className="px-4 py-2 rounded-xl text-xs bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer transition-colors"
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
                    className="px-4 py-2 rounded-xl text-xs bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer transition-colors"
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
                      <span className="truncate pr-2">• {feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-neutral-500 hover:text-rose-400 cursor-pointer shrink-0"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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

