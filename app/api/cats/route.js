import { getCurrentUser, requireUser } from "@/lib/auth";
import { body, json, parsePhotos } from "@/lib/http";
import { getPrisma } from "@/lib/prisma";

const include = { photos: { orderBy: { order: "asc" } }, shelter: true };
const adoptionStatuses = new Set(["AVAILABLE", "PENDING", "ADOPTED"]);

export async function GET(request) {
  const prisma = await getPrisma();
  const { searchParams } = new URL(request.url);
  const user = await getCurrentUser();
  const mine = searchParams.get("mine") === "true";
  if (mine && (!user || (user.role !== "SHELTER" && user.role !== "ADMIN"))) return json({ error: "Shelter account required" }, 403);
  const requestedStatus = searchParams.get("status");
  const status = adoptionStatuses.has(requestedStatus) ? requestedStatus : undefined;
  const isShelterListing = mine && user && (user.role === "SHELTER" || user.role === "ADMIN");
  const cats = await prisma.cat.findMany({
    where: {
      adoptionStatus: isShelterListing ? status || undefined : "AVAILABLE",
      shelterId: isShelterListing && user.role !== "ADMIN" ? user.shelter?.id : searchParams.get("shelterId") || undefined,
    },
    include,
    orderBy: { createdAt: "desc" },
  });
  return json({ cats });
}

export async function POST(request) {
  const prisma = await getPrisma();
  const user = await requireUser();
  if (user.role !== "SHELTER" && user.role !== "ADMIN") return json({ error: "Shelter account required" }, 403);
  const data = await body(request);
  const shelterId = user.role === "ADMIN" ? data.shelterId || user.shelter?.id : user.shelter?.id;
  if (!shelterId) return json({ error: "Shelter profile required" }, 400);
  const cat = await prisma.cat.create({
    data: {
      shelterId,
      name: data.name,
      ageMonths: Number(data.ageMonths || 0),
      sex: data.sex || "UNKNOWN",
      breed: data.breed || "Mixed",
      personality: data.personality || "Sweet and curious",
      healthStatus: data.healthStatus || "Healthy",
      vaccinated: Boolean(data.vaccinated),
      sterilized: Boolean(data.sterilized),
      compatibleWithChildren: Boolean(data.compatibleWithChildren),
      compatibleWithCats: Boolean(data.compatibleWithCats),
      compatibleWithDogs: Boolean(data.compatibleWithDogs),
      location: data.location || user.shelter?.city || "",
      description: data.description || "",
      photos: { create: parsePhotos(data.photos) },
    },
    include,
  });
  return json({ cat }, 201);
}
