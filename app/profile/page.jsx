import AppShell from "@/components/AppShell";
import ProfileForm from "@/components/ProfileForm";
import { requireRole } from "@/lib/roles";

export default async function ProfilePage(){
  const user = await requireRole(["ADOPTER", "SHELTER", "ADMIN"]);
  return <AppShell><section className="mx-auto max-w-3xl px-4 py-10"><h1 className="text-4xl font-black">Account profile</h1><p className="mt-2 text-slate-600">Update avatar, bio, phone, location and account details.</p><ProfileForm user={user} /></section></AppShell>;
}
