import AppShell from "@/components/AppShell";
import CatList from "@/components/CatList";
import FavoriteActions from "@/components/FavoriteActions";
import { getPrisma } from "@/lib/prisma";
import { requireRole } from "@/lib/roles";

export default async function FavoritesPage() {
  const user = await requireRole(["ADOPTER"]);
  const prisma = await getPrisma();
  const favorites = await prisma.favorite.findMany({ where: { userId: user.id }, include: { cat: { include: { photos: { orderBy: { order: "asc" } }, shelter: true } } }, orderBy: { createdAt: "desc" } });
  const cats = favorites.map((favorite) => ({ ...favorite.cat, favoriteId: favorite.id }));
  return <AppShell><section className="mx-auto max-w-7xl px-4 py-10"><h1 className="text-4xl font-black">Favorite cats</h1><p className="mt-2 text-slate-600">Saved profiles you can revisit before applying.</p><div className="mt-8"><CatList cats={cats} emptyTitle="No favorites yet" emptyText="Save cats from discovery to build your shortlist." renderActions={(cat) => <FavoriteActions favoriteId={cat.favoriteId} />} /></div></section></AppShell>;
}
