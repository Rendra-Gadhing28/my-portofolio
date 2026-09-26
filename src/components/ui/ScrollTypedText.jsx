import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function WordChunk({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const y = useTransform(progress, range, [3, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block mr-[0.25em] last:mr-0 will-change-transform text-fg"
    >
      {children}
    </motion.span>
  );
}

export default function ScrollTypedText({
  text = "",
  className = "",
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.45"],
  });

  // Group text into sensible word chunks (2-3 words each) to cut subscriber count by 65%
  const words = text.split(" ");
  const chunks = [];
  for (let i = 0; i < words.length; i += 2) {
    chunks.push(words.slice(i, i + 2).join(" "));
  }

  return (
    <p ref={containerRef} className={`leading-[1.75] ${className}`}>
      {chunks.map((chunk, i) => {
        const start = i / chunks.length;
        const end = start + 1 / chunks.length;
        return (
          <WordChunk key={i} progress={scrollYProgress} range={[start, end]}>
            {chunk}
          </WordChunk>
        );
      })}
    </p>
  );
}
