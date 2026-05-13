import AppShell from "@/components/AppShell";
import MatchList from "@/components/MatchList";
import { getMatchStatus } from "@/lib/adopterMatchStatus";
import { getPrisma } from "@/lib/prisma";
import { requireRole } from "@/lib/roles";

export default async function MatchesPage() {
  const user = await requireRole(["ADOPTER"]);
  const prisma = await getPrisma();
  const matches = await prisma.swipeInterest.findMany({
    where: { userId: user.id, action: "LIKE" },
    include: {
      cat: {
        include: {
          photos: { orderBy: { order: "asc" } },
          shelter: true,
          adoptionRequests: { where: { userId: user.id }, orderBy: { updatedAt: "desc" }, take: 1 },
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });
  const matchCards = matches.map((match) => {
    const { adoptionRequests, ...cat } = match.cat;
    const adoptionRequest = adoptionRequests[0] || null;
    return {
      cat,
      adoptionRequest,
      workflowStatus: getMatchStatus(cat, adoptionRequest),
    };
  });
  const serializedMatches = JSON.parse(JSON.stringify(matchCards));

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-4xl font-black">Matches & interests</h1>
        <p className="mt-2 text-slate-600">Cats you swiped right on are organized by adoption request status.</p>
        <div className="mt-8"><MatchList initialMatches={serializedMatches} /></div>
      </section>
    </AppShell>
  );
}
