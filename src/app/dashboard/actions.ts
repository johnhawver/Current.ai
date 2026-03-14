"use server";

import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { createLogger } from "@/lib/logger";
import { isNonEmpty } from "@/lib/validation";

const log = createLogger("store-actions");

interface StoreActionResult {
  success?: boolean;
  error?: string;
}

export async function createStore(formData: FormData): Promise<StoreActionResult> {
  const { userId } = await auth();
  if (!userId) {
    log.warn("Store creation attempted without authentication");
    return { error: "Not signed in" };
  }

  const storeName = formData.get("storeName") as string;
  if (!isNonEmpty(storeName)) {
    return { error: "Store name is required" };
  }

  const trimmed = storeName.trim();
  if (trimmed.length > 100) {
    return { error: "Store name must be under 100 characters" };
  }

  log.info("Creating store", { userId, storeName: trimmed });

  const { error } = await supabase
    .from("stores")
    .insert({ user_id: userId, store_name: trimmed });

  if (error) {
    log.error("Store creation failed", { userId, error: error.message });
    return { error: error.message };
  }

  log.info("Store created successfully", { userId, storeName: trimmed });
  return { success: true };
}
