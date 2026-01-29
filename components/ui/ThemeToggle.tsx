'use client';

import {useTheme} from 'next-themes';
import {Sun, Moon} from 'lucide-react';

export default function ThemeToggle(){
  const {theme, setTheme} = useTheme();

  return (
    <button
      onClick={()=>setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-md border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition"
      aria-label="Toggle theme"
    >
      {theme === 'dark'
        ? <Sun size={18} className="text-yellow-400" />
        : <Moon size={18} className="text-gray-800 dark:text-gray-200" />
      }
    </button>
  );
}
