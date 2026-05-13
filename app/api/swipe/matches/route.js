import { requireUser } from "@/lib/auth";
import { json } from "@/lib/http";
import { getPrisma } from "@/lib/prisma";

export async function GET() {
  const prisma = await getPrisma();
  const user = await requireUser();
  const matches = await prisma.swipeInterest.findMany({ where: { userId: user.id, action: "LIKE" }, include: { cat: { include: { photos: { orderBy: { order: "asc" } }, shelter: true } } }, orderBy: { updatedAt: "desc" } });
  return json({ matches });
}
