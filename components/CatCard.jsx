import Link from "next/link";

export default function CatCard({ cat, actions, statusBadge, statusMessage }) {
  const photo = cat.photos?.[0]?.url || "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=900&q=80";
  const years = Math.max(1, Math.round((cat.ageMonths || 0) / 12));

  return (
    <article className="overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-orange-100 ring-1 ring-orange-100">
      <img suppressHydrationWarning src={photo} alt={cat.name} className="h-72 w-full object-cover" />
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-2xl font-black">{cat.name}</h3>
            <p className="text-sm font-medium text-slate-500">{cat.breed} • {years} yrs • {cat.location}</p>
          </div>
          {statusBadge || <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">{cat.adoptionStatus}</span>}
        </div>
        {statusMessage}
        <p className="line-clamp-3 text-slate-600">{cat.description}</p>
        <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-600">
          {cat.vaccinated && <span className="rounded-full bg-orange-50 px-3 py-1">Vaccinated</span>}
          {cat.sterilized && <span className="rounded-full bg-orange-50 px-3 py-1">Sterilized</span>}
          {cat.compatibleWithChildren && <span className="rounded-full bg-orange-50 px-3 py-1">Kid friendly</span>}
          {cat.compatibleWithCats && <span className="rounded-full bg-orange-50 px-3 py-1">Cat friendly</span>}
          {cat.compatibleWithDogs && <span className="rounded-full bg-orange-50 px-3 py-1">Dog friendly</span>}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={`/cats/${cat.id}`} className="inline-flex flex-1 justify-center rounded-full bg-orange-500 px-5 py-3 font-bold text-white hover:bg-orange-600">View profile</Link>
          {actions}
        </div>
      </div>
    </article>
  );
}
