"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

const FEATURES = [
  {
    id: "ai-screening",
    label: "AI Resume Screening",
    headline: "Screen smarter, hire faster",
    desc: "Let AI rank and shortlist candidates automatically — based on skills, experience, and role fit — so your team focuses only on the best matches.",
    screenshot: "/images/product-screenshot.png",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2l1.5 3.5L14 7l-3.5 1.5L9 12l-1.5-3.5L4 7l3.5-1.5L9 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M14 12l.75 1.75L16.5 14l-1.75.75L14 16.5l-.75-1.75L11.5 14l1.75-.75L14 12z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "job-management",
    label: "Job Management",
    headline: "Post & manage roles",
    desc: "Create and publish job listings in minutes across multiple channels. Control visibility, track applications, and manage every open role from one place.",
    screenshot: "/images/product-screenshot.png",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="3" y="4" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 9h6M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "candidate-pipeline",
    label: "Candidate Pipeline",
    headline: "Track every applicant",
    desc: "Manage candidates through a visual pipeline. Review CVs, leave notes, assign scores, and move candidates forward — without the spreadsheets.",
    screenshot: "/images/product-screenshot.png",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 15c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "interview-scheduling",
    label: "Interview Scheduling",
    headline: "Schedule interviews instantly",
    desc: "Coordinate interviews across teams with automated scheduling, calendar sync, and reminders — eliminating back-and-forth emails entirely.",
    screenshot: "/images/product-screenshot.png",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="3" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 2v2M12 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M2 7h14" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 10.5h.01M9 10.5h.01M12 10.5h.01M6 13h.01M9 13h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "career-page",
    label: "Career Page",
    headline: "Your branded careers hub",
    desc: "Launch a fully branded careers page that reflects your employer brand — no code needed. Attract the right talent with a seamless application experience.",
    screenshot: "/images/product-screenshot.png",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 9h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 2c-2 2-3 4.5-3 7s1 5 3 7M9 2c2 2 3 4.5 3 7s-1 5-3 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "analytics",
    label: "Analytics & Dashboards",
    headline: "Hiring insights that matter",
    desc: "Understand time-to-hire, source quality, team performance, and cost-per-hire with live dashboards built for decision makers.",
    screenshot: "/images/product-screenshot.png",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 13l4-4 3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 15h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "multi-tenant",
    label: "Multi-tenant & Agency",
    headline: "Built for agencies & enterprises",
    desc: "Run multiple clients or business units from a single platform. Full data isolation, white-labelling, and role-based access for every team.",
    screenshot: "/images/product-screenshot.png",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="8" width="6" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="10" y="5" width="6" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 8V5a4 4 0 0 1 4-4h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const AUTO_INTERVAL = 3500;

export default function ProductShowcase() {
  const { t } = useLanguage();
  const tabs = t.products.tabs;
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [prevActive, setPrevActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number) => {
    if (idx === active || animating) return;
    setPrevActive(active);
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 280);
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % FEATURES.length;
        setPrevActive(prev);
        setAnimating(true);
        setTimeout(() => setAnimating(false), 280);
        return next;
      });
    }, AUTO_INTERVAL);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabClick = (idx: number) => {
    goTo(idx);
    startTimer(); // reset auto-timer on manual click
  };

  const feature = { ...FEATURES[active], ...tabs[active] };

  return (
    <section
      id="products"
      className="relative w-full rounded-bl-[60px] rounded-br-[60px] pt-14 pb-16 sm:pt-16 sm:pb-20 overflow-hidden"
      style={{ background: "#010214" }}
    >
      {/* Radial glow — every.io style */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(51,92,255,0.09) 0%, transparent 70%)" }}
      />
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">

        {/* Section header */}
        <header className="text-center mb-10 sm:mb-14">
          <h2 className="font-stolzl text-h1 font-medium text-white">{t.products.title}</h2>
          <p className="font-stolzl text-body-lg text-hero-muted mt-3 max-w-[480px] mx-auto">
            {t.products.sub}
          </p>
        </header>

        {/* Product card */}
        <div className="w-full max-w-[1260px] mx-auto rounded-[30px] overflow-hidden"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr]">

            {/* ── Left panel ── */}
            <div className="flex flex-col gap-8 p-7 sm:p-9 border-b lg:border-b-0 lg:border-r border-white/[0.07]">

              {/* Logo + description */}
              <div className="flex flex-col gap-4">
                <Image
                  src="/images/hires-logo.png"
                  alt="Hires HR"
                  width={100}
                  height={36}
                  className="object-contain"
                />
                <p className="font-stolzl text-caption text-hero-muted leading-relaxed">
                  {t.products.desc}
                </p>
              </div>

              {/* Feature tabs */}
              <nav className="flex flex-col gap-1">
                {FEATURES.map((f, i) => { const tLabel = tabs[i]?.label ?? f.label; return { ...f, label: tLabel }; }).map((f, i) => {
                  const isActive = active === i;
                  return (
                    <button
                      key={f.id}
                      onClick={() => handleTabClick(i)}
                      className={`group flex items-center gap-3 text-left px-4 py-3 rounded-[12px] transition-all duration-200 ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-hero-muted hover:bg-white/[0.05] hover:text-white/80"
                      }`}
                    >
                      <span className={`shrink-0 transition-colors duration-200 ${isActive ? "text-white" : "text-hero-muted/60 group-hover:text-hero-muted"}`}>
                        {f.icon}
                      </span>
                      <span className="font-stolzl text-body-sm font-medium">{f.label}</span>
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-brand shrink-0" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Progress bar */}
              <div className="flex gap-1.5">
                {FEATURES.map((_, i) => (
                  <div key={i} className="flex-1 h-[3px] rounded-full bg-white/10 overflow-hidden">
                    {active === i && (
                      <div
                        key={active}
                        className="bar-fill h-full rounded-full bg-blue-brand"
                        style={{ "--bar-duration": `${AUTO_INTERVAL}ms` } as React.CSSProperties}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button className="w-fit bg-white text-navy font-stolzl text-body-sm font-medium px-5 py-3 rounded-[var(--radius-button)] hover:bg-blue-brand hover:text-white transition-colors shadow-sm">
                {t.products.cta}
              </button>
            </div>

            {/* ── Right panel: screenshot ── */}
            <div className="flex flex-col gap-6 p-7 sm:p-9">

              {/* Feature headline + desc */}
              <div
                style={{
                  transition: "opacity 0.28s ease, transform 0.28s ease",
                  opacity: animating ? 0 : 1,
                  transform: animating ? "translateY(6px)" : "translateY(0)",
                }}
              >
                <h3 className="font-stolzl text-h3 font-medium text-white mb-1">
                  {feature.headline}
                </h3>
                <p className="font-stolzl text-caption text-hero-muted leading-relaxed max-w-[520px]">
                  {feature.desc}
                </p>
              </div>

              {/* Screenshot */}
              <div
                className="relative w-full rounded-[16px] overflow-hidden bg-[#1a1a5e]"
                style={{
                  aspectRatio: "16 / 10",
                  transition: "opacity 0.28s ease",
                  opacity: animating ? 0 : 1,
                }}
              >
                {/* Browser chrome strip */}
                <div className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.06] border-b border-white/[0.07]">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  <span className="mx-auto font-stolzl text-[11px] text-white/30">
                    app.hireshr.com — {feature.label}
                  </span>
                </div>
                <div className="relative w-full" style={{ aspectRatio: "16 / 9.3" }}>
                  <Image
                    src={feature.screenshot}
                    alt={`${feature.label} screenshot`}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Dot nav */}
              <div className="flex items-center gap-2">
                {FEATURES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleTabClick(i)}
                    aria-label={`Go to ${FEATURES[i].label}`}
                    className={`rounded-full transition-all duration-300 ${
                      active === i
                        ? "w-5 h-[6px] bg-white"
                        : "w-[6px] h-[6px] bg-white/25 hover:bg-white/50"
                    }`}
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
