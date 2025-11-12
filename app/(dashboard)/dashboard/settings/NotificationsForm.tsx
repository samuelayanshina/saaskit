"use client";
import React, {useState, useEffect} from "react";
import {motion} from "framer-motion";
import toast from "react-hot-toast";


export default function NotificationsForm(){
  const defaultNotifications = {
    email:true,
    sms:false,
    push:true,
  };

  const [notifications, setNotifications] = useState(defaultNotifications);
  const [resetting, setResetting] = useState(false);

  // 🧠 Load saved notifications
  useEffect(()=>{
    const saved = localStorage.getItem("notifications");
    if(saved) setNotifications(JSON.parse(saved));
  },[]);

  // 💾 Save to localStorage
  useEffect(()=>{
  localStorage.setItem("notifications", JSON.stringify(notifications));
  toast.success("Notification settings saved");
},[notifications]);

  const toggle=(key)=>{
    setNotifications({...notifications,[key]:!notifications[key]});
  };

  const handleReset=()=>{
  setResetting(true);
  setTimeout(()=>{
    setNotifications(defaultNotifications);
    localStorage.removeItem("notifications");
    setResetting(false);
    toast("Notifications reset", {icon:"🔄"});
  },1000);
};

  return(
    <motion.div
      initial={{opacity:0, y:15}}
      animate={{opacity:1, y:0}}
      transition={{duration:0.4, ease:"easeOut"}}
      className="space-y-6 mt-4 relative"
    >
      {Object.entries(notifications).map(([key,value])=>(
        <div key={key} className="flex items-center justify-between">
          <label className="text-sm capitalize text-gray-400">{key} Notifications</label>
          <input
            type="checkbox"
            checked={value}
            onChange={()=>toggle(key)}
            className="w-5 h-5 accent-indigo-500"
          />
        </div>
      ))}

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
