"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AuthForm({ mode, initialRole = "ADOPTER" }) {
  const [role, setRole] = useState(initialRole);
  async function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    payload.role = role;
    try {
      const response = await fetch(`/api/auth/${mode}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("Request failed");
      const data = await response.json();
      toast.success(mode === "login" ? "Welcome back" : "Account created");
      window.location.href = data.user?.role === "SHELTER" || data.user?.role === "ADMIN" ? "/shelter/cats" : "/discover";
    } catch { toast.error("Could not complete authentication"); }
  }
  return <form onSubmit={submit} className="mx-auto max-w-md rounded-[2rem] bg-white p-8 shadow-xl"><h1 className="text-4xl font-black">{mode === "login" ? "Log in" : "Create account"}</h1>{mode === "register" && <div className="mt-5 grid grid-cols-2 gap-2 rounded-full bg-orange-50 p-1"><button type="button" onClick={() => setRole("ADOPTER")} className={`rounded-full py-2 font-bold ${role === "ADOPTER" ? "bg-white shadow" : ""}`}>Adopter</button><button type="button" onClick={() => setRole("SHELTER")} className={`rounded-full py-2 font-bold ${role === "SHELTER" ? "bg-white shadow" : ""}`}>Shelter</button></div>}{mode === "register" && <input name="name" required placeholder="Name" className="mt-5 w-full rounded-2xl border p-3" />}<input name="email" required type="email" placeholder="Email" className="mt-4 w-full rounded-2xl border p-3" /><input name="password" required type="password" placeholder="Password" className="mt-4 w-full rounded-2xl border p-3" />{mode === "register" && role === "SHELTER" && <input name="shelterName" placeholder="Shelter name" className="mt-4 w-full rounded-2xl border p-3" />}<button className="mt-6 w-full rounded-full bg-orange-500 py-3 font-bold text-white">{mode === "login" ? "Log in" : "Register"}</button></form>;
}
