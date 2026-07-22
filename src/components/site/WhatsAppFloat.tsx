"use client";

import { motion } from "framer-motion";

export default function WhatsAppFloat({ number }: { number: string }) {
  if (!number) return null;
  const clean = number.replace(/[^0-9]/g, "");
  return (
    <motion.a
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
      href={`https://wa.me/${clean}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 start-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/35 transition-transform hover:scale-110"
    >
      <svg width="27" height="27" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2.05 22l5.3-1.39c1.45.79 3.08 1.21 4.7 1.21 5.46 0 9.9-4.44 9.9-9.9S17.5 2 12.04 2m.01 1.67c4.54 0 8.23 3.69 8.23 8.23s-3.69 8.23-8.23 8.23c-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.2 8.2 0 0 1-1.26-4.38c.01-4.54 3.7-8.22 8.24-8.22m-3.4 4.42c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28-.25-.13-1.46-.72-1.69-.8-.22-.09-.39-.13-.55.12-.17.25-.64.8-.78.96-.15.17-.29.19-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.55-1.34-.76-1.84-.2-.48-.4-.42-.55-.42z" />
      </svg>
    </motion.a>
  );
}
