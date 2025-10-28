"use server";

import jwt from "jsonwebtoken";
import { Message, UserType } from "./types";

export type ChatBotOutput = {
  output: string;
};

export async function sendChatMessage(
  message: Message,
  sessionId: string
): Promise<Message> {
  const token = jwt.sign(
    {
      sessionId,
    },
    process.env.N8N_SECRET!,
    { expiresIn: "1h" }
  );

  const response = await fetch(process.env.N8N_PUBLIC_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      message: message.content,
      sessionId: sessionId,
    }),
  });

  if (!response.ok) {
    console.error("Failed to send message: " + response.statusText);
    return {
      type: UserType.AI,
      content:
        "Sorry, there was an error processing your request. " +
        response.statusText,
    };
  }
  const data: ChatBotOutput = await response.json();
  return {
    type: UserType.AI,
    content: data.output,
  };
}
