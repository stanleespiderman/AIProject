import type { Metadata } from "next";
import { InstallView } from "./InstallView";

export const metadata: Metadata = {
  title: "Get the WhatNxt app",
  description: "Add WhatNxt to your phone's home screen in two taps.",
};

export default function InstallPage() {
  return <InstallView />;
}
