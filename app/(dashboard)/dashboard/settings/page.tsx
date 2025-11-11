"use client";

import React, {useState, useEffect, lazy, Suspense} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {useDebounce} from "use-debounce";

// Lazy-loaded forms
const ProfileForm = lazy(()=>import("./ProfileForm"));
const TeamForm = lazy(()=>import("./TeamForm"));
const PreferencesForm = lazy(()=>import("./PreferencesForm"));
const NotificationsForm = lazy(()=>import("./NotificationsForm"));

// Shimmer Loader
const ShimmerLoader = ()=>(
  <div className="absolute inset-0 flex items-center justify-center bg-white/40 dark:bg-black/40 backdrop-blur-sm rounded-xl z-50">
    <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Framer Motion config
const fadeMotion = {
  initial:{opacity:0, y:20},
  animate:{opacity:1, y:0},
  exit:{opacity:0, y:-10},
  transition:{duration:0.4, ease:"easeOut"},
};

export default function SettingsPage(){
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Profile + Team state
  const [profile, setProfile] = useState({name:"", email:""});
  const [team, setTeam] = useState({name:""});
  const [debouncedProfile] = useDebounce(profile, 1000);
  const [debouncedTeam] = useDebounce(team, 1000);

  // Preferences + Notifications mock state
  const [preferences, setPreferences] = useState({
    theme:"system",
    language:"English",
    compactMode:false,
  });
  const [notifications, setNotifications] = useState({
    email:true,
    sms:false,
    push:true,
  });

  // Mock data loader
  useEffect(()=>{
    const loadData = async()=>{
      const [userRes, teamRes] = await Promise.all([
        fetch("/api/users").then((r)=>r.json()).catch(()=>null),
        fetch("/api/teams").then((r)=>r.json()).catch(()=>null)
      ]);
      setProfile({name:userRes?.name ?? "Mayorkun", email:userRes?.email ?? "you@example.com"});
      setTeam({name:teamRes?.name ?? "Cjet Dispatch"});
    };
    loadData();
  },[]);

  // Auto-save (mock)
  useEffect(()=>{
    if(!debouncedProfile.name && !debouncedProfile.email) return;
    fetch("/api/users",{
      method:"PATCH",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(debouncedProfile),
    });
  },[debouncedProfile]);

  useEffect(()=>{
    if(!debouncedTeam.name) return;
    fetch("/api/teams",{
      method:"PATCH",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(debouncedTeam),
    });
  },[debouncedTeam]);

  useEffect(()=>{
    const interval = setInterval(()=>setLastUpdated(new Date()),60000);
    return ()=>clearInterval(interval);
  },[]);

  const formatTimeAgo = (time:Date)=>{
    const diff = Math.floor((Date.now()-time.getTime())/60000);
    if(diff<1) return "Updated just now";
    if(diff===1) return "Updated 1 min ago";
    return `Updated ${diff} mins ago`;
  };

  // Render Tab Content
  const renderTab = ()=>{
    switch(activeTab){
      case "profile": return <ProfileForm profile={profile} setProfile={setProfile}/>;
      case "team": return <TeamForm team={team} setTeam={setTeam}/>;
      case "preferences": return <PreferencesForm preferences={preferences} setPreferences={setPreferences}/>;
      case "notifications": return <NotificationsForm notifications={notifications} setNotifications={setNotifications}/>;
      default: return null;
    }
  };

  return(
    <div className="p-6 space-y-6 bg-transparent backdrop-blur-md rounded-2xl border border-neutral-300/30 dark:border-white/10 shadow-lg relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 italic">{formatTimeAgo(lastUpdated)}</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {["profile","team","preferences","notifications"].map((tab)=>(
          <button
            key={tab}
            onClick={()=>{
              if(isLoading||activeTab===tab) return;
              setIsLoading(true);
              setTimeout(()=>setActiveTab(tab),200);
              setTimeout(()=>setIsLoading(false),600);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab===tab
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                : "bg-white/50 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-indigo-100/40 dark:hover:bg-white/10"
            }`}
          >
            {tab.charAt(0).toUpperCase()+tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="relative min-h-[350px]">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} {...fadeMotion}>
            <Suspense fallback={<ShimmerLoader/>}>
              {renderTab()}
            </Suspense>
          </motion.div>
        </AnimatePresence>
        {isLoading && <ShimmerLoader/>}
      </div>
    </div>
  );
}
