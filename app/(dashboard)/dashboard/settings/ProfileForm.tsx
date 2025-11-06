"use client";

import {useState, useEffect} from "react";

export default function ProfileForm() {
  const [form, setForm] = useState({name: "", email: ""});
  const [status, setStatus] = useState("idle");

  // Load existing user data
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        if(data.length > 0){
          setForm({name: data[0].name || "", email: data[0].email});
        }
      });
  }, []);

  // Debounced save
  useEffect(() => {
    if(form.name || form.email){
      const timeout = setTimeout(async () => {
        try {
          setStatus("saving");
          await fetch("/api/users", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(form)
          });
          setStatus("saved");
          setTimeout(() => setStatus("idle"), 2000);
        } catch {
          setStatus("error");
        }
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [form]);

  return (
    <div className="max-w-md p-6 bg-white/60 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow">
      <h2 className="text-lg font-medium mb-4">Profile</h2>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({...form, name: e.target.value})}
        className="w-full mb-3 p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent"
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({...form, email: e.target.value})}
        className="w-full mb-4 p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent"
      />
      <div className="text-sm text-gray-500">
        {status === "saving" && "Saving..."}
        {status === "saved" && "Saved"}
        {status === "error" && "Save failed"}
        {status === "idle" && "Auto-save enabled"}
      </div>
    </div>
  );
}
