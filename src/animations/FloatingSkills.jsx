import React, { useEffect, useState, useMemo, useRef } from "react";
import { TechIcon } from "./TechIcon.jsx";
import { generateFloatingParticles } from "./animationUtils.js";

export const FloatingSkills = React.memo(({ skills = [], isLoading = false }) => {
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [reducedMotion, setReducedMotion] = useState(false);

  // Parallax coordinates via ref to avoid frequent state re-renders
  const containerRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  // Check prefers-reduced-motion and viewport width
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleMotionChange);

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setViewportWidth(window.innerWidth);
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Subtle mouse parallax on desktop only
  useEffect(() => {
    if (viewportWidth < 1024 || reducedMotion) return;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const normY = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      mousePos.current = { x: normX, y: normY };

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          if (containerRef.current) {
            containerRef.current.style.transform = `translate3d(${mousePos.current.x * 12}px, ${mousePos.current.y * 12}px, 0)`;
          }
          rafId.current = null;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [viewportWidth, reducedMotion]);

  // Generate particles deterministically based on skills and viewport
  const particles = useMemo(() => {
    return generateFloatingParticles(skills, viewportWidth);
  }, [skills, viewportWidth]);

  if (isLoading || particles.length === 0) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden transition-transform duration-700 ease-out will-change-transform select-none z-0"
      aria-hidden="true"
    >
      {/* Ambient background light gradients */}
      <div className="absolute top-10 left-1/5 w-80 h-80 bg-indigo-500/8 dark:bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-12 right-1/4 w-96 h-96 bg-cyan-500/6 dark:bg-cyan-400/8 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-emerald-500/5 dark:bg-emerald-400/6 rounded-full blur-3xl" />

      {/* Floating skill technology items */}
      {particles.map((p) => {
        const sizeClasses = {
          sm: "p-2 gap-1 text-xs",
          md: "px-3 py-2 gap-2 text-xs",
          lg: "px-3.5 py-2.5 gap-2.5 text-sm",
        }[p.size];

        const iconSizes = {
          sm: 16,
          md: 20,
          lg: 24,
        }[p.size];

        const animationStyle = reducedMotion
          ? {
              left: `${p.xPercent}%`,
              top: `${p.yPercent}%`,
              opacity: p.opacity,
            }
          : {
              left: `${p.xPercent}%`,
              top: `${p.yPercent}%`,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              transform: `translate3d(0, 0, 0) rotate(${p.rotation}deg)`,
              "--dir-x": `${p.directionX}px`,
              "--dir-y": `${p.directionY}px`,
              "--rot": `${p.rotation}deg`,
            };

        return (
          <div
            key={p.id}
            style={animationStyle}
            className={`absolute will-change-transform ${
              reducedMotion ? "" : "animate-floating-particle"
            }`}
          >
            <div
              className={`
                group flex items-center rounded-xl backdrop-blur-md transition-all duration-300
                bg-white/70 dark:bg-neutral-900/75
                border border-neutral-200/80 dark:border-neutral-800/80
                shadow-xs dark:shadow-neutral-950/40
                hover:border-cyan-500/50 dark:hover:border-cyan-400/50
                hover:opacity-100 hover:scale-105 pointer-events-auto cursor-default
                ${sizeClasses}
              `}
              title={`${p.skill.name} • ${p.skill.category}`}
            >
              <TechIcon name={p.skill.icon || p.skill.name} size={iconSizes} className="shrink-0" />
              {p.showLabel && (
                <span className="font-mono font-medium tracking-tight text-neutral-800 dark:text-neutral-200 whitespace-nowrap">
                  {p.skill.name}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
});

FloatingSkills.displayName = "FloatingSkills";
