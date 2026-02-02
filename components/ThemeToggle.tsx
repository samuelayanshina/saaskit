"use client";

import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

export default function ThemeToggle() {
  const {theme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(()=>{
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={()=>setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white hover:bg-black/50 transition"
      aria-label="Toggle theme"
    >
      {isDark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
