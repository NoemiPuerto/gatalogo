import { requireUser } from "@/lib/auth";
import { json } from "@/lib/http";
import { getPrisma } from "@/lib/prisma";

const requestStatuses = new Set(["PENDING", "APPROVED", "REJECTED", "CANCELLED"]);

export async function GET(request) {
  const prisma = await getPrisma();
  const user = await requireUser();
  if (user.role !== "SHELTER" && user.role !== "ADMIN") return json({ error: "Shelter account required" }, 403);
  const { searchParams } = new URL(request.url);
  const requestedStatus = searchParams.get("status");
  const status = requestStatuses.has(requestedStatus) ? requestedStatus : undefined;
  const requests = await prisma.adoptionRequest.findMany({ where: { ...(user.role === "ADMIN" ? {} : { shelterId: user.shelter?.id }), status }, include: { user: { select: { id: true, name: true, email: true, phone: true, avatar: true, bio: true, location: true } }, cat: { include: { photos: { orderBy: { order: "asc" } } } } }, orderBy: { createdAt: "desc" } });
  return json({ requests });
}
