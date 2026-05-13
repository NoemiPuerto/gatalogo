import AppShell from "@/components/AppShell";
import SwipeDeck from "@/components/SwipeDeck";
import { getPrisma } from "@/lib/prisma";
import { requireRole } from "@/lib/roles";

export default async function DiscoverPage() {
  const user = await requireRole(["ADOPTER"]);
  const prisma = await getPrisma();
  const swiped = await prisma.swipeInterest.findMany({ where: { userId: user.id }, select: { catId: true } });
  const cats = await prisma.cat.findMany({
    where: { adoptionStatus: "AVAILABLE", id: { notIn: swiped.map((item) => item.catId) } },
    include: { photos: { orderBy: { order: "asc" } }, shelter: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  return <AppShell><div className="px-4 py-10"><SwipeDeck cats={cats} /></div></AppShell>;
}
