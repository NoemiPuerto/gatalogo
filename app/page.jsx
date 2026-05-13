import Link from "next/link";
import AppShell from "@/components/AppShell";
import { redirectAuthenticatedHome } from "@/lib/roles";

export default async function Home() {
  await redirectAuthenticatedHome();
  return (
    <AppShell>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 lg:grid-cols-2">
        <div>
          <p className="font-bold uppercase tracking-[0.35em] text-orange-500">Adopt with a swipe</p>
          <h1 className="mt-5 text-5xl font-black leading-tight md:text-7xl">Meet your next best friend.</h1>
          <p className="mt-6 max-w-xl text-lg text-slate-600">Gatalogo gives adopters and shelters separate workspaces for modern cat discovery, favorites, adoption requests and shelter cat management.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/discover" className="rounded-full bg-orange-500 px-6 py-3 font-bold text-white">Start swiping</Link><Link href="/register" className="rounded-full bg-white px-6 py-3 font-bold shadow">Register shelter</Link></div>
        </div>
        <div className="relative"><img suppressHydrationWarning className="rounded-[3rem] shadow-2xl" src="https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=1200&q=80" alt="Adoptable cat" /></div>
      </section>
    </AppShell>
  );
}
