"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) setMenuOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrolled]);

  const links = [
    { href: "#about",    label: t.nav.company  },
    { href: "#products", label: t.nav.products },
    { href: "#contact",  label: t.nav.contact  },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        className="fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-between transition-all duration-300 ease-out"
        style={{
          top: scrolled ? 8 : 16,
          height: scrolled ? 52 : 64,
          width: scrolled ? "min(1200px, calc(100% - 24px))" : "min(1440px, calc(100% - 16px))",
          paddingLeft: 20,
          paddingRight: 20,
          borderRadius: scrolled ? 14 : 18,
          background: scrolled
            ? "rgba(1,2,20,0.88)"
            : "rgba(1,2,20,0.35)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.07)"
            : "0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {/* Logo */}
        <Image
          src="/images/logo.png"
          alt="Corenet Logo"
          width={scrolled ? 76 : 88}
          height={scrolled ? 42 : 48}
          className="object-contain transition-all duration-300 shrink-0 brightness-0 invert"
        />

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-10 xl:gap-16 font-stolzl text-body-sm text-white/80">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="hover:text-white transition-colors whitespace-nowrap"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Desktop right actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border border-white/15 font-stolzl text-caption text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Switch language"
          >
            <span className="text-base leading-none">{lang === "en" ? "🇸🇦" : "🇬🇧"}</span>
            <span className="font-medium">{lang === "en" ? "العربية" : "English"}</span>
          </button>
          <button className="bg-blue-brand text-white font-stolzl font-medium text-caption px-5 py-2.5 rounded-[var(--radius-button)] hover:opacity-90 transition-opacity whitespace-nowrap">
            {t.nav.cta}
          </button>
        </div>

        {/* Mobile / Tablet: lang flag + hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[8px] border border-white/15 font-stolzl text-white/70 hover:bg-white/10 transition-colors"
            aria-label="Switch language"
          >
            <span className="text-sm leading-none">{lang === "en" ? "🇸🇦" : "🇬🇧"}</span>
            <span className="text-[12px] font-medium">{lang === "en" ? "AR" : "EN"}</span>
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-[8px] hover:bg-white/10 transition-colors"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-[18px] h-[1.5px] bg-white origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-[18px] h-[1.5px] bg-white"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-[18px] h-[1.5px] bg-white origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile / Tablet menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-30 lg:hidden bg-black/40"
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease }}
              className="fixed inset-x-3 z-40 lg:hidden"
              style={{ top: scrolled ? 68 : 84 }}
            >
              <div
                className="rounded-[20px] overflow-hidden"
                style={{
                  background: "rgba(9,11,30,0.97)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow: "0 12px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.07)",
                }}
              >
                {/* Nav links */}
                <div className="flex flex-col gap-0.5 p-3">
                  {links.map(({ href, label }) => (
                    <a
                      key={href}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="font-stolzl text-body-sm font-medium text-white/80 px-4 py-3.5 rounded-[12px] hover:bg-white/08 hover:text-white transition-colors block"
                      style={{ textAlign: lang === "ar" ? "right" : "left" }}
                    >
                      {label}
                    </a>
                  ))}
                </div>

                <div className="h-px bg-white/08 mx-3" />

                {/* CTA */}
                <div className="p-3">
                  <button className="w-full bg-blue-brand text-white font-stolzl font-medium text-body-sm px-5 py-3.5 rounded-[12px] hover:opacity-90 transition-opacity">
                    {t.nav.cta}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
