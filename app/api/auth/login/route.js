import { createSession, publicUser, verifyPassword } from "@/lib/auth";
import { body, json } from "@/lib/http";
import { getPrisma } from "@/lib/prisma";

export async function POST(request) {
  const prisma = await getPrisma();
  const data = await body(request);
  const user = await prisma.user.findUnique({ where: { email: String(data.email || "").toLowerCase() }, include: { shelter: true } });
  if (!user || !data.password || !verifyPassword(data.password, user.passwordHash)) return json({ error: "Invalid credentials" }, 401);
  await createSession(user.id);
  return json({ user: publicUser(user) });
}
