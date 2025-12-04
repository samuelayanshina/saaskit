"use client";
import React, {useState} from "react";
import toast from "react-hot-toast";

export default function BillingForm({defaultUserId, defaultTeamId}:{defaultUserId?:string, defaultTeamId?:string}) {
  const [plan, setPlan] = useState("free");
  const [customerId, setCustomerId] = useState("");
  const [subscriptionId, setSubscriptionId] = useState("");
  const [currentPeriodEnd, setCurrentPeriodEnd] = useState("");
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try{
      // build payload: include defaultUserId/defaultTeamId if present
      const payload:any = {plan, customerId: customerId||null, subscriptionId: subscriptionId||null, status};
      if (currentPeriodEnd) payload.currentPeriodEnd = currentPeriodEnd;
      if (defaultTeamId) payload.teamId = defaultTeamId;
      if (defaultUserId) payload.userId = defaultUserId;
      const res = await fetch("/api/billing/create", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json?.error || "Failed");
      } else {
        toast.success("Billing saved");
      }
    }catch(err:any){
      toast.error(err?.message ?? "Network error");
    }finally{
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <label className="block text-sm">Plan</label>
      <select value={plan} onChange={(e)=>setPlan(e.target.value)} className="w-full px-3 py-2 rounded bg-white/5 border border-white/10">
        <option value="free">Free</option>
        <option value="pro">Pro</option>
        <option value="enterprise">Enterprise</option>
      </select>

      <label className="block text-sm">Customer ID (provider)</label>
      <input value={customerId} onChange={(e)=>setCustomerId(e.target.value)} className="w-full px-3 py-2 rounded bg-white/5 border border-white/10" />

      <label className="block text-sm">Subscription ID</label>
      <input value={subscriptionId} onChange={(e)=>setSubscriptionId(e.target.value)} className="w-full px-3 py-2 rounded bg-white/5 border border-white/10" />

      <label className="block text-sm">Current Period End (ISO date, optional)</label>
      <input value={currentPeriodEnd} onChange={(e)=>setCurrentPeriodEnd(e.target.value)} placeholder="YYYY-MM-DD" className="w-full px-3 py-2 rounded bg-white/5 border border-white/10" />

      <label className="block text-sm">Status</label>
      <select value={status} onChange={(e)=>setStatus(e.target.value)} className="w-full px-3 py-2 rounded bg-white/5 border border-white/10">
        <option value="active">Active</option>
        <option value="trialing">Trialing</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-indigo-600 text-white">
          {loading ? "Saving..." : "Save Billing"}
        </button>
        <button type="button" onClick={()=>{ setPlan("free"); setCustomerId(""); setSubscriptionId(""); setCurrentPeriodEnd(""); setStatus("active"); }} className="px-4 py-2 rounded border">
          Reset
        </button>
      </div>
    </form>
  );
}
