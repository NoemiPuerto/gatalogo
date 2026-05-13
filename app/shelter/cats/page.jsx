import Link from "next/link";
import AppShell from "@/components/AppShell";
import CatList from "@/components/CatList";
import ShelterCatActions from "@/components/ShelterCatActions";
import { getPrisma } from "@/lib/prisma";
import { requireRole } from "@/lib/roles";

export default async function ShelterCats(){
  const user = await requireRole(["SHELTER", "ADMIN"]);
  const prisma = await getPrisma();
  const cats = await prisma.cat.findMany({
    where: user.role === "ADMIN" ? {} : { shelterId: user.shelter?.id },
    include: { photos: { orderBy: { order: "asc" } }, shelter: true },
    orderBy: { createdAt: "desc" },
  });
  return <AppShell><section className="mx-auto max-w-7xl px-4 py-10"><div className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-4xl font-black">My Cats</h1><p className="mt-2 text-slate-600">Manage every cat uploaded by your shelter.</p></div><Link href="/shelter/cats/new" className="rounded-full bg-orange-500 px-5 py-3 font-bold text-white">New cat</Link></div><div className="mt-8"><CatList cats={cats} emptyTitle="No cats uploaded" emptyText="Create your first adoptable cat profile." renderActions={(cat) => <ShelterCatActions catId={cat.id} />} /></div></section></AppShell>;
}
