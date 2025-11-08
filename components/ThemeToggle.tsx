// 'use client';

// import {useEffect, useState} from 'react';
// import {Moon, Sun} from 'lucide-react';

// export default function ThemeToggle(){
//   const [theme, setTheme] = useState<'light' | 'dark'>('light');
//   const [mounted, setMounted] = useState(false); // 👈 Add this

//   useEffect(()=>{
//     setMounted(true); // ✅ ensure client-side render before showing icon

//     if(window.matchMedia('(prefers-color-scheme: dark)').matches){
//       document.documentElement.classList.add('dark');
//       setTheme('dark');
//     }
//   },[]);

//   const toggleTheme = ()=>{
//     if(theme === 'light'){
//       document.documentElement.classList.add('dark');
//       setTheme('dark');
//     }else{
//       document.documentElement.classList.remove('dark');
//       setTheme('light');
//     }
//   };

//   // 👇 prevent mismatch by not rendering icon until after mount
//   if(!mounted){
//     return (
//       <button
//         className="p-2 rounded-xl border border-gray-300 dark:border-gray-700 transition"
//         aria-label="Theme toggle placeholder"
//       >
//         <div className="h-5 w-5"/>
//       </button>
//     );
//   }

//   return(
//     <button
//       onClick={toggleTheme}
//       className="relative p-2 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 ease-in-out">
//       {theme === 'light' ? <Moon className="h-5 w-5"/> : <Sun className="h-5 w-5 text-yellow-400"/>}
//     </button>
//   );
// }


'use client';

import {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {Moon, Sun} from 'lucide-react';

export default function ThemeToggle(){
  const [theme, setTheme] = useState<'light'|'dark'>('light');

  const toggleTheme = ()=>{
    const isDark = theme === 'light';
    document.documentElement.classList.toggle('dark', isDark);
    setTheme(isDark ? 'dark' : 'light');
  };

  useEffect(()=>{
    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
      document.documentElement.classList.add('dark');
      setTheme('dark');
    }
  },[]);

  return(
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'light' ? (
          <motion.div
            key="moon"
            initial={{opacity:0, rotate:-90}}
            animate={{opacity:1, rotate:0}}
            exit={{opacity:0, rotate:90}}
            transition={{duration:0.3}}
          >
            <Moon className="h-5 w-5"/>
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{opacity:0, rotate:90}}
            animate={{opacity:1, rotate:0}}
            exit={{opacity:0, rotate:-90}}
            transition={{duration:0.3}}
          >
            <Sun className="h-5 w-5 text-yellow-400"/>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
