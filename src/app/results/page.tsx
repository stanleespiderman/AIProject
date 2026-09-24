import { Suspense } from "react";
import { ResultsSkeleton, ResultsView } from "./ResultsView";

export default function ResultsPage() {
  return (
    <Suspense fallback={<ResultsSkeleton />}>
      <ResultsView />
    </Suspense>
  );
}
