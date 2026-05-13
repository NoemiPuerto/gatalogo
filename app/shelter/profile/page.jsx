import AppShell from "@/components/AppShell";
import LogoutButton from "@/components/LogoutButton";
import ProfileForm from "@/components/ProfileForm";
import { requireRole } from "@/lib/roles";

export default async function ShelterProfile(){
  const user = await requireRole(["SHELTER"]);
  const shelterName = user.shelter?.name || user.name || "Your shelter";

  return (
    <AppShell>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-5 rounded-[2rem] bg-white/80 p-6 shadow-sm ring-1 ring-orange-100 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-bold uppercase tracking-[0.3em] text-orange-500">Shelter settings</p>
            <h1 className="mt-2 text-4xl font-black md:text-5xl">{shelterName}</h1>
            <p className="mt-2 max-w-2xl text-slate-600">Manage your public shelter identity, contact information, adopter-facing details, and session access.</p>
          </div>
          <LogoutButton className="self-start md:self-center" />
        </div>
        <ProfileForm user={user} shelterMode />
      </section>
    </AppShell>
  );
}
