// 'use client';

// import ThemeToggle from '@/components/ThemeToggle';

// export default function DashboardPage(){
//   return(
//     <div className="p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl shadow-sm dark:shadow-none transition-all duration-300">
      
//       {/* HEADER WITH THEME TOGGLE */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
//           Dashboard Overview
//         </h1>
//         <ThemeToggle/>
//       </div>

//       <p className="text-gray-600 dark:text-gray-400 mb-8">
//         Welcome to your main dashboard. Here’s where key metrics and quick actions will live.
//       </p>

//       {/* SUMMARY CARDS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {[
//           {title:'Users', value:'1,240', growth:'+12% this week'},
//           {title:'Teams', value:'84', growth:'+4 new'},
//           {title:'Plans', value:'3 Active', growth:'Pro, Starter, Enterprise'},
//         ].map((item)=>(
//           <div 
//             key={item.title}
//             className="p-5 bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-2xl backdrop-blur-xl shadow-sm 
//                        dark:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
//           >
//             <h2 className="text-gray-500 dark:text-gray-400">{item.title}</h2>
//             <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">{item.value}</p>
//             <span className="text-sm text-gray-600 dark:text-gray-400">{item.growth}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
'use client';

import {motion} from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';

export default function DashboardPage(){
  const cards = [
    {title:'Users', value:'1,240', growth:'+12% this week'},
    {title:'Teams', value:'84', growth:'+4 new'},
    {title:'Plans', value:'3 Active', growth:'Pro, Starter, Enterprise'},
  ];

  return(
    <motion.div
      initial={{opacity:0, y:20}}
      animate={{opacity:1, y:0}}
      transition={{duration:0.6, ease:'easeOut'}}
      className="p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl shadow-sm dark:shadow-none transition-all duration-300"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Dashboard Overview
        </h1>
        <ThemeToggle/>
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Welcome to your main dashboard. Here’s where key metrics and quick actions will live.
      </p>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((item, index)=>(
          <motion.div
            key={item.title}
            initial={{opacity:0, y:30}}
            animate={{opacity:1, y:0}}
            transition={{delay:0.1 * index, duration:0.5, ease:'easeOut'}}
            className="p-5 bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-2xl backdrop-blur-xl shadow-sm dark:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            <h2 className="text-gray-500 dark:text-gray-400">{item.title}</h2>
            <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-2">{item.value}</p>
            <span className="text-sm text-gray-600 dark:text-gray-400">{item.growth}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
