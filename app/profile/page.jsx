import AppShell from "@/components/AppShell";
import ProfileForm from "@/components/ProfileForm";
import LogoutButton from "@/components/LogoutButton";
import { requireRole } from "@/lib/roles";

export default async function ProfilePage(){
  const user = await requireRole(["ADOPTER", "SHELTER", "ADMIN"]);
  return <AppShell><section className="mx-auto max-w-3xl px-4 py-10"><h1 className="text-4xl font-black">Account profile</h1><p className="mt-2 text-slate-600">Update avatar, bio, phone, location and account details.</p><ProfileForm user={user} /><div className="mt-8 rounded-[2rem] bg-white p-8 shadow-xl"><h2 className="text-2xl font-black">Session</h2><p className="mt-2 text-slate-600">Sign out of this account and return to the home page.</p><LogoutButton className="mt-5" /></div></section></AppShell>;
}
