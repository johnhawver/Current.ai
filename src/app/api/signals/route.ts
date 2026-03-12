import { NextResponse } from "next/server";
import { signalService } from "@/lib/services/signal.service";
import { createLogger } from "@/lib/logger";
import type { ApiResponse, Signal } from "@/types";

const log = createLogger("api-signals");

export async function GET() {
  try {
    const signals = signalService.getActiveSignals();

    const response: ApiResponse<Signal[]> = {
      data: signals,
      timestamp: new Date().toISOString(),
    };

    log.info("Signals fetched", { count: signals.length });
    return NextResponse.json(response);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Internal server error";
    log.error("Failed to fetch signals", { error: msg });
    return NextResponse.json(
      { error: msg, timestamp: new Date().toISOString() },
      { status: 500 },
    );
  }
}
