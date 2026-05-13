import AppShell from "@/components/AppShell";
import CatCard from "@/components/CatCard";
import { demoCats } from "@/lib/demoData";

export default function MatchesPage() {
  return <AppShell><section className="mx-auto max-w-7xl px-4 py-10"><h1 className="text-4xl font-black">Matches & interests</h1><p className="mt-2 text-slate-600">Cats you swiped right on are ready for the next step.</p><div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{demoCats.map((cat) => <CatCard key={cat.id} cat={cat} />)}</div></section></AppShell>;
}
