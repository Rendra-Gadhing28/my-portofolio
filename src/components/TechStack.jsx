import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  SiLaravel,
  SiReact,
  SiVite,
  SiMysql,
  SiPostgresql,
  SiPhp,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
} from "react-icons/si";

import LogoLoop from "./logo/LogoLoop";


export default function TechStack() {
  return (
    <section id="stack" className="mx-auto items-center mt-4 align-center py-2 sm:px-10 sm:py-4">
      <LogoLoop />
    </section>
  );
}
