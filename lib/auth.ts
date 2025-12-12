// lib/auth.tsx
"use client";
import React, {createContext, useContext, useEffect, useState} from "react";
import { auth } from "@/lib/firebaseClient";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: ()=>Promise<void>;
  signUpWithEmail: (email:string,password:string)=>Promise<void>;
  signInWithEmail: (email:string,password:string)=>Promise<void>;
  signOutUser: ()=>Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}:{children:React.ReactNode})=>{
  const [user,setUser] = useState<User|null>(null);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth,(u)=>{
      setUser(u ?? null);
      setLoading(false);
    });
    return ()=>unsub();
  },[]);

  const signInWithGoogle = async ()=> {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signUpWithEmail = async (email:string,password:string)=>{
    await createUserWithEmailAndPassword(auth,email,password);
  };

  const signInWithEmail = async (email:string,password:string)=>{
    await signInWithEmailAndPassword(auth,email,password);
  };

  const signOutUser = async ()=> {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{user,loading,signInWithGoogle,signUpWithEmail,signInWithEmail,signOutUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = ()=> {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
