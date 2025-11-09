"use client";

import React from "react";
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
} from "recharts";

export default function AnalyticsPage() {
  // 📊 Mock analytics data
  const revenueData = [
    { month: "Jan", revenue: 1200 },
    { month: "Feb", revenue: 1800 },
    { month: "Mar", revenue: 2500 },
    { month: "Apr", revenue: 2100 },
    { month: "May", revenue: 3100 },
    { month: "Jun", revenue: 4200 },
  ];

  const usersData = [
    { month: "Jan", users: 80 },
    { month: "Feb", users: 150 },
    { month: "Mar", users: 220 },
    { month: "Apr", users: 190 },
    { month: "May", users: 260 },
    { month: "Jun", users: 300 },
  ];

  const apiRequestsData = [
    { name: "Mon", requests: 4000 },
    { name: "Tue", requests: 3000 },
    { name: "Wed", requests: 5000 },
    { name: "Thu", requests: 4800 },
    { name: "Fri", requests: 5200 },
    { name: "Sat", requests: 2500 },
    { name: "Sun", requests: 3800 },
  ];

  return (
    <div className="p-6 space-y-6 bg-transparent backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Analytics
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl shadow-lg">
          <h2 className="text-lg font-medium text-gray-200 mb-3">
            Monthly Revenue
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111",
                  border: "none",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#6366F1"
                strokeWidth={2}
                dot={{ fill: "#6366F1", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Active Users */}
        <div className="p-4 bg-white/5 border border-white/10 rounded-xl shadow-lg">
          <h2 className="text-lg font-medium text-gray-200 mb-3">
            Active Users
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={usersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111",
                  border: "none",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* API Requests Overview */}
      <div className="p-4 bg-white/5 border border-white/10 rounded-xl shadow-lg">
        <h2 className="text-lg font-medium text-gray-200 mb-3">
          API Requests Overview
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={apiRequestsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111",
                border: "none",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="requests" fill="#F59E0B" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
