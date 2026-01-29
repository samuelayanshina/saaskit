'use client';

import {ReactNode} from 'react';
import {ThemeProvider} from '@/components/providers/ThemeProvider';
import {Toaster} from 'react-hot-toast';

export default function Providers({children}:{children:ReactNode}){
  return (
    <ThemeProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2500,
          style:{
            background:"rgba(20,20,30,0.85)",
            color:"#fff",
            backdropFilter:"blur(14px)",
            border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:"12px",
            padding:"10px 16px",
            fontSize:"0.85rem",
          },
        }}
      />
    </ThemeProvider>
  );
}
