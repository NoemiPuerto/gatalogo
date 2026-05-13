import { requireUser } from "@/lib/auth";
import { body, json } from "@/lib/http";
import { getPrisma } from "@/lib/prisma";

export async function POST(request) {
  const prisma = await getPrisma();
  const user = await requireUser();
  if (user.role !== "ADOPTER") return json({ error: "Adopter account required" }, 403);
  const data = await body(request);
  const cat = await prisma.cat.findUnique({ where: { id: data.catId }, include: { shelter: true } });
  if (!cat) return json({ error: "Cat not found" }, 404);
  const adoptionRequest = await prisma.adoptionRequest.upsert({
    where: { userId_catId: { userId: user.id, catId: cat.id } },
    create: { userId: user.id, catId: cat.id, shelterId: cat.shelterId, message: data.message || "I am interested in adopting this cat." },
    update: { message: data.message || undefined, status: "PENDING" },
  });
  await prisma.notification.create({ data: { userId: cat.shelter.userId, title: `New adoption request for ${cat.name}`, message: `${user.name} wants to adopt ${cat.name}.` } });
  return json({ adoptionRequest }, 201);
}
