"use client";
import toast from "react-hot-toast";

export default function RequestCard({ request }) {
  async function decide(action) {
    const response = await fetch(`/api/adoption/${request.id}/${action}`, { method: "PATCH" });
    if (!response.ok) return toast.error("Could not update request");
    toast.success(`Request ${action === "approve" ? "approved" : "rejected"}`);
    window.location.reload();
  }

  return (
    <article className="grid gap-4 rounded-3xl bg-white p-5 shadow md:grid-cols-[6rem_1fr_auto]">
      <img suppressHydrationWarning src={request.cat?.photos?.[0]?.url || "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=500&q=80"} alt={request.cat?.name} className="h-24 w-24 rounded-2xl object-cover" />
      <div>
        <div className="flex flex-wrap items-center gap-2"><h2 className="text-xl font-black">{request.cat?.name}</h2><span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">{request.status}</span></div>
        <p className="mt-1 font-bold text-slate-700">{request.user?.name}</p>
        <p className="mt-2 text-slate-600">{request.message}</p>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => decide("approve")} className="rounded-full bg-emerald-500 px-4 py-2 font-bold text-white">Approve</button>
        <button onClick={() => decide("reject")} className="rounded-full bg-slate-200 px-4 py-2 font-bold">Reject</button>
      </div>
    </article>
  );
}
