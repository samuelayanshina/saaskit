import Sidebar from "@/components/shared/Sidebar"
import Topbar from "@/components/shared/Topbar"

export default function DashboardLayout({children}:{children:React.ReactNode}) {
  return (
    <div className="flex h-screen bg-white text-black dark:bg-[#0E0E10] dark:text-white transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-[#121214] transition-colors duration-300">
          {children}
        </main>
      </div>
    </div>
  )
}
