"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import DuoIllustration from "./DuoIllustration";
import HeartRain from "./HeartRain";
import TreasureChest from "./TreasureChest";

// Change these two names to make it yours
const TO = "Roshni";
const FROM = "Karan";

const LETTER = [
  `Dear ${TO},`,
  "I don’t know when it happened, but somewhere between the small talks and the long silences, you became my favourite place to be.",
  "You make ordinary days feel soft and bright. Your smile fixes things I didn’t know were broken.",
  "So here it is, plainly: I love you. Today, tomorrow, and on every sleepy, silly day after that.",
  "Forever yours,",
  `${FROM} ♥`,
];

const REASONS = [
  "Your smile",
  "Your hugs",
  "Your laugh",
  "Your kindness",
  "Our silly talks",
  "Just you",
];

const DATE_IDEAS = [
  "🍦 Ice cream walk",
  "🎬 Cozy movie night",
  "☕ Coffee & yap",
  "🌙 Stargazing",
  "🍜 Late-night noodles",
];

const HUG_REACTIONS = [
  "Cat & Panda are blushing! 🥺",
  "Squishy hug delivered! 🤗",
  "Heart meter is overflowing! 💖",
  "Sending 100x hugs right back! 💗",
  "Okay, never letting go now 🥰",
];

const NO_LABELS = [
  "Are you sure?",
  "Really?",
  "Think again",
  "Nope",
  "Too slow",
  "Pretty please?",
  "Don’t break my heart",
  "Wrong button",
  "Try Yes",
  "Missed me",
  "Cat says no",
  "Last chance",
];

const NO_HINTS = [
  "Oops, it moved 🙈",
  "Missed me!",
  "Try again? 😼",
  "Yes is right there…",
  "It’s okay, tap Yes 💗",
  "The panda is watching 🐼",
  "The cat is sad 😿",
  "You can’t catch it 😆",
  "Just say yes 🥺",
  "Almost! Not really 😜",
  "Yes is so much easier 💕",
  "I’ll wait forever 💖",
];

const BURST_HEARTS = ["💖", "💗", "💕", "❤️", "💘", "🩷"];

function rnd(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function burst(x: number, y: number, count: number) {
  for (let i = 0; i < count; i++) {
    const bit = document.createElement("div");
    bit.className = "pointer-events-none fixed left-0 top-0 z-30 will-change-transform";
    bit.textContent = BURST_HEARTS[i % BURST_HEARTS.length];
    bit.style.fontSize = `${rnd(18, 38)}px`;
    document.body.appendChild(bit);

    const angle = rnd(0, Math.PI * 2);
    const dist = rnd(80, Math.max(180, window.innerWidth * 0.45));
    const anim = bit.animate(
      [
        { transform: `translate(${x}px,${y}px) scale(.3)`, opacity: 1 },
        {
          transform: `translate(${x + Math.cos(angle) * dist}px,${y + Math.sin(angle) * dist - 40}px) scale(1.2) rotate(${rnd(-60, 60)}deg)`,
          opacity: 0,
        },
      ],
      { duration: rnd(900, 1600), easing: "cubic-bezier(.2,.8,.3,1)" }
    );
    anim.onfinish = () => bit.remove();
  }
}

function fallingShower(count: number) {
  const items = ["💖", "💗", "💕", "✨", "🌸", "💌", "🩷"];
  for (let i = 0; i < count; i++) {
    const bit = document.createElement("div");
    bit.className = "pointer-events-none fixed top-0 z-25 will-change-transform";
    bit.textContent = items[i % items.length];
    bit.style.left = `${rnd(4, 96)}vw`;
    bit.style.fontSize = `${rnd(18, 34)}px`;
    document.body.appendChild(bit);

    const anim = bit.animate(
      [
        {
          transform: `translateY(-40px) rotate(${rnd(-30, 30)}deg)`,
          opacity: 0.95,
        },
        {
          transform: `translate(${rnd(-40, 40)}px, 108vh) rotate(${rnd(120, 320)}deg)`,
          opacity: 0.2,
        },
      ],
      {
        duration: rnd(2400, 4600),
        delay: rnd(0, 600),
        easing: "ease-in",
      }
    );
    anim.onfinish = () => bit.remove();
  }
}

/** Interactive splash, treasure chest, typewriter love letter, and Yes/No prompt. */
export default function LoveLetterApp() {
  const [opened, setOpened] = useState(false);
  const [stage, setStage] = useState<"splash" | "chest" | "letter">("splash");
  const [chestOpen, setChestOpen] = useState(false);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [activeLine, setActiveLine] = useState<number>(-1);
  const [letterDone, setLetterDone] = useState(false);
  const [askVisible, setAskVisible] = useState(false);

  const [noTries, setNoTries] = useState(0);
  const [noPos, setNoPos] = useState<{ left: number; top: number } | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [hugsSent, setHugsSent] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const bigHeartRef = useRef<HTMLDivElement>(null);
  const askRef = useRef<HTMLDivElement>(null);
  const yesBtnRef = useRef<HTMLButtonElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const skippedRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };
  }, []);

  const startTypewriter = useCallback(() => {
    let pi = 0;

    const nextParagraph = () => {
      if (pi >= LETTER.length) {
        setActiveLine(-1);
        setLetterDone(true);
        schedule(() => {
          setAskVisible(true);
          askRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 500);
        return;
      }

      const currentIdx = pi;
      const fullText = LETTER[currentIdx];
      let ci = 0;

      setActiveLine(currentIdx);
      setTypedLines((prev) => {
        const next = [...prev];
        next[currentIdx] = "";
        return next;
      });

      const tick = () => {
        if (skippedRef.current) {
          setTypedLines((prev) => {
            const next = [...prev];
            next[currentIdx] = fullText;
            return next;
          });
          pi++;
          nextParagraph();
          return;
        }

        if (ci < fullText.length) {
          ci++;
          setTypedLines((prev) => {
            const next = [...prev];
            next[currentIdx] = fullText.slice(0, ci);
            return next;
          });
          schedule(tick, 32);
        } else {
          pi++;
          schedule(nextParagraph, 350);
        }
      };

      tick();
    };

    nextParagraph();
  }, [schedule]);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (opened) return;
    setOpened(true);

    const r = e.currentTarget.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    bigHeartRef.current?.animate(
      [
        { opacity: 1, transform: "translate(-50%,-50%) scale(.2)" },
        { opacity: 1, transform: "translate(-50%,-50%) scale(7)", offset: 0.6 },
        { opacity: 0, transform: "translate(-50%,-50%) scale(11)" },
      ],
      { duration: 1000, easing: "ease-out" }
    );

    burst(cx, cy, 34);
    fallingShower(28);
    schedule(() => burst(cx, cy, 22), 250);
    schedule(() => {
      setStage("chest");
    }, 700);
  };

  const handleOpenChest = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (chestOpen) return;
    setChestOpen(true);

    const r = e.currentTarget.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    burst(cx, cy, 32);
    fallingShower(14);
    schedule(() => burst(cx, cy - 20, 20), 220);
    schedule(() => {
      setStage("letter");
      startTypewriter();
    }, 850);
  };

  const dodgeNo = (
    e: React.PointerEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    if (e.cancelable) e.preventDefault();
    const noEl = noBtnRef.current;
    const yesEl = yesBtnRef.current;
    if (!noEl || !yesEl) return;

    const w = noEl.offsetWidth;
    const h = noEl.offsetHeight;
    const yr = yesEl.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let x = 0;
    let y = 0;
    let ok = false;
    let n = 0;

    do {
      x = rnd(12, Math.max(13, vw - w - 12));
      y = rnd(70, Math.max(71, vh - h - 70));
      ok =
        x + w < yr.left - 16 ||
        x > yr.right + 16 ||
        y + h < yr.top - 16 ||
        y > yr.bottom + 16;
      n++;
    } while (!ok && n < 40);

    setNoTries((prev) => prev + 1);
    setNoPos({ left: x, top: y });
  };

  const handleYes = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, 40);
    schedule(() => burst(window.innerWidth / 2, window.innerHeight / 2, 30), 300);
    setAccepted(true);

    for (let k = 0; k < 5; k++) {
      schedule(
        () =>
          burst(
            rnd(40, window.innerWidth - 40),
            rnd(80, window.innerHeight - 120),
            14
          ),
        500 + k * 450
      );
    }
  };

  const noLabel =
    noTries > 0 ? NO_LABELS[(noTries - 1) % NO_LABELS.length] : "No";
  const hintText =
    noTries > 0 ? NO_HINTS[(noTries - 1) % NO_HINTS.length] : "";
  const noScale = Math.max(1 - noTries * 0.07, 0.6);
  const yesScale = Math.min(1 + noTries * 0.08, 1.45);

  return (
    <>
      <HeartRain />

      {/* Splash screen */}
      <section
        className={`splash-bg fixed inset-0 z-20 flex flex-col items-center justify-center gap-[26px] transition-opacity duration-[800ms] ${
          stage !== "splash" ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <h1 className="m-0 px-5 text-center font-hand text-[clamp(2.2rem,9vw,3.6rem)] font-bold leading-[1.05] text-pink-d">
          I made something
          <br />
          just for you
        </h1>

        <button
          type="button"
          onClick={handleOpen}
          disabled={opened}
          aria-label="Tap the heart to open"
          className="animate-pulse-heart grid h-28 w-28 place-items-center rounded-full bg-pink shadow-[0_10px_0_var(--pink-d),0_18px_30px_rgba(230,61,134,0.35)] transition-[transform,box-shadow] duration-150 active:translate-y-2 active:shadow-[0_2px_0_var(--pink-d)]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="#fff"
            className="h-[54px] w-[54px] drop-shadow-[0_2px_4px_rgba(230,61,134,0.35)]"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>

        <p className="m-0 font-bold opacity-70">Tap the heart</p>
      </section>

      <div
        ref={bigHeartRef}
        className="pointer-events-none fixed left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 scale-[0.2] text-[40px] opacity-0"
      >
        💖
      </div>

      {/* Treasure chest stage */}
      {stage === "chest" && (
        <section className="relative z-[2]">
          <TreasureChest isOpen={chestOpen} onOpen={handleOpenChest} />
        </section>
      )}

      {/* Main letter & question */}
      {stage === "letter" && (
        <main className="relative z-[2] mx-auto max-w-[560px] px-[18px] pb-20 pt-7 text-center">
          <div className="mb-1 inline-block rounded-full border-2 border-[#3a2a2e] bg-white px-[13px] py-[7px] text-[0.8rem] font-bold text-[#3a2a2e]">
            Reply me
          </div>

          <DuoIllustration />

          <div
            onClick={() => {
              skippedRef.current = true;
            }}
            title="Tap to show the whole letter"
            className="paper-ruled relative mt-2.5 min-h-[220px] cursor-pointer rounded-b-[18px] rounded-t-[6px] px-6 pb-[30px] pt-[26px] text-left before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:rounded-t-[6px] before:bg-pink before:content-['']"
          >
            {typedLines.map((line, idx) => (
              <p
                key={idx}
                className={`m-0 mb-[34px] font-hand text-[1.65rem] leading-[34px] text-ink last:mb-0 ${
                  activeLine === idx ? "cursor-heart" : ""
                }`}
              >
                {line}
              </p>
            ))}
          </div>

          {!letterDone && (
            <div className="mt-2.5 text-[0.8rem] opacity-60">
              Tap the letter to read it faster
            </div>
          )}

          <div
            ref={askRef}
            style={{ transform: askVisible ? "none" : "translateY(16px)" }}
            className={`mt-11 transition-all duration-[800ms] ${
              askVisible
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            <h2 className="m-0 mb-[18px] text-[clamp(2rem,9vw,2.8rem)] font-bold">
              Do you love me?
            </h2>

            {!accepted && (
              <>
                <div className="flex min-h-[56px] justify-center gap-4">
                  <button
                    ref={yesBtnRef}
                    type="button"
                    onClick={handleYes}
                    style={{ transform: `scale(${yesScale})` }}
                    className="rounded-full bg-pink px-[34px] py-[13px] text-[1.15rem] font-bold text-on-pink shadow-[0_5px_0_var(--pink-d)] transition-transform duration-150 active:translate-y-1 active:shadow-[0_1px_0_var(--pink-d)]"
                  >
                    Yes
                  </button>

                  <button
                    ref={noBtnRef}
                    type="button"
                    onPointerDown={dodgeNo}
                    onMouseEnter={dodgeNo}
                    onClick={dodgeNo}
                    style={{
                      transform: `scale(${noScale})`,
                      ...(noPos
                        ? { left: `${noPos.left}px`, top: `${noPos.top}px` }
                        : {}),
                    }}
                    className={`select-none touch-none rounded-full bg-pink px-[34px] py-[13px] text-[1.15rem] font-bold text-on-pink shadow-[0_5px_0_var(--pink-d)] [-webkit-tap-highlight-color:transparent] ${
                      noPos
                        ? "fixed z-[15] transition-[left,top,transform] duration-[250ms]"
                        : "relative transition-transform duration-150 active:translate-y-1 active:shadow-[0_1px_0_var(--pink-d)]"
                    }`}
                  >
                    {noLabel}
                  </button>
                </div>

                <p
                  aria-live="polite"
                  className="m-0 mt-4 min-h-[1.4em] font-bold text-pink-d"
                >
                  {hintText}
                </p>
              </>
            )}

            {accepted && (
              <div className="mt-2.5">
                <h3 className="my-2.5 font-hand text-[2.6rem] text-pink-d">
                  I knew it. I love you more.
                </h3>
                <div className="mt-3.5 flex flex-wrap justify-center gap-2.5">
                  {REASONS.map((reason, i) => (
                    <span
                      key={reason}
                      style={{ animationDelay: `${0.2 + i * 0.18}s` }}
                      className="animate-pop-chip scale-75 rounded-full bg-paper px-[15px] py-[9px] font-bold opacity-0 shadow-[0_3px_0_var(--paper-line)]"
                    >
                      ♥ {reason}
                    </span>
                  ))}
                </div>

                {/* Cute post-acceptance mini activities */}
                <div className="mt-7 rounded-[18px] bg-paper p-5 shadow-[0_10px_24px_rgba(122,74,58,0.14)]">
                  <p className="m-0 font-hand text-[1.8rem] font-bold text-pink-d">
                    One more cute thing…
                  </p>

                  <div className="mt-3 flex flex-col items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        const r = e.currentTarget.getBoundingClientRect();
                        burst(r.left + r.width / 2, r.top + r.height / 2, 16);
                        setHugsSent((c) => c + 1);
                      }}
                      className="rounded-full bg-pink px-6 py-2.5 text-base font-bold text-on-pink shadow-[0_4px_0_var(--pink-d)] transition-transform duration-150 active:translate-y-1 active:shadow-[0_1px_0_var(--pink-d)]"
                    >
                      Send a squishy hug 🤗 {hugsSent > 0 ? `(${hugsSent})` : ""}
                    </button>

                    {hugsSent > 0 && (
                      <p className="m-0 text-sm font-bold text-pink-d">
                        {HUG_REACTIONS[(hugsSent - 1) % HUG_REACTIONS.length]}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 border-t border-paper-line pt-4">
                    <p className="m-0 mb-2.5 text-sm font-bold opacity-80">
                      Pick our next cute date:
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {DATE_IDEAS.map((idea) => {
                        const isPicked = selectedDate === idea;
                        return (
                          <button
                            key={idea}
                            type="button"
                            onClick={(e) => {
                              const r = e.currentTarget.getBoundingClientRect();
                              burst(r.left + r.width / 2, r.top + r.height / 2, 14);
                              setSelectedDate(idea);
                            }}
                            className={`rounded-full px-3.5 py-1.5 text-sm font-bold transition-all duration-150 ${
                              isPicked
                                ? "scale-105 bg-pink text-on-pink shadow-[0_3px_0_var(--pink-d)]"
                                : "bg-bg text-ink shadow-[0_2px_0_var(--paper-line)] hover:scale-105"
                            }`}
                          >
                            {idea}
                          </button>
                        );
                      })}
                    </div>

                    {selectedDate && (
                      <p className="m-0 mt-3 font-hand text-[1.45rem] font-bold text-pink-d">
                        Date locked in: {selectedDate} — screenshot &amp; send it to me! 💌
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      )}
    </>
  );
}
