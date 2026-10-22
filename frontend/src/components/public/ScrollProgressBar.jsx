import React, { useEffect, useState } from "react";

export const ScrollProgressBar = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const totalScroll = scrollHeight - clientHeight;
      if (totalScroll > 0) {
        setScrollPercent((scrollTop / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-50 bg-transparent">
      <div
        className="h-full bg-linear-to-r from-cyan-500 via-indigo-500 to-emerald-500 transition-all duration-75"
        style={{ width: `${scrollPercent}%` }}
      />
    </div>
  );
};
