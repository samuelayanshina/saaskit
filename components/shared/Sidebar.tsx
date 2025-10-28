"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {Home, BarChart, Settings, Users, CreditCard, Menu, X} from "lucide-react";


const Sidebar = ()=>{
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
  {icon: Home, label: "Home", href: "/dashboard"},
  {icon: BarChart, label: "Analytics", href: "/dashboard/analytics"},
  {icon: Settings, label: "Settings", href: "/dashboard/settings"},
  {icon: Users, label: "Team", href: "/dashboard/team"},
  {icon: CreditCard, label: "Billing", href: "/dashboard/billing"},
];


  return(
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 p-4 flex-col h-screen border-r border-black/10 bg-white/70 dark:bg-black/30 backdrop-blur-xl transition-colors duration-300">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-gray-900 dark:text-white text-xl font-semibold">SaaSKit</h1>
        </div>
        <nav className="space-y-4">
          {links.map(({icon:Icon,label,href})=>(
            <Link 
              key={label}
              href={href}
              className={`flex items-center gap-3 transition-all duration-200 ${
                pathname === href
                  ? "text-indigo-600 dark:text-white font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-white"
              }`}
            >
              <Icon size={20}/> <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Toggle Button */}
      <button 
        onClick={()=>setOpen(true)} 
        className="md:hidden fixed top-4 left-4 z-[70] bg-gray-100 dark:bg-[#151517] p-2 rounded-lg border border-gray-300 dark:border-[#2A2A2D] transition-colors duration-300"
      >
        <Menu size={20} className="text-gray-800 dark:text-white"/>
      </button>

      {/* Mobile Overlay Sidebar */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={()=>setOpen(false)}
      >
        <aside
          onClick={(e)=>e.stopPropagation()}
          className={`fixed top-0 left-0 w-64 h-full bg-white/80 dark:bg-[#151517] p-4 flex flex-col border-r border-gray-200 dark:border-[#1F1F22] transform transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button onClick={()=>setOpen(false)} className="self-end mb-6 text-gray-800 dark:text-gray-300">
            <X size={20}/>
          </button>
          <nav className="space-y-4">
            {links.map(({icon:Icon,label,href})=>(
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-3 transition-all duration-200 hover:translate-x-1 ${
                  pathname === href
                    ? "text-indigo-600 dark:text-white font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-white"
                }`}
              >
                <Icon size={20}/> <span>{label}</span>
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
