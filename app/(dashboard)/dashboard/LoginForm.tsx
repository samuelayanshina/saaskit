// app/(dashboard)/dashboard/LoginForm.tsx
"use client";
import React, {useState} from "react";
import {useAuth} from "@/lib/auth";

export default function LoginForm(){
  const {signInWithGoogle,signInWithEmail,signUpWithEmail} = useAuth();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  return (
    <div className="space-y-3 max-w-md">
      <button onClick={()=>signInWithGoogle()} className="px-4 py-2 rounded bg-blue-600 text-white">
        Continue with Google
      </button>

      <div className="border-t pt-3">
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 rounded border"/>
        <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full px-3 py-2 rounded border mt-2"/>
        <div className="flex gap-2 mt-2">
          <button onClick={()=>signInWithEmail(email,password)} className="px-3 py-2 rounded border">Sign in</button>
          <button onClick={()=>signUpWithEmail(email,password)} className="px-3 py-2 rounded bg-indigo-600 text-white">Sign up</button>
        </div>
      </div>
    </div>
  );
}
