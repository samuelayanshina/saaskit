// components/settings/TeamForm.tsx
"use client"

import {useEffect, useState} from "react"
import useDebouncedValue from "@/lib/hooks/useDebouncedValue"

type Team = {
  id: number
  name: string
  slug: string
}

const TeamForm = ({initial}:{initial:Team})=>{
  const [name, setName] = useState(initial?.name ?? "")
  const [slug, setSlug] = useState(initial?.slug ?? "")
  const [status, setStatus] = useState<"idle"|"saving"|"saved"|"error">("idle")

  const debounced = useDebouncedValue({name,slug}, 1000)

  useEffect(()=>{
    const save = async ()=> {
      if(!initial?.id) return
      setStatus("saving")
      try {
        const res = await fetch("/api/teams", {
          method: "PATCH",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({id: initial.id, name, slug})
        })
        if(!res.ok) throw new Error("Save failed")
        setStatus("saved")
        setTimeout(()=>setStatus("idle"), 900)
      } catch (err) {
        console.error(err)
        setStatus("error")
      }
    }

    if(debounced.name || debounced.slug) save()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[debounced])

  return (
    <section className="space-y-6 p-6 bg-white/70 dark:bg-black/30 backdrop-blur-lg border border-gray-200 dark:border-[#1F1F22] rounded-2xl transition-colors duration-200 max-w-xl">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Team</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Organization-level settings.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <label className="flex flex-col">
          <span className="text-sm text-gray-700 dark:text-gray-300 mb-1">Team name</span>
          <input value={name} onChange={(e)=>setName(e.target.value)} className="rounded-md px-3 py-2 border border-gray-200 dark:border-[#2A2A2D] bg-transparent focus:outline-none" />
        </label>

        <label className="flex flex-col">
          <span className="text-sm text-gray-700 dark:text-gray-300 mb-1">Slug (URL)</span>
          <input value={slug} onChange={(e)=>setSlug(e.target.value)} className="rounded-md px-3 py-2 border border-gray-200 dark:border-[#2A2A2D] bg-transparent focus:outline-none" />
        </label>

        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {status === "saving" && "Saving..."}
            {status === "saved" && "Saved"}
            {status === "error" && "Save failed"}
            {status === "idle" && "Auto-save enabled"}
          </div>
          <div className="ml-auto text-xs text-gray-400">Changes saved to /api/teams</div>
        </div>
      </div>
    </section>
  )
}

export default TeamForm
