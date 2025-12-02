"use client";

import BillingForm from "../BillingForm";

export default function BillingCreatePage(){
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-white mb-6">
        Create Billing
      </h1>

      <BillingForm />
    </div>
  );
}
