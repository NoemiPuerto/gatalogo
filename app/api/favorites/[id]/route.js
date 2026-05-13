import { requireUser } from "@/lib/auth";
import { json } from "@/lib/http";
import { getPrisma } from "@/lib/prisma";

export async function DELETE(_request, { params }) {
  const prisma = await getPrisma();
  const user = await requireUser();
  const { id } = await params;
  await prisma.favorite.deleteMany({ where: { id, userId: user.id } });
  return json({ ok: true });
}
