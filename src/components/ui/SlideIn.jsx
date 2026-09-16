import { motion } from "framer-motion";
import { EASE_CINEMATIC } from "../../constants/animation";

export default function SlideIn({
  children,
  direction = "left",
  delay = 0.2, // 200ms anticipation pause
  duration = 1.05,
  className = "",
  amount = 0.25,
}) {
  const getInitialOffset = () => {
    switch (direction) {
      case "left":
        return { x: -65, y: 0 };
      case "right":
        return { x: 65, y: 0 };
      case "up":
        return { x: 0, y: 40 };
      case "down":
        return { x: 0, y: -40 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getInitialOffset();

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
        filter: "blur(6px)",
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: false, amount, margin: "-60px 0px" }}
      transition={{
        duration,
        delay,
        ease: EASE_CINEMATIC,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
