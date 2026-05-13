"use client";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import AdoptionRequestButton from "@/components/AdoptionRequestButton";
import CatCard from "@/components/CatCard";
import { MATCH_STATUS_META, getMatchStatus } from "@/lib/adopterMatchStatus";

const FILTERS = [
  ["ALL", "All"],
  ["AVAILABLE", "Available"],
  ["PENDING", "Pending Request"],
  ["APPROVED", "Accepted"],
  ["REJECTED", "Rejected"],
];

export default function MatchList({ initialMatches }) {
  const [matches, setMatches] = useState(initialMatches);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [removingId, setRemovingId] = useState(null);

  const counts = useMemo(() => {
    const next = { ALL: matches.length, AVAILABLE: 0, PENDING: 0, APPROVED: 0, REJECTED: 0 };
    for (const match of matches) next[match.workflowStatus] += 1;
    return next;
  }, [matches]);

  const visibleMatches = activeFilter === "ALL" ? matches : matches.filter((match) => match.workflowStatus === activeFilter);

  async function removeInterest(match) {
    setRemovingId(match.cat.id);
    const response = await fetch("/api/swipe/matches", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ catId: match.cat.id }),
    });
    setRemovingId(null);
    if (!response.ok) return toast.error("Could not remove this interest");
    setMatches((current) => current.filter((item) => item.cat.id !== match.cat.id));
    toast.success(`${match.cat.name} removed from your matches`);
  }

  function updateRequest(catId, adoptionRequest) {
    setMatches((current) => current.map((match) => {
      if (match.cat.id !== catId) return match;
      const workflowStatus = getMatchStatus(match.cat, adoptionRequest);
      return { ...match, adoptionRequest, workflowStatus };
    }));
  }

  if (!matches.length) {
    return <div className="rounded-[2rem] bg-white p-10 text-center shadow-xl"><h2 className="text-2xl font-black">No matches yet</h2><p className="mt-2 text-slate-600">Like cats in Discover to create your match history.</p></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map(([value, label]) => {
          const active = activeFilter === value;
          return (
            <button key={value} onClick={() => setActiveFilter(value)} className={`rounded-full px-4 py-2 text-sm font-black transition ${active ? "bg-orange-500 text-white shadow-lg shadow-orange-100" : "bg-white text-slate-600 ring-1 ring-orange-100 hover:bg-orange-50"}`}>
              {label} <span className={active ? "text-orange-100" : "text-slate-400"}>({counts[value]})</span>
            </button>
          );
        })}
      </div>

      {visibleMatches.length ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleMatches.map((match) => {
            const meta = MATCH_STATUS_META[match.workflowStatus];
            return (
              <CatCard
                key={match.cat.id}
                cat={match.cat}
                statusBadge={<span className={`rounded-full px-3 py-1 text-xs font-bold ${meta.badgeClass}`}>{meta.label}</span>}
                statusMessage={<p className={`rounded-2xl p-4 text-sm font-semibold ${meta.messageClass}`}>{meta.message}</p>}
                actions={(
                  <>
                    {match.workflowStatus === "AVAILABLE" && <AdoptionRequestButton catId={match.cat.id} catName={match.cat.name} onRequested={(request) => updateRequest(match.cat.id, request)} />}
                    <button onClick={() => removeInterest(match)} disabled={removingId === match.cat.id} className="rounded-full bg-slate-100 px-5 py-3 font-bold text-slate-700 hover:bg-slate-200 disabled:opacity-60">
                      {removingId === match.cat.id ? "Removing..." : "Remove interest"}
                    </button>
                  </>
                )}
              />
            );
          })}
        </div>
      ) : (
        <div className="rounded-[2rem] bg-white p-10 text-center shadow-xl"><h2 className="text-2xl font-black">No {FILTERS.find(([value]) => value === activeFilter)?.[1].toLowerCase()} matches</h2><p className="mt-2 text-slate-600">Try another status filter to review your matched cats.</p></div>
      )}
    </div>
  );
}
