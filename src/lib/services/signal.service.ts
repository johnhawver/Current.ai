import { createLogger } from "@/lib/logger";
import type { Signal, Campaign, Severity } from "@/types";

const log = createLogger("signal-service");

const SEVERITY_SCORE: Record<Severity, number> = {
  critical: 1.0,
  high: 0.8,
  medium: 0.5,
  low: 0.2,
};

const CHANNEL_MAP: Record<string, Campaign["channels"]> = {
  weather: ["sms", "push"],
  event: ["instagram", "email", "sms"],
  traffic: ["push", "in_store"],
  competitor: ["sms", "email"],
  seasonal: ["email", "instagram"],
  campus: ["instagram", "push"],
};

class SignalService {
  analyzeSignals(signals: Signal[]): Campaign[] {
    log.info("Analyzing signals", { count: signals.length });

    const campaigns: Campaign[] = [];

    for (const signal of signals) {
      const score = SEVERITY_SCORE[signal.severity];
      if (score < 0.5) continue;

      campaigns.push({
        id: `cmp_${signal.id}`,
        signalId: signal.id,
        title: `Campaign: ${signal.title}`,
        body: `Auto-generated response to "${signal.description}"`,
        channels: CHANNEL_MAP[signal.source] || ["email"],
        audience: Math.round(score * 500),
        confidence: score,
        estimatedRevenue: Math.round(score * 1000),
        status: "draft",
      });
    }

    log.info("Analysis complete", { campaignsGenerated: campaigns.length });
    return campaigns;
  }

  getActiveSignals(): Signal[] {
    return [
      {
        id: "sig_weather_01",
        source: "weather",
        title: "Rain Incoming",
        description: "Rain starting in 20 minutes — foot traffic may shift indoors",
        severity: "high",
        detectedAt: new Date().toISOString(),
        location: "Ann Arbor, MI",
      },
      {
        id: "sig_event_01",
        source: "event",
        title: "Michigan Game Day",
        description: "U-M vs Ohio State — kickoff at 3:30 PM, 107K attendance expected",
        severity: "critical",
        detectedAt: new Date().toISOString(),
        location: "Michigan Stadium",
      },
      {
        id: "sig_traffic_01",
        source: "traffic",
        title: "State St Foot Traffic Spike",
        description: "Foot traffic 2.4x above average on South State Street",
        severity: "high",
        detectedAt: new Date().toISOString(),
        location: "S State St",
      },
      {
        id: "sig_campus_01",
        source: "campus",
        title: "Finals Week Starting",
        description: "Fall semester finals begin Monday — library hours extended",
        severity: "medium",
        detectedAt: new Date().toISOString(),
        location: "U-M Central Campus",
      },
      {
        id: "sig_competitor_01",
        source: "competitor",
        title: "Competitor Flash Sale",
        description: "Nearby competitor on Main St running 20% off everything",
        severity: "high",
        detectedAt: new Date().toISOString(),
        location: "Main St",
      },
      {
        id: "sig_seasonal_01",
        source: "seasonal",
        title: "First Freeze Warning",
        description: "Temperatures dropping below 32°F overnight for the first time",
        severity: "medium",
        detectedAt: new Date().toISOString(),
        location: "Ann Arbor, MI",
      },
    ];
  }
}

export const signalService = new SignalService();
