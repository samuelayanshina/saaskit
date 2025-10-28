"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
        404
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
        Oops! The page you’re looking for doesn’t exist or was moved.
      </p>
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
