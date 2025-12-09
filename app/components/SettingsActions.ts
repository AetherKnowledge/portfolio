"use server";

import { prisma } from "@/prisma/client";
import { Settings } from "../generated/prisma/client";

export async function getSettings(): Promise<Settings | null> {
  try {
    const settings = await prisma.settings.findUnique({
      where: { id: 1 },
    });
    return settings;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
}
