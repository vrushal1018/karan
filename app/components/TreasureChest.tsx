"use client";

import type React from "react";

interface TreasureChestProps {
  isOpen: boolean;
  onOpen: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/** Cute interactive treasure chest that pops open on tap to reveal the letter. */
export default function TreasureChest({ isOpen, onOpen }: TreasureChestProps) {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center gap-5 px-4 text-center">
      <p className="m-0 font-hand text-[clamp(2rem,8vw,3rem)] font-bold leading-tight text-pink-d">
        A little surprise is inside…
      </p>

      <button
        type="button"
        onClick={onOpen}
        disabled={isOpen}
        aria-label="Tap the treasure chest to open"
        className={`group relative grid place-items-center rounded-3xl bg-transparent p-4 transition-transform duration-300 ${
          isOpen
            ? "scale-105 cursor-default"
            : "animate-pulse-heart cursor-pointer hover:scale-105 active:scale-95"
        }`}
      >
        <svg
          viewBox="0 0 200 170"
          className="h-44 w-52 drop-shadow-[0_14px_24px_rgba(122,74,58,0.24)]"
          role="img"
          aria-label="A cute treasure chest"
        >
          {/* Soft ground shadow */}
          <ellipse cx="100" cy="154" rx="72" ry="10" fill="#7a4a3a" opacity="0.18" />

          {/* Inner glow & peeking letter when open */}
          {isOpen && (
            <g>
              <polygon
                points="42,84 158,84 176,22 24,22"
                fill="#ffd9e4"
                opacity="0.55"
              />
              <g className="transition-transform duration-500">
                <rect
                  x="70"
                  y="44"
                  width="60"
                  height="42"
                  rx="6"
                  fill="#fffaf6"
                  stroke="#ff5fa2"
                  strokeWidth="2.5"
                />
                <path
                  d="M72 48 L100 68 L128 48"
                  fill="none"
                  stroke="#ff5fa2"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text x="100" y="38" fontSize="18" textAnchor="middle">
                  💖
                </text>
              </g>
            </g>
          )}

          {/* Chest base */}
          <rect
            x="34"
            y="80"
            width="132"
            height="68"
            rx="12"
            fill="#8c5443"
            stroke="#5e3428"
            strokeWidth="3"
          />
          {/* Base planks */}
          <line x1="36" y1="104" x2="164" y2="104" stroke="#6e3f31" strokeWidth="2.5" />
          <line x1="36" y1="126" x2="164" y2="126" stroke="#6e3f31" strokeWidth="2.5" />

          {/* Gold/Pink vertical bands */}
          <rect x="48" y="80" width="12" height="68" fill="#ffbe5c" stroke="#5e3428" strokeWidth="2" />
          <rect x="140" y="80" width="12" height="68" fill="#ffbe5c" stroke="#5e3428" strokeWidth="2" />

          {/* Chest lid (lifts & tilts when open) */}
          <g
            style={{
              transformOrigin: "34px 80px",
              transform: isOpen ? "translateY(-14px) rotate(-22deg)" : "none",
              transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <path
              d="M32 80 C32 42, 168 42, 168 80 Z"
              fill="#a36450"
              stroke="#5e3428"
              strokeWidth="3"
            />
            <path
              d="M48 80 C48 52, 60 52, 60 80 Z"
              fill="#ffbe5c"
              stroke="#5e3428"
              strokeWidth="2"
            />
            <path
              d="M140 80 C140 52, 152 52, 152 80 Z"
              fill="#ffbe5c"
              stroke="#5e3428"
              strokeWidth="2"
            />
            <rect
              x="30"
              y="74"
              width="140"
              height="10"
              rx="5"
              fill="#ffbe5c"
              stroke="#5e3428"
              strokeWidth="2.5"
            />
          </g>

          {/* Heart clasp lock */}
          <g
            style={{
              transform: isOpen ? "translateY(8px)" : "none",
              transition: "transform 0.35s ease",
            }}
          >
            <path
              d="M100 105 C100 105 84 95 84 85 C84 79 89 75 94 75 C97 75 99 77 100 79 C101 77 103 75 106 75 C111 75 116 79 116 85 C116 95 100 105 100 105 Z"
              fill="#ff5fa2"
              stroke="#5e3428"
              strokeWidth="2.5"
            />
            <circle cx="94" cy="83" r="2.2" fill="#ffe9ef" />
          </g>
        </svg>
      </button>

      <p className="m-0 font-bold opacity-75">
        {isOpen ? "Opening your letter…" : "Tap the chest to open"}
      </p>
    </div>
  );
}
