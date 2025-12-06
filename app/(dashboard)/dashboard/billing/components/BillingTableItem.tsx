// "use client";

// import BillingStatusBadge from "./BillingStatusBadge";

// export default function BillingTableItem({item}){
//   return (
//     <tr className="border-b hover:bg-gray-50 transition">
//       <td className="py-3 px-4">{item.plan}</td>
//       <td className="py-3 px-4">{item.customerId || "—"}</td>
//       <td className="py-3 px-4">
//         <BillingStatusBadge status={item.status}/>
//       </td>
//       <td className="py-3 px-4">
//         {item.currentPeriodEnd
//           ? new Date(item.currentPeriodEnd).toLocaleDateString()
//           : "—"}
//       </td>
//       <td className="py-3 px-4 text-right">
//         <button className="text-blue-600 hover:underline">View</button>
//       </td>
//     </tr>
//   );
// }


"use client";

import BillingStatusBadge from "./BillingStatusBadge";

export default function BillingTableItem({item}){
  return(
    <tr className="border-t border-white/10 text-gray-300 hover:bg-white/5 transition">
      <td className="px-4 py-3">{item.plan || "—"}</td>

      <td className="px-4 py-3">{item.customerId || "—"}</td>

      <td className="px-4 py-3">
        <BillingStatusBadge status={item.status}/>
      </td>

      <td className="px-4 py-3">
        {item.currentPeriodEnd
          ? new Date(item.currentPeriodEnd).toLocaleDateString()
          : "—"}
      </td>

      <td className="px-4 py-3 text-right">
        <a
          href={item.invoiceUrl || "#"}
          className="text-blue-400 hover:underline"
        >
          View
        </a>
      </td>
    </tr>
  );
}
