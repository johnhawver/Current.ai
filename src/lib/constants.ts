export const APP_NAME = "Current.ai";
export const APP_DESCRIPTION = "Signal-driven retail intelligence for local stores";
export const APP_URL = "https://current.ai";

export const SUPPORT_EMAIL = "hello@current.ai";
export const LEGAL_EMAIL = "legal@current.ai";
export const PRIVACY_EMAIL = "privacy@current.ai";

export const PLANS = {
  starter: {
    name: "Starter",
    price: 49,
    label: "For Solo Retailers",
    features: [
      "1 store location",
      "3 active signal sources",
      "AI caption & email generation",
      "Weekly campaign recommendations",
      "Instagram & SMS ready copy",
    ],
  },
  growth: {
    name: "Growth",
    price: 99,
    label: "Most Popular",
    features: [
      "Everything in Starter",
      "Unlimited signal sources",
      "AI video & Reel scripts",
      "POS integration (Shopify, Square)",
      "Advanced trigger customization",
      "Performance analytics",
      "Priority support",
    ],
  },
} as const;

export const SIGNAL_SOURCES = [
  "weather",
  "event",
  "traffic",
  "competitor",
  "seasonal",
  "campus",
] as const;

export const NAV_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/dashboard", label: "Dashboard" },
] as const;
