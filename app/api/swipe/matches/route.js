import { requireUser } from "@/lib/auth";
import { body, json } from "@/lib/http";
import { getPrisma } from "@/lib/prisma";

export async function GET() {
  const prisma = await getPrisma();
  const user = await requireUser();
  if (user.role !== "ADOPTER") return json({ error: "Adopter account required" }, 403);
  const matches = await prisma.swipeInterest.findMany({
    where: { userId: user.id, action: "LIKE" },
    include: {
      cat: {
        include: {
          photos: { orderBy: { order: "asc" } },
          shelter: true,
          adoptionRequests: { where: { userId: user.id }, orderBy: { updatedAt: "desc" }, take: 1 },
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });
  return json({ matches });
}

export async function DELETE(request) {
  const prisma = await getPrisma();
  const user = await requireUser();
  if (user.role !== "ADOPTER") return json({ error: "Adopter account required" }, 403);
  const data = await body(request);
  if (!data.catId) return json({ error: "catId is required" }, 400);
  const existing = await prisma.swipeInterest.findUnique({ where: { userId_catId: { userId: user.id, catId: data.catId } } });
  if (!existing || existing.action !== "LIKE") return json({ error: "Match not found" }, 404);
  await prisma.swipeInterest.delete({ where: { userId_catId: { userId: user.id, catId: data.catId } } });
  return json({ ok: true });
}
