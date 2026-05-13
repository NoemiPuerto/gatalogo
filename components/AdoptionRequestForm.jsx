"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AdoptionRequestForm({ catId, catName }) {
  const [sending, setSending] = useState(false);
  async function submit(event) {
    event.preventDefault();
    setSending(true);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/adoption/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ catId, message: form.get("message") }),
    });
    setSending(false);
    if (!response.ok) return toast.error("Could not send adoption request");
    toast.success("Adoption request sent");
  }

  return (
    <form onSubmit={submit} className="mt-8 rounded-3xl bg-slate-50 p-5">
      <label className="text-sm font-bold">Adoption message</label>
      <textarea name="message" className="mt-2 h-28 w-full rounded-2xl border border-slate-200 p-3" defaultValue={`Hi, I would love to meet ${catName}.`} />
      <button disabled={sending} className="mt-3 w-full rounded-full bg-orange-500 px-5 py-3 font-bold text-white disabled:opacity-60">{sending ? "Sending..." : "Send adoption request"}</button>
    </form>
  );
}
