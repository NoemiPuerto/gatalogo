import { requireUser } from "@/lib/auth";
import { json } from "@/lib/http";
import { getPrisma } from "@/lib/prisma";

export async function GET() {
  const prisma = await getPrisma();
  const user = await requireUser();
  if (user.role !== "SHELTER" && user.role !== "ADMIN") return json({ error: "Shelter account required" }, 403);
  const requests = await prisma.adoptionRequest.findMany({ where: user.role === "ADMIN" ? {} : { shelterId: user.shelter?.id }, include: { user: { select: { id: true, name: true, email: true, phone: true, avatar: true, bio: true } }, cat: { include: { photos: { orderBy: { order: "asc" } } } } }, orderBy: { createdAt: "desc" } });
  return json({ requests });
}
