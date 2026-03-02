"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { useLanguage } from "../context/LanguageContext";

const TABS = ["mission", "vision"] as const;
type Tab = (typeof TABS)[number];

const ICONS = {
  mission: ["/images/icon-build.svg", "/images/icon-empower.svg", "/images/icon-transform.svg"],
  vision:  ["/images/icon-build.svg", "/images/icon-empower.svg", "/images/icon-transform.svg"],
};

export default function MissionVision() {
  const { t } = useLanguage();
  const CONTENT = {
    mission: { ...t.mission.content.mission, items: t.mission.content.mission.items.map((item, i) => ({ ...item, icon: ICONS.mission[i] })) },
    vision:  { ...t.mission.content.vision,  items: t.mission.content.vision.items.map((item, i) => ({ ...item, icon: ICONS.vision[i] })) },
  };
  const [active, setActive] = useState<Tab>("mission");
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef<Tab>("mission");

  const switchTab = useCallback(
    (tab: Tab) => {
      if (tab === activeRef.current || animating) return;
      activeRef.current = tab;
      setAnimating(true);
      setTimeout(() => {
        setActive(tab);
        setAnimating(false);
      }, 260);
    },
    [animating]
  );

  // Position-based scroll: track how far the section has moved through the viewport.
  // Switch at the midpoint so the transition feels natural as the user scrolls.
  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 = section top at viewport bottom, 1 = section bottom at viewport top
      const progress = (vh - rect.top) / (rect.height + vh);
      if (progress >= 0.52) switchTab("vision");
      else if (progress < 0.48) switchTab("mission");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [switchTab]);

  const content = CONTENT[active];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 sm:py-20 lg:py-32 overflow-hidden"
      style={{ background: "#010214" }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(51,92,255,0.07) 0%, transparent 70%)" }}
      />
      {/* Left accent stripe */}
      <div
        className="absolute left-0 top-0 w-1 h-full pointer-events-none transition-all duration-700"
        style={{
          background:
            active === "mission"
              ? "linear-gradient(180deg,#335cff,#3ab874)"
              : "linear-gradient(180deg,#3ab874,#335cff)",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* ── Left: clickable tabs ── */}
          <div className="lg:col-span-4 shrink-0 lg:sticky lg:top-28 lg:self-start flex flex-col gap-2">
            {TABS.map((tab) => {
              const isActive = active === tab;
              return (
                <button
                  key={tab}
                  onClick={() => switchTab(tab)}
                  className="group relative text-left transition-all duration-300 rounded-[14px] px-5 py-4"
                  style={{
                    background: isActive ? "rgba(9,11,30,0.8)" : "transparent",
                    border: isActive ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
                  }}
                >
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full transition-all duration-300"
                    style={{
                      height: isActive ? 32 : 0,
                      background: isActive ? "var(--color-blue-brand)" : "transparent",
                    }}
                  />
                  <span
                    className="font-stolzl text-h1 font-medium transition-all duration-300"
                    style={{ color: isActive ? "#f0ede6" : "rgba(240,237,230,0.25)" }}
                  >
                    {CONTENT[tab].heading}
                  </span>
                  {isActive && (
                    <span className="block font-stolzl text-caption mt-1" style={{ color: "rgba(240,237,230,0.5)" }}>
                      {tab === "mission" ? t.mission.missionSub : t.mission.visionSub}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Scroll hint */}
            <p className="font-stolzl text-caption mt-4 pl-5 hidden lg:flex items-center gap-1.5" style={{ color: "rgba(240,237,230,0.3)" }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 2v8M3.5 7.5L6 10l2.5-2.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t.mission.scrollHint}
            </p>
          </div>

          {/* ── Right: animated content ── */}
          <div className="lg:col-span-8">
            <div
              style={{
                transition: "opacity 0.26s ease, transform 0.26s ease",
                opacity: animating ? 0 : 1,
                transform: animating ? "translateY(10px)" : "translateY(0)",
              }}
            >
              <p className="font-stolzl text-h3 leading-[1.55] max-w-[720px]" style={{ color: "rgba(240,237,230,0.5)" }}>
                {content.body}
              </p>

              <ul className="mt-12 sm:mt-14 flex flex-col gap-6 max-w-[520px]">
                {content.items.map((item, i) => (
                  <li
                    key={item.title}
                    className="flex items-start gap-4"
                    style={{
                      transition: "opacity 0.35s ease, transform 0.35s ease",
                      transitionDelay: animating ? "0ms" : `${i * 60}ms`,
                      opacity: animating ? 0 : 1,
                      transform: animating ? "translateY(8px)" : "translateY(0)",
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-colors duration-500"
                      style={{
                        background:
                          active === "mission"
                            ? "var(--color-blue-accent)"
                            : "var(--color-green-cta)",
                      }}
                    >
                      <Image src={item.icon} alt={item.title} width={28} height={28} />
                    </div>
                    <div className="flex flex-col gap-1 pt-1">
                      <h4 className="font-stolzl text-h4 font-medium text-white">
                        {item.title}
                      </h4>
                      <p className="font-stolzl text-caption leading-[1.5]" style={{ color: "rgba(240,237,230,0.5)" }}>
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Dot indicators */}
              <div className="flex items-center gap-2 mt-10">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => switchTab(tab)}
                    aria-label={`Go to ${tab}`}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: active === tab ? 24 : 8,
                      height: 8,
                      background: active === tab ? "var(--color-blue-brand)" : "rgba(255,255,255,0.18)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
