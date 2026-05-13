"use client";
import toast from "react-hot-toast";

export default function FavoriteActions({ favoriteId }) {
  async function removeFavorite() {
    const response = await fetch(`/api/favorites/${favoriteId}`, { method: "DELETE" });
    if (!response.ok) return toast.error("Could not remove favorite");
    toast.success("Removed from favorites");
    window.location.reload();
  }

  return <button onClick={removeFavorite} className="rounded-full bg-slate-100 px-5 py-3 font-bold text-slate-700">Remove</button>;
}
