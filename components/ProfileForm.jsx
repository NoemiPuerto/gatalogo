"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfileForm({ user, shelterMode = false }) {
  const [saving, setSaving] = useState(false);
  const shelter = user?.shelter || {};

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    const form = new FormData(event.currentTarget);
    const values = Object.fromEntries(form.entries());
    const payload = shelterMode ? {
      name: user.name,
      avatar: user.avatar,
      phone: values.contactPhone,
      bio: user.bio,
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
    toast.success("Profile saved");
  }

  if (shelterMode) {
    return (
      <form onSubmit={submit} className="mt-8 grid gap-4 rounded-[2rem] bg-white p-8 shadow-xl md:grid-cols-2">
        <input name="shelterName" className="rounded-2xl border p-3 md:col-span-2" placeholder="Shelter name" defaultValue={shelter.name || ""} />
        <textarea name="description" className="h-28 rounded-2xl border p-3 md:col-span-2" placeholder="Description" defaultValue={shelter.description || ""} />
        <input name="address" className="rounded-2xl border p-3 md:col-span-2" placeholder="Address" defaultValue={shelter.address || ""} />
        <input name="city" className="rounded-2xl border p-3" placeholder="City" defaultValue={shelter.city || ""} />
        <input name="country" className="rounded-2xl border p-3" placeholder="Country" defaultValue={shelter.country || ""} />
        <input name="website" className="rounded-2xl border p-3" placeholder="Website" defaultValue={shelter.website || ""} />
        <input name="contactPhone" className="rounded-2xl border p-3" placeholder="Contact phone" defaultValue={shelter.contactPhone || user.phone || ""} />
        <input name="logo" className="rounded-2xl border p-3 md:col-span-2" placeholder="Logo URL" defaultValue={shelter.logo || ""} />
        <button disabled={saving} className="rounded-full bg-orange-500 px-5 py-3 font-bold text-white disabled:opacity-60 md:col-span-2">{saving ? "Saving..." : "Save shelter"}</button>
      </form>
    );
  }

  return (
    <form onSubmit={submit} className="mt-8 grid gap-4 rounded-[2rem] bg-white p-8 shadow-xl">
      <input name="name" className="rounded-2xl border p-3" placeholder="Name" defaultValue={user?.name || ""} />
      <input name="avatar" className="rounded-2xl border p-3" placeholder="Avatar URL" defaultValue={user?.avatar || ""} />
      <textarea name="bio" className="h-32 rounded-2xl border p-3" placeholder="Tell shelters about your home, schedule and adoption preferences." defaultValue={user?.bio || ""} />
      <input name="phone" className="rounded-2xl border p-3" placeholder="Phone" defaultValue={user?.phone || ""} />
      <input name="location" className="rounded-2xl border p-3" placeholder="Location" defaultValue={user?.location || ""} />
      <button disabled={saving} className="rounded-full bg-orange-500 px-5 py-3 font-bold text-white disabled:opacity-60">{saving ? "Saving..." : "Save profile"}</button>
    </form>
  );
}
