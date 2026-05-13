import Link from "next/link";
import { notFound } from "next/navigation";
import AppShell from "@/components/AppShell";
import AdoptionRequestForm from "@/components/AdoptionRequestForm";
import { getPrisma } from "@/lib/prisma";
import { requireRole } from "@/lib/roles";

export default async function CatProfile({ params }) {
  const user = await requireRole(["ADOPTER", "SHELTER", "ADMIN"]);
  const { id } = await params;
  const prisma = await getPrisma();
  const cat = await prisma.cat.findUnique({ where: { id }, include: { photos: { orderBy: { order: "asc" } }, shelter: true } });
  if (!cat) notFound();
  const backHref = user.role === "SHELTER" || user.role === "ADMIN" ? "/shelter/cats" : "/discover";
  return <AppShell><section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr]"><div className="grid gap-4">{cat.photos.length ? cat.photos.map((photo) => <img suppressHydrationWarning key={photo.url} src={photo.url} alt={cat.name} className="h-[34rem] w-full rounded-[2rem] object-cover shadow-xl" />) : <img suppressHydrationWarning src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=80" alt={cat.name} className="h-[34rem] w-full rounded-[2rem] object-cover shadow-xl" />}</div><div className="rounded-[2rem] bg-white p-8 shadow-xl"><p className="font-bold uppercase tracking-[0.25em] text-orange-500">{cat.shelter.name}</p><h1 className="mt-3 text-5xl font-black">{cat.name}</h1><p className="mt-3 text-lg font-semibold text-slate-600">{cat.breed} • {cat.ageMonths} months • {cat.location}</p><p className="mt-6 text-slate-700">{cat.description}</p><div className="mt-6 grid grid-cols-2 gap-3 text-sm font-bold">{["vaccinated","sterilized","compatibleWithChildren","compatibleWithCats","compatibleWithDogs"].map((key) => <span key={key} className="rounded-2xl bg-orange-50 p-3">{key}: {cat[key] ? "Yes" : "No"}</span>)}</div>{user.role === "ADOPTER" && <AdoptionRequestForm catId={cat.id} catName={cat.name} />}<Link href={backHref} className="mt-4 inline-block font-bold text-orange-600">← Back</Link></div></section></AppShell>;
}
