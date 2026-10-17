import type { MetadataRoute } from "next";

/** Lets phones install WhatNext? to the home screen and open it full screen, like an app. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WhatNext? | Your next set in 10 seconds",
    short_name: "WhatNext?",
    description: "Pick your equipment and a muscle group and get your next exercises with sets, reps and form cues.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#09090c",
    theme_color: "#09090c",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
