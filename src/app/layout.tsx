import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Current — Geo-Triggered Marketing for Independent Retail",
  description:
    "Current monitors your city's real-time signals — weather, game days, campus events — and turns them into revenue-driving campaigns for your store. Automatically.",
  openGraph: {
    title: "Current — Geo-Triggered Marketing for Independent Retail",
    description:
      "Signal-driven marketing automation for independent retail in college towns.",
    images: ["https://current.ai/og-image.png"],
    type: "website",
    url: "https://current.ai",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
