"use client";
import toast from "react-hot-toast";

export default function AdoptionRequestButton({ catId, catName }) {
  async function requestAdoption() {
    const message = window.prompt(`Send a message to adopt ${catName}:`, `Hi, I would love to meet ${catName}.`);
    if (message === null) return;
    const response = await fetch("/api/adoption/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ catId, message }),
    });
    if (!response.ok) return toast.error("Could not send adoption request");
    toast.success("Adoption request sent");
  }

  return <button onClick={requestAdoption} className="rounded-full bg-slate-950 px-5 py-3 font-bold text-white">Request</button>;
}
