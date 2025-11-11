"use client";
import React, {useState, useEffect} from "react";
import {motion} from "framer-motion";

export default function NotificationsForm(){
  const [notifications, setNotifications] = useState({
    email:true,
    sms:false,
    push:true,
  });

  // 🧠 Load saved notifications from localStorage
  useEffect(()=>{
    const saved = localStorage.getItem("notifications");
    if(saved){
      setNotifications(JSON.parse(saved));
    }
  },[]);

  // 💾 Save to localStorage whenever toggled
  useEffect(()=>{
    localStorage.setItem("notifications", JSON.stringify(notifications));
  },[notifications]);

  const toggle=(key)=>{
    setNotifications({...notifications,[key]:!notifications[key]});
  };

  return(
    <motion.div
      initial={{opacity:0, y:15}}
      animate={{opacity:1, y:0}}
      transition={{duration:0.4, ease:"easeOut"}}
      className="space-y-6 mt-4"
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
    </motion.div>
  );
}
