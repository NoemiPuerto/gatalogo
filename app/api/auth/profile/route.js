import { publicUser, requireUser } from "@/lib/auth";
import { body, json } from "@/lib/http";
import { getPrisma } from "@/lib/prisma";

export async function PUT(request) {
  const prisma = await getPrisma();
  const user = await requireUser();
  const data = await body(request);
  const updated = await prisma.user.update({
    where: { id: user.id },
    data: { name: data.name, avatar: data.avatar, phone: data.phone, bio: data.bio },
    include: { shelter: true },
  });
  if (user.role === "SHELTER" && data.shelter) {
    await prisma.shelter.upsert({
      where: { userId: user.id },
      create: { userId: user.id, name: data.shelter.name, description: data.shelter.description || "", address: data.shelter.address || "", city: data.shelter.city || "", country: data.shelter.country || "", logo: data.shelter.logo || null, contactPhone: data.shelter.contactPhone || null },
      update: data.shelter,
    });
  }
  return json({ user: publicUser(updated) });
}
