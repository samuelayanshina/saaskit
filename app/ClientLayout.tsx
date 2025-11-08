'use client';

import {useState, useEffect} from 'react';
import {ThemeProvider} from 'next-themes';
import {motion} from 'framer-motion';

export default function ClientLayout({children}:{children:React.ReactNode}){
  const [mounted, setMounted] = useState(false);

  useEffect(()=>{ setMounted(true); },[]);
  if(!mounted) return null;

  return(
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <motion.div
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:0.4, ease:'easeOut'}}
        className="min-h-screen transition-colors duration-700 bg-[var(--background)] text-[var(--foreground)]"
      >
        {children}
      </motion.div>
    </ThemeProvider>
  );
}
