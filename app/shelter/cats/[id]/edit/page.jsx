import { notFound, redirect } from "next/navigation";
import AppShell from "@/components/AppShell";
import CatForm from "@/components/CatForm";
import { getPrisma } from "@/lib/prisma";
import { requireRole } from "@/lib/roles";

export default async function EditCat({ params }){
  const user = await requireRole(["SHELTER", "ADMIN"]);
  const { id } = await params;
  const prisma = await getPrisma();
  const cat = await prisma.cat.findUnique({ where: { id }, include: { photos: { orderBy: { order: "asc" } }, shelter: true } });
  if (!cat) notFound();
  if (user.role !== "ADMIN" && cat.shelter.userId !== user.id) redirect("/shelter/cats");
  return <AppShell><section className="mx-auto max-w-4xl px-4 py-10"><h1 className="text-4xl font-black">Edit {cat.name}</h1><p className="mt-2 text-slate-600">Update this cat profile and adoption status.</p><CatForm cat={cat} /></section></AppShell>;
}
