import { Suspense } from "react";
import { LevelPicker } from "./LevelPicker";

export default function LevelPage() {
  return (
    <Suspense>
      <LevelPicker />
    </Suspense>
  );
}
