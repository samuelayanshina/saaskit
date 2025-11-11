"use client";

import React, {useState, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ⚡ Shimmer Loader Overlay
const ShimmerLoader = ()=>(
  <div className="absolute inset-0 flex items-center justify-center bg-white/30 dark:bg-black/30 backdrop-blur-sm rounded-xl z-50">
    <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
  </div>
);


// 🎯 Animated Counter Component
function AnimatedCounter({value}:{value:number}) {
  const [count, setCount] = useState(0);
  useEffect(()=>{
    let start = 0;
    const end = value;
    const duration = 1000;
    const step = Math.ceil(end / (duration / 16));
    const interval = setInterval(()=>{
      start += step;
      if(start >= end){
        start = end;
        clearInterval(interval);
      }
      setCount(start);
    },16);
    return ()=>clearInterval(interval);
  },[value]);
  return <span>{count.toLocaleString()}</span>;
}

export default function AnalyticsPage(){
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);


  // 🔹 Dynamic mock stats
  const [stats, setStats] = useState({
    revenue: 12500,
    users: 876,
    requests: 3200,
  });

  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(()=>{
    const interval = setInterval(()=>{
      setStats(prev=>({
        revenue: prev.revenue + Math.floor(Math.random()*100 - 50),
        users: prev.users + Math.floor(Math.random()*10 - 5),
        requests: prev.requests + Math.floor(Math.random()*40 - 20),
      }));
      setLastUpdated(new Date());
    },60000);
    return ()=>clearInterval(interval);
  },[]);

  // 📊 Mock Data
  const revenueData = [
    {month: "Jan", revenue: 1200},
    {month: "Feb", revenue: 1800},
    {month: "Mar", revenue: 2500},
    {month: "Apr", revenue: 2100},
    {month: "May", revenue: 3100},
    {month: "Jun", revenue: 4200},
  ];

  const usersData = [
    {month: "Jan", users: 80},
    {month: "Feb", users: 150},
    {month: "Mar", users: 220},
    {month: "Apr", users: 190},
    {month: "May", users: 260},
    {month: "Jun", users: 300},
  ];

  const apiRequestsData = [
    {name: "Mon", requests: 4000},
    {name: "Tue", requests: 3000},
    {name: "Wed", requests: 5000},
    {name: "Thu", requests: 4800},
    {name: "Fri", requests: 5200},
    {name: "Sat", requests: 2500},
    {name: "Sun", requests: 3800},
  ];

  const mrrData = [
    {month: "Jan", mrr: 800},
    {month: "Feb", mrr: 1200},
    {month: "Mar", mrr: 2000},
    {month: "Apr", mrr: 2500},
    {month: "May", mrr: 3000},
    {month: "Jun", mrr: 4000},
  ];

  const retentionData = [
    {month: "Jan", rate: 70},
    {month: "Feb", rate: 74},
    {month: "Mar", rate: 78},
    {month: "Apr", rate: 76},
    {month: "May", rate: 80},
    {month: "Jun", rate: 82},
  ];

  const deviceData = [
    {name: "Desktop", value: 55},
    {name: "Mobile", value: 35},
    {name: "Tablet", value: 10},
  ];

  const regionData = [
    {region: "Africa", users: 320},
    {region: "Europe", users: 280},
    {region: "Asia", users: 210},
    {region: "Americas", users: 180},
  ];

  const fadeMotion = {
  initial: {opacity: 0, y: 10},
  animate: {opacity: 1, y: 0},
  exit: {opacity: 0, y: -10},
  transition: {duration: 0.35, ease: "easeInOut"},
};


  const COLORS = ["#6366F1", "#10B981", "#F59E0B"];

  const formatTimeAgo = (time:Date)=>{
    const diff = Math.floor((Date.now() - time.getTime()) / 60000);
    if(diff < 1) return "Updated just now";
    if(diff === 1) return "Updated 1 min ago";
    return `Updated ${diff} mins ago`;
  };

  // 🧭 Tab Renderer
  const renderContent = ()=>{
    switch(activeTab){
      case "overview":
        return(
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="p-4 bg-white/50 dark:bg-white/5 border border-neutral-300/50 dark:border-white/10 rounded-xl text-center shadow-md hover:scale-[1.02] transition-transform">
                <h2 className="text-sm text-gray-600 dark:text-gray-400 mb-1">💰 Total Revenue</h2>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  $<AnimatedCounter value={stats.revenue}/>
                </p>
              </div>
              <div className="p-4 bg-white/50 dark:bg-white/5 border border-neutral-300/50 dark:border-white/10 rounded-xl text-center shadow-md hover:scale-[1.02] transition-transform">
                <h2 className="text-sm text-gray-600 dark:text-gray-400 mb-1">👥 Active Users</h2>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  <AnimatedCounter value={stats.users}/>
                </p>
              </div>
              <div className="p-4 bg-white/50 dark:bg-white/5 border border-neutral-300/50 dark:border-white/10 rounded-xl text-center shadow-md hover:scale-[1.02] transition-transform">
                <h2 className="text-sm text-gray-600 dark:text-gray-400 mb-1">⚙️ API Requests Today</h2>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  <AnimatedCounter value={stats.requests}/>
                </p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-4 bg-white/50 dark:bg-white/5 border rounded-xl shadow-lg">
                <h2 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Monthly Revenue</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={2}/>
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="p-4 bg-white/50 dark:bg-white/5 border rounded-xl shadow-lg">
                <h2 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Active Users</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={usersData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={2}/>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-4 bg-white/50 dark:bg-white/5 border rounded-xl shadow-lg mt-8">
              <h2 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">API Requests Overview</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={apiRequestsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="requests" fill="#F59E0B" radius={[6,6,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        );

      case "revenue":
        return(
          <div className="p-4 bg-white/50 dark:bg-white/5 border rounded-xl shadow-lg">
            <h2 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Monthly Recurring Revenue (MRR)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mrrData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="mrr" stroke="#8B5CF6" strokeWidth={2}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        );

      case "users":
        return(
          <div className="p-4 bg-white/50 dark:bg-white/5 border rounded-xl shadow-lg">
            <h2 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">User Retention Rate (%)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={retentionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="rate" stroke="#10B981" fill="#10B981" fillOpacity={0.3}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        );

      case "devices":
        return(
          <div className="p-4 bg-white/50 dark:bg-white/5 border rounded-xl shadow-lg text-center">
            <h2 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Device / Platform Usage</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={deviceData} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>
                  {deviceData.map((entry, index)=>(
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );

      case "regions":
        return(
          <div className="p-4 bg-white/50 dark:bg-white/5 border rounded-xl shadow-lg">
            <h2 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Traffic by Region</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {regionData.map((r, i)=>(
                <div key={i} className="p-3 rounded-lg bg-white/60 dark:bg-white/10 border border-neutral-300/50 dark:border-white/10">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{r.region}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{r.users} users</p>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return(
    <div className="p-6 space-y-6 bg-transparent backdrop-blur-md rounded-2xl border border-neutral-300/30 dark:border-white/10 shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 italic">{formatTimeAgo(lastUpdated)}</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["overview","revenue","users","devices","regions"].map((tab)=>(
          <button
            key={tab}
            onClick={()=>{
  if(isLoading || activeTab===tab) return;

  setIsLoading(true);

  // Step 1: Trigger exit animation (fade out)
  setTimeout(()=>{
    setActiveTab(tab); // switch tab mid-transition
  },200);

  // Step 2: Show shimmer briefly, then fade in new content
  setTimeout(()=>{
    setIsLoading(false);
  },800);
}}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab===tab
                ? "bg-indigo-600 text-white"
                : "bg-white/50 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-indigo-100/40 dark:hover:bg-white/10"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

     <div className="relative min-h-[300px]">
  <AnimatePresence mode="wait">
    <motion.div key={activeTab} {...fadeMotion}>
      {renderContent()}
    </motion.div>
  </AnimatePresence>
  {isLoading && <ShimmerLoader/>}
</div>


    </div>
  );
}
