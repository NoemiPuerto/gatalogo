import AppShell from "@/components/AppShell";
import LogoutButton from "@/components/LogoutButton";
import ProfileForm from "@/components/ProfileForm";
import { requireRole } from "@/lib/roles";

export default async function ShelterProfile(){
  const user = await requireRole(["SHELTER", "ADMIN"]);
  return <AppShell><section className="mx-auto max-w-3xl px-4 py-10"><h1 className="text-4xl font-black">Shelter profile</h1><p className="mt-2 text-slate-600">Edit public shelter information and contact details.</p><ProfileForm user={user} shelterMode /><div className="mt-8 rounded-[2rem] bg-white p-8 shadow-xl"><h2 className="text-2xl font-black">Session</h2><p className="mt-2 text-slate-600">Sign out of this shelter account and return to the home page.</p><LogoutButton className="mt-5" /></div></section></AppShell>;
}
