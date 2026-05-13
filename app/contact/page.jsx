import { Mail, MessageSquareHeart, Phone, Send, UsersRound } from "lucide-react";
import AppShell from "@/components/AppShell";

export const metadata = { title: "Contact Us | Gatalogo" };

export default function ContactPage() {
  return (
    <AppShell>
      <section className="px-4 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-black uppercase tracking-[0.3em] text-orange-500">Contact Us</p>
            <h1 className="mt-5 text-5xl font-black tracking-tight text-slate-950 md:text-7xl">Want to collaborate with us?</h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">If you want to donate, collaborate, sponsor, or support our mission, leave your information and we'll get in touch.</p>
            <div className="mt-10 grid gap-4">
              {[
                { icon: UsersRound, title: "Partnerships", text: "Collaborate with shelters, brands, universities, and community groups." },
                { icon: MessageSquareHeart, title: "Donations & support", text: "Help shelters receive visibility, resources, and better adoption tools." },
                { icon: Mail, title: "Community", text: "Share ideas that can make cat adoption safer and more accessible." },
              ].map((item) => {
                const Icon = item.icon;
                return <div key={item.title} className="flex gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-orange-100"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-700"><Icon className="h-6 w-6" /></span><div><h2 className="font-black text-slate-950">{item.title}</h2><p className="mt-1 text-slate-600">{item.text}</p></div></div>;
              })}
            </div>
          </div>

          <form className="rounded-[2.5rem] bg-white p-6 shadow-xl ring-1 ring-orange-100 md:p-10">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="font-bold text-slate-700">Name<input name="name" placeholder="Your name" className="mt-2 w-full rounded-2xl border border-orange-100 bg-orange-50/40 p-4 font-medium outline-none transition focus:border-orange-400 focus:bg-white" /></label>
              <label className="font-bold text-slate-700">Email<input name="email" type="email" placeholder="you@example.com" className="mt-2 w-full rounded-2xl border border-orange-100 bg-orange-50/40 p-4 font-medium outline-none transition focus:border-orange-400 focus:bg-white" /></label>
              <label className="font-bold text-slate-700">Phone<input name="phone" placeholder="Phone number" className="mt-2 w-full rounded-2xl border border-orange-100 bg-orange-50/40 p-4 font-medium outline-none transition focus:border-orange-400 focus:bg-white" /></label>
              <label className="font-bold text-slate-700">Organization<input name="organization" placeholder="Organization or shelter" className="mt-2 w-full rounded-2xl border border-orange-100 bg-orange-50/40 p-4 font-medium outline-none transition focus:border-orange-400 focus:bg-white" /></label>
            </div>
            <label className="mt-5 block font-bold text-slate-700">Message<textarea name="message" rows="7" placeholder="Tell us how you would like to donate, collaborate, sponsor, or support the mission." className="mt-2 w-full rounded-2xl border border-orange-100 bg-orange-50/40 p-4 font-medium outline-none transition focus:border-orange-400 focus:bg-white" /></label>
            <div className="mt-6 rounded-2xl bg-orange-50 p-4 text-sm font-semibold text-orange-800">This public contact form is prepared for collaboration inquiries. Backend delivery can be connected when the team is ready.</div>
            <button type="button" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-7 py-4 font-black text-white transition hover:-translate-y-0.5 hover:bg-orange-600"><Send className="h-5 w-5" /> Send message</button>
            <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold text-slate-500"><span className="inline-flex items-center gap-2"><Mail className="h-4 w-4" /> hello@gatalogo.mx</span><span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" /> Collaboration line</span></div>
          </form>
        </div>
      </section>
    </AppShell>
  );
}
