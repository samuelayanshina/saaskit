// "use client";

// import {useParams} from "next/navigation";
// import Link from "next/link";

// export default function UnknownDashboardRoute() {
//   const params = useParams();
//   const path = Array.isArray(params.slug) ? params.slug.join("/") : params.slug;

//   return (
//     <div className="flex items-center justify-center h-full p-6">
//       <div className="bg-white/70 dark:bg-black/30 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl p-10 text-center w-full max-w-md transition-colors duration-300">
//         <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
//           Unknown Page
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400 mb-6">
//           There’s no section called “{path}” in your dashboard.
//         </p>
//         <Link
//           href="/dashboard"
//           className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200"
//         >
//           Back to Dashboard
//         </Link>
//       </div>
//     </div>
//   );
// }


import {redirect} from "next/navigation";

export default function DashboardCatchAllPage() {
  // Instantly redirect any unknown path back to /dashboard
  redirect("/dashboard");
}
