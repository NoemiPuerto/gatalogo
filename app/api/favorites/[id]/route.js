import { requireUser } from "@/lib/auth";
import { json } from "@/lib/http";
import { getPrisma } from "@/lib/prisma";

export async function DELETE(_request, { params }) {
  const prisma = await getPrisma();
  const user = await requireUser();
  if (user.role !== "ADOPTER") return json({ error: "Adopter account required" }, 403);
  const { id } = await params;
  await prisma.favorite.deleteMany({ where: { id, userId: user.id } });
  return json({ ok: true });
}
