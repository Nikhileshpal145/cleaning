"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ScrollEffects() {
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
      gsap.fromTo(element, { autoAlpha: 0, y: 26 }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: element, start: "top 91%", once: true },
      });
    });

    gsap.to(".hero-image img", {
      yPercent: 8,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.6 },
    });

    gsap.to(".process-track-fill", {
      scaleY: 1,
      ease: "none",
      scrollTrigger: { trigger: ".process-steps", start: "top 70%", end: "bottom 75%", scrub: 0.4 },
    });

    gsap.utils.toArray<HTMLElement>(".process-step").forEach((step) => {
      ScrollTrigger.create({
        trigger: step,
        start: "top 72%",
        end: "bottom 30%",
        onToggle: ({ isActive }) => step.classList.toggle("is-active", isActive),
      });
    });
  }, { revertOnUpdate: true });

  return null;
}