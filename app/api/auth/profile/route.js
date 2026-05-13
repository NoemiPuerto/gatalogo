import { revalidatePath } from "next/cache";
import { publicUser, requireUser } from "@/lib/auth";
import { body, json } from "@/lib/http";
import { getPrisma } from "@/lib/prisma";

function emptyToNull(value) {
  if (value === undefined) return undefined;
  if (value === null) return null;
  const text = String(value).trim();
  return text.length ? text : null;
}

function emptyToString(value) {
  if (value === undefined || value === null) return undefined;
  return String(value).trim();
}

export async function PUT(request) {
  const prisma = await getPrisma();
  const user = await requireUser();
  const data = await body(request);

  const userData = {
    name: emptyToString(data.name),
    avatar: emptyToNull(data.avatar),
    phone: emptyToNull(data.phone),
    bio: emptyToNull(data.bio),
  };

  Object.keys(userData).forEach((key) => userData[key] === undefined && delete userData[key]);

  if (data.shelter) {
    if (user.role !== "SHELTER") return json({ error: "Shelter account required" }, 403);
    const shelter = data.shelter;
    const shelterData = {
      name: emptyToString(shelter.name) || user.shelter?.name || user.name,
      description: emptyToString(shelter.description) || "",
      address: emptyToString(shelter.address) || "",
      city: emptyToString(shelter.city) || "",
      country: emptyToString(shelter.country) || "",
      website: emptyToNull(shelter.website),
      contactPhone: emptyToNull(shelter.contactPhone),
      logo: emptyToNull(shelter.logo),
    };

    await prisma.$transaction([
      prisma.user.update({ where: { id: user.id }, data: { ...userData, name: userData.name || shelterData.name, phone: shelterData.contactPhone ?? userData.phone } }),
      prisma.shelter.upsert({
        where: { userId: user.id },
        create: { userId: user.id, ...shelterData },
        update: shelterData,
      }),
    ]);
  } else {
    await prisma.user.update({ where: { id: user.id }, data: userData });
  }

  revalidatePath("/shelter/profile");
  revalidatePath("/shelter/cats");
  revalidatePath("/shelter/requests");

  const updated = await prisma.user.findUnique({ where: { id: user.id }, include: { shelter: true } });
  return json({ user: publicUser(updated) });
}
