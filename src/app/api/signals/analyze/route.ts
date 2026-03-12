import { NextResponse } from "next/server";
import { signalService } from "@/lib/services/signal.service";
import { createLogger } from "@/lib/logger";
import type { ApiResponse, AnalysisResponse } from "@/types";

const log = createLogger("api-signals-analyze");

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.signals || !Array.isArray(body.signals)) {
      return NextResponse.json(
        { error: "Request body must contain a 'signals' array", timestamp: new Date().toISOString() },
        { status: 400 },
      );
    }

    for (const signal of body.signals) {
      if (!signal.source || !signal.title || !signal.severity) {
        return NextResponse.json(
          { error: "Each signal must have source, title, and severity", timestamp: new Date().toISOString() },
          { status: 422 },
        );
      }
    }

    log.info("Analyzing signals", { count: body.signals.length });
    const campaigns = signalService.analyzeSignals(body.signals);

    const response: ApiResponse<AnalysisResponse> = {
      data: {
        campaigns,
        analyzedAt: new Date().toISOString(),
        signalCount: body.signals.length,
      },
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Internal server error";
    log.error("Signal analysis failed", { error: msg });
    return NextResponse.json(
      { error: msg, timestamp: new Date().toISOString() },
      { status: 500 },
    );
  }
}
