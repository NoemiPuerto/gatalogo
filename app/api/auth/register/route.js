import { createSession, hashPassword, publicUser } from "@/lib/auth";
import { body, json } from "@/lib/http";
import { getPrisma } from "@/lib/prisma";

export async function POST(request) {
  const prisma = await getPrisma();
  const data = await body(request);
  if (!data.name || !data.email || !data.password) return json({ error: "Name, email and password are required" }, 400);
  const role = data.role === "SHELTER" ? "SHELTER" : data.role === "ADMIN" ? "ADMIN" : "ADOPTER";
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email.toLowerCase(),
      passwordHash: hashPassword(data.password),
      phone: data.phone || null,
      bio: data.bio || null,
      avatar: data.avatar || null,
      role,
      shelter: role === "SHELTER" ? { create: {
        name: data.shelterName || `${data.name}'s Shelter`,
        description: data.shelterDescription || "New rescue shelter",
        address: data.address || "",
        city: data.city || "",
        country: data.country || "",
        logo: data.logo || null,
        contactPhone: data.contactPhone || data.phone || null,
      }} : undefined,
    },
    include: { shelter: true },
  });
  await createSession(user.id);
  return json({ user: publicUser(user) }, 201);
}
