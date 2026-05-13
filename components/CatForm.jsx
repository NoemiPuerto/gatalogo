"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const booleanFields = [
  ["vaccinated", "Vaccinated"],
  ["sterilized", "Sterilized"],
  ["compatibleWithChildren", "Compatible with children"],
  ["compatibleWithCats", "Compatible with cats"],
  ["compatibleWithDogs", "Compatible with dogs"],
];

export default function CatForm({ cat }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(cat?.id);

  async function filesToDataUrls(files) {
    return Promise.all(Array.from(files || []).map((file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    })));
  }

  async function submit(event) {
    event.preventDefault();
    setSaving(true);
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    payload.ageMonths = Number(payload.ageMonths || 0);
    const uploadedPhotos = await filesToDataUrls(form.getAll("imageFiles").filter((file) => file?.size));
    payload.photos = [
      ...String(payload.photos || "").split("\n").map((item) => item.trim()).filter(Boolean),
      ...uploadedPhotos,
    ];
    delete payload.imageFiles;
    for (const [field] of booleanFields) payload[field] = form.has(field);
    const response = await fetch(isEdit ? `/api/cats/${cat.id}` : "/api/cats", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (!response.ok) return toast.error("Could not save cat");
    toast.success(isEdit ? "Cat updated" : "Cat published");
    router.push("/shelter/cats");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="mt-8 grid gap-4 rounded-[2rem] bg-white p-8 shadow-xl md:grid-cols-2">
      <input name="name" required className="rounded-2xl border p-3" placeholder="Name" defaultValue={cat?.name || ""} />
      <input name="ageMonths" required type="number" min="0" className="rounded-2xl border p-3" placeholder="Age in months" defaultValue={cat?.ageMonths || ""} />
      <select name="sex" className="rounded-2xl border p-3" defaultValue={cat?.sex || "UNKNOWN"}><option>FEMALE</option><option>MALE</option><option>UNKNOWN</option></select>
      <input name="breed" className="rounded-2xl border p-3" placeholder="Breed" defaultValue={cat?.breed || ""} />
      <input name="personality" className="rounded-2xl border p-3 md:col-span-2" placeholder="Personality" defaultValue={cat?.personality || ""} />
      <input name="healthStatus" className="rounded-2xl border p-3" placeholder="Health status" defaultValue={cat?.healthStatus || ""} />
      <input name="location" className="rounded-2xl border p-3" placeholder="Location" defaultValue={cat?.location || ""} />
      <div className="grid gap-3 rounded-2xl bg-orange-50 p-4 md:col-span-2 md:grid-cols-2">
        {booleanFields.map(([field, label]) => <label key={field} className="flex items-center gap-3 font-bold text-slate-700"><input name={field} type="checkbox" defaultChecked={Boolean(cat?.[field])} />{label}</label>)}
      </div>
      <textarea name="description" className="h-28 rounded-2xl border p-3 md:col-span-2" placeholder="Description" defaultValue={cat?.description || ""} />
      <textarea name="photos" className="h-28 rounded-2xl border p-3 md:col-span-2" placeholder="Image URLs, one per line" defaultValue={cat?.photos?.map((photo) => photo.url).join("\n") || ""} />
      <label className="rounded-2xl border border-dashed p-4 font-bold text-slate-600 md:col-span-2">Upload multiple images<input name="imageFiles" type="file" accept="image/*" multiple className="mt-3 block w-full text-sm" /></label>
      {isEdit && <select name="adoptionStatus" className="rounded-2xl border p-3 md:col-span-2" defaultValue={cat?.adoptionStatus || "AVAILABLE"}><option>AVAILABLE</option><option>PENDING</option><option>ADOPTED</option></select>}
      <button disabled={saving} className="rounded-full bg-orange-500 px-5 py-3 font-bold text-white disabled:opacity-60 md:col-span-2">{saving ? "Saving..." : isEdit ? "Save cat" : "Publish cat"}</button>
    </form>
  );
}
