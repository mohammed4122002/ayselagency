"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, MousePointerClick, X } from "lucide-react";

export default function BoardViewer({
  src,
  alt,
  hint,
  zoomLabel,
}: {
  src: string;
  alt: string;
  hint: string;
  zoomLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* browser-style frame with a scrollable board inside */}
      <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-2xl shadow-navy-900/20">
        {/* top bar */}
        <div className="flex items-center gap-2 border-b border-line bg-soft px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="mx-auto hidden items-center gap-1.5 rounded-full bg-white px-4 py-1 text-xs text-muted ring-1 ring-line sm:flex">
            <MousePointerClick size={12} />
            {hint}
          </span>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-1.5 rounded-full bg-navy-800 px-3.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-navy-700"
          >
            <Maximize2 size={13} />
            {zoomLabel}
          </button>
        </div>
        {/* scrollable viewport */}
        <div
          className="board-scroll max-h-[560px] overflow-y-auto"
          onClick={() => setOpen(true)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="w-full cursor-zoom-in" />
        </div>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] flex justify-center overflow-y-auto bg-navy-950/92 p-4 backdrop-blur-sm sm:p-8"
          >
            <button
              className="fixed end-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-white/20"
              aria-label="Close"
            >
              <X size={22} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              src={src}
              alt={alt}
              onClick={(e) => e.stopPropagation()}
              className="h-max w-full max-w-4xl rounded-xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
