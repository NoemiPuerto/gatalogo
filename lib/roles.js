import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export const ROLE_HOME = {
  ADOPTER: "/discover",
  SHELTER: "/shelter/cats",
  ADMIN: "/shelter/cats",
};

export function homeForRole(role) {
  return ROLE_HOME[role] || "/discover";
}

export async function requireRole(allowedRoles, fallback = "/login") {
  const user = await getCurrentUser();
  if (!user) redirect(fallback);
  if (!allowedRoles.includes(user.role)) redirect(homeForRole(user.role));
  return user;
}

export async function redirectAuthenticatedHome() {
  const user = await getCurrentUser();
  if (user) redirect(homeForRole(user.role));
  return null;
}

export function canAccessPath(role, pathname) {
  if (!role) return false;
  if (role === "ADMIN") return true;
  if (role === "SHELTER") return pathname.startsWith("/shelter") || pathname === "/profile";
  if (role === "ADOPTER") return ["/discover", "/favorites", "/matches", "/profile"].includes(pathname) || pathname.startsWith("/cats/");
  return false;
}
