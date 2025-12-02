"use client";

import React from "react";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import {Toaster} from "react-hot-toast";

export default function DashboardLayout({children}:{children:React.ReactNode}){
  return(
    <div className="relative flex min-h-screen bg-gray-50 dark:bg-black transition-colors duration-700 overflow-x-hidden min-w-0">


      {/* ✨ Animated Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-indigo-300/30 dark:bg-indigo-600/20 blur-[120px] top-20 left-10 animate-pulse" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-pink-300/30 dark:bg-pink-700/20 blur-[100px] bottom-10 right-10 animate-pulse" />
      </div>

      {/* Sidebar + Main */}
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <Topbar />
        <main className="w-full max-w-7xl mx-auto px-4 lg:px-6 py-6 overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* 🌈 Global Elegant Toasts */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2500,
          style:{
            background:"rgba(20,20,30,0.85)",
            color:"#fff",
            backdropFilter:"blur(14px)",
            border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:"12px",
            padding:"10px 16px",
            fontSize:"0.85rem",
            display:"flex",
            alignItems:"center",
            gap:"8px",
            boxShadow:"0 4px 20px rgba(0,0,0,0.2)",
            transition:"all 0.3s ease",
          },
          success:{
            icon:"✅",
            style:{background:"rgba(30,200,100,0.15)", border:"1px solid rgba(50,255,140,0.25)"},
          },
          error:{
            icon:"⚠️",
            style:{background:"rgba(200,30,30,0.15)", border:"1px solid rgba(255,80,80,0.25)"},
          },
        }}
      />
    </div>
  );
}
