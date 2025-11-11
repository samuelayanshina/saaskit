"use client";
import React from "react";

export default function NotificationsForm({notifications, setNotifications}:{notifications:any, setNotifications:any}){
  return(
    <div className="space-y-6 mt-4">
      {Object.entries(notifications).map(([key,value])=>(
        <div key={key} className="flex items-center justify-between">
          <label className="text-sm capitalize text-gray-400">{key} Notifications</label>
          <input
            type="checkbox"
            checked={value as boolean}
            onChange={()=>setNotifications({...notifications, [key]:!value})}
            className="w-5 h-5 accent-indigo-500"
          />
        </div>
      ))}
    </div>
  );
}
