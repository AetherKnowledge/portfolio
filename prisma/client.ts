import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// This file should only be imported in server-side code
if (typeof window !== "undefined") {
  throw new Error("prisma/client should only be imported in server-side code");
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
export const prisma = new PrismaClient({ adapter });
