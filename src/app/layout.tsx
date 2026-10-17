import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Barlow_Condensed, Inter } from "next/font/google";
import { DisclaimerModal } from "@/components/DisclaimerModal";
import { InstallBoot } from "@/components/InstallBoot";
import { Footer } from "@/components/Footer";
import "./globals.css";

const display = Barlow_Condensed({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["600", "800"],
  style: ["normal", "italic"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WhatNxt | Your next set in 10 seconds",
  description:
    "Bored mid-workout or finished early? Pick your equipment and a muscle group and get your next exercises with sets, reps and form cues.",
  applicationName: "WhatNxt",
  icons: { icon: "/icons/icon-192.png", apple: "/icons/apple-touch-icon.png" },
  // iOS home-screen launch: full screen with a black status bar (matches the page, content starts below it).
  appleWebApp: { capable: true, title: "WhatNxt", statusBarStyle: "black" },
};

export const viewport: Viewport = {
  themeColor: "#09090c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} antialiased`}>
      <body className="min-h-dvh font-sans">
        <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4">
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </div>
        <DisclaimerModal />
        <InstallBoot />
      </body>
    </html>
  );
}
