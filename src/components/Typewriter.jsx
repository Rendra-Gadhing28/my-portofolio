import { useEffect, useState } from "react";

/**
 * Terminal-style typewriter. Types a string in, holds, deletes, moves to
 * the next string in the list. Respects prefers-reduced-motion by simply
 * showing the first word statically.
 */
export default function Typewriter({
  words,
  typeSpeed = 55,
  deleteSpeed = 30,
  holdTime = 1600,
  className = "",
}) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState(reduced ? words[0] : "");
  const [phase, setPhase] = useState(reduced ? "done" : "typing");

  useEffect(() => {
    if (reduced) return;
    const current = words[wordIndex];
    let timeout;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typeSpeed
        );
      } else {
        timeout = setTimeout(() => setPhase("holding"), holdTime);
      }
    } else if (phase === "holding") {
      timeout = setTimeout(() => setPhase("deleting"), 200);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeout = setTimeout(
          () => setText(text.slice(0, -1)),
          deleteSpeed
        );
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, wordIndex, words, typeSpeed, deleteSpeed, holdTime, reduced]);

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[1px] animate-blink bg-accent-soft align-middle" />
    </span>
  );
}
