"use client";
import React, {useState} from "react";
import {motion} from "framer-motion";

export default function NotificationsForm(){
  const [notifications, setNotifications] = useState({
    email:true,
    sms:false,
    push:true,
  });

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
            onChange={()=>setNotifications({...notifications,[key]:!value})}
            className="w-5 h-5 accent-indigo-500"
          />
        </div>
      ))}
    </motion.div>
  );
}
