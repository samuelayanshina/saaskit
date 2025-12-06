// "use client";
// import {useEffect, useState} from "react";

// export default function BillingList(){
//   const [billing, setBilling] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(()=>{
//     const loadBilling = async()=>{
//       try{
//         const res = await fetch("/api/billing");
//         const data = await res.json();
//         setBilling(Array.isArray(data) ? data : []);
//       }catch(error){
//         console.error("Error loading billing:", error);
//       }finally{
//         setLoading(false);
//       }
//     };
//     loadBilling();
//   },[]);

//   return (
//     <div className="overflow-hidden rounded-lg border border-white/10">
//       {loading ? (
//         <p className="text-gray-400 p-4">Loading invoices...</p>
//       ) : (
//         <table className="min-w-full text-sm">
//           <thead className="bg-white/5 text-gray-400 uppercase text-xs">
//             <tr>
//               <th className="text-left px-4 py-3">Date</th>
//               <th className="text-left px-4 py-3">Amount</th>
//               <th className="text-left px-4 py-3">Status</th>
//               <th className="text-left px-4 py-3">Download</th>
//             </tr>
//           </thead>

//           <tbody>
//             {billing.length > 0 ? (
//               billing.map((item)=>(
//                 <tr key={item.id} className="border-t border-white/10 text-gray-300">
//                   <td className="px-4 py-3">{item.date || "—"}</td>
//                   <td className="px-4 py-3">${item.amount || "0.00"}</td>
//                   <td className="px-4 py-3">{item.status || "Paid"}</td>
//                   <td className="px-4 py-3">
//                     <a href={item.invoiceUrl || "#"} className="text-blue-400 hover:underline">
//                       Download
//                     </a>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={4} className="text-center text-gray-500 py-4">
//                   No invoices found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


"use client";
import {useEffect, useState} from "react";
import BillingTableItem from "./BillingTableItem";

export default function BillingList(){
  const [billing, setBilling] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const loadBilling = async()=>{
      try{
        const res = await fetch("/api/billing");
        const data = await res.json();
        setBilling(Array.isArray(data) ? data : []);
      }catch(error){
        console.error("Error loading billing:", error);
      }finally{
        setLoading(false);
      }
    };
    loadBilling();
  },[]);

  return(
    <div className="w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
      {loading ? (
        <p className="text-gray-400 p-4">Loading invoices...</p>
      ) : (
        <table className="min-w-full text-sm">
          <thead className="bg-white/10 text-gray-300 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Plan</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Period End</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {billing.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-4 text-gray-500 text-center">
                  No invoices found.
                </td>
              </tr>
            ) : (
              billing.map((item)=>(
                <BillingTableItem key={item.id} item={item}/>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
