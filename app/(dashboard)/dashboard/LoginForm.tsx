"use client";

import React, {useState, useEffect} from "react";
import {useAuth} from "@/lib/auth";

export default function LoginForm(){
  const {signInWithGoogle, signInWithEmail, signUpWithEmail, user} = useAuth();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValid =
    email.includes("@") &&
    password.length >= 6 &&
    !loading;

  const handleSubmit = async ()=>{
    setError(null);
    setLoading(true);

    try {
      if (mode === "signin") {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
    } catch (err:any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 shadow-xl">
        
        <h1 className="text-2xl font-semibold text-white">
          {mode === "signin" ? "Welcome back" : "Create your account"}
        </h1>

        <p className="text-sm text-gray-400">
          {mode === "signin"
            ? "Sign in to continue to your dashboard"
            : "Start building your SaaS in minutes"}
        </p>

        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-2 text-sm text-red-400">
            {error}
          </div>
        )}

        <button
          onClick={async ()=>{
            try {
              setLoading(true);
              await signInWithGoogle();
            } catch (err:any) {
              setError(err.message || "Google sign-in failed");
            } finally {
              setLoading(false);
            }
          }}
          className="w-full rounded-lg border border-white/10 bg-white/5 py-3 text-sm text-white hover:bg-white/10 transition"
        >
          Continue with Google
        </button>

        <div className="h-px bg-white/10"/>

        <input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Email"
          className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={!isValid}
          onClick={handleSubmit}
          className="w-full rounded-lg bg-indigo-600 disabled:opacity-40 py-3 text-white transition"
        >
          {loading
            ? "Please wait…"
            : mode === "signin"
              ? "Sign in"
              : "Create account"}
        </button>

        <button
          onClick={()=>setMode(mode === "signin" ? "signup" : "signin")}
          className="text-sm text-gray-400 hover:text-white transition text-center w-full"
        >
          {mode === "signin"
            ? "New here? Create an account"
            : "Already have an account? Sign in"}
        </button>

        {mode === "signup" && (
          <p className="text-xs text-gray-500 text-center">
            You’ll receive an email to verify your account
          </p>
        )}
      </div>
    </div>
  );
}
