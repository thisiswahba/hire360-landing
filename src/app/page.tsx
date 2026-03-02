"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SavingsCalculator from "./components/SavingsCalculator";
import MissionVision from "./components/MissionVision";
import ProductShowcase from "./components/ProductShowcase";
import Navbar from "./components/Navbar";
import HeroBackground from "./components/HeroBackground";
import { useLanguage } from "./context/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease, delay },
});

const MARQUEE_ITEMS = [
  "Noon", "STC", "Aramco", "SABIC", "Al Rajhi",
  "Riyad Bank", "Ma'aden", "Saudi Telecom", "NEOM", "Vision 2030",
  "Noon", "STC", "Aramco", "SABIC", "Al Rajhi",
  "Riyad Bank", "Ma'aden", "Saudi Telecom", "NEOM", "Vision 2030",
];

export default function Home() {
  const { t, isRTL } = useLanguage();

  return (
    <div className="relative w-full overflow-x-hidden" style={{ background: "#010214" }}>

      {/* ========== NAVBAR ========== */}
      <Navbar />

      {/* ========== HERO SECTION ========== */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        className="relative w-[98%] mx-auto mt-[10px] min-h-[580px] sm:min-h-[640px] lg:h-[867px] rounded-[32px] sm:rounded-[40px] lg:rounded-[50px] overflow-hidden flex flex-col lg:block"
        style={{ background: "#010214" }}
      >
        {/* WebGL animated background */}
        <HeroBackground />

        {/* Radial gradient overlay — every.io style */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            background: "radial-gradient(ellipse 80% 60% at 65% 40%, rgba(9,44,164,0.22) 0%, rgba(1,2,20,0) 70%)",
          }}
        />

        {/* Mobile/tablet: portrait as faded background */}
        <div className="lg:hidden absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
          <Image
            src="/images/businessman.png"
            alt=""
            fill
            className="object-cover object-top opacity-15"
            style={{ objectPosition: isRTL ? "left top" : "right top" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(1,2,20,0.6) 0%, transparent 40%, rgba(1,2,20,0.9) 100%)" }} />
        </div>

        {/* Desktop: gradient strips */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
          <div
            className="absolute top-0 w-[30%] h-full"
            style={{
              [isRTL ? "left" : "right"]: 0,
              background: "linear-gradient(180deg, rgba(212,197,169,0.10) 0%, rgba(9,44,164,0.12) 40%, rgba(1,2,20,0.65) 100%)",
            }}
          />
        </div>

        {/* Desktop: portrait */}
        <div
          className="hidden lg:block absolute top-[50px] w-[654px] h-[870px]"
          style={{ [isRTL ? "left" : "right"]: 0, zIndex: 3 }}
        >
          <Image src="/images/businessman.png" alt="Professional portrait" fill className="object-cover object-top" />
          <div
            className="absolute inset-0"
            style={{
              background: isRTL
                ? "linear-gradient(to left, transparent 55%, #010214 100%)"
                : "linear-gradient(to right, transparent 55%, #010214 100%)",
            }}
          />
        </div>

        {/* Hero content */}
        <div
          className={`relative flex flex-col gap-6 px-6 sm:px-10 pt-28 sm:pt-32 pb-14 items-center text-center lg:absolute lg:px-0 lg:pt-0 lg:pb-0 lg:top-1/2 lg:-translate-y-1/2 lg:mt-[42px] lg:max-w-[680px] ${isRTL ? "lg:right-[92px] lg:items-start lg:text-right" : "lg:left-[92px] lg:items-start lg:text-left"}`}
          style={{ zIndex: 10 }}
        >
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full"
            style={{ border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.04)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-cta" style={{ boxShadow: "0 0 6px #3ab874" }} />
            <span className="font-stolzl text-caption tracking-wide" style={{ color: "rgba(240,237,230,0.55)" }}>
              HR Platform for Saudi Arabia
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.2 }}
            className="font-stolzl text-h1 sm:text-display font-bold text-white"
          >
            {t.hero.headline1}{" "}
            <span
              className="inline-block px-2 pb-1 pt-0.5 rounded-[6px]"
              style={{ background: "linear-gradient(135deg, #335cff 0%, #4154f2 100%)" }}
            >
              {t.hero.highlight}
            </span>{" "}
            {t.hero.headline2}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.4 }}
            className="font-stolzl text-body sm:text-body-lg max-w-[520px] lg:max-w-[600px]"
            style={{ color: "rgba(240,237,230,0.55)" }}
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.6 }}
            className="flex items-center gap-4 flex-wrap"
            style={{ justifyContent: isRTL ? "flex-end" : "flex-start" }}
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-blue-brand text-white font-stolzl font-medium text-body-sm px-8 py-4 rounded-xl hover:bg-[#2a4fdd] transition-colors"
            >
              {t.hero.cta}
            </motion.button>
            <button
              className="font-stolzl text-body-sm transition-colors px-2"
              style={{ color: "rgba(240,237,230,0.4)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(240,237,230,0.8)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(240,237,230,0.4)"; }}
            >
              See how it works →
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* ========== MARQUEE TRUST STRIP ========== */}
      <section className="relative w-full py-10 overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none" style={{ zIndex: 10, background: "linear-gradient(to right, #010214, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none" style={{ zIndex: 10, background: "linear-gradient(to left, #010214, transparent)" }} />

        <p className="text-center font-stolzl text-caption tracking-widest uppercase mb-6" style={{ color: "rgba(240,237,230,0.25)" }}>
          Trusted by leading companies
        </p>
        <div className="flex overflow-hidden">
          <div className="marquee-track flex items-center gap-14 whitespace-nowrap">
            {MARQUEE_ITEMS.map((name, i) => (
              <span
                key={i}
                className="font-stolzl text-body-sm font-medium shrink-0"
                style={{ color: "rgba(240,237,230,0.18)", letterSpacing: "0.06em" }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHAT WE DO SECTION ========== */}
      <section id="about" className="relative w-full py-20 sm:py-24 lg:py-32">
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(51,92,255,0.06) 0%, transparent 70%)" }}
        />

        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 relative">

          <motion.header
            {...fadeUp(0)}
            className="text-center max-w-[580px] mx-auto mb-14 sm:mb-16"
          >
            <p className="font-stolzl text-caption font-medium tracking-widest uppercase mb-3" style={{ color: "#d4c5a9" }}>
              What We Do
            </p>
            <h2 className="font-stolzl text-h1 font-medium text-white">{t.whatWeDo.title}</h2>
            <p className="font-stolzl text-body-sm mt-3 max-w-[480px] mx-auto" style={{ color: "rgba(240,237,230,0.5)" }}>
              {t.whatWeDo.sub}
            </p>
          </motion.header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {(["-top-[24px] -left-[22px]", "-top-[24px] -left-[147px]", "-top-[141px] -left-[23px]"] as const)
              .map((imgOffset, i) => ({ imgOffset, ...t.whatWeDo.cards[i] }))
              .map(({ imgOffset, title, desc }, i) => (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, ease, delay: i * 0.12 }}
                  className="flex flex-col items-center text-center gap-6 p-8 lg:p-10 rounded-[var(--radius-card)] transition-all duration-300 group cursor-default"
                  style={{
                    background: "rgba(9,11,30,0.6)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(13,16,40,0.8)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.13)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(9,11,30,0.6)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <div
                    className="w-[100px] h-[101px] relative overflow-hidden shrink-0 rounded-[16px]"
                    style={{ background: "rgba(51,92,255,0.08)" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/icons-sprite.png" alt={title} className={`absolute ${imgOffset} w-[278px] h-[278px] max-w-none opacity-70`} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-stolzl text-h4 font-medium text-white">{title}</h3>
                    <p className="font-stolzl text-caption leading-6" style={{ color: "rgba(240,237,230,0.45)" }}>{desc}</p>
                  </div>
                </motion.article>
              ))}
          </div>

        </div>
      </section>

      {/* ========== OUR PRODUCTS SECTION ========== */}
      <ProductShowcase />

      {/* ========== SAVINGS CALCULATOR SECTION ========== */}
      <SavingsCalculator />

      {/* ========== OUR MISSION / VISION SECTION ========== */}
      <MissionVision />

      {/* ========== CTA SECTION ========== */}
      <motion.section
        {...fadeUp(0)}
        id="contact"
        className="relative z-10 w-full pt-10 pb-0 lg:-mb-[205px]"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(58,184,116,0.05) 0%, transparent 70%)" }}
        />

        <div className="w-full max-w-[min(1287px,calc(100%-40px))] mx-auto relative">

          {/* ── Mobile / Tablet CTA ── */}
          <div
            className="lg:hidden rounded-[28px] sm:rounded-[32px] p-7 sm:p-10 flex flex-col gap-6"
            style={{
              background: "linear-gradient(135deg, #0f2e1e 0%, #3ab874 100%)",
              border: "1px solid rgba(58,184,116,0.25)",
            }}
          >
            <h2
              className="font-stolzl text-[32px] sm:text-[40px] font-bold text-white leading-[1.3] tracking-[-1.2px]"
              style={{ textAlign: isRTL ? "right" : "left" }}
            >
              {t.cta.title}
            </h2>
            <div className="flex flex-wrap gap-2" style={{ justifyContent: isRTL ? "flex-end" : "flex-start" }}>
              {t.cta.pills.map((pill) => (
                <div
                  key={pill}
                  className="flex items-center gap-2 rounded-[30px] px-4 py-2"
                  style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)" }}
                >
                  <Image src="/images/check.svg" alt="" width={16} height={16} />
                  <span className="font-stolzl text-body-sm text-white font-medium">{pill}</span>
                </div>
              ))}
            </div>
            <div style={{ textAlign: isRTL ? "right" : "left" }}>
              <button
                className="font-stolzl font-medium text-body-sm px-5 py-3 rounded-[var(--radius-button)] transition-colors"
                style={{ background: "white", color: "#010214" }}
              >
                {t.cta.button}
              </button>
            </div>
          </div>

          {/* ── Desktop CTA ── */}
          <div
            className="hidden lg:block relative w-full h-[410px] rounded-[40px] overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0a1f15 0%, #1a5c3a 50%, #3ab874 100%)",
              border: "1px solid rgba(58,184,116,0.18)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse 80% 100% at 75% 50%, rgba(58,184,116,0.18) 0%, transparent 60%)" }}
            />

            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
              className="absolute top-[72px] w-[604px] flex flex-col gap-9"
              style={{ [isRTL ? "right" : "left"]: 64, zIndex: 10 }}
            >
              <h2 className="font-stolzl text-[51px] font-bold text-white leading-[1.35] tracking-[-2.04px]">
                {t.cta.title}
              </h2>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="w-fit font-stolzl font-medium text-body-sm px-5 py-3 rounded-[var(--radius-button)] transition-all"
                style={{ background: "white", color: "#010214" }}
              >
                {t.cta.button}
              </motion.button>
            </motion.div>

            {/* Bordered card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.15 }}
              className="absolute top-[53px] w-[589px] h-[450px] rounded-[20px] overflow-hidden"
              style={{
                [isRTL ? "right" : "left"]: 728,
                zIndex: 10,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <p
                className="absolute top-[-1px] font-stolzl text-[24px] text-white leading-[69px] tracking-[-0.96px] whitespace-nowrap"
                style={{ [isRTL ? "right" : "left"]: 23 }}
              >
                {t.cta.rightTitle}
              </p>
              <div
                className="absolute top-[145px] w-[176px] h-[102px] bg-white rounded-[70px] flex items-center justify-center"
                style={{ [isRTL ? "right" : "left"]: 205 }}
              >
                <Image src="/images/logo.png" alt="Corenet" width={94} height={51} className="object-contain" />
              </div>
            </motion.div>

            {/* Feature pills */}
            {(
              [
                { label: t.cta.pills[0], top: 162, width: 176, delay: 0.25 },
                { label: t.cta.pills[1], top: 216, width: 130, delay: 0.38 },
                { label: t.cta.pills[2], top: 269, width: 213, delay: 0.51 },
              ] as const
            ).map(({ label, top, width, delay }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: isRTL ? 24 : -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease, delay }}
                className="absolute flex items-center rounded-[30px] overflow-hidden"
                style={{
                  [isRTL ? "right" : "left"]: 666,
                  top, width, height: 40,
                  zIndex: 10,
                  background: "rgba(58,184,116,0.3)",
                  border: "1px solid rgba(58,184,116,0.35)",
                }}
              >
                <div className="relative shrink-0 w-8 h-8 ml-[7px]">
                  <Image src="/images/ellipse-check.svg" alt="" fill className="object-contain" />
                  <Image src="/images/check.svg" alt="" width={24} height={24} className="absolute left-1 top-1" />
                </div>
                <span className="font-stolzl text-[24px] text-white tracking-[-0.96px] whitespace-nowrap leading-none ml-3">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ========== FOOTER ========== */}
      <footer className="relative w-full rounded-[28px] sm:rounded-[40px] overflow-hidden" style={{ background: "#010214" }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 40% at 20% 80%, rgba(51,92,255,0.07) 0%, transparent 60%)" }}
        />
        <div className="absolute inset-0 opacity-15">
          <Image src="/images/hero-bg.png" alt="" fill className="object-cover" />
        </div>

        {/* Top border */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="relative max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 pt-14 sm:pt-16 lg:pt-[260px] pb-12 sm:pb-16 lg:pb-20"
        >
          <div className="mb-10 sm:mb-12">
            <Image src="/images/logo.png" alt="Corenet" width={134} height={78} className="object-contain brightness-0 invert opacity-80" />
          </div>

          <p className="font-stolzl text-body max-w-[465px] mb-6" style={{ color: "rgba(240,237,230,0.55)" }}>
            {t.footer.desc}
          </p>

          <div className="flex items-center gap-2 mb-12 sm:mb-14">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
              <path d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6c0 3.75 4.5 8.5 4.5 8.5s4.5-4.75 4.5-8.5c0-2.485-2.015-4.5-4.5-4.5Z" stroke="rgba(240,237,230,0.35)" strokeWidth="1.3" strokeLinejoin="round"/>
              <circle cx="8" cy="6" r="1.5" stroke="rgba(240,237,230,0.35)" strokeWidth="1.3"/>
            </svg>
            <span className="font-stolzl text-caption" style={{ color: "rgba(240,237,230,0.35)" }}>{t.footer.location}</span>
          </div>

          <div className="h-px mb-8" style={{ background: "rgba(255,255,255,0.06)" }} />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <p className="font-medium text-caption" style={{ color: "rgba(240,237,230,0.35)" }}>{t.footer.copy}</p>
            <div className="flex items-center gap-2">
              {[
                { href: "#", label: "Facebook", src: "/images/facebook.svg", size: 18 },
                { href: "#", label: "Instagram", src: "/images/instagram.svg", size: 18 },
                { href: "#", label: "Twitter", src: "/images/twitter-x.svg", size: 16 },
              ].map(({ href, label, src, size }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                  style={{ border: "1px solid rgba(255,255,255,0.10)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.07)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
                  aria-label={label}
                >
                  <Image src={src} alt="" width={size} height={size} className="opacity-60" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </footer>

    </div>
  );
}
