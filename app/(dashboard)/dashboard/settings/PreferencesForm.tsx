"use client";
import React from "react";

export default function PreferencesForm({preferences, setPreferences}:{preferences:any, setPreferences:any}){
  return(
    <div className="space-y-6 mt-4">
      <div className="flex items-center justify-between">
        <label className="text-sm text-gray-400">Theme</label>
        <select
          value={preferences.theme}
          onChange={(e)=>setPreferences({...preferences, theme:e.target.value})}
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
          onChange={(e)=>setPreferences({...preferences, language:e.target.value})}
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
          checked={preferences.compactMode}
          onChange={(e)=>setPreferences({...preferences, compactMode:e.target.checked})}
          className="w-5 h-5 accent-indigo-500"
        />
      </div>
    </div>
  );
}
