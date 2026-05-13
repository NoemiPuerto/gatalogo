import { NextResponse } from "next/server";

const COOKIE_NAME = "cat_session";
const secret = process.env.AUTH_SECRET || "dev-cat-adoption-secret-change-me";
const protectedPrefixes = ["/discover", "/favorites", "/matches", "/profile", "/shelter", "/cats"];

async function sign(value) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return Array.from(new Uint8Array(signature)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function homeForRole(role) {
  if (role === "SHELTER" || role === "ADMIN") return "/shelter/cats";
  return "/discover";
}

function pathAllowed(role, pathname) {
  if (role === "ADMIN") return true;
  if (role === "SHELTER") return pathname.startsWith("/shelter") || pathname === "/profile" || pathname.startsWith("/cats/");
  if (role === "ADOPTER") return ["/discover", "/favorites", "/matches", "/profile"].includes(pathname) || pathname.startsWith("/cats/");
  return false;
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  if (!protectedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) return NextResponse.next();

  const raw = request.cookies.get(COOKIE_NAME)?.value;
  const [userId, signature] = raw?.split(".") || [];
  if (!userId || !signature || signature !== await sign(userId)) return NextResponse.redirect(new URL("/login", request.url));

  const response = await fetch(new URL("/api/auth/me", request.url), { headers: { cookie: request.headers.get("cookie") || "" } });
  if (!response.ok) return NextResponse.redirect(new URL("/login", request.url));
  const { user } = await response.json();
  if (!user) return NextResponse.redirect(new URL("/login", request.url));
  if (!pathAllowed(user.role, pathname)) return NextResponse.redirect(new URL(homeForRole(user.role), request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/discover/:path*", "/favorites/:path*", "/matches/:path*", "/profile", "/shelter/:path*", "/cats/:path*"],
};
