"use server";

import { env } from "next-runtime-env";
import { prettifyError } from "zod";
import ActionResult from "../components/ActionResult";
import { generateToken } from "../components/N8NActions";
import { contactSchema } from "./schema";

export async function submitContactForm(
  formData: FormData
): Promise<ActionResult<void>> {
  const validation = contactSchema.safeParse(Object.fromEntries(formData));
  if (!validation.success) {
    console.error("Contact form validation failed:", validation.error);
    return {
      success: false,
      message: prettifyError(validation.error),
    };
  }
  const { name, email, message } = validation.data;

  const token = await generateToken(email, message);

  const response = await fetch(env("NEXT_PUBLIC_EMAIL_URL")!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      email,
      message,
    }),
  });

  if (!response.ok) {
    console.error("Failed to submit contact form:", response.statusText);
    return {
      success: false,
      message: "Failed to submit contact form.",
    };
  }

  return {
    success: true,
  };
}
