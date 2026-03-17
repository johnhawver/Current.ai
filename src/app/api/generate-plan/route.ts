import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

interface WeatherData {
  temp: number;
  condition: string;
  description: string;
}

interface PlanRequest {
  categories?: string[];
  priceRange?: string;
  location?: string;
}

interface PlanResponse {
  sms: string;
  email: string;
  strategy: string;
}

async function getWeather(location: string): Promise<WeatherData> {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    console.log("[weather] No OPENWEATHER_API_KEY, using mock weather for:", location);
    return { temp: 34, condition: "Snow", description: "light snow" };
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=imperial&appid=${apiKey}`;

  const res = await fetch(url, { signal: AbortSignal.timeout(5000) });

  if (!res.ok) {
    console.log("[weather] OpenWeather API error:", res.status, "for:", location);
    return { temp: 34, condition: "Snow", description: "light snow" };
  }

  const data = await res.json();
  const weather: WeatherData = {
    temp: Math.round(data.main?.temp ?? 50),
    condition: data.weather?.[0]?.main ?? "Clear",
    description: data.weather?.[0]?.description ?? "clear sky",
  };

  console.log("[weather] Live data for", location, "→", weather);
  return weather;
}

function buildPrompt(categories: string[], priceRange: string, weather: WeatherData): string {
  return `You are an expert e-commerce marketer.

Store info:
- Categories: ${categories.join(", ")}
- Price range: ${priceRange}

Weather:
- Temperature: ${weather.temp}°F
- Condition: ${weather.condition}
- Description: ${weather.description}

Generate:
1. SMS campaign (short, high converting, under 160 characters)
2. Email campaign (subject line + 2-3 line body)
3. Promotion strategy (1-2 sentences)

Be specific, actionable, and tailored to the weather context.

Respond in this exact JSON format and nothing else:
{
  "sms": "...",
  "email": "Subject: ...\\n\\n...",
  "strategy": "..."
}`;
}

function getMockPlan(categories: string[], priceRange: string, weather: WeatherData): PlanResponse {
  const category = categories[0] || "products";
  const discount = priceRange === "premium" ? "10%" : priceRange === "mid-range" ? "15%" : "20%";

  const plans: Record<string, PlanResponse> = {
    cold: {
      sms: `🥶 ${weather.temp}°F outside! Stay warm with ${discount} off ${category}. Shop now → link`,
      email: `Subject: It's ${weather.temp}°F — your wardrobe isn't ready\n\nTemperatures are dropping fast. Our ${category} collection is built for exactly this moment.\n\nUse code STAYWARM for ${discount} off. Ends in 48 hours.`,
      strategy: `Run a flash sale on cold-weather ${category} while temps sit at ${weather.temp}°F. Push urgency with a 48-hour window and weather-specific messaging.`,
    },
    rain: {
      sms: `🌧️ ${weather.description} today! Grab ${category} at ${discount} off → link`,
      email: `Subject: ${weather.description} — we've got you covered.\n\nThe forecast says rain. Our ${category} will keep you dry and looking great.\n\nTake ${discount} off with code RAINDAY — today only.`,
      strategy: `Target customers with a same-day promotion on weather-appropriate ${category} during ${weather.description}. Use SMS for immediacy.`,
    },
    hot: {
      sms: `☀️ ${weather.temp}°F and climbing! Cool off with ${discount} off ${category} → link`,
      email: `Subject: ${weather.temp}°F this weekend — gear up\n\n${weather.condition} conditions rolling in. Our ${category} are perfect for beating the heat.\n\nEnjoy ${discount} off with code COOLDOWN. This weekend only.`,
      strategy: `Launch a weekend sale on ${category} while temps hit ${weather.temp}°F. Pair email with an SMS reminder on the hottest day.`,
    },
  };

  const cond = weather.condition.toLowerCase();
  if (cond.includes("rain") || cond.includes("drizzle") || cond.includes("thunderstorm")) return plans.rain;
  if (cond.includes("snow") || weather.temp < 40) return plans.cold;
  if (weather.temp > 75) return plans.hot;
  return plans.cold;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PlanRequest;
    const categories = body.categories ?? [];
    const priceRange = body.priceRange ?? "mid-range";
    const location = body.location ?? "New York";

    if (categories.length === 0) {
      return NextResponse.json(
        { error: "categories array is required" },
        { status: 400 }
      );
    }

    const weatherData = await getWeather(location);

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      const plan = getMockPlan(categories, priceRange, weatherData);
      return NextResponse.json({ ...plan, weather: weatherData, source: "mock" });
    }

    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 512,
      messages: [
        { role: "user", content: buildPrompt(categories, priceRange, weatherData) },
      ],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      const plan = getMockPlan(categories, priceRange, weatherData);
      return NextResponse.json({ ...plan, weather: weatherData, source: "mock" });
    }

    const parsed: PlanResponse = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      sms: parsed.sms || "",
      email: parsed.email || "",
      strategy: parsed.strategy || "",
      weather: weatherData,
      source: "ai",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate plan" },
      { status: 500 }
    );
  }
}
