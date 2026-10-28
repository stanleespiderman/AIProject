import type { ReactNode } from "react";
import { Column } from "@/components/Column";

export default function Layout({ children }: { children: ReactNode }) {
  return <Column>{children}</Column>;
}
