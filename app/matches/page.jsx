import AppShell from "@/components/AppShell";
import AdoptionRequestButton from "@/components/AdoptionRequestButton";
import CatList from "@/components/CatList";
import { getPrisma } from "@/lib/prisma";
import { requireRole } from "@/lib/roles";

export default async function MatchesPage() {
  const user = await requireRole(["ADOPTER"]);
  const prisma = await getPrisma();
  const matches = await prisma.swipeInterest.findMany({ where: { userId: user.id, action: "LIKE" }, include: { cat: { include: { photos: { orderBy: { order: "asc" } }, shelter: true } } }, orderBy: { updatedAt: "desc" } });
  const cats = matches.map((match) => match.cat);
  return <AppShell><section className="mx-auto max-w-7xl px-4 py-10"><h1 className="text-4xl font-black">Matches & interests</h1><p className="mt-2 text-slate-600">Cats you swiped right on are ready for the next step.</p><div className="mt-8"><CatList cats={cats} emptyTitle="No matches yet" emptyText="Like cats in Discover to create your match history." renderActions={(cat) => <AdoptionRequestButton catId={cat.id} catName={cat.name} />} /></div></section></AppShell>;
}
