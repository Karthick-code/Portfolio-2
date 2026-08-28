import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { Lock, Mail, KeyRound, Eye, EyeOff, ArrowLeft, ShieldAlert, Sparkles, Loader2 } from "lucide-react";

export const AdminLogin = ({ onBackToPublic, onLoginSuccess }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await login({ email, password });
      onLoginSuccess();
    } catch (err) {
      setError(err.message || "Invalid administrator credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemo = () => {
    setEmail("admin@portfolio.local");
    setPassword("Admin@123456");
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-neutral-900 selection:bg-cyan-500/30 text-neutral-100">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <button
          type="button"
          onClick={onBackToPublic}
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white mb-6 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Public Portfolio</span>
        </button>

        {/* Login Card */}
        <div className="p-8 rounded-3xl bg-neutral-950 border border-neutral-800 shadow-2xl">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Private Admin CMS
            </h1>
            <p className="text-xs text-neutral-400 mt-1 font-mono">
              Authenticate to manage portfolio MySQL database &amp; spotlight showcases
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-start gap-2.5 text-xs">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-mono font-medium text-neutral-300 mb-1.5"
              >
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@portfolio.local"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-mono font-medium text-neutral-300 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-hidden focus:ring-2 focus:ring-cyan-500/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-neutral-500 hover:text-neutral-300 focus:outline-hidden cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm bg-cyan-500 hover:bg-cyan-400 text-neutral-950 transition-colors shadow-md disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Authorization...</span>
                </>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Helper */}
          <div className="mt-6 pt-6 border-t border-neutral-800/80 text-center">
            <button
              type="button"
              onClick={handleFillDemo}
              className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:underline font-mono cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fill Default Development Credentials</span>
            </button>
            <p className="text-[11px] text-neutral-500 font-mono mt-1">
              admin@portfolio.local • Admin@123456
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
