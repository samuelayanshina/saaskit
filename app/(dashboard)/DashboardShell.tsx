'use client';

import React from 'react';
import Sidebar from '@/components/shared/Sidebar';
import Topbar from '@/components/shared/Topbar';
import DashboardShell from "../DashboardShell";


export default function DashboardShell({children}:{children:React.ReactNode}){
  return (
    <div className="relative flex min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300 overflow-x-hidden min-w-0">
      
      {/* Optional background glow (can be toggled later) */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-indigo-300/30 dark:bg-indigo-600/20 blur-[120px] top-20 left-10" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-pink-300/30 dark:bg-pink-700/20 blur-[100px] bottom-10 right-10" />
      </div>

      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <Topbar />
        <main className="w-full max-w-7xl mx-auto px-4 lg:px-6 py-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
