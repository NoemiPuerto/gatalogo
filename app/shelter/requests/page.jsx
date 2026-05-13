import AppShell from "@/components/AppShell";
import RequestCard from "@/components/RequestCard";
import { getPrisma } from "@/lib/prisma";
import { requireRole } from "@/lib/roles";

export default async function ShelterRequests(){
  const user = await requireRole(["SHELTER", "ADMIN"]);
  const prisma = await getPrisma();
  const requests = await prisma.adoptionRequest.findMany({
    where: user.role === "ADMIN" ? {} : { shelterId: user.shelter?.id },
    include: { user: { select: { id: true, name: true, email: true, phone: true, avatar: true, bio: true } }, cat: { include: { photos: { orderBy: { order: "asc" } } } } },
    orderBy: { createdAt: "desc" },
  });
  return <AppShell><section className="mx-auto max-w-6xl px-4 py-10"><h1 className="text-4xl font-black">Adoption Requests</h1><p className="mt-2 text-slate-600">Review adopter messages for your shelter cats.</p><div className="mt-8 space-y-4">{requests.length ? requests.map((request) => <RequestCard key={request.id} request={request} />) : <div className="rounded-[2rem] bg-white p-10 text-center shadow-xl"><h2 className="text-2xl font-black">No requests yet</h2><p className="mt-2 text-slate-600">New adoption requests will appear here.</p></div>}</div></section></AppShell>;
}
