import Link from "next/link";

const links = [
  ["Discover", "/discover"],
  ["Favorites", "/favorites"],
  ["Matches", "/matches"],
  ["Requests", "/adoption-requests"],
  ["Profile", "/profile"],
  ["Shelter", "/shelter/dashboard"],
];

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-[#fff7f2] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-orange-100 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/discover" className="text-2xl font-black tracking-tight text-orange-600">Gatalogo</Link>
          <div className="hidden items-center gap-5 text-sm font-semibold text-slate-600 md:flex">
            {links.map(([label, href]) => <Link key={href} href={href} className="hover:text-orange-600">{label}</Link>)}
          </div>
          <div className="flex gap-2">
            <Link href="/login" className="rounded-full px-4 py-2 text-sm font-semibold hover:bg-orange-50">Log in</Link>
            <Link href="/register" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">Join</Link>
          </div>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
