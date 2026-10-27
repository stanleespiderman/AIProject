import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { Barlow_Condensed, Inter } from "next/font/google";
import { DisclaimerModal } from "@/components/DisclaimerModal";
import { InstallBoot } from "@/components/InstallBoot";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
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

// Keep session recording off when optional personal accounts are configured.
const clarityAllowed = !(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

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
        {clarityAllowed && <GoogleAnalytics />}
        {clarityAllowed && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`if (["whatnxt.me", "www.whatnxt.me"].includes(window.location.hostname)
                && !window.location.pathname.startsWith("/account")) {
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "z4c46g2dam");
            }`}
          </Script>
        )}
      </body>
    </html>
  );
}
