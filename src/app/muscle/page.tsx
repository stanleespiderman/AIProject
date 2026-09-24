import { Suspense } from "react";
import { MusclePicker } from "./MusclePicker";

export default function MusclePage() {
  return (
    <Suspense>
      <MusclePicker />
    </Suspense>
  );
}
