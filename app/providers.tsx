"use client";

import {ReactNode, useEffect, useState} from "react";
import {ThemeProvider} from "next-themes";
import {Toaster} from "react-hot-toast";
import {AuthProvider} from "@/lib/auth";

export default function Providers({children}:{children:ReactNode}){
  const [mounted, setMounted] = useState(false);

  useEffect(()=>{
    setMounted(true);
  },[]);

  if (!mounted) {
    return null; // prevents hydration mismatch
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
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
      </AuthProvider>
    </ThemeProvider>
  );
}
