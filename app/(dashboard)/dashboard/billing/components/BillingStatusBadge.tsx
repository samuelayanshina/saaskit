// "use client";

// interface Props {
//   status?: string | null;
// }

// export default function BillingStatusBadge({status}: Props){
//   const normalized = status?.toLowerCase().replace(" ", "_") || "active";

//   const styles: Record<string,string> = {
//     active: "bg-green-100 text-green-700",
//     trialing: "bg-blue-100 text-blue-700",
//     cancelled: "bg-red-100 text-red-700",
//     past_due: "bg-orange-100 text-orange-700",
//   };

//   const labelMap: Record<string,string> = {
//     active: "Active",
//     trialing: "Trialing",
//     cancelled: "Cancelled",
//     past_due: "Past Due",
//   };

//   const badgeClass = styles[normalized] || "bg-gray-100 text-gray-700";
//   const label = labelMap[normalized] || "Unknown";

//   return (
//     <span className={`px-3 py-1 rounded-full text-sm font-medium ${badgeClass}`}>
//       {label}
//     </span>
//   );
// }



"use client";

interface Props {
  status?: string | null;
}

export default function BillingStatusBadge({status}: Props){
  const normalized = status?.toLowerCase().replace(" ", "_") || "active";

  const styles: Record<string,string> = {
    active: "bg-green-100 text-green-700",
    trialing: "bg-blue-100 text-blue-700",
    cancelled: "bg-red-100 text-red-700",
    past_due: "bg-orange-100 text-orange-700",
  };

  const labelMap: Record<string,string> = {
    active: "Active",
    trialing: "Trialing",
    cancelled: "Cancelled",
    past_due: "Past Due",
  };

  return(
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[normalized] || "bg-gray-200 text-gray-700"}`}>
      {labelMap[normalized] || "Unknown"}
    </span>
  );
}
