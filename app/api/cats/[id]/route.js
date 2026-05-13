import { requireUser } from "@/lib/auth";
import { body, json, parsePhotos } from "@/lib/http";
import { getPrisma } from "@/lib/prisma";

const include = { photos: { orderBy: { order: "asc" } }, shelter: true };

export async function GET(_request, { params }) {
  const prisma = await getPrisma();
  const { id } = await params;
  const cat = await prisma.cat.findUnique({ where: { id }, include });
  if (!cat) return json({ error: "Cat not found" }, 404);
  return json({ cat });
}

export async function PUT(request, { params }) {
  const prisma = await getPrisma();
  const user = await requireUser();
  const { id } = await params;
  const data = await body(request);
  const existing = await prisma.cat.findUnique({ where: { id }, include: { shelter: true } });
  if (!existing) return json({ error: "Cat not found" }, 404);
  if (user.role !== "ADMIN" && existing.shelter.userId !== user.id) return json({ error: "Not allowed" }, 403);
  const cat = await prisma.cat.update({
    where: { id },
    data: {
      name: data.name, ageMonths: data.ageMonths === undefined ? undefined : Number(data.ageMonths), sex: data.sex,
      breed: data.breed, personality: data.personality, healthStatus: data.healthStatus, vaccinated: data.vaccinated,
      sterilized: data.sterilized, compatibleWithChildren: data.compatibleWithChildren, compatibleWithCats: data.compatibleWithCats,
      compatibleWithDogs: data.compatibleWithDogs, location: data.location, description: data.description, adoptionStatus: data.adoptionStatus,
      photos: Array.isArray(data.photos) ? { deleteMany: {}, create: parsePhotos(data.photos) } : undefined,
    },
    include,
  });
  return json({ cat });
}

export async function DELETE(_request, { params }) {
  const prisma = await getPrisma();
  const user = await requireUser();
  const { id } = await params;
  const existing = await prisma.cat.findUnique({ where: { id }, include: { shelter: true } });
  if (!existing) return json({ error: "Cat not found" }, 404);
  if (user.role !== "ADMIN" && existing.shelter.userId !== user.id) return json({ error: "Not allowed" }, 403);
  await prisma.cat.delete({ where: { id } });
  return json({ ok: true });
}
