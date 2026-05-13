import Link from "next/link";
import AppShell from "@/components/AppShell";
import CatCard from "@/components/CatCard";
import { demoCats } from "@/lib/demoData";
export default function ShelterCats(){return <AppShell><section className="mx-auto max-w-7xl px-4 py-10"><div className="flex items-center justify-between"><h1 className="text-4xl font-black">Manage cats</h1><Link href="/shelter/cats/new" className="rounded-full bg-orange-500 px-5 py-3 font-bold text-white">New cat</Link></div><div className="mt-8 grid gap-6 md:grid-cols-3">{demoCats.map(cat=><CatCard key={cat.id} cat={cat}/>)}</div></section></AppShell>}
