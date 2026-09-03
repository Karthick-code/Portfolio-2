import React, { useState } from "react";
import { api } from "../../services/api.js";
import {
  Mail,
  Send,
  MapPin,
  Github,
  Linkedin,
  Globe,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
} from "lucide-react";

export const ContactSection = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status.type) setStatus({ type: null, message: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: "error",
        message: "Please fill out all required fields.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await api.sendContactMessage(formData);
      setStatus({
        type: "success",
        message: "Thank you! Your message has been sent directly to the database. I will get back to you promptly.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Failed to submit message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-mono font-semibold tracking-wider text-cyan-600 dark:text-cyan-400 uppercase mb-2">
                Initiate Dialogue
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white mb-4">
                Get In Touch
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Whether you have an upcoming project, want to discuss technical architectures, or explore collaboration opportunities, my inbox is always open.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">Direct Email</p>
                  <a
                    href={`mailto:${profile?.email || "developer@portfolio.local"}`}
                    className="text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    {profile?.email || "developer@portfolio.local"}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">Location</p>
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {profile?.location || "[YOUR LOCATION]"}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                Social Profiles &amp; Repositories
              </p>
              <div className="flex flex-wrap gap-2.5">
                {profile?.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
                {profile?.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-blue-500" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {/* {profile?.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 transition-colors"
                  >
                    <Globe className="w-4 h-4 text-emerald-500" />
                    <span>Website</span>
                  </a>
                )} */}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <h3 className="text-xl font-bold text-neutral-950 dark:text-white mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-cyan-500" />
                Send a Message
              </h3>

              {status.type && (
                <div
                  className={`mb-6 p-4 rounded-xl flex items-start gap-3 text-sm ${
                    status.type === "success"
                      ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                      : "bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5"
                    >
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5"
                    >
                      Your Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Engineering Discussion"
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300 mb-1.5"
                  >
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your inquiry, project scope, or opportunity..."
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
