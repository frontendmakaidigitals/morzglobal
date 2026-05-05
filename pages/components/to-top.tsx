"use client";
import { ArrowUp } from "lucide-react";
import { LiquidGlassCard } from "@/components/uilayouts/liquid-glass";
import { useEffect, useRef, useState } from "react";

const getBackgroundColor = (x: number, y: number) => {
  const elements = document.elementsFromPoint(x, y);

  for (const el of elements) {
    const bg = window.getComputedStyle(el).backgroundColor;

    // Skip unsupported formats and transparent
    if (
      !bg ||
      bg === "transparent" ||
      bg.includes("oklab") ||
      bg.includes("oklch")
    )
      continue;

    const match = bg.match(/[\d.]+/g);
    if (!match || match.length < 3) continue;

    const [r, g, b, a] = match.map(Number);

    // Skip fully transparent
    if (a !== undefined && a === 0) continue;

    return { r, g, b };
  }

  return null;
};

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const check = () => {
      setVisible(window.scrollY > 200);

      const card = document.querySelector(".back-to-top-card") as HTMLElement;
      if (card) card.style.visibility = "hidden";

      const color = getBackgroundColor(
        window.innerWidth - 44,
        window.innerHeight - 44,
      );

      if (card) card.style.visibility = "";

      if (color) {
        const { r, g, b } = color;
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        setIsDark(luminance < 0.5);
      }
    };

    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) return null;

  return (
    <LiquidGlassCard
      glowIntensity="sm"
      shadowIntensity="sm"
      borderRadius="999px"
      blurIntensity="md"
      draggable={false}
      className="back-to-top-card fixed right-5 bottom-5 z-[9999]"
    >
      <button
        ref={buttonRef}
        onClick={handleScrollTop}
        className="relative z-50 size-14 flex justify-center items-center"
      >
        <ArrowUp
          strokeWidth={2.5}
          style={{ color: isDark ? "#ffffff" : "#1a1a1a" }}
          className="transition-colors duration-200"
        />
      </button>
    </LiquidGlassCard>
  );
};

export default BackToTop;
