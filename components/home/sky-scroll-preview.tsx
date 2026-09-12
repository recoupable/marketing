"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import "./sky-scroll-preview.css";

type Geometry = { hero: number; viewport: number; inset: number; top: number; compact: boolean };

/** This route owns the scroll choreography; its content remains server rendered. */
export function SkyScrollPreview({ hero, statement, children }: {
  hero: ReactNode; statement: ReactNode; children: ReactNode;
}) {
  const scene = useRef<HTMLDivElement>(null);
  const foreground = useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: scene, offset: ["start start", "end end"] });

  useEffect(() => {
    const element = foreground.current;
    if (!element) return;
    const measure = () => {
      const heroElement = element.querySelector<HTMLElement>(".sky-hero");
      if (!heroElement) return;
      setGeometry({ hero: element.offsetHeight, viewport: window.innerHeight,
        inset: heroElement.getBoundingClientRect().left, top: heroElement.getBoundingClientRect().top - element.getBoundingClientRect().top, compact: window.innerWidth <= 760 });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    window.addEventListener("resize", measure);
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  // Delay the transition until the lower hero has reached the reading area.
  // Mobile uses a shorter travel distance but keeps a full paragraph reading hold.
  const phase = useTransform(scrollYProgress, (progress) => {
    if (!geometry) return 0;
    const { hero: height, viewport, compact } = geometry;
    const travel = height + viewport * (compact ? 1 : 1.5);
    const start = Math.max(0, height - viewport * 0.85);
    return (progress * travel - start) / (viewport * (compact ? 0.78 : 1));
  });
  const heroOpacity = useTransform(phase, [0, 0.65], [1, 0]);
  const cloudScale = useTransform(phase, [0, 1.4, 2.2], [1, 1.38, 1.5]);
  const cloudY = useTransform(phase, [0, 1], [0, -Math.max(0, (geometry?.hero ?? 0) - (geometry?.viewport ?? 0))]);
  const cloudClip = useTransform(phase, (value) => {
    const remaining = 1 - Math.max(0, Math.min(1, value / 0.65));
    const side = (geometry?.inset ?? 42) * remaining;
    // Top inset scrolls away naturally while the side margins open outward.
    const scroll = scrollYProgress.get() * ((geometry?.hero ?? 0) + (geometry?.viewport ?? 0) * (geometry?.compact ? 1 : 1.5));
    const top = Math.max(0, (geometry?.top ?? 42) - scroll);
    return `inset(${top}px ${side}px 0 round ${23 * remaining}px)`;
  });
  const whiteOpacity = useTransform(phase, [1.25, 1.95], [0, 1]);
  const statementOpacity = useTransform(phase, [0.45, 0.9], [0, 1]);
  const statementY = useTransform(phase, [0.45, 0.95], [36, 0]);
  const enhanced = geometry !== null && !reducedMotion && !(geometry.compact && geometry.viewport < 560);

  return <div className="sky-page sky-scroll-preview" id="sky-home" data-scroll-ready={enhanced}>
    <div className="sky-scroll-scene" ref={scene}>
      <div className="sky-scroll-stage" aria-hidden="true">
        <motion.div className="sky-scroll-cloud-window" style={{ clipPath: cloudClip }}>
          <motion.div className="sky-scroll-cloud" style={{ height: geometry?.hero, scale: cloudScale, y: cloudY }}>
            <Image src="/images/sky/hero-sky.webp" alt="" fill sizes="100vw" preload />
            <div className="sky-scroll-cloud-tint" />
          </motion.div>
          <motion.div className="sky-scroll-white" style={{ opacity: whiteOpacity }} />
        </motion.div>
      </div>
      <motion.div className="sky-page sky-scroll-hero" ref={foreground} style={enhanced ? { opacity: heroOpacity } : undefined}>
        <div className="sky-frame">{hero}</div>
      </motion.div>
      <div className="sky-scroll-mission">
        <motion.div className="sky-scroll-mission-copy sky-content" style={enhanced ? { opacity: statementOpacity, y: statementY } : undefined}>
          {statement}
        </motion.div>
      </div>
      <div className="sky-scroll-travel" aria-hidden="true" />
    </div>
    <div className="sky-page sky-scroll-rest"><div className="sky-frame">{children}</div></div>
  </div>;
}
