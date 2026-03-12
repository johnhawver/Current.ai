"use server";

import { aiService } from "@/lib/services/ai.service";
import type { BrandingResult } from "@/types";

export type { BrandingResult };

export async function generateBranding(
  storeName: string
): Promise<{ data?: BrandingResult; error?: string }> {
  return aiService.generateBranding(storeName);
}
