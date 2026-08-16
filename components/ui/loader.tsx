"use client";

import { motion } from "@/lib/motion";

export const LoaderOne = () => {
  const transition = (x: number) => ({
    duration: 1,
    repeat: Infinity,
    repeatType: "loop" as const,
    delay: x * 0.2,
    ease: "easeInOut" as const,
  });

  return (
    <div className="flex items-center gap-2">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={transition(0)}
        className="h-4 w-4 rounded-full border border-brand-soft bg-gradient-to-b from-brand-soft to-brand-mute"
      />
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={transition(1)}
        className="h-4 w-4 rounded-full border border-brand-soft bg-gradient-to-b from-brand-soft to-brand-mute"
      />
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={transition(2)}
        className="h-4 w-4 rounded-full border border-brand-soft bg-gradient-to-b from-brand-soft to-brand-mute"
      />
    </div>
  );
};
