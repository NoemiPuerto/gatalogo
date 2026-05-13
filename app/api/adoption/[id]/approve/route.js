import { requireUser } from "@/lib/auth";
import { json } from "@/lib/http";
import { getPrisma } from "@/lib/prisma";

export async function PATCH(_request, { params }) {
  const prisma = await getPrisma();
  const user = await requireUser();
  const { id } = await params;
  const existing = await prisma.adoptionRequest.findUnique({ where: { id }, include: { shelter: true, cat: true } });
  if (!existing) return json({ error: "Application not found" }, 404);
  if (user.role !== "ADMIN" && existing.shelter.userId !== user.id) return json({ error: "Not allowed" }, 403);
  const adoptionRequest = await prisma.adoptionRequest.update({ where: { id }, data: { status: "APPROVED" } });
  await prisma.notification.create({ data: { userId: existing.userId, title: "Adoption request approved", message: `Your request for ${existing.cat.name} was approved.` } });
  return json({ adoptionRequest });
}
