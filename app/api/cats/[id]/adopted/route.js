import { requireUser } from "@/lib/auth";
import { json } from "@/lib/http";
import { getPrisma } from "@/lib/prisma";

export async function PATCH(_request, { params }) {
  const prisma = await getPrisma();
  const user = await requireUser();
  const { id } = await params;
  const existing = await prisma.cat.findUnique({ where: { id }, include: { shelter: true } });
  if (!existing) return json({ error: "Cat not found" }, 404);
  if (user.role !== "ADMIN" && existing.shelter.userId !== user.id) return json({ error: "Not allowed" }, 403);
  const cat = await prisma.cat.update({ where: { id }, data: { adoptionStatus: "ADOPTED" } });
  return json({ cat });
}
