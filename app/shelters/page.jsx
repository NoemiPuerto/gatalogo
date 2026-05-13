import Link from "next/link";
import { ArrowRight, ExternalLink, Gift, Globe, Instagram, MapPin } from "lucide-react";
import AppShell from "@/components/AppShell";
import { getPrisma } from "@/lib/prisma";

const fallbackShelters = [
  { id: "casa-bigotes", name: "Casa Bigotes", city: "Mérida", description: "A community shelter helping rescued cats recover, socialize, and find calm forever homes.", logo: null, website: "https://example.com", contactPhone: null },
  { id: "amor-felino", name: "Amor Felino", city: "Ciudad de México", description: "Volunteer-led rescue focused on responsible adoption and education for first-time cat families.", logo: null, website: "https://example.com", contactPhone: null },
  { id: "huellitas-del-sol", name: "Huellitas del Sol", city: "Guadalajara", description: "A warm network of foster homes supporting kittens, adult cats, and special-care rescues.", logo: null, website: "https://example.com", contactPhone: null },
];

async function getShelters() {
  try {
    const prisma = getPrisma();
    const shelters = await prisma.shelter.findMany({
      orderBy: { createdAt: "desc" },
      include: { cats: { where: { adoptionStatus: "AVAILABLE" }, select: { id: true } } },
    });
    return shelters.length ? shelters : fallbackShelters.map((s) => ({ ...s, cats: [] }));
  } catch {
    return fallbackShelters.map((s) => ({ ...s, cats: [] }));
  }
}

export const metadata = { title: "Shelters | Gatalogo" };

export default async function SheltersPage() {
  const shelters = await getShelters();

  return (
    <AppShell>
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-black uppercase tracking-[0.3em] text-orange-500">Shelters</p>
              <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight text-slate-950 md:text-7xl">Explore shelters helping cats across Mexico.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Discover shelter profiles, available cats, social channels, websites, and donation opportunities.</p>
            </div>
            <Link href="/register?role=shelter" className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 font-black text-white transition hover:-translate-y-0.5 hover:bg-orange-600">Register a shelter <ArrowRight className="h-5 w-5" /></Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shelters.map((shelter) => (
              <article key={shelter.id} className="group overflow-hidden rounded-[2.25rem] bg-white shadow-sm ring-1 ring-orange-100 transition hover:-translate-y-2 hover:shadow-xl">
                <div className="relative h-40 bg-gradient-to-br from-orange-100 via-rose-100 to-white">
                  <div className="absolute left-6 top-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-3xl font-black text-orange-600 shadow-lg">
                    {shelter.logo ? <img src={shelter.logo} alt={`${shelter.name} logo`} className="h-full w-full rounded-3xl object-cover" /> : shelter.name.charAt(0)}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div><h2 className="text-2xl font-black text-slate-950">{shelter.name}</h2><p className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-slate-500"><MapPin className="h-4 w-4" /> {shelter.city || "Mexico"}</p></div>
                    <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-black text-orange-700">{shelter.cats?.length || 0} cats</span>
                  </div>
                  <p className="mt-4 line-clamp-3 leading-7 text-slate-600">{shelter.description || "A trusted shelter using Gatalogo to help rescued cats meet responsible adopters."}</p>
                  <div className="mt-5 flex flex-wrap gap-2 text-sm font-bold">
                    <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-2 text-orange-700"><Instagram className="h-4 w-4" /> Socials</span>
                    {shelter.website && <a href={shelter.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-2 text-slate-700"><Globe className="h-4 w-4" /> Website</a>}
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-2 text-rose-700"><Gift className="h-4 w-4" /> Donate</span>
                  </div>
                  <Link href={`/shelters/${shelter.id}`} className="mt-6 inline-flex items-center gap-2 font-black text-orange-600 transition group-hover:gap-3">View shelter profile <ExternalLink className="h-4 w-4" /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
