"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { likeCat } from "@/lib/features/adoptionSlice";

export default function SwipeDeck({ cats }) {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const cat = cats[index];
  const remaining = useMemo(() => Math.max(cats.length - index, 0), [cats.length, index]);

  async function swipe(action) {
    if (!cat) return;
    if (action === "like") dispatch(likeCat(cat.id));
    try { await fetch(`/api/swipe/${action}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ catId: cat.id }) }); } catch {}
    toast.success(action === "like" ? `Interested in ${cat.name}` : `Passed on ${cat.name}`);
    setIndex((value) => value + 1);
  }


  if (!cat) return <div className="rounded-[2rem] bg-white p-10 text-center shadow-xl"><h2 className="text-3xl font-black">No more cats nearby</h2><p className="mt-3 text-slate-600">Check back soon for new rescue profiles.</p></div>;
  const photo = cat.photos?.[0]?.url;
  return (
    <section className="mx-auto max-w-md">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-orange-200">
        <img suppressHydrationWarning src={photo} alt={cat.name} className="h-[34rem] w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-7 text-white">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-200">{remaining} profiles nearby</p>
          <h1 className="mt-2 text-5xl font-black">{cat.name}</h1>
          <p className="mt-2 font-semibold">{cat.breed} • {cat.ageMonths} months • {cat.location}</p>
          <p className="mt-4 text-sm text-white/85">{cat.personality}</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4">
        <button onClick={() => swipe("dislike")} className="rounded-full bg-white py-4 text-2xl font-black shadow-lg" aria-label={`Skip ${cat.name}`}>✕</button>
        <Link href={`/cats/${cat.id}`} className="rounded-full bg-white py-4 text-center text-sm font-black text-slate-700 shadow-lg">View profile</Link>
        <button onClick={() => swipe("like")} className="rounded-full bg-orange-500 py-4 text-2xl text-white shadow-lg" aria-label={`Interested in ${cat.name}`}>♥</button>
      </div>
    </section>
  );
}
