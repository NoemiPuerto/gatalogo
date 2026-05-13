import Link from "next/link";
import { ArrowLeft, ExternalLink, Gift, Globe, Instagram, MapPin, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import AppShell from "@/components/AppShell";
import { getPrisma } from "@/lib/prisma";

const fallbackShelters = [
  { id: "casa-bigotes", name: "Casa Bigotes", city: "Mérida", country: "Mexico", description: "A community shelter helping rescued cats recover, socialize, and find calm forever homes.", logo: null, website: "https://example.com", contactPhone: null, cats: [] },
  { id: "amor-felino", name: "Amor Felino", city: "Ciudad de México", country: "Mexico", description: "Volunteer-led rescue focused on responsible adoption and education for first-time cat families.", logo: null, website: "https://example.com", contactPhone: null, cats: [] },
  { id: "huellitas-del-sol", name: "Huellitas del Sol", city: "Guadalajara", country: "Mexico", description: "A warm network of foster homes supporting kittens, adult cats, and special-care rescues.", logo: null, website: "https://example.com", contactPhone: null, cats: [] },
];

async function getShelter(id) {
  try {
    const prisma = getPrisma();
    return await prisma.shelter.findUnique({
      where: { id },
      include: { cats: { where: { adoptionStatus: "AVAILABLE" }, include: { photos: { orderBy: { order: "asc" }, take: 1 } }, orderBy: { createdAt: "desc" } } },
    });
  } catch {
    return fallbackShelters.find((shelter) => shelter.id === id) || null;
  }
}

export default async function ShelterDetailPage({ params }) {
  const { id } = await params;
  const shelter = await getShelter(id);
  if (!shelter) notFound();

  return (
    <AppShell>
      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <Link href="/shelters" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-bold text-slate-700 shadow-sm ring-1 ring-orange-100 hover:text-orange-600"><ArrowLeft className="h-4 w-4" /> Back to shelters</Link>
          <div className="mt-8 overflow-hidden rounded-[3rem] bg-white shadow-xl ring-1 ring-orange-100">
            <div className="bg-gradient-to-br from-orange-200 via-rose-100 to-white p-8 md:p-12">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="flex flex-col gap-5 md:flex-row md:items-center">
                  <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-white text-5xl font-black text-orange-600 shadow-xl">{shelter.logo ? <img src={shelter.logo} alt={`${shelter.name} logo`} className="h-full w-full rounded-[2rem] object-cover" /> : shelter.name.charAt(0)}</div>
                  <div><p className="font-black uppercase tracking-[0.25em] text-orange-700">Public shelter profile</p><h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">{shelter.name}</h1><p className="mt-3 inline-flex items-center gap-2 font-bold text-slate-600"><MapPin className="h-5 w-5" /> {shelter.city || "Mexico"}{shelter.country ? `, ${shelter.country}` : ""}</p></div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {shelter.website && <a href={shelter.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 font-black text-slate-900 shadow-sm hover:text-orange-600"><Globe className="h-5 w-5" /> Website</a>}
                  <a href={shelter.website || "#"} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-3 font-black text-white shadow-sm hover:bg-orange-600"><Gift className="h-5 w-5" /> Donate</a>
                </div>
              </div>
            </div>
            <div className="grid gap-8 p-8 md:p-12 lg:grid-cols-[0.85fr_1.15fr]">
              <aside className="space-y-4">
                <div className="rounded-[2rem] bg-orange-50 p-6"><h2 className="text-2xl font-black text-slate-950">About the shelter</h2><p className="mt-4 leading-8 text-slate-600">{shelter.description || "This shelter is part of the Gatalogo community and is working to connect rescued cats with responsible adopters."}</p></div>
                <div className="rounded-[2rem] bg-slate-950 p-6 text-white"><h2 className="text-xl font-black">Connect & support</h2><div className="mt-4 grid gap-3 text-sm font-bold text-slate-200"><span className="inline-flex items-center gap-2"><Instagram className="h-4 w-4 text-orange-300" /> Social links coming soon</span>{shelter.contactPhone && <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4 text-orange-300" /> {shelter.contactPhone}</span>}<span className="inline-flex items-center gap-2"><Gift className="h-4 w-4 text-orange-300" /> Donation/support link available on request</span></div></div>
              </aside>
              <div>
                <div className="flex items-end justify-between gap-4"><div><p className="font-black uppercase tracking-[0.25em] text-orange-500">Available cats</p><h2 className="mt-3 text-3xl font-black text-slate-950">Cats currently looking for a home</h2></div><span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-black text-orange-700">{shelter.cats.length} available</span></div>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {shelter.cats.length ? shelter.cats.map((cat) => <Link key={cat.id} href={`/cats/${cat.id}`} className="group overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-orange-100 transition hover:-translate-y-1 hover:shadow-xl"><img src={cat.photos[0]?.url || "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80"} alt={cat.name} className="h-56 w-full object-cover" /><div className="p-5"><h3 className="text-2xl font-black text-slate-950">{cat.name}</h3><p className="mt-1 font-semibold text-slate-500">{cat.breed} • {cat.ageMonths} months</p><p className="mt-3 line-clamp-2 text-slate-600">{cat.description}</p><span className="mt-4 inline-flex items-center gap-2 font-black text-orange-600">View cat <ExternalLink className="h-4 w-4" /></span></div></Link>) : <div className="rounded-[2rem] bg-orange-50 p-8 text-center md:col-span-2"><p className="text-xl font-black text-slate-950">No available cats listed right now.</p><p className="mt-2 text-slate-600">Check back soon or contact the shelter to learn how you can support their mission.</p></div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
