import AppShell from "@/components/AppShell";
import { demoCats } from "@/lib/demoData";

export default function AdoptionRequestsPage() {
  return <AppShell><section className="mx-auto max-w-5xl px-4 py-10"><h1 className="text-4xl font-black">Adoption requests</h1><div className="mt-8 space-y-4">{demoCats.slice(0,2).map((cat, idx) => <div key={cat.id} className="flex items-center justify-between rounded-3xl bg-white p-5 shadow"><div><h2 className="text-xl font-black">{cat.name}</h2><p className="text-slate-600">{cat.shelter.name}</p></div><span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-orange-700">{idx ? "APPROVED" : "PENDING"}</span></div>)}</div></section></AppShell>;
}
