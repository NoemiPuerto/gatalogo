import CatCard from "@/components/CatCard";

export default function CatList({ cats, emptyTitle = "No cats yet", emptyText = "Check back soon.", renderActions }) {
  if (!cats?.length) {
    return <div className="rounded-[2rem] bg-white p-10 text-center shadow-xl"><h2 className="text-2xl font-black">{emptyTitle}</h2><p className="mt-2 text-slate-600">{emptyText}</p></div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cats.map((cat) => <CatCard key={cat.id} cat={cat} actions={renderActions?.(cat)} />)}
    </div>
  );
}
