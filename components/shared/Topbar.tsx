"use client";

import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import {Sun, Moon} from "lucide-react";

export default function Topbar() {
  const {theme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(()=>setMounted(true), []);
  if(!mounted) return null;

  return (
    <header className="sticky top-0 z-[50] h-16 border-b border-gray-200 dark:border-white/10 bg-white/70 dark:bg-black/30 backdrop-blur-lg flex items-center justify-between px-6 transition-colors duration-300">
      <div className="flex-1 flex items-center justify-center md:justify-start">
        <h1 className="text-gray-900 dark:text-white text-lg font-semibold translate-x-2 md:translate-x-0">
          SaaSKit Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-gray-600 dark:text-gray-400 hidden sm:inline">Hey, Founder 👋</span>

        <button
          onClick={()=>setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-md border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
          suppressHydrationWarning
        >
          {theme === "dark" ? <Sun size={18} className="text-yellow-400"/> : <Moon size={18} className="text-gray-800"/>}
        </button>
      </div>
    </header>
  );
}
