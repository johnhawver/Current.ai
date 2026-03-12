"use server";

import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export type BrandingResult = {
  tagline: string;
  colors: [string, string, string];
};

export async function generateBranding(
  storeName: string
): Promise<{ data?: BrandingResult; error?: string }> {
  if (!storeName?.trim()) {
    return { error: "Store name is required" };
  }

  try {
    const message = await client.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 256,
      messages: [
        {
          role: "user",
          content: `You are a high-end brand consultant. For the store named "${storeName}", provide a 1-sentence trendy tagline and 3 hex code colors that match its vibe. Return the response in a JSON format: { "tagline": "...", "colors": ["#...", "#...", "#..."] }. Return ONLY the JSON, no other text.`,
        },
      ],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";
    const json = text.replace(/```json\n?|\n?```/g, "").trim();
    const parsed: BrandingResult = JSON.parse(json);

    return { data: parsed };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "AI generation failed";
    return { error: msg };
  }
}
