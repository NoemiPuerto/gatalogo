import { requireUser } from "@/lib/auth";
import { json } from "@/lib/http";
import { getPrisma } from "@/lib/prisma";

export async function GET() {
  const prisma = await getPrisma();
  const user = await requireUser();
  if (user.role !== "ADOPTER") return json({ error: "Adopter account required" }, 403);
  const requests = await prisma.adoptionRequest.findMany({ where: { userId: user.id }, include: { cat: { include: { photos: { orderBy: { order: "asc" } } } }, shelter: true }, orderBy: { updatedAt: "desc" } });
  return json({ requests });
}
