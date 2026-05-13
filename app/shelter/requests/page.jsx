import Link from "next/link";
import AppShell from "@/components/AppShell";
import RequestCard from "@/components/RequestCard";
import { getPrisma } from "@/lib/prisma";
import { requireRole } from "@/lib/roles";

const requestFilters = [
  { label: "All Requests", value: "all" },
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
];

export default async function ShelterRequests({ searchParams }){
  const user = await requireRole(["SHELTER", "ADMIN"]);
  const prisma = await getPrisma();
  const params = await searchParams;
  const selectedStatus = requestFilters.some((filter) => filter.value === params?.status) ? params.status : "all";
  const requests = await prisma.adoptionRequest.findMany({
    where: {
      ...(user.role === "ADMIN" ? {} : { shelterId: user.shelter?.id }),
      ...(selectedStatus === "all" ? {} : { status: selectedStatus }),
    },
    include: { user: { select: { id: true, name: true, email: true, phone: true, avatar: true, bio: true, location: true } }, cat: { include: { photos: { orderBy: { order: "asc" } } } } },
    orderBy: { createdAt: "desc" },
  });
  return <AppShell><section className="mx-auto max-w-6xl px-4 py-10"><h1 className="text-4xl font-black">Adoption Requests</h1><p className="mt-2 text-slate-600">Review adopter messages for your shelter cats.</p><div className="mt-6 flex flex-wrap gap-2">{requestFilters.map((filter) => <Link key={filter.value} href={filter.value === "all" ? "/shelter/requests" : `/shelter/requests?status=${filter.value}`} className={`rounded-full px-4 py-2 font-bold ${selectedStatus === filter.value ? "bg-orange-500 text-white" : "bg-white text-slate-700 shadow"}`}>{filter.label}</Link>)}</div><div className="mt-8 space-y-4">{requests.length ? requests.map((request) => <RequestCard key={request.id} request={request} />) : <div className="rounded-[2rem] bg-white p-10 text-center shadow-xl"><h2 className="text-2xl font-black">No requests yet</h2><p className="mt-2 text-slate-600">New adoption requests will appear here.</p></div>}</div></section></AppShell>;
}
