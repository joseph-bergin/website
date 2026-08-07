"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/**
 * Loads only the DOM animation feature set, which keeps the shipped Framer
 * Motion bundle to roughly a third of the full package. Mounted once, high in
 * the tree, so every <Reveal> below it shares one instance.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
