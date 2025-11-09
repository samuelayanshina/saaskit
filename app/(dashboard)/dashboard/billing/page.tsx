"use client";
import {useEffect, useState} from "react";

export default function BillingPage(){
  const [billing, setBilling] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Billing
      </h1>

      {loading ? (
        <p className="text-gray-400">Loading billing data...</p>
      ) : (
        <>
          {/* 🔹 Current Plan */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-white">Current Plan</h2>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
              <div>
                <p className="font-semibold text-blue-400">Pro Plan</p>
                <p className="text-sm text-gray-400">Renews on Dec 1, 2025</p>
              </div>
              <button className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-md text-white">
                Manage Plan
              </button>
            </div>
          </div>

          {/* 🔹 Payment Method */}
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
              <button className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded-md text-gray-200">
                Update
              </button>
            </div>
          </div>

          {/* 🔹 Invoices */}
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-white">Invoices</h2>
            <div className="overflow-hidden rounded-lg border border-white/10">
              <table className="min-w-full text-sm">
                <thead className="bg-white/5 text-gray-400 uppercase text-xs">
                  <tr>
                    <th className="text-left px-4 py-3">Date</th>
                    <th className="text-left px-4 py-3">Amount</th>
                    <th className="text-left px-4 py-3">Status</th>
                    <th className="text-left px-4 py-3">Download</th>
                  </tr>
                </thead>
                <tbody>
                  {billing.length > 0 ? (
                    billing.map((item:any)=>(
                      <tr key={item.id} className="border-t border-white/10 text-gray-300">
                        <td className="px-4 py-3">{item.date || "—"}</td>
                        <td className="px-4 py-3">${item.amount || "0.00"}</td>
                        <td className="px-4 py-3">{item.status || "Paid"}</td>
                        <td className="px-4 py-3">
                          <a href={item.invoiceUrl || "#"} className="text-blue-400 hover:underline">Download</a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center text-gray-500 py-4">
                        No invoices found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
