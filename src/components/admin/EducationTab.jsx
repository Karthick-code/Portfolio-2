

import React, { useState } from "react";
import { api } from "../../services/api.js";
import {
  Plus,
  Edit2,
  Trash2,
  GraduationCap,
  Award,
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
      category: "Education",
      catgry: "Education",
      description: "Focus on distributed systems, data structures, and algorithms.",
      location: "",
    });
    setIsModalOpen(true);
    setFeedback({ type: null, msg: "" });
  };

  const handleOpenEdit = (edu) => {
    const isCert = Boolean(
      (edu.category && edu.category.toLowerCase().includes("cert")) ||
      (edu.catgry && edu.catgry.toLowerCase().includes("cert")) ||
      (edu.degree && edu.degree.toLowerCase().includes("cert"))
    );
    const resolvedCategory = edu.category || edu.catgry || (isCert ? "Certificate" : "Education");

    setEditingEdu({
      ...edu,
      category: resolvedCategory,
      catgry: resolvedCategory,
      endDate: edu.endDate !== undefined && edu.endDate !== null ? edu.endDate : "",
    });
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
      const cleanCategory = (editingEdu.category || editingEdu.catgry || "Education").trim();
      const cleanEndDate = editingEdu.endDate ? editingEdu.endDate.trim() : "";

      const payload = {
        ...editingEdu,
        category: cleanCategory,
        catgry: cleanCategory,
        endDate: cleanEndDate,
      };

      if (eduId) {
        await api.updateEducation(eduId, payload);
        setFeedback({ type: "success", msg: "Education record updated." });
      } else {
        await api.createEducation(payload);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Education &amp; Credentials</h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Manage academic degrees, certifications, and technical qualifications in MySQL
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenNew}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-cyan-500 hover:bg-cyan-400 text-neutral-950 transition-colors shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education / Certificate</span>
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
          const isCert = Boolean(
            (edu.category && edu.category.toLowerCase().includes("cert")) ||
            (edu.catgry && edu.catgry.toLowerCase().includes("cert")) ||
            (edu.degree && edu.degree.toLowerCase().includes("cert"))
          );

          const displayDate =
            edu.endDate && edu.endDate.trim()
              ? `${edu.startDate} – ${edu.endDate.trim()}`
              : edu.startDate;

          return (
            <div
              key={eduId}
              className="p-4 sm:p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isCert
                        ? "bg-amber-950/60 text-amber-400 border border-amber-500/30"
                        : "bg-neutral-950 text-cyan-400 border border-neutral-800"
                    }`}
                    title={isCert ? "Certificate" : "Education"}
                  >
                    {isCert ? (
                      <Award className="w-5 h-5" />
                    ) : (
                      <GraduationCap className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap justify-end">
                    <span
                      className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-md ${
                        isCert
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                      }`}
                    >
                      {isCert ? "Certificate" : "Education"}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{displayDate}</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-1">
                  {edu.degree}
                  {edu.field ? ` in ${edu.field}` : ""}
                </h3>
                <p className="text-xs font-medium text-cyan-400 mb-2">{edu.institution}</p>
                {edu.description && (
                  <p className="text-xs text-neutral-400 leading-relaxed">{edu.description}</p>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-xs text-neutral-500 truncate mr-2">{edu.location || "On Campus / Remote"}</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(edu)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-cyan-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                    title="Edit Record"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(eduId, `${edu.degree} - ${edu.institution}`)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                    title="Delete Record"
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
                {(editingEdu._id || editingEdu.id) ? "Edit Education / Certificate" : "Add Education / Certificate"}
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
                <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                  Category *
                </label>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() =>
                      setEditingEdu((prev) => ({
                        ...prev,
                        category: "Education",
                        catgry: "Education",
                      }))
                    }
                    className={`py-2 px-3 rounded-xl text-xs font-medium flex items-center justify-center gap-2 border cursor-pointer transition-all ${
                      (editingEdu.category === "Education" || editingEdu.catgry === "Education" || (!editingEdu.category && !editingEdu.catgry))
                        ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300 shadow-xs"
                        : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Education</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingEdu((prev) => ({
                        ...prev,
                        category: "Certificate",
                        catgry: "Certificate",
                      }))
                    }
                    className={`py-2 px-3 rounded-xl text-xs font-medium flex items-center justify-center gap-2 border cursor-pointer transition-all ${
                      (editingEdu.category === "Certificate" || editingEdu.catgry === "Certificate" || (editingEdu.category && editingEdu.category.toLowerCase().includes("cert")))
                        ? "bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-xs"
                        : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <Award className="w-4 h-4" />
                    <span>Certificate</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1">
                  Institution / University / Issuer *
                </label>
                <input
                  type="text"
                  value={editingEdu.institution || ""}
                  onChange={(e) =>
                    setEditingEdu((prev) => ({ ...prev, institution: e.target.value }))
                  }
                  placeholder="e.g. University of California, Berkeley or AWS / Coursera"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    Degree / Certificate Name *
                  </label>
                  <input
                    type="text"
                    value={editingEdu.degree || ""}
                    onChange={(e) =>
                      setEditingEdu((prev) => ({ ...prev, degree: e.target.value }))
                    }
                    placeholder="e.g. Bachelor of Science or Professional Certificate"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    Field of Study / Specialization
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    Start Year / Issued Date *
                  </label>
                  <input
                    type="text"
                    value={editingEdu.startDate || ""}
                    onChange={(e) =>
                      setEditingEdu((prev) => ({ ...prev, startDate: e.target.value }))
                    }
                    placeholder="2018"
                    required
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
                    placeholder="Leave empty if none"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
                  />
                  <p className="text-[10px] text-neutral-500 mt-1">If empty, only start year is shown.</p>
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
                    placeholder="Berkeley, CA or Online"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1">
                  Description / Skills
                </label>
                <textarea
                  rows={3}
                  value={editingEdu.description || ""}
                  onChange={(e) =>
                    setEditingEdu((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Key coursework, honors, credentials, GPA..."
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50 resize-none"
                />
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

