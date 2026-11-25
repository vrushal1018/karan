"use client";

import { useEffect, useRef } from "react";

const RAIN_HEARTS = ["💗", "💕", "🤍", "💖"];

function rnd(a: number, b: number) {
  return a + Math.random() * (b - a);
}

/** Spawns gently falling background hearts in a fixed overlay layer. */
export default function HeartRain() {
  const rainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = rainRef.current;
    if (!container) return;

    const timeouts = new Set<number>();

    const interval = window.setInterval(() => {
      const heart = document.createElement("i");
      heart.textContent = RAIN_HEARTS[Math.floor(rnd(0, RAIN_HEARTS.length))];
      heart.className =
        "animate-fall-heart absolute -top-[30px] not-italic opacity-50";
      heart.style.left = `${rnd(0, 100)}vw`;
      heart.style.fontSize = `${rnd(14, 30)}px`;
      heart.style.animationDuration = `${rnd(7, 13)}s`;
      container.appendChild(heart);

      const removeTimer = window.setTimeout(() => {
        heart.remove();
        timeouts.delete(removeTimer);
      }, 13000);
      timeouts.add(removeTimer);
    }, 900);

    return () => {
      window.clearInterval(interval);
      timeouts.forEach((id) => window.clearTimeout(id));
      timeouts.clear();
    };
  }, []);

  return (
    <div
      ref={rainRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    />
  );
}
