"use server";

import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";

export async function createStore(formData: FormData) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "Not signed in" };
  }

  const storeName = formData.get("storeName") as string;
  if (!storeName?.trim()) {
    return { error: "Store name is required" };
  }

  const { error } = await supabase
    .from("stores")
    .insert({ user_id: userId, store_name: storeName.trim() });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
