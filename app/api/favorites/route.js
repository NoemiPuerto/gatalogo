import { requireUser } from "@/lib/auth";
import { body, json } from "@/lib/http";
import { getPrisma } from "@/lib/prisma";

export async function GET() {
  const prisma = await getPrisma();
  const user = await requireUser();
  const favorites = await prisma.favorite.findMany({ where: { userId: user.id }, include: { cat: { include: { photos: { orderBy: { order: "asc" } }, shelter: true } } }, orderBy: { createdAt: "desc" } });
  return json({ favorites });
}

export async function POST(request) {
  const prisma = await getPrisma();
  const user = await requireUser();
  const data = await body(request);
  if (!data.catId) return json({ error: "catId is required" }, 400);
  const favorite = await prisma.favorite.upsert({ where: { userId_catId: { userId: user.id, catId: data.catId } }, create: { userId: user.id, catId: data.catId }, update: {} });
  return json({ favorite }, 201);
}
