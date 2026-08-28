import React, { useState, useEffect } from "react";
import { api } from "../../services/api.js";
import { Save, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export const ProfileTab = ({ profile, onProfileUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    tagline: "",
    bio: "",
    philosophy: "",
    approach: "",
    statusText: "",
    availableForHire: true,
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    website: "",
    interests: [],
  });

  const [interestInput, setInterestInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState({ type: null, msg: "" });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        title: profile.title || "",
        tagline: profile.tagline || "",
        bio: profile.bio || "",
        philosophy: profile.philosophy || "",
        approach: profile.approach || "",
        statusText: profile.statusText || "",
        availableForHire: profile.availableForHire ?? true,
        email: profile.email || "",
        phone: profile.phone || "",
        location: profile.location || "",
        github: profile.github || "",
        linkedin: profile.linkedin || "",
        website: profile.website || "",
        interests: profile.interests || [],
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  const handleAddInterest = () => {
    if (!interestInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      interests: [...(prev.interests || []), interestInput.trim()],
    }));
    setInterestInput("");
  };

  const handleRemoveInterest = (index) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback({ type: null, msg: "" });

    try {
      const updated = await api.updateProfile(formData);
      onProfileUpdated(updated);
      setFeedback({
        type: "success",
        msg: "Profile identity updated in MySQL successfully.",
      });
    } catch (err) {
      setFeedback({
        type: "error",
        msg: err.message || "Failed to update profile.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Profile &amp; Identity</h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Manage your personal branding, titles, philosophy, and contact details
          </p>
        </div>
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Personal Details */}
        <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
          <h2 className="text-sm font-bold text-white border-b border-neutral-800 pb-2">
            1. Core Identity &amp; Hero Showcase
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-medium text-neutral-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Jane Developer"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-neutral-300 mb-1.5">
                Professional Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                placeholder="Full Stack Developer"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-neutral-300 mb-1.5">
              Hero Tagline / Value Proposition
            </label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline || ""}
              onChange={handleChange}
              placeholder="I build modern, scalable, and meaningful web applications..."
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-medium text-neutral-300 mb-1.5">
                Live Status Text
              </label>
              <input
                type="text"
                name="statusText"
                value={formData.statusText || ""}
                onChange={handleChange}
                placeholder="Available for opportunities"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="availableForHire"
                name="availableForHire"
                checked={formData.availableForHire || false}
                onChange={handleChange}
                className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 bg-neutral-950 border-neutral-700"
              />
              <label htmlFor="availableForHire" className="text-xs font-medium text-neutral-300 cursor-pointer">
                Actively Open for Full-Time / Contract Work
              </label>
            </div>
          </div>
        </div>

        {/* Narrative & Philosophy */}
        <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
          <h2 className="text-sm font-bold text-white border-b border-neutral-800 pb-2">
            2. Professional Narrative &amp; Philosophy
          </h2>

          <div>
            <label className="block text-xs font-mono font-medium text-neutral-300 mb-1.5">
              Biography / Introduction
            </label>
            <textarea
              name="bio"
              rows={4}
              value={formData.bio || ""}
              onChange={handleChange}
              placeholder="Deep dive into your engineering background..."
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-medium text-neutral-300 mb-1.5">
                Development Philosophy
              </label>
              <textarea
                name="philosophy"
                rows={3}
                value={formData.philosophy || ""}
                onChange={handleChange}
                placeholder="Your core engineering standards..."
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-neutral-300 mb-1.5">
                Problem Solving Approach
              </label>
              <textarea
                name="approach"
                rows={3}
                value={formData.approach || ""}
                onChange={handleChange}
                placeholder="How you tackle system bottlenecks..."
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50 resize-none"
              />
            </div>
          </div>

          {/* Technical Interests Tags */}
          <div>
            <label className="block text-xs font-mono font-medium text-neutral-300 mb-1.5">
              Technical Focus Areas &amp; Interests
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddInterest();
                  }
                }}
                placeholder="Add focus area (e.g. Distributed Database Indexes)"
                className="grow px-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white"
              />
              <button
                type="button"
                onClick={handleAddInterest}
                className="px-4 py-2 rounded-xl text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-white cursor-pointer"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {formData.interests?.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs bg-neutral-950 border border-neutral-800 text-neutral-300"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveInterest(idx)}
                    className="text-neutral-500 hover:text-rose-400 cursor-pointer"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Contact & Socials */}
        <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
          <h2 className="text-sm font-bold text-white border-b border-neutral-800 pb-2">
            3. Contact Details &amp; Social Links
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono font-medium text-neutral-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="developer@portfolio.local"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-neutral-300 mb-1.5">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location || ""}
                onChange={handleChange}
                placeholder="San Francisco, CA"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-neutral-300 mb-1.5">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                placeholder="+1 (555) 019-2834"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono font-medium text-neutral-300 mb-1.5">
                GitHub URL
              </label>
              <input
                type="url"
                name="github"
                value={formData.github || ""}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-neutral-300 mb-1.5">
                LinkedIn URL
              </label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin || ""}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-neutral-300 mb-1.5">
                Personal Website URL
              </label>
              <input
                type="url"
                name="website"
                value={formData.website || ""}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>
          </div>
        </div>

        {/* Save CTA */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm bg-cyan-500 hover:bg-cyan-400 text-neutral-950 transition-colors shadow-md disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Persisting to MySQL...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
