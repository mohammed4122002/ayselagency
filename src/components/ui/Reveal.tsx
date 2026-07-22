"use client";

import { motion, type Variants } from "framer-motion";

const variants: Variants = {
  hidden: (custom: { y: number; delay: number }) => ({
    opacity: 0,
    y: custom.y,
  }),
  visible: (custom: { y: number; delay: number }) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: custom.delay, ease: [0.21, 0.65, 0.36, 1] },
  }),
};

export default function Reveal({
  children,
  delay = 0,
  y = 36,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      custom={{ y, delay }}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}
