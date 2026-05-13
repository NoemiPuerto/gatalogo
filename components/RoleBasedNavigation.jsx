import Link from "next/link";
import { getCurrentUser, publicUser } from "@/lib/auth";

const adopterLinks = [
  ["Discover", "/discover"],
  ["Favorites", "/favorites"],
  ["Matches", "/matches"],
  ["Profile", "/profile"],
];

const shelterLinks = [
  ["My Cats", "/shelter/cats"],
  ["Adoption Requests", "/shelter/requests"],
  ["Shelter Profile", "/shelter/profile"],
];

export default async function RoleBasedNavigation() {
  const user = publicUser(await getCurrentUser());
  const links = user?.role === "SHELTER" || user?.role === "ADMIN" ? shelterLinks : adopterLinks;
  const homeHref = user?.role === "SHELTER" || user?.role === "ADMIN" ? "/shelter/cats" : "/discover";

  return (
    <header className="sticky top-0 z-30 border-b border-orange-100 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link href={homeHref} className="text-2xl font-black tracking-tight text-orange-600">Gatalogo</Link>
        <div className="hidden items-center gap-5 text-sm font-semibold text-slate-600 md:flex">
          {user && links.map(([label, href]) => <Link key={href} href={href} className="hover:text-orange-600">{label}</Link>)}
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700">{user.role === "SHELTER" ? user.shelter?.name || user.name : user.name}</span>
          ) : (
            <>
              <Link href="/login" className="rounded-full px-4 py-2 text-sm font-semibold hover:bg-orange-50">Log in</Link>
              <Link href="/register" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">Join</Link>
            </>
          )}
        </div>
      </nav>
      {user && (
        <div className="border-t border-orange-50 bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 text-sm font-bold text-slate-600">
            {links.map(([label, href]) => <Link key={href} href={href} className="whitespace-nowrap rounded-full bg-orange-50 px-4 py-2">{label}</Link>)}
          </div>
        </div>
      )}
    </header>
  );
}
