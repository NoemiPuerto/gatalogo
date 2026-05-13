let client;

async function createPrismaClient() {
  const prismaModule = await import("@prisma/client");
  const PrismaClient = prismaModule.PrismaClient;
  return new PrismaClient();
}

export async function getPrisma() {
  if (!client) client = globalThis.prisma || await createPrismaClient();
  if (process.env.NODE_ENV !== "production") globalThis.prisma = client;
  return client;
}
