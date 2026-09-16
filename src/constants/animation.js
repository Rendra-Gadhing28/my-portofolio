export const EASE_CINEMATIC = [0.65, 0, 0.35, 1];
export const EASE_EXPO_OUT = [0.16, 1, 0.3, 1];

export const TRANSITION_FLUID = {
  duration: 1.05,
  ease: EASE_CINEMATIC,
};

export const TRANSITION_SNAPPY = {
  duration: 0.65,
  ease: EASE_CINEMATIC,
};

export const STAGGER_CASCADE = {
  staggerChildren: 0.09,
  delayChildren: 0.2,
};

export const SECTION_VIEWPORT_CONFIG = {
  once: false,
  amount: 0.25,
  margin: "-60px 0px",
};

export const CONTAINER_REVEAL = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: STAGGER_CASCADE,
  },
};

export const SLIDE_LEFT_ITEM = {
  hidden: { x: -60, opacity: 0, filter: "blur(6px)" },
  visible: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: TRANSITION_FLUID,
  },
};

export const SLIDE_RIGHT_ITEM = {
  hidden: { x: 60, opacity: 0, filter: "blur(6px)" },
  visible: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: TRANSITION_FLUID,
  },
};

export const FADE_UP_ITEM = {
  hidden: { y: 35, opacity: 0, filter: "blur(4px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: TRANSITION_FLUID,
  },
};
