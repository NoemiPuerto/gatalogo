import Link from "next/link";
import { ArrowRight, CheckCircle2, Heart, HomeIcon, MessageCircleHeart, Search, ShieldCheck, Sparkles, Star, UsersRound } from "lucide-react";
import AppShell from "@/components/AppShell";
import { getPrisma } from "@/lib/prisma";
import { redirectAuthenticatedHome } from "@/lib/roles";

const fallbackSupporters = [
  { id: "hope", name: "Casa Bigotes", city: "Mérida", logo: null },
  { id: "michi", name: "Fundación Michi", city: "CDMX", logo: null },
  { id: "paws", name: "Paws México", city: "Guadalajara", logo: null },
  { id: "luna", name: "Refugio Luna", city: "Puebla", logo: null },
  { id: "amor", name: "Amor Felino", city: "Monterrey", logo: null },
  { id: "sol", name: "Huellitas del Sol", city: "Querétaro", logo: null },
];

const adopterSteps = [
  { icon: Search, title: "Swipe through adorable cats", text: "Explore a thoughtful feed of adoptable cats with photos, personality notes, and care details." },
  { icon: Heart, title: "Match with cats you love", text: "Save favorites and focus on companions whose story and needs feel right for your home." },
  { icon: MessageCircleHeart, title: "Send your adoption request", text: "Tell the shelter about your family, lifestyle, and why you could be the right match." },
  { icon: HomeIcon, title: "Find your lifelong companion", text: "Coordinate with trusted shelters and welcome a rescued cat into a loving home." },
];

const shelterBenefits = [
  "Create a public shelter profile that builds trust.",
  "Showcase each cat with clear adoption details.",
  "Receive organized adoption requests from responsible adopters.",
  "Choose the safest, most loving home for every cat.",
];

async function getSupporters() {
  try {
    const prisma = getPrisma();
    const shelters = await prisma.shelter.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      select: { id: true, name: true, city: true, logo: true },
    });
    return shelters.length ? shelters : fallbackSupporters;
  } catch {
    return fallbackSupporters;
  }
}

export default async function Home() {
  await redirectAuthenticatedHome();
  const supporters = await getSupporters();
  const sliderItems = [...supporters, ...supporters];

  return (
    <AppShell>
      <section id="home" className="relative overflow-hidden px-4 pb-16 pt-12 sm:pt-16 lg:pb-24">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="absolute right-0 top-36 h-80 w-80 rounded-full bg-rose-200/50 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-sm font-bold text-orange-700 shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" /> Modern cat adoption across Mexico
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-slate-950 md:text-7xl lg:text-8xl">
              Find your perfect feline companion.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
              Gatalogo connects loving adopters with trusted shelters through a warm, visual, swipe-inspired experience designed to help every cat find a safe home.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-7 py-4 text-base font-black text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-orange-600">
                Adopt Now <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>
              <Link href="/register?role=shelter" className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-200 bg-white px-7 py-4 text-base font-black text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-700">
                Join as Shelter
              </Link>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 text-center">
              {["Trusted shelters", "Swipe matching", "Adoption requests"].map((item, index) => (
                <div key={item} className="rounded-3xl bg-white/75 p-4 shadow-sm ring-1 ring-orange-100 backdrop-blur">
                  <p className="text-2xl font-black text-slate-950">{index === 0 ? "25+" : index === 1 ? "4-step" : "24/7"}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-6 top-10 z-10 hidden rounded-3xl bg-white p-4 shadow-xl ring-1 ring-orange-100 md:block">
              <p className="text-sm font-black text-slate-950">New match</p>
              <p className="text-sm text-slate-500">Luna is ready to meet you ✨</p>
            </div>
            <div className="absolute -right-3 bottom-12 z-10 rounded-3xl bg-slate-950 p-4 text-white shadow-2xl md:-right-8">
              <div className="flex items-center gap-1 text-orange-300">{[0, 1, 2, 3, 4].map((star) => <Star key={star} className="h-4 w-4 fill-current" />)}</div>
              <p className="mt-2 text-sm font-bold">Built with love for rescue cats</p>
            </div>
            <div className="overflow-hidden rounded-[3rem] bg-white p-3 shadow-2xl ring-1 ring-orange-100 rotate-1 transition hover:rotate-0">
              <img suppressHydrationWarning className="h-[32rem] w-full rounded-[2.4rem] object-cover" src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1400&q=85" alt="A calm adoptable cat looking at the camera" />
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-orange-100 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-center text-sm font-black uppercase tracking-[0.3em] text-slate-400">Supported by shelters and cat lovers</p>
        </div>
        <div className="mt-7 flex w-max animate-marquee gap-4">
          {sliderItems.map((supporter, index) => (
            <div key={`${supporter.id}-${index}`} className="flex w-72 items-center gap-4 rounded-3xl border border-orange-100 bg-orange-50/70 p-4 shadow-sm">
              {supporter.logo ? <img src={supporter.logo} alt={`${supporter.name} logo`} className="h-14 w-14 rounded-2xl object-cover" /> : <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl font-black text-orange-600 shadow-sm">{supporter.name.charAt(0)}</div>}
              <div>
                <p className="font-black text-slate-900">{supporter.name}</p>
                <p className="text-sm font-semibold text-slate-500">{supporter.city || "Mexico"}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="font-black uppercase tracking-[0.3em] text-orange-500">How adoption works</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">A simple path from first swipe to forever home.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {adopterSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="group rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-orange-100 transition hover:-translate-y-2 hover:shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-700"><Icon className="h-6 w-6" /></span>
                    <span className="text-4xl font-black text-orange-100 transition group-hover:text-orange-200">0{index + 1}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-black text-slate-950">{step.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 lg:pb-28">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[3rem] bg-slate-950 text-white shadow-2xl lg:grid-cols-2">
          <div className="p-8 md:p-12 lg:p-16">
            <p className="font-black uppercase tracking-[0.3em] text-orange-300">Are you a shelter?</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">Join our mission to help cats find loving homes.</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">Register your shelter, showcase your cats, receive adoption requests, connect with adopters, and choose the best home for each cat in your care.</p>
            <div className="mt-8 grid gap-3">
              {shelterBenefits.map((benefit) => <div key={benefit} className="flex gap-3 rounded-2xl bg-white/10 p-4"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-300" /><span className="font-semibold text-slate-100">{benefit}</span></div>)}
            </div>
            <Link href="/register?role=shelter" className="mt-9 inline-flex items-center gap-2 rounded-full bg-orange-400 px-7 py-4 font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-orange-300">Join the mission <ArrowRight className="h-5 w-5" /></Link>
          </div>
          <div className="relative min-h-[32rem] bg-orange-100">
            <img suppressHydrationWarning src="https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?auto=format&fit=crop&w=1400&q=85" alt="Shelter cat resting comfortably" className="h-full w-full object-cover" />
            <div className="absolute inset-x-6 bottom-6 rounded-[2rem] bg-white/90 p-5 text-slate-950 shadow-xl backdrop-blur">
              <div className="flex items-center gap-3"><ShieldCheck className="h-8 w-8 text-orange-600" /><div><p className="font-black">Designed for trust</p><p className="text-sm text-slate-600">Clear profiles, organized requests, better adoption conversations.</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-7xl rounded-[3rem] bg-gradient-to-br from-orange-500 via-rose-500 to-slate-950 p-8 text-center text-white shadow-2xl md:p-16">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-white/15"><UsersRound className="h-8 w-8" /></div>
          <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">Bringing love to homes across Mexico starts with one match.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-orange-50">Whether you are ready to adopt or ready to help more cats get discovered, Gatalogo gives every story a warmer beginning.</p>
          <Link href="/register" className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-orange-50">Start now <ArrowRight className="h-5 w-5" /></Link>
        </div>
      </section>
    </AppShell>
  );
}
