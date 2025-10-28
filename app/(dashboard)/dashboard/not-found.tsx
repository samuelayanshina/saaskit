"use client";

import Link from "next/link";

export default function DashboardNotFound() {
  return (
    <div className="flex items-center justify-center h-full p-6">
      <div className="bg-white/70 dark:bg-black/30 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl p-10 text-center w-full max-w-md transition-colors duration-300">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This section doesn’t exist in your dashboard.
        </p>
        <Link
          href="/dashboard"
          className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
