"use client";
import React, {useState, useEffect, useRef} from "react";
import {motion} from "framer-motion";
import toast from "react-hot-toast";

export default function PreferencesForm(){
  const defaultPreferences = {
    theme:"system",
    language:"English",
    compact:false,
  };

  const [preferences, setPreferences] = useState(defaultPreferences);
  const [resetting, setResetting] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const saveTimeout = useRef<NodeJS.Timeout|null>(null);

  // 🧠 Load saved preferences on mount
  useEffect(()=>{
    const saved = localStorage.getItem("preferences");
    if(saved){
      setPreferences(JSON.parse(saved));
    }
    setHasLoaded(true);
  },[]);

  // 💾 Debounced save after user changes
  useEffect(()=>{
    if(!hasLoaded) return;

    if(saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(()=>{
      localStorage.setItem("preferences", JSON.stringify(preferences));
      toast.success("Preferences saved ✨");
    }, 800); // Debounce 800ms
  }, [preferences, hasLoaded]);

  const handleChange=(key,value)=>{
    setPreferences(prev=>({...prev,[key]:value}));
  };

  const handleReset=()=>{
    setResetting(true);
    setTimeout(()=>{
      setPreferences(defaultPreferences);
      localStorage.removeItem("preferences");
      setResetting(false);
      toast.success("Notifications reset 🔄");
    },1000);
  };

  return(
    <motion.div
      initial={{opacity:0, y:15}}
      animate={{opacity:1, y:0}}
      transition={{duration:0.4, ease:"easeOut"}}
      className="space-y-6 mt-4 relative"
    >
      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-400">Theme</label>
        <select
          value={preferences.theme}
          onChange={(e)=>handleChange("theme", e.target.value)}
          className="bg-white/5 border border-white/10 text-white text-sm rounded-md px-3 py-2"
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-400">Language</label>
        <select
          value={preferences.language}
          onChange={(e)=>handleChange("language", e.target.value)}
          className="bg-white/5 border border-white/10 text-white text-sm rounded-md px-3 py-2"
        >
          <option>English</option>
          <option>French</option>
          <option>Spanish</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-400">Compact Mode</label>
        <input
          type="checkbox"
          checked={preferences.compact}
          onChange={(e)=>handleChange("compact", e.target.checked)}
          className="w-5 h-5 accent-indigo-500"
        />
      </div>

      <button
        onClick={handleReset}
        disabled={resetting}
        className={`w-full mt-4 py-2 text-sm font-medium rounded-md border transition ${
          resetting
            ? "bg-indigo-600 text-white animate-pulse"
            : "bg-white/10 border-white/10 text-gray-300 hover:bg-indigo-500/20 hover:border-indigo-400"
        }`}
      >
        {resetting ? "Resetting..." : "Reset to Default"}
      </button>
    </motion.div>
  );
}
