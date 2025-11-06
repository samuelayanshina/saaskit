'use client';

import {useEffect, useState} from 'react';
import {Moon, Sun} from 'lucide-react';

export default function ThemeToggle(){
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false); // 👈 Add this

  useEffect(()=>{
    setMounted(true); // ✅ ensure client-side render before showing icon

    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
      document.documentElement.classList.add('dark');
      setTheme('dark');
    }
  },[]);

  const toggleTheme = ()=>{
    if(theme === 'light'){
      document.documentElement.classList.add('dark');
      setTheme('dark');
    }else{
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  };

  // 👇 prevent mismatch by not rendering icon until after mount
  if(!mounted){
    return (
      <button
        className="p-2 rounded-xl border border-gray-300 dark:border-gray-700 transition"
        aria-label="Theme toggle placeholder"
      >
        <div className="h-5 w-5"/>
      </button>
    );
  }

  return(
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 ease-in-out">
      {theme === 'light' ? <Moon className="h-5 w-5"/> : <Sun className="h-5 w-5 text-yellow-400"/>}
    </button>
  );
}
