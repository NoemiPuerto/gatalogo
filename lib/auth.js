import crypto from "crypto";
import { cookies } from "next/headers";
import { getPrisma } from "@/lib/prisma";

const COOKIE_NAME = "cat_session";
const secret = process.env.AUTH_SECRET || "dev-cat-adoption-secret-change-me";

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, passwordHash) {
  const [salt, storedHash] = passwordHash.split(":");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(storedHash, "hex"));
}

function sign(value) {
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

export function publicUser(user) {
  if (!user) return null;
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

export async function createSession(userId) {
  const value = `${userId}.${sign(userId)}`;
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  const [userId, signature] = raw.split(".");
  if (!userId || signature !== sign(userId)) return null;
  const prisma = await getPrisma();
  return prisma.user.findUnique({ where: { id: userId }, include: { shelter: true } });
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) throw new Response(JSON.stringify({ error: "Authentication required" }), { status: 401 });
  return user;
}
