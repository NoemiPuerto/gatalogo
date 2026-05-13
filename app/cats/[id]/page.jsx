import Link from "next/link";
import AppShell from "@/components/AppShell";
import { demoCats } from "@/lib/demoData";

export default async function CatProfile({ params }) {
  const { id } = await params;
  const cat = demoCats.find((item) => item.id === id) || demoCats[0];
  return <AppShell><section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr]"><div className="grid gap-4">{cat.photos.map((photo) => <img suppressHydrationWarning key={photo.url} src={photo.url} alt={cat.name} className="h-[34rem] w-full rounded-[2rem] object-cover shadow-xl" />)}</div><div className="rounded-[2rem] bg-white p-8 shadow-xl"><p className="font-bold uppercase tracking-[0.25em] text-orange-500">{cat.shelter.name}</p><h1 className="mt-3 text-5xl font-black">{cat.name}</h1><p className="mt-3 text-lg font-semibold text-slate-600">{cat.breed} • {cat.ageMonths} months • {cat.location}</p><p className="mt-6 text-slate-700">{cat.description}</p><div className="mt-6 grid grid-cols-2 gap-3 text-sm font-bold">{["vaccinated","sterilized","compatibleWithChildren","compatibleWithCats","compatibleWithDogs"].map((key) => <span key={key} className="rounded-2xl bg-orange-50 p-3">{key}: {cat[key] ? "Yes" : "No"}</span>)}</div><form className="mt-8 rounded-3xl bg-slate-50 p-5"><label className="text-sm font-bold">Adoption message</label><textarea className="mt-2 h-28 w-full rounded-2xl border border-slate-200 p-3" defaultValue={`Hi, I would love to meet ${cat.name}.`} /><button className="mt-3 w-full rounded-full bg-orange-500 px-5 py-3 font-bold text-white">Send adoption request</button></form><Link href="/discover" className="mt-4 inline-block font-bold text-orange-600">← Back to discovery</Link></div></section></AppShell>;
}
