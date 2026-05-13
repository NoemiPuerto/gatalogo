"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function displayLocation(shelter) {
  return [shelter?.city, shelter?.country].filter(Boolean).join(", ") || "Location not set";
}

export default function ProfileForm({ user, shelterMode = false }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);
  const shelter = currentUser?.shelter || {};
  const initials = useMemo(() => (shelter.name || currentUser?.name || "G").slice(0, 2).toUpperCase(), [currentUser?.name, shelter.name]);

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    const form = new FormData(event.currentTarget);
    const values = Object.fromEntries(form.entries());
    const payload = shelterMode ? {
      name: values.shelterName || shelter.name || currentUser.name,
      avatar: values.logo || currentUser.avatar,
      phone: values.contactPhone,
      bio: currentUser.bio,
      shelter: {
        name: values.shelterName,
        description: values.description,
        address: values.address,
        city: values.city,
        country: values.country,
        website: values.website,
        contactPhone: values.contactPhone,
        logo: values.logo,
      },
    } : values;
    const response = await fetch("/api/auth/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setSaving(false);
    if (!response.ok) return toast.error("Could not save profile");
    const data = await response.json();
    setCurrentUser(data.user);
    toast.success("Profile saved");
    router.refresh();
  }

  if (shelterMode) {
    return (
      <div className="mt-8 overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-orange-100 ring-1 ring-orange-100">
        <div className="relative bg-gradient-to-br from-orange-500 via-orange-400 to-amber-300 px-6 py-10 text-white md:px-10">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_25%),radial-gradient(circle_at_80%_30%,white_0,transparent_18%)]" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="flex items-center gap-5">
              {shelter.logo ? <img suppressHydrationWarning src={shelter.logo} alt={shelter.name || "Shelter logo"} className="h-24 w-24 rounded-3xl border-4 border-white/70 object-cover shadow-xl" /> : <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white/70 bg-white/25 text-3xl font-black shadow-xl">{initials}</div>}
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/80">Shelter profile</p>
                <h2 className="mt-2 text-4xl font-black">{shelter.name || currentUser?.name || "Your shelter"}</h2>
                <p className="mt-2 font-semibold text-white/85">{displayLocation(shelter)}</p>
              </div>
            </div>
            <span className="w-fit rounded-full bg-white/20 px-4 py-2 text-sm font-black uppercase tracking-wide text-white ring-1 ring-white/40">{shelter.verificationStatus || "PENDING"}</span>
          </div>
        </div>

        <form onSubmit={submit} className="grid gap-8 p-6 md:p-10">
          <section>
            <div className="flex items-center justify-between gap-4 border-b border-orange-100 pb-4">
              <div><h3 className="text-2xl font-black">Public identity</h3><p className="mt-1 text-sm text-slate-500">This is what adopters see across Gatalogo.</p></div>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">Shelter name<input name="shelterName" required className="rounded-2xl border border-slate-200 p-3 font-medium" placeholder="Happy Paws Shelter" defaultValue={shelter.name || ""} /></label>
              <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">Logo URL<input name="logo" className="rounded-2xl border border-slate-200 p-3 font-medium" placeholder="https://..." defaultValue={shelter.logo || currentUser.avatar || ""} /></label>
              <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">Description<textarea name="description" className="h-32 rounded-2xl border border-slate-200 p-3 font-medium" placeholder="Share your mission, adoption process, and what makes your rescue special." defaultValue={shelter.description || ""} /></label>
            </div>
          </section>

          <section>
            <div className="border-b border-orange-100 pb-4"><h3 className="text-2xl font-black">Contact & location</h3><p className="mt-1 text-sm text-slate-500">Keep contact details accurate for adoption follow-ups.</p></div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">Address<input name="address" className="rounded-2xl border border-slate-200 p-3 font-medium" placeholder="Street address" defaultValue={shelter.address || ""} /></label>
              <label className="grid gap-2 text-sm font-bold text-slate-700">City<input name="city" className="rounded-2xl border border-slate-200 p-3 font-medium" placeholder="City" defaultValue={shelter.city || ""} /></label>
              <label className="grid gap-2 text-sm font-bold text-slate-700">Country<input name="country" className="rounded-2xl border border-slate-200 p-3 font-medium" placeholder="Country" defaultValue={shelter.country || ""} /></label>
              <label className="grid gap-2 text-sm font-bold text-slate-700">Website<input name="website" className="rounded-2xl border border-slate-200 p-3 font-medium" placeholder="https://example.org" defaultValue={shelter.website || ""} /></label>
              <label className="grid gap-2 text-sm font-bold text-slate-700">Contact phone<input name="contactPhone" className="rounded-2xl border border-slate-200 p-3 font-medium" placeholder="(555) 123-4567" defaultValue={shelter.contactPhone || currentUser.phone || ""} /></label>
            </div>
          </section>

          <div className="flex flex-col-reverse gap-3 border-t border-orange-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-slate-500">Saved changes update the header and remain after refresh.</p>
            <button disabled={saving} className="rounded-full bg-orange-500 px-6 py-3 font-black text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 disabled:opacity-60">{saving ? "Saving shelter..." : "Save shelter profile"}</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-8 grid gap-4 rounded-[2rem] bg-white p-8 shadow-xl">
      <input name="name" className="rounded-2xl border p-3" placeholder="Name" defaultValue={currentUser?.name || ""} />
      <input name="avatar" className="rounded-2xl border p-3" placeholder="Avatar URL" defaultValue={currentUser?.avatar || ""} />
      <textarea name="bio" className="h-32 rounded-2xl border p-3" placeholder="Tell shelters about your home, schedule and adoption preferences." defaultValue={currentUser?.bio || ""} />
      <input name="phone" className="rounded-2xl border p-3" placeholder="Phone" defaultValue={currentUser?.phone || ""} />
      <input name="location" className="rounded-2xl border p-3" placeholder="Location" defaultValue={currentUser?.location || ""} />
      <button disabled={saving} className="rounded-full bg-orange-500 px-5 py-3 font-bold text-white disabled:opacity-60">{saving ? "Saving..." : "Save profile"}</button>
    </form>
  );
}
