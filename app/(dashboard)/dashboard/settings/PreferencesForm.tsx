"use client";
import React from "react";
import {motion} from "framer-motion";

export default function PreferencesForm(){
  return(
    <motion.div
      initial={{opacity:0, y:15}}
      animate={{opacity:1, y:0}}
      transition={{duration:0.4, ease:"easeOut"}}
      className="space-y-6 mt-4"
    >
      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-400">Theme</label>
        <select
          defaultValue="system"
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
          defaultValue="English"
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
          defaultChecked={false}
          className="w-5 h-5 accent-indigo-500"
        />
      </div>
    </motion.div>
  );
}
