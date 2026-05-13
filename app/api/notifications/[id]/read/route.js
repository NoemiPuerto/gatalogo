import { requireUser } from "@/lib/auth";
import { json } from "@/lib/http";
import { getPrisma } from "@/lib/prisma";

export async function PATCH(_request, { params }) {
  const prisma = await getPrisma();
  const user = await requireUser();
  const { id } = await params;
  const notification = await prisma.notification.updateMany({ where: { id, userId: user.id }, data: { read: true } });
  return json({ notification });
}
