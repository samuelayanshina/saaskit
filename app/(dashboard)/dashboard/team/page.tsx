"use client";

import React,{useEffect,useState} from "react";
import {motion,AnimatePresence} from "framer-motion";
import toast from "react-hot-toast";

type Member = {
  id:string;
  name:string;
  role:string;
  email:string;
  avatarColor:string;
};

const SHIMMER = ()=>(
  <div className="w-full bg-white/10 dark:bg-white/5 rounded-2xl p-6 overflow-hidden">
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-white/10 dark:bg-white/6 rounded w-1/4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="h-24 bg-white/8 rounded" />
        <div className="h-24 bg-white/8 rounded" />
      </div>
    </div>
  </div>
);

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
  const [showModal,setShowModal] = useState(false);
  const [form,setForm] = useState({name:"",email:"",role:""});
  const [highlightedId,setHighlightedId] = useState<string|null>(null);


  useEffect(()=>{
    setIsLoading(true);
    const t = setTimeout(()=>{
      setMembers(makeMockMembers(6));
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 800 + Math.random()*700);
    return ()=>clearTimeout(t);
  },[]);

    // Prevent background scroll + layout shift when modal opens
  useEffect(()=>{
    if(showModal){
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "0px"; // Prevent horizontal jump
    }else{
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return ()=>{
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  },[showModal]);


  const handleRemove = (id:string)=>{
    setMembers(prev=>prev? prev.filter(m=>m.id!==id) : prev);
    setLastUpdated(new Date());
    toast("Member removed", {icon:"🗑️"});
  };

  const handleSubmit = (e:React.FormEvent)=>{
    e.preventDefault();
    if(!form.name || !form.email || !form.role){
      toast.error("All fields required");
      return;
    }

    const id = `m_${Date.now()}`;
    const colors = ["#6366F1","#10B981","#F59E0B","#EF4444","#8B5CF6","#06B6D4"];
    const newMember:Member = {
      id,
      name:form.name,
      email:form.email,
      role:form.role,
      avatarColor:colors[Math.floor(Math.random()*colors.length)]
    };

    setMembers(prev=>prev? [newMember,...prev] : [newMember]);
    setHighlightedId(id);
setTimeout(()=>setHighlightedId(null), 1200);
    setForm({name:"",email:"",role:""});
    setShowModal(false);
    setLastUpdated(new Date());
    toast.success("Member invited successfully 🎉");
  };

  const filtered = members?.filter(m=>
    m.name.toLowerCase().includes(filter.trim().toLowerCase()) ||
    m.email.toLowerCase().includes(filter.trim().toLowerCase())
  );

  return (
    <div className="space-y-6 overflow-x-hidden w-full max-w-full">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 overflow-x-hidden">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Team</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Manage team members, roles, and invites.</p>
        </div>

        <div className="flex items-center gap-3 min-w-0">
          <input
            placeholder="Search members or email..."
            value={filter}
            onChange={(e)=>setFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none w-full sm:w-auto"
          />
          <button
            onClick={()=>setShowModal(true)}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-500 transition whitespace-nowrap"
          >
            Invite
          </button>
        </div>
      </div>

      {/* Info Bar */}
      <div className="flex items-center justify-between flex-wrap overflow-x-hidden">
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {isLoading ? "Loading members…" : `${filtered?.length ?? 0} member(s)`} • {lastUpdated ? `Updated ${Math.floor((Date.now()-lastUpdated.getTime())/60000)}m ago` : "—"}
        </p>
        <div className="text-xs text-gray-400 mt-1 sm:mt-0">Demo data • Backend ready</div>
      </div>

      {/* Members */}
      <div className="relative overflow-x-hidden">
        {isLoading && <SHIMMER />}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 overflow-hidden">
          <AnimatePresence>
            {!isLoading && filtered && filtered.length>0 ? filtered.map((m)=>(
              <motion.div
  key={m.id}
  {...cardMotion}
  className={`bg-transparent backdrop-blur-md rounded-2xl border border-white/10 p-4 flex items-center gap-4 shadow overflow-hidden transition-all duration-500 ${
    highlightedId===m.id ? "ring-2 ring-indigo-500/60 scale-[1.02]" : ""
  }`}
>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold shrink-0" style={{backgroundColor:m.avatarColor}}>
                  {m.name.split(" ").map(x=>x[0]).slice(0,2).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div className="min-w-0">
                      <div className="font-medium text-gray-900 dark:text-white truncate">{m.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{m.role}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{m.email}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
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

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{scale:0.95,opacity:0}}
              animate={{scale:1,opacity:1}}
              exit={{scale:0.95,opacity:0}}
              transition={{duration:0.25}}
              className="bg-gray-900/90 border border-white/10 text-white p-6 rounded-2xl w-full max-w-md shadow-xl"
            >
              <h2 className="text-lg font-semibold mb-4">Invite New Member</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e)=>setForm({...form,name:e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e)=>setForm({...form,email:e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none"
                />
                <select
                  value={form.role}
                  onChange={(e)=>setForm({...form,role:e.target.value})}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none"
                >
                  <option value="">Select role</option>
                  <option value="Owner">Owner</option>
                  <option value="Admin">Admin</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Support">Support</option>
                </select>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={()=>setShowModal(false)}
                    className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-sm hover:bg-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-sm hover:bg-indigo-500"
                  >
                    Invite
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
