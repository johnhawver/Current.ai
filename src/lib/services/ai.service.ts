import Anthropic from "@anthropic-ai/sdk";
import { createLogger } from "@/lib/logger";
import type { BrandingResult } from "@/types";

const log = createLogger("ai-service");

class AIService {
  private client: Anthropic;

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async generateBranding(storeName: string): Promise<{ data?: BrandingResult; error?: string }> {
    if (!storeName?.trim()) {
      return { error: "Store name is required" };
    }

    log.info("Generating branding", { storeName });

    try {
      const response = await this.client.messages.create({
        model: "claude-opus-4-6",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: `You are a world-class brand strategist in March 2026.
For the store "${storeName}", generate a high-end branding package.
Return ONLY a JSON object with this exact structure:
{
  "tagline": "string",
  "vibe": "string",
  "colors": ["#hex1", "#hex2", "#hex3"],
  "strategy": "one-sentence growth tip"
}`,
          },
        ],
      });

      const text =
        response.content[0].type === "text" ? response.content[0].text : "";
      const json = text.replace(/```json\n?|\n?```/g, "").trim();
      const parsed: BrandingResult = JSON.parse(json);

      log.info("Branding generated", { storeName });
      return { data: parsed };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to generate branding.";
      log.error("Branding generation failed", { storeName, error: msg });
      return { error: msg };
    }
  }
}

export const aiService = new AIService();
