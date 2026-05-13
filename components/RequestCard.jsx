"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RequestCard({ request }) {
  const [showAdopter, setShowAdopter] = useState(false);
  const adopter = request.user;

  async function decide(action) {
    const response = await fetch(`/api/adoption/${request.id}/${action}`, { method: "PATCH" });
    if (!response.ok) return toast.error("Could not update request");
    toast.success(`Request ${action === "approve" ? "approved" : "rejected"}`);
    window.location.reload();
  }

  return (
    <>
      <article className="grid gap-4 rounded-3xl bg-white p-5 shadow md:grid-cols-[6rem_1fr_auto]">
        <img suppressHydrationWarning src={request.cat?.photos?.[0]?.url || "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=500&q=80"} alt={request.cat?.name} className="h-24 w-24 rounded-2xl object-cover" />
        <div>
          <div className="flex flex-wrap items-center gap-2"><h2 className="text-xl font-black">{request.cat?.name}</h2><span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">{request.status}</span></div>
          <p className="mt-1 font-bold text-slate-700">{adopter?.name}</p>
          <p className="mt-2 text-slate-600">{request.message}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          <button onClick={() => setShowAdopter(true)} className="rounded-full bg-orange-100 px-4 py-2 font-bold text-orange-700">View Adopter Profile</button>
          <button onClick={() => decide("approve")} className="rounded-full bg-emerald-500 px-4 py-2 font-bold text-white">Approve</button>
          <button onClick={() => decide("reject")} className="rounded-full bg-slate-200 px-4 py-2 font-bold">Reject</button>
        </div>
      </article>

      {showAdopter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-8" role="dialog" aria-modal="true" aria-labelledby={`adopter-${request.id}-title`}>
          <div className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                {adopter?.avatar ? <img suppressHydrationWarning src={adopter.avatar} alt={adopter.name} className="h-20 w-20 rounded-3xl object-cover" /> : <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-100 text-3xl font-black text-orange-600">{adopter?.name?.charAt(0) || "?"}</div>}
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-500">Adopter profile</p>
                  <h3 id={`adopter-${request.id}-title`} className="mt-1 text-2xl font-black">{adopter?.name || "Unknown adopter"}</h3>
                </div>
              </div>
              <button onClick={() => setShowAdopter(false)} className="rounded-full bg-slate-100 px-3 py-2 font-black text-slate-600" aria-label="Close adopter profile">×</button>
            </div>
            <dl className="mt-6 grid gap-4">
              <div className="rounded-2xl bg-slate-50 p-4"><dt className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Phone</dt><dd className="mt-1 text-lg font-bold text-slate-900">{adopter?.phone || "No phone provided"}</dd></div>
              <div className="rounded-2xl bg-slate-50 p-4"><dt className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Location</dt><dd className="mt-1 font-semibold text-slate-700">{adopter?.location || "No location provided"}</dd></div>
              <div className="rounded-2xl bg-slate-50 p-4"><dt className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Bio</dt><dd className="mt-1 text-slate-700">{adopter?.bio || "No bio provided"}</dd></div>
            </dl>
          </div>
        </div>
      )}
    </>
  );
}
