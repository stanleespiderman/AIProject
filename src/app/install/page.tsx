import type { Metadata } from "next";
import { InstallView } from "./InstallView";

export const metadata: Metadata = {
  title: "Get the WhatNext? app",
  description: "Add WhatNext? to your phone's home screen in two taps.",
};

export default function InstallPage() {
  return <InstallView />;
}
