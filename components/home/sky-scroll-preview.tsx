"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useSkyWordReveal } from "./use-sky-word-reveal";
import "./sky-scroll-preview.css";

type Geometry = { hero: number; paragraph: number; viewport: number; compact: boolean };

/** This route owns the scroll choreography; its content remains server rendered. */
export function SkyScrollPreview({ hero, statement, children }: {
  hero: ReactNode; statement: ReactNode; children: ReactNode;
}) {
  const scene = useRef<HTMLDivElement>(null);
  const foreground = useRef<HTMLDivElement>(null);
  const mission = useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: scene, offset: ["start start", "end end"] });

  useEffect(() => {
    const element = foreground.current;
    if (!element) return;
    const paragraph = mission.current?.querySelector("p");
    const measure = () => {
      setGeometry({ hero: element.offsetHeight, paragraph: paragraph?.offsetHeight ?? 0, viewport: window.innerHeight,
        compact: window.innerWidth <= 760 });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    if (paragraph) observer.observe(paragraph);
    window.addEventListener("resize", measure);
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  // Delay the transition until the lower hero has reached the reading area.
  // Mobile uses a shorter travel distance with the same brief reading hold.
  const phase = useTransform(scrollYProgress, (progress) => {
    if (!geometry) return 0;
    const { hero: height, viewport, compact } = geometry;
    const travel = height + viewport * (compact ? 0.68 : 1.09);
    const start = Math.max(0, height - viewport * 0.85);
    return (progress * travel - start) / (viewport * (compact ? 0.78 : 1));
  });
  const heroOpacity = useTransform(phase, [0, 0.65], [1, 0]);
  // Finish the camera move before the first line crosses the viewport bottom.
  // Account for responsive text height and the mission's negative margin.
  const cloudProgress = useTransform(scrollYProgress, (progress) => {
    if (!geometry) return 0;
    const { hero: height, paragraph, viewport, compact } = geometry;
    const travel = height + viewport * (compact ? 0.68 : 1.09);
    const entrance = height - viewport * (compact ? 0.7 : 0.66) - paragraph / 2;
    return Math.max(0, Math.min(1, progress * travel / Math.max(1, entrance)));
  });
  const cloudScale = useTransform(cloudProgress, [0, 1], [1, 1.18]);
  const cloudY = useTransform(cloudProgress, [0, 1], [0, -Math.max(0, (geometry?.hero ?? 0) - (geometry?.viewport ?? 0))]);
  // The final word is sharp at 1.02; leave only a short beat before the exit.
  const whiteOpacity = useTransform(phase, [1.14, 1.79], [0, 1]);
  const statementOpacity = useTransform(phase, [1.14, 1.54], [1, 0]);
  const enhanced = geometry !== null && !reducedMotion && !(geometry.compact && geometry.viewport < 560);
  useSkyWordReveal(mission, phase, enhanced);

  return <div className="sky-page sky-scroll-preview" id="sky-home" data-scroll-ready={enhanced}>
    <div className="sky-scroll-scene" ref={scene}>
      <div className="sky-scroll-stage" aria-hidden="true">
        <div className="sky-scroll-cloud-window">
          <motion.div className="sky-scroll-cloud" style={{ height: geometry?.hero, scale: cloudScale, y: cloudY }}>
            <Image src="/images/sky/hero-sky.webp" alt="" fill sizes="100vw" preload />
            <div className="sky-scroll-cloud-tint" />
          </motion.div>
          <motion.div className="sky-scroll-white" style={{ opacity: whiteOpacity }} />
        </div>
      </div>
      <motion.div className="sky-page sky-scroll-hero" ref={foreground} style={enhanced ? { opacity: heroOpacity } : undefined}>
        <div className="sky-frame">{hero}</div>
      </motion.div>
      <div className="sky-scroll-mission">
        <motion.div ref={mission} className="sky-scroll-mission-copy sky-content" style={enhanced ? { opacity: statementOpacity } : undefined}>
          {statement}
        </motion.div>
      </div>
      <div className="sky-scroll-travel" aria-hidden="true" />
    </div>
    <div className="sky-page sky-scroll-rest"><div className="sky-frame">{children}</div></div>
  </div>;
}
