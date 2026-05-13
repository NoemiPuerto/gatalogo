import { HeartHandshake, Lightbulb, MapPin, Sparkles } from "lucide-react";
import AppShell from "@/components/AppShell";

const team = [
  { name: "Maritza Guadalupe Yam Reyes", role: "Frontend Developer", bio: "Passionate about creating friendly interfaces that make adoption feel clear, emotional, and safe for every family." },
  { name: "Geraldin Garcia Verduzco", role: "Frontend Developer", bio: "Focused on building warm digital experiences that help shelters tell each cat's story with dignity and care." },
  { name: "Pedro Ortegon Ortegon", role: "Scrum Master", bio: "Committed to guiding the team with empathy, organization, and a mission-first mindset so the product can help real communities." },
  { name: "Gilberto Melgarejo", role: "Backend Developer", bio: "Motivated by reliable technology that protects adoption information and helps shelters manage requests with confidence." },
  { name: "Magdalena Noemi Puerto Riegos", role: "Full Stack Designer", bio: "Dedicated to connecting thoughtful design and practical functionality so more cats can find loving homes." },
];

export const metadata = { title: "About Us | Gatalogo" };

export default function AboutPage() {
  return (
    <AppShell>
      <section className="relative overflow-hidden px-4 py-20">
        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-orange-200/50 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-black uppercase tracking-[0.3em] text-orange-500">About Gatalogo</p>
            <h1 className="mt-5 text-5xl font-black tracking-tight text-slate-950 md:text-7xl">Technology built for second chances.</h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">We believe cat adoption in Mexico can be more transparent, more emotional, and more effective when shelters and adopters meet in one thoughtful digital space.</p>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <article className="rounded-[2.5rem] bg-white p-8 shadow-sm ring-1 ring-orange-100 md:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-700"><Lightbulb className="h-7 w-7" /></div>
              <h2 className="mt-6 text-3xl font-black text-slate-950">Our Vision</h2>
              <p className="mt-4 leading-8 text-slate-600">To improve cat adoption across Mexico by making it easier for responsible adopters to discover shelters, understand each cat's needs, and start meaningful conversations that lead to safe, lasting homes.</p>
            </article>
            <article className="rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-xl md:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-orange-300"><HeartHandshake className="h-7 w-7" /></div>
              <h2 className="mt-6 text-3xl font-black">Our Mission</h2>
              <p className="mt-4 leading-8 text-slate-300">We help shelters connect with responsible adopters through modern profiles, clear adoption journeys, and tools that keep requests organized so teams can focus on animal care and better matches.</p>
            </article>
          </div>

          <section className="mt-20">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="font-black uppercase tracking-[0.3em] text-orange-500">About our team</p>
                <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">A small team designing for trust, empathy, and impact.</h2>
              </div>
              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-orange-100 md:max-w-xs">
                <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-orange-600" /><p className="font-bold text-slate-700">Built with Mexico's shelters and adopters in mind.</p></div>
              </div>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {team.map((member, index) => (
                <article key={member.name} className="group rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-orange-100 transition hover:-translate-y-2 hover:shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-orange-200 to-rose-200 text-xl font-black text-orange-800">{member.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</div>
                    <div>
                      <h3 className="font-black text-slate-950">{member.name}</h3>
                      <p className="text-sm font-bold text-orange-600">{member.role}</p>
                    </div>
                  </div>
                  <p className="mt-5 leading-7 text-slate-600">{member.bio}</p>
                  <Sparkles className="mt-6 h-5 w-5 text-orange-300 transition group-hover:rotate-12" />
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </AppShell>
  );
}
