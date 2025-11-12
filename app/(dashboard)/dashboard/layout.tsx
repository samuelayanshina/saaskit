'use client';

import React from 'react';
import Sidebar from '@/components/shared/Sidebar';
import Topbar from '@/components/shared/Topbar';
import {Toaster} from 'react-hot-toast';

export default function DashboardLayout({children}:{children:React.ReactNode}) {
  return (
    <div className="relative flex min-h-screen bg-gray-50 dark:bg-black transition-colors duration-700 overflow-hidden">
      
      {/* ✨ Animated Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-indigo-300/30 dark:bg-indigo-600/20 blur-[120px] top-20 left-10 animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full bg-pink-300/30 dark:bg-pink-700/20 blur-[100px] bottom-10 right-10 animate-pulse"></div>
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>

      {/* 🔔 Global Toast System */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style:{
            background:"rgba(30,30,40,0.85)",
            color:"#fff",
            backdropFilter:"blur(12px)",
            borderRadius:"10px",
            padding:"12px 16px",
            border:"1px solid rgba(255,255,255,0.1)",
          },
        }}
      />
    </div>
  );
}
