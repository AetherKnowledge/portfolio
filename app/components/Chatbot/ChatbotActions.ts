"use server";
import jwt from "jsonwebtoken";

export async function generateToken(sessionId: string, message: string) {
  const token = jwt.sign(
    {
      sessionId,
      message,
    },
    process.env.N8N_SECRET!,
    { expiresIn: "1h" }
  );
  return token;
}
