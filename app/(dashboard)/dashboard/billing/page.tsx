"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import BillingList from "./components/BillingList";
import { getAuth } from "firebase/auth";


export default function BillingPage(){

  const [billing, setBilling] = useState([]);
  const [loading, setLoading] = useState(true);


  // 🔹 Modal state (for Upgrade/Downgrade later)
  const [openPlanModal, setOpenPlanModal] = useState(false);

  // -------------------------------------------------
  // ⭐ 1. Stripe Customer Portal Logic
  // -------------------------------------------------
  const handleOpenPortal = async()=>{
  try{
    const auth = getAuth();
    const user = auth.currentUser;

    if(!user){
      alert("You must be logged in.");
      return;
    }

    // 🔐 Get secure ID token
    const idToken = await user.getIdToken(true);

    // 🔵 Call backend with ID token instead of userId
    const res = await fetch("/api/stripe/create-portal-session", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ idToken }),
    });

    const json = await res.json();

    if(json?.url){
      window.location.href = json.url;
    }else{
      alert(json?.error || "Could not open billing portal");
    }

  }catch(err){
    console.error("Portal error:", err);
  }
};


  // -------------------------------------------------
  // Load billing list
  // -------------------------------------------------
  useEffect(()=>{
    const loadBilling = async()=>{
      try{
        const res = await fetch("/api/billing");
        const data = await res.json();
        setBilling(Array.isArray(data) ? data : []);
      }catch(error){
        console.error("Error loading billing data:", error);
      }finally{
        setLoading(false);
      }
    };
    loadBilling();
  },[]);

  return(
    <div className="p-6 space-y-6 bg-transparent backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">

      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Billing
      </h1>

      {/* Add Billing */}
      <div className="flex justify-end mb-4">
        <Link href="/dashboard/billing/create">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            + New Billing
          </button>
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading billing data...</p>
      ) : (
        <>
          {/* -------------- CURRENT PLAN --------------- */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-white">Current Plan</h2>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">

              <div>
                <p className="font-semibold text-blue-400">Pro Plan</p>
                <p className="text-sm text-gray-400">Renews on Dec 1, 2025</p>
              </div>

              <div className="flex gap-3">
                {/* ⭐ Upgrade/Downgrade (Modal) */}
                <button
                  onClick={()=>setOpenPlanModal(true)}
                  className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-md text-white">
                  Change Plan
                </button>

                {/* ⭐ Stripe Customer Portal */}
                <button
                  onClick={handleOpenPortal}
                  className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200">
                  Manage Plan
                </button>
              </div>

            </div>
          </div>

          {/* -------------- PAYMENT METHOD --------------- */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-white">Payment Method</h2>
            <div className="p-4 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-6 bg-gray-800 rounded-sm flex items-center justify-center text-xs font-semibold text-gray-300">
                  VISA
                </div>
                <div>
                  <p className="text-gray-300 font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-400">Exp 04/27</p>
                </div>
              </div>
              <button
                onClick={handleOpenPortal}
                className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200">
                Update
              </button>
            </div>
          </div>

          {/* -------------- INVOICES --------------- */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-white">Invoices</h2>
            <BillingList/>
          </div>

        </>
      )}

      {/* 🔹 Plan Modal (placeholder, will install next) */}
      {openPlanModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="p-6 bg-white rounded-xl text-black w-80">
            <h2 className="font-semibold text-lg mb-4">Plan Options</h2>
            <p>Pro, Enterprise, Startup…</p>
            <button
              onClick={()=>setOpenPlanModal(false)}
              className="mt-4 w-full bg-gray-800 text-white py-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
