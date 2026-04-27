"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

export default function HeroSection() {
  const revealRef = useRef<HTMLDivElement>(null); // .reveal wrapper
  const imgRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Reveal container slides in from left
    tl.set(revealRef.current, { autoAlpha: 1 })
      .from(
        revealRef.current,
        {
          yPercent: 100,
          duration: 1.2,
          ease: "power3.out",
        },
        0,
      )

      // 2. Image counter-slides from right + scale settle (stays pinned visually)
      .from(
        imgRef.current,
        {
          yPercent: -100,
          scale: 1.2,
          duration: 1.2,
          ease: "power3.out",
        },
        "<",
      ) // ← same start time as container

      // 3. Gradient overlay fades in as reveal completes
      .to(
        overlayRef.current,
        {
          opacity: 1,
          duration: 1.0,
          ease: "power2.out",
        },
        0.9,
      )

      // 4. Text sequence
      .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.3)
      .to(
        line1Ref.current,
        { y: "0%", opacity: 1, duration: 0.85, ease: "power4.out" },
        1.5,
      )
      .to(
        line2Ref.current,
        { y: "0%", opacity: 1, duration: 0.85, ease: "power4.out" },
        1.68,
      )
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.9)
      .to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.6 }, 2.1);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-screen overflow-hidden bg-black">
      {/* ── Reveal wrapper (slides in from left, clips the image) ── */}
      <div
        ref={revealRef}
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ visibility: "hidden" }} // GSAP autoAlpha controls this
      >
        <img
          ref={imgRef}
          src="https://framerusercontent.com/images/m0i64A4tsNGa7wuoRO5Mh926M.jpg?width=4096&height=2731"
          alt="Industrial machinery"
          className="w-full h-full object-cover"
          style={{ transformOrigin: "left center" }}
        />
      </div>

      {/* ── Dark tint always present ───────────────────────────── */}
      <div className="absolute inset-0 bg-black/65 z-1" />

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="absolute z-10 inset-0 flex flex-col justify-center items-center text-center">
        <div className="max-w-[94%] mx-auto w-full flex flex-col items-center">
          <p
            ref={eyebrowRef}
            className="text-xs font-normal px-4 bg-primary/40 rounded-sm text-sky-100 py-1.5 uppercase mb-3.5"
            style={{ opacity: 0, transform: "translateY(12px)" }}
          >
            Premium Industrial Solutions
          </p>

          <h1
            className="text-5xl lg:text-8xl font-light leading-[1.04] text-white tracking-tighter mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span className="block overflow-hidden">
              <span
                ref={line1Ref}
                className="block text-secondary"
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

          <p
            ref={subtitleRef}
            className="text-gray-300 max-w-xl mb-8 text-sm font-light leading-relaxed"
            style={{ opacity: 0, transform: "translateY(12px)" }}
          >
            MORZ Global is a growing engineering and consultancy firm committed
            to delivering precise, reliable technical solutions across onshore
            and offshore projects. Our multidisciplinary team brings together
            expertise across a wide range of engineering disciplines.
          </p>

          <div
            ref={buttonsRef}
            className="flex items-center gap-4"
            style={{ opacity: 0, transform: "translateY(14px)" }}
          >
            <button className="inline-flex items-center bg-primary gap-2.5 hover:bg-primary/90 text-gray-50 px-5 py-3 rounded-sm text-xs font-medium tracking-[0.06em] transition-colors duration-200">
              Explore Solutions
              <ArrowRight size={16} />
            </button>
            <button className="inline-flex items-center gap-2 backdrop-blur-sm bg-white/8 hover:bg-white/13 text-white/85 border border-white/22 hover:border-white/40 px-5 py-3 rounded-sm text-xs font-light tracking-[0.06em] transition-all duration-200">
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
