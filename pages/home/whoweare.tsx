"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmootherReady } from "@/app/smoother-context";

gsap.registerPlugin(ScrollTrigger);

const points = [
  "Engineered for precision and durability",
  "Optimized for safety and operational efficiency",
  "Tailored solutions for complex industrial needs",
];

export default function AboutSection() {
  const smootherReady = useSmootherReady(); // 👈 consume context

  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // 👇 single useEffect, gated on smootherReady
  useEffect(() => {
    if (!smootherReady) return;

    const ctx = gsap.context(() => {
      gsap.set(imageWrapRef.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(imgRef.current, { scale: 1.3 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: imageWrapRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      tl.to(imageWrapRef.current, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.8,
        ease: "power3.inOut",
      })
        .to(
          imgRef.current,
          { scale: 1, duration: 1.1, ease: "power3.out" },
          "<",
        )
        .from(
          badgeRef.current,
          { opacity: 0, y: 16, duration: 0.5, ease: "power2.out" },
          "-=0.2",
        );

      const rightItems = [
        labelRef.current,
        headingRef.current,
        dividerRef.current,
        paraRef.current,
        ...(listRef.current ? Array.from(listRef.current.children) : []),
        ctaRef.current,
      ];

      gsap.from(rightItems, {
        scrollTrigger: {
          trigger: labelRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [smootherReady]); // 👈 re-runs once smoother is ready

  return (
    <section ref={sectionRef} className="mt-20">
      <div className="grid lg:grid-cols-2 font-sans">
        {/* LEFT — image */}
        <div
          ref={imageWrapRef}
          className="relative overflow-hidden bg-[#E8E4DE] group min-h-[400px] lg:min-h-full"
        >
          <img
            ref={imgRef}
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80"
            alt="Engineering"
            className="w-full h-full object-cover opacity-90 mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
          />
          <div
            ref={badgeRef}
            className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-between px-6 md:px-8 pb-6"
          >
            <span className="text-[11px] tracking-[0.1em] uppercase text-white/75">
              Est. 2014 · Global Operations
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-medium tracking-[0.1em] uppercase text-white/60">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              Live projects
            </span>
          </div>
        </div>

        {/* RIGHT — content */}
        <div className="flex flex-col px-6 md:px-10 lg:px-14 py-12 lg:py-16">
          <span
            ref={labelRef}
            className="text-[11px] font-medium tracking-[0.16em] uppercase text-primary/80 mb-6"
          >
            ABOUT MORZ GLOBAL
          </span>

          <h2
            ref={headingRef}
            className="text-3xl md:text-4xl lg:text-6xl font-[500] leading-[1.06] tracking-[-0.025em] text-[#1A1714] mb-6 flex-1 font-serif"
          >
            We deliver{" "}
            <em className="italic font-light text-primary">
              reliable machinery{" "}
            </em>
            solutions for modern industries
          </h2>

          <div ref={dividerRef} className="w-10 h-[1.5px] bg-[#D9D4CE] mb-6" />

          <p
            ref={paraRef}
            className="text-sm leading-[1.85] text-[#7A7570] font-light mb-2"
          >
            At Morz Global, we specialize in high-performance mechanical
            machinery designed to meet the evolving demands of industrial
            sectors. From oil & gas to manufacturing and energy, our solutions
            combine advanced engineering, durability, and operational
            efficiency.
          </p>
          <p className="text-sm leading-[1.85] text-[#7A7570] font-light mb-6">
            We focus on delivering systems that enhance safety, improve process
            control, and ensure long-term performance—even in the most demanding
            environments.
          </p>

          <ul ref={listRef} className="space-y-3 mb-8">
            {points.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-[#3D3A37] leading-snug"
              >
                <span className="mt-.5 rounded-full flex items-center justify-center">
                  <CheckCircle className="size-4" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div ref={ctaRef} className="flex items-center gap-4 flex-wrap">
            <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-[#F7F5F2] px-5 py-3 rounded-sm text-xs font-medium tracking-[0.07em] uppercase transition-colors duration-200 group">
              Learn more
              <ArrowRight />
            </button>
            <button className="text-sm text-[#AAA49E] hover:text-[#1A1714] border-b border-[#D9D4CE] hover:border-[#1A1714] pb-px transition-colors duration-200">
              View our work
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
