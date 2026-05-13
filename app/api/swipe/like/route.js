import { requireUser } from "@/lib/auth";
import { body, json } from "@/lib/http";
import { getPrisma } from "@/lib/prisma";

export async function POST(request) {
  const prisma = await getPrisma();
  const user = await requireUser();
  if (user.role !== "ADOPTER") return json({ error: "Adopter account required" }, 403);
  const data = await body(request);
  if (!data.catId) return json({ error: "catId is required" }, 400);
  const swipe = await prisma.swipeInterest.upsert({ where: { userId_catId: { userId: user.id, catId: data.catId } }, create: { userId: user.id, catId: data.catId, action: "LIKE" }, update: { action: "LIKE" } });
  if (data.favorite) await prisma.favorite.upsert({ where: { userId_catId: { userId: user.id, catId: data.catId } }, create: { userId: user.id, catId: data.catId }, update: {} });
  return json({ swipe });
}
