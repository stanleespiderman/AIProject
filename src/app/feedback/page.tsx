import { Suspense } from "react";
import { FeedbackView } from "./FeedbackView";

export const metadata = { title: "Feedback | WhatNxt" };

export default function FeedbackPage() {
  return (
    <Suspense>
      <FeedbackView />
    </Suspense>
  );
}
