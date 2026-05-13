import AppShell from "@/components/AppShell";
import ProfileForm from "@/components/ProfileForm";
import { requireRole } from "@/lib/roles";

export default async function ShelterProfile(){
  const user = await requireRole(["SHELTER", "ADMIN"]);
  return <AppShell><section className="mx-auto max-w-3xl px-4 py-10"><h1 className="text-4xl font-black">Shelter profile</h1><p className="mt-2 text-slate-600">Edit public shelter information and contact details.</p><ProfileForm user={user} shelterMode /></section></AppShell>;
}
