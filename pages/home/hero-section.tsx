"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

export default function HeroSection() {
  const imgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Image fades in + slow Ken Burns zoom to natural scale
    tl.to(
      imgRef.current,
      {
        opacity: 0.72,
        scale: 1,
        duration: 1.8,
        ease: "power2.out",
      },
      0,
    )

      // 2. Gradient overlay fades in
      .to(
        overlayRef.current,
        {
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        0.3,
      )

      // 3. Eyebrow slides up
      .to(
        eyebrowRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        0.9,
      )

      // 4. Headline lines reveal upward, staggered
      .to(
        line1Ref.current,
        {
          y: "0%",
          opacity: 1,
          duration: 0.9,
          ease: "power4.out",
        },
        1.1,
      )

      .to(
        line2Ref.current,
        {
          y: "0%",
          opacity: 1,
          duration: 0.9,
          ease: "power4.out",
        },
        1.28,
      )

      // 5. Buttons fade + lift in
      .to(
        buttonsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        1.6,
      );
  }, []);

  return (
    <section className="relative w-full h-screen min-h-screen overflow-hidden">
      <div className="bg-[#1a1814] absolute inset-0 size-full" />

      <img
        ref={imgRef}
        src="https://images.unsplash.com/photo-1628706200306-5d026edc69ee?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0"
        alt="Luxury interior"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0, transform: "scale(1.08)" }}
      />

      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          opacity: 0,
          background:
            "linear-gradient(105deg, rgba(14,12,10,0.72) 0%, rgba(14,12,10,0.18) 60%, transparent 100%)",
        }}
      />

      <div className="absolute inset-0 w-full flex flex-col justify-end">
        <div className="max-w-[94%] mx-auto w-full pb-12">
          <p
            ref={eyebrowRef}
            className="text-[11px] font-normal tracking-[0.2em] uppercase text-white/50 mb-3.5"
            style={{ opacity: 0, transform: "translateY(12px)" }}
          >
            Premium Real Estate
          </p>

          <h1
            className="text-5xl lg:text-7xl font-light leading-[1.04] text-white tracking-tighter mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span className="block overflow-hidden">
              <span
                ref={line1Ref}
                className="block"
                style={{ opacity: 0, transform: "translateY(100%)" }}
              >
                Precision Machinery
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                ref={line2Ref}
                className="block"
                style={{ opacity: 0, transform: "translateY(100%)" }}
              >
                <em className="italic font-light text-white/75">
                  for Industrial Performance
                </em>
              </span>
            </span>
          </h1>
          <p className="text-gray-100 max-w-xl mb-8">
            Engineered solutions for oil & gas, energy, and manufacturing
            industries—built for reliability, efficiency, and long-term
            performance.
          </p>

          <div
            ref={buttonsRef}
            className="flex items-center gap-4"
            style={{ opacity: 0, transform: "translateY(14px)" }}
          >
            <button className="inline-flex items-center gap-2.5 bg-white/95 hover:bg-white text-[#1a1814] px-[22px] py-3 rounded-[2px] text-xs font-medium tracking-[0.06em] transition-colors duration-200">
              Explore Solutions
              <ArrowRight size={16} />
            </button>
            <button className="inline-flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.13] text-white/85 border border-white/22 hover:border-white/40 px-[22px] py-3 rounded-[2px] text-xs font-light tracking-[0.06em] transition-all duration-200">
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
