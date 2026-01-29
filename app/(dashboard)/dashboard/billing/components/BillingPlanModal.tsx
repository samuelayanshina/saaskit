"use client";

import React, {useState} from "react";


const PLANS = [
  {
    id: "starter",
    name: "Starter",
    priceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID,
  },
  {
    id: "pro",
    name: "Pro",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID,
  },
];

export default function BillingPlanModal({userId, open, onClose}:{userId:string, open:boolean, onClose:()=>void}) {
  const [plan, setPlan] = useState("pro");
  const [loading, setLoading] = useState(false);

//   const handleGoToCheckout = async ()=> {
//     try {
//       setLoading(true);
//       const res = await fetch("/api/stripe/create-checkout-session", {
//         method: "POST",
//         headers: {"Content-Type":"application/json"},
//         body: JSON.stringify({userId, plan}),
//       });
//       const json = await res.json();
//       if (json?.url) {
//         window.location.href = json.url;
//       } else {
//         alert(json?.error || "Failed to create checkout session");
//       }
//     } catch (err:any) {
//       console.error(err);
//       alert(err?.message || "Network error");
//     } finally {
//       setLoading(false);
//     }
//   };

const handleGoToCheckout = async ()=> {
  const selectedPriceId = PLANS.find((p)=> p.id === plan)?.priceId;

  try {
    setLoading(true);
    const res = await fetch("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        userId,
        priceId: selectedPriceId, // ✅ Correct Stripe price
      }),
    });

    const json = await res.json();
    if (json?.url) window.location.href = json.url;
    else alert(json?.error || "Failed to create checkout session");
  } catch (err:any) {
    alert(err?.message || "Network error");
  } finally {
    setLoading(false);
  }
};




  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-gray-900 p-6 rounded-2xl w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Choose a plan</h3>

        {/* <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 rounded border border-white/6">
            <input type="radio" name="plan" value="pro" checked={plan==="pro"} onChange={()=>setPlan("pro")} />
            <div>
              <div className="font-medium">Pro</div>
              <div className="text-sm text-gray-400">All core features</div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 rounded border border-white/6">
            <input type="radio" name="plan" value="enterprise" checked={plan==="enterprise"} onChange={()=>setPlan("enterprise")} />
            <div>
              <div className="font-medium">Enterprise</div>
              <div className="text-sm text-gray-400">Advanced controls & scale</div>
            </div>
          </label>
        </div> */}

        <div className="space-y-3">
  {PLANS.map((planItem)=> (
    <label
      key={planItem.id}
      className="flex items-center gap-3 p-3 rounded border border-white/10 cursor-pointer"
    >
      <input
        type="radio"
        name="plan"
        value={planItem.id}
        checked={plan === planItem.id}
        onChange={()=> setPlan(planItem.id)}
      />
      <div>
        <div className="font-medium">{planItem.name}</div>
        <div className="text-sm text-gray-400">{planItem.id} plan</div>
      </div>
    </label>
  ))}
</div>


        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
          <button onClick={handleGoToCheckout} disabled={loading} className="px-4 py-2 rounded bg-indigo-600 text-white">
            {loading ? "Redirecting..." : "Continue to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}
