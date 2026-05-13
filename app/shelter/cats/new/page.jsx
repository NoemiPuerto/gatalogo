import AppShell from "@/components/AppShell";
import CatForm from "@/components/CatForm";
import { requireRole } from "@/lib/roles";

export default async function NewCat(){
  await requireRole(["SHELTER", "ADMIN"]);
  return <AppShell><section className="mx-auto max-w-4xl px-4 py-10"><h1 className="text-4xl font-black">Create cat profile</h1><p className="mt-2 text-slate-600">Register a cat with health, compatibility, location and image details.</p><CatForm /></section></AppShell>;
}
