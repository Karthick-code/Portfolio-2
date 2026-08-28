import React, { useState } from "react";
import { api } from "../../services/api.js";
import {
  Plus,
  Edit2,
  Trash2,
  GraduationCap,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
} from "lucide-react";

export const EducationTab = ({ education = [], onEducationUpdated }) => {
  const [editingEdu, setEditingEdu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState({ type: null, msg: "" });

  const handleOpenNew = () => {
    setEditingEdu({
      institution: "",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2018",
      endDate: "2022",
      description: "Focus on distributed systems, data structures, and algorithms.",
      location: "",
    });
    setIsModalOpen(true);
    setFeedback({ type: null, msg: "" });
  };

  const handleOpenEdit = (edu) => {
    setEditingEdu({ ...edu });
    setIsModalOpen(true);
    setFeedback({ type: null, msg: "" });
  };

  const handleDelete = async (id, degree) => {
    if (!window.confirm(`Are you sure you want to delete education "${degree}" from MySQL?`)) return;

    try {
      await api.deleteEducation(id);
      setFeedback({ type: "success", msg: "Education record deleted." });
      onEducationUpdated();
    } catch (err) {
      setFeedback({ type: "error", msg: err.message || "Failed to delete record." });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingEdu || !editingEdu.institution || !editingEdu.degree) return;

    setIsSaving(true);
    try {
      const eduId = editingEdu._id || editingEdu.id;
      if (eduId) {
        await api.updateEducation(eduId, editingEdu);
        setFeedback({ type: "success", msg: "Education record updated." });
      } else {
        await api.createEducation(editingEdu);
        setFeedback({ type: "success", msg: "Education record created." });
      }
      setIsModalOpen(false);
      setEditingEdu(null);
      onEducationUpdated();
    } catch (err) {
      setFeedback({ type: "error", msg: err.message || "Failed to save record." });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Education &amp; Credentials</h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Manage academic degrees, certifications, and technical qualifications in MySQL
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-cyan-500 hover:bg-cyan-400 text-neutral-950 transition-colors shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
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

      {/* Education List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {education.map((edu) => {
          const eduId = edu._id || edu.id;
          return (
            <div
              key={eduId}
              className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-neutral-950 flex items-center justify-center text-cyan-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-1">
                  {edu.degree} in {edu.field}
                </h3>
                <p className="text-xs font-medium text-cyan-400 mb-2">{edu.institution}</p>
                {edu.description && (
                  <p className="text-xs text-neutral-400 leading-relaxed">{edu.description}</p>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-xs text-neutral-500">{edu.location || "On Campus / Remote"}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(edu)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-cyan-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(eduId, `${edu.degree} - ${edu.institution}`)}
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

      {/* Add / Edit Modal */}
      {isModalOpen && editingEdu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div
            className="w-full max-w-lg p-6 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
              <h3 className="text-lg font-bold text-white">
                {(editingEdu._id || editingEdu.id) ? "Edit Education Record" : "Add Education Record"}
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
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1">
                  Institution / University *
                </label>
                <input
                  type="text"
                  value={editingEdu.institution || ""}
                  onChange={(e) =>
                    setEditingEdu((prev) => ({ ...prev, institution: e.target.value }))
                  }
                  placeholder="e.g. University of California, Berkeley"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    Degree / Certificate *
                  </label>
                  <input
                    type="text"
                    value={editingEdu.degree || ""}
                    onChange={(e) =>
                      setEditingEdu((prev) => ({ ...prev, degree: e.target.value }))
                    }
                    placeholder="e.g. Bachelor of Science"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    value={editingEdu.field || ""}
                    onChange={(e) =>
                      setEditingEdu((prev) => ({ ...prev, field: e.target.value }))
                    }
                    placeholder="e.g. Computer Science"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    Start Year
                  </label>
                  <input
                    type="text"
                    value={editingEdu.startDate || ""}
                    onChange={(e) =>
                      setEditingEdu((prev) => ({ ...prev, startDate: e.target.value }))
                    }
                    placeholder="2018"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    End Year
                  </label>
                  <input
                    type="text"
                    value={editingEdu.endDate || ""}
                    onChange={(e) =>
                      setEditingEdu((prev) => ({ ...prev, endDate: e.target.value }))
                    }
                    placeholder="2022"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingEdu.location || ""}
                    onChange={(e) =>
                      setEditingEdu((prev) => ({ ...prev, location: e.target.value }))
                    }
                    placeholder="Berkeley, CA"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1">
                  Description / Honors
                </label>
                <textarea
                  rows={3}
                  value={editingEdu.description || ""}
                  onChange={(e) =>
                    setEditingEdu((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Key coursework, honors, GPA..."
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50 resize-none"
                />
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
                    <span>Save Record</span>
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
