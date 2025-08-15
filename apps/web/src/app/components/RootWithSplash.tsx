"use client";

// components/RootWithSplash.tsx
// Wrap your entire app with this to show the Doingly illustration
// for a few seconds before rendering the real pages.

import { useEffect, useState } from "react";
import DoinglyOnboarding from "./DoinglyOnboarding";

export default function RootWithSplash({
  children,
  durationMs = 2500, // change this to control how long the splash is visible
  skippable = true,
}: {
  children: React.ReactNode;
  durationMs?: number;
  skippable?: boolean;
}) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), durationMs);
    return () => clearTimeout(t);
  }, [durationMs]);

  // Prevent background scroll while splash is visible
  useEffect(() => {
    if (showSplash) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [showSplash]);

  if (showSplash) {
    return <DoinglyOnboarding />;
  }

  return <>{children}</>;
}
