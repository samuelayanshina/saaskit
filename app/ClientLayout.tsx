'use client';

import {useState, useEffect} from 'react';
import {ThemeProvider} from 'next-themes';
import {motion, AnimatePresence} from 'framer-motion';

export default function ClientLayout({children}:{children:React.ReactNode}){
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light'|'dark'>('light');

  useEffect(()=>{
    setMounted(true);
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  },[]);

  useEffect(()=>{
    const observer = new MutationObserver(()=>{
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, {attributes:true, attributeFilter:['class']});
    return ()=>observer.disconnect();
  },[]);

  if(!mounted) return null;

  return(
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}
          transition={{duration:0.6, ease:'easeInOut'}}
          className="min-h-screen transition-colors duration-500 bg-gray-50 dark:bg-[#0E0E10]"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}
