"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

// ✏️ Change this to your preferred display name or initials
const DISPLAY_NAME = "Prathmesh Mathur";

const NAV_LINKS = [
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "projects", href: "#projects" },
  { label: "academics", href: "#academics" },
  { label: "contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Show blur border after scrolling past 20px
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track which section is currently in view
  useEffect(() => {
    const sectionIds = ["hero", "about", "skills", "projects", "academics", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
          scrolled ? "backdrop-blur-md border-b border-white/10 bg-white/5" : ""
        }`}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          {/* Display name / initials — left side */}
          <a
            href="#hero"
            className="font-mono text-sm font-semibold tracking-widest text-fg hover:text-accent transition-colors duration-200"
          >
            {DISPLAY_NAME}
          </a>

          {/* Desktop nav links — right side */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className={`font-mono text-xs tracking-widest transition-colors duration-200 ${
                    activeSection === label
                      ? "text-accent"
                      : "text-muted hover:text-fg"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden text-fg hover:text-accent transition-colors duration-200"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center gap-10 md:hidden">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={`font-mono text-2xl tracking-widest transition-colors duration-200 ${
                activeSection === label
                  ? "text-accent"
                  : "text-fg hover:text-accent"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
