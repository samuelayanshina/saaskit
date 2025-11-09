"use client";
import {useState, useEffect} from "react";
import {useDebounce} from "use-debounce";

export default function SettingsPage(){
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({name: "", email:  ""});
  const [team, setTeam] = useState({name:""});
  const [status, setStatus] = useState("");
  const [debouncedProfile] = useDebounce(profile, 1000);
  const [debouncedTeam] = useDebounce(team, 1000);

  useEffect(()=>{
  const loadData = async()=>{
    const [userRes, teamRes] = await Promise.all([
      fetch("/api/users").then((r)=>r.json()).catch(()=>null),
      fetch("/api/teams").then((r)=>r.json()).catch(()=>null)
    ]);

    // 🧠 Sanitize user data — fill in missing fields with safe defaults
    const safeUser = {
      name: userRes?.name ?? "",
      email: userRes?.email ?? ""
    };

    // 🧠 Sanitize team data — same logic
    const safeTeam = {
      name: teamRes?.name ?? ""
    };

    setProfile(safeUser);
    setTeam(safeTeam);
  };

  loadData();
},[]);


  useEffect(()=>{
    if(!debouncedProfile.name && !debouncedProfile.email) return;
    const saveProfile = async()=>{
      setStatus("Saving...");
      await fetch("/api/users",{
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(debouncedProfile)
      });
      setStatus("Saved!");
      setTimeout(()=>setStatus(""),2000);
    };
    saveProfile();
  },[debouncedProfile]);

  useEffect(()=>{
    if(!debouncedTeam.name) return;
    const saveTeam = async()=>{
      setStatus("Saving...");
      await fetch("/api/teams",{
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(debouncedTeam)
      });
      setStatus("Saved!");
      setTimeout(()=>setStatus(""),2000);
    };
    saveTeam();
  },[debouncedTeam]);

  return(
    <div className="p-6 space-y-6 bg-transparent backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Settings</h1>

      <div className="flex space-x-4 border-b border-gray-700/30 pb-2">
        <button
          className={`pb-2 px-3 text-sm font-medium ${
            activeTab==="profile"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-gray-300"
          }`}
          onClick={()=>setActiveTab("profile")}
        >Profile</button>

        <button
          className={`pb-2 px-3 text-sm font-medium ${
            activeTab==="team"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-gray-300"
          }`}
          onClick={()=>setActiveTab("team")}
        >Team</button>
      </div>

      {activeTab==="profile" && (
        <div className="space-y-4 mt-4">
          <div>
  <label className="block text-sm text-gray-400 mb-1">Name</label>
  <input
    type="text"
    value={profile.name || ""}
    onChange={(e)=>setProfile({...profile,name:e.target.value})}
    className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
    placeholder="Your name"
  />
</div>
<div>
  <label className="block text-sm text-gray-400 mb-1">Email</label>
  <input
    type="email"
    value={profile.email || ""}
    onChange={(e)=>setProfile({...profile,email:e.target.value})}
    className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
    placeholder="Your email"
  />
</div>
          <p className="text-sm text-gray-400">{status}</p>
        </div>
      )}

      {activeTab==="team" && (
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Team Name</label>
            <input
              type="text"
              value={team.name}
              onChange={(e)=>setTeam({...team,name:e.target.value})}
              className="w-full p-3 rounded-md bg-white/5 border border-white/10 text-white"
              placeholder="Team name"
            />
          </div>
          <p className="text-sm text-gray-400">{status}</p>
        </div>
      )}
    </div>
  );
}
