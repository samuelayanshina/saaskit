"use client";

import React,{useEffect,useState} from "react";
import {motion,AnimatePresence} from "framer-motion";

/**
 * Team page with:
 * - simulated network fetch (mock data)
 * - shimmer loader
 * - animated member cards
 * - mock invite / remove actions (UI-only)
 * - accessible buttons and minimal dependencies
 *
 * Drop this file into: app/(dashboard)/dashboard/team/page.tsx
 */

type Member = {
  id:string;
  name:string;
  role:string;
  email:string;
  avatarColor:string;
};

const SHIMMER = ()=>(
  <div className="w-full p-6 bg-white/10 dark:bg-white/5 rounded-2xl">
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-white/10 dark:bg-white/6 rounded w-1/4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="h-24 bg-white/8 rounded" />
        <div className="h-24 bg-white/8 rounded" />
      </div>
    </div>
  </div>
);

// small util to create mock members
const makeMockMembers = (n:number=6):Member[]=>{
  const roles = ["Owner","Admin","Developer","Designer","Support"];
  const names = ["Aisha Bello","Daniel Okoye","Chinedu Eze","Ngozi Aden","Tunde Ibraheem","Sade Ade"];
  return Array.from({length:n}).map((_,i)=>({
    id:`m_${Date.now()}_${i}`,
    name:names[i % names.length],
    role:roles[i % roles.length],
    email:`user${i+1}@example.com`,
    avatarColor:["#6366F1","#10B981","#F59E0B","#EF4444","#8B5CF6"][i%5]
  }));
};

const cardMotion = {
  initial:{opacity:0,y:8,scale:0.995},
  animate:{opacity:1,y:0,scale:1},
  exit:{opacity:0,y:-8,scale:0.995},
  transition:{duration:0.36,ease:"easeOut"}
};

export default function TeamPage(){
  const [members,setMembers] = useState<Member[]|null>(null);
  const [isLoading,setIsLoading] = useState(true);
  const [filter,setFilter] = useState("");
  const [lastUpdated,setLastUpdated] = useState<Date|null>(null);

  // simulated fetch
  useEffect(()=>{
    setIsLoading(true);
    const t = setTimeout(()=>{
      const mock = makeMockMembers(6); // default 6 members
      setMembers(mock);
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 800 + Math.random()*700); // 0.8-1.5s random delay to feel realistic
    return ()=>clearTimeout(t);
  },[]);

  // mock invite: just prepends a new member
  const handleInvite = ()=>{
    const id = `m_${Date.now()}`;
    const newMember:Member = {id,name:"New Invitee",role:"Invited",email:`invite_${Date.now()}@example.com`,avatarColor:"#06B6D4"};
    setMembers(prev=>prev? [newMember,...prev] : [newMember]);
    setLastUpdated(new Date());
  };

  // mock remove
  const handleRemove = (id:string)=>{
    setMembers(prev=>prev? prev.filter(m=>m.id!==id) : prev);
    setLastUpdated(new Date());
  };

  const filtered = members?.filter(m=> m.name.toLowerCase().includes(filter.trim().toLowerCase()) || m.email.toLowerCase().includes(filter.trim().toLowerCase()));

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Team</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Manage team members, roles and invites.</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            placeholder="Search members or email..."
            value={filter}
            onChange={(e)=>setFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none"
          />
          <button
            onClick={handleInvite}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-500 transition"
          >
            Invite
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isLoading ? "Loading members…" : `${filtered?.length ?? 0} member(s)`} • {lastUpdated ? `Updated ${Math.floor((Date.now()-lastUpdated.getTime())/60000)}m ago` : "—"}
          </p>
          <div className="text-xs text-gray-400">Demo data • Backend ready</div>
        </div>

        <div className="relative">
          {isLoading && <div className="mb-4"><SHIMMER/></div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {!isLoading && filtered && filtered.length>0 ? filtered.map((m)=>(
                <motion.div key={m.id} {...cardMotion} className="bg-transparent backdrop-blur-md rounded-2xl border border-white/10 p-4 flex items-center gap-4 shadow">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold" style={{backgroundColor:m.avatarColor}}>
                    {m.name.split(" ").map(x=>x[0]).slice(0,2).join("")}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{m.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{m.role}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{m.email}</div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={()=>alert(`Open details for ${m.name} (mock)`)}
                          className="text-xs px-3 py-1 rounded-md border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10"
                        >
                          Details
                        </button>
                        <button
                          onClick={()=>handleRemove(m.id)}
                          className="text-xs px-3 py-1 rounded-md text-red-400 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )) : null}
            </AnimatePresence>

            {!isLoading && filtered && filtered.length===0 && (
              <div className="col-span-full p-6 rounded-2xl bg-white/6 text-center text-gray-600 dark:text-gray-300">
                No members matched your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
