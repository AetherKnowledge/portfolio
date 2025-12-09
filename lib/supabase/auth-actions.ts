"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import ActionResult, {
  prettifyZodErrorMessage,
} from "@/app/components/ActionResult";
import { createClient } from "../supabase/server";
import { LoginData, loginSchema } from "./schema";

export async function login(loginData: LoginData): Promise<ActionResult<void>> {
  const supabase = await createClient();

  const validation = loginSchema.safeParse(loginData);
  if (!validation.success) {
    // Handle validation errors
    console.error(validation.error);
    return {
      success: false,
      message: prettifyZodErrorMessage(validation.error),
    };
  }
  const { email, password } = validation.data;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: error.message,
    };
  }

  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");
  redirect("/admin");
}

export async function signout(): Promise<ActionResult<void>> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }

  redirect("/");
}

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
