export type SignalSource =
  | "weather"
  | "event"
  | "traffic"
  | "competitor"
  | "seasonal"
  | "campus";

export type Severity = "critical" | "high" | "medium" | "low";

export interface Signal {
  id: string;
  source: SignalSource;
  title: string;
  description: string;
  severity: Severity;
  detectedAt: string;
  location?: string;
}

export type CampaignChannel =
  | "sms"
  | "email"
  | "push"
  | "instagram"
  | "in_store";

export type CampaignStatus = "draft" | "scheduled" | "active" | "completed";

export interface Campaign {
  id: string;
  signalId: string;
  title: string;
  body: string;
  channels: CampaignChannel[];
  audience: number;
  confidence: number;
  estimatedRevenue: number;
  status: CampaignStatus;
}

export interface Store {
  id: string;
  userId: string;
  name: string;
  city: string;
  createdAt: string;
}

export interface BrandingResult {
  tagline: string;
  vibe: string;
  colors: [string, string, string];
  strategy: string;
}

export interface AnalysisRequest {
  storeId: string;
  signals: Signal[];
}

export interface AnalysisResponse {
  campaigns: Campaign[];
  analyzedAt: string;
  signalCount: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  timestamp: string;
}
