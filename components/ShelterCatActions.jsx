"use client";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ShelterCatActions({ catId }) {
  async function markAdopted() {
    const response = await fetch(`/api/cats/${catId}/adopted`, { method: "PATCH" });
    if (!response.ok) return toast.error("Could not mark adopted");
    toast.success("Cat marked adopted");
    window.location.reload();
  }

  async function deleteCat() {
    if (!window.confirm("Delete this cat profile?")) return;
    const response = await fetch(`/api/cats/${catId}`, { method: "DELETE" });
    if (!response.ok) return toast.error("Could not delete cat");
    toast.success("Cat deleted");
    window.location.reload();
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Link href={`/shelter/cats/${catId}/edit`} className="rounded-full bg-slate-100 px-4 py-3 font-bold text-slate-700">Edit</Link>
      <button onClick={markAdopted} className="rounded-full bg-emerald-100 px-4 py-3 font-bold text-emerald-700">Mark adopted</button>
      <button onClick={deleteCat} className="rounded-full bg-red-100 px-4 py-3 font-bold text-red-700">Delete</button>
    </div>
  );
}
