import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Syne } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-mono",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

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
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable} ${syne.variable}`}>
      <body>
        <ClerkProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-teal focus:text-black focus:px-4 focus:py-2 focus:rounded-lg focus:font-syne focus:font-semibold focus:text-sm"
          >
            Skip to content
          </a>
          <Navbar />
          {children}
          <ScrollToTop />
        </ClerkProvider>
      </body>
    </html>
  );
}
