import Anthropic from '@anthropic-ai/sdk';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("❌ API Key missing in .env.local");
    process.exit(1);
  }

  // Use the March 2026 flagship model
  const anthropic = new Anthropic({ apiKey });

  console.log("🚀 Testing Anthropic API with Claude Opus 4.6...");
  
  try {
    const message = await anthropic.messages.create({
      model: "claude-opus-4-6", // The updated 2026 Model ID
      max_tokens: 1024,
      messages: [
        { role: "user", content: "It's March 2026. Give me one 'current' marketing tip for an AI startup named Current.ai." }
      ],
    });

    // @ts-ignore
    console.log("✅ Claude 4.6 Response:", message.content[0].text);
  } catch (error: unknown) {
    console.error("❌ API Error:", error instanceof Error ? error.message : error);
  }
}

main();