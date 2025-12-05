"use client";

import BillingStatusBadge from "./BillingStatusBadge";

export default function BillingTableItem({item}){
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="py-3 px-4">{item.plan}</td>
      <td className="py-3 px-4">{item.customerId || "—"}</td>
      <td className="py-3 px-4">
        <BillingStatusBadge status={item.status}/>
      </td>
      <td className="py-3 px-4">
        {item.currentPeriodEnd
          ? new Date(item.currentPeriodEnd).toLocaleDateString()
          : "—"}
      </td>
      <td className="py-3 px-4 text-right">
        <button className="text-blue-600 hover:underline">View</button>
      </td>
    </tr>
  );
}
