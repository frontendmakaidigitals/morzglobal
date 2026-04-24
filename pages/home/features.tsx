"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "60+", label: "Employees" },
  { value: "43+", label: "Years Experience" },
  { value: "400+", label: "Clients" },
  { value: "100+", label: "Projects" },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading — slides up
      gsap.fromTo(
        ".anim-heading",
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".anim-heading",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      // Right column — slides in from right
      gsap.fromTo(
        ".anim-right",
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: {
            trigger: ".anim-right",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      // Media — scale up + fade in
      gsap.fromTo(
        ".anim-media",
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-media",
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );

      // Stats — staggered fade up
      gsap.fromTo(
        ".anim-stat",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".anim-stats",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert(); // cleanup on unmount
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f6f4f1] py-20 ">
      <div className="container">
        {/* TOP CONTENT */}
        <div className="grid md:grid-cols-[.9fr_1.1fr] gap-10 items-center mb-12">
          <h2 className="anim-heading opacity-0 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Expert guidance,
            <br />
            tailored solution
          </h2>

          <div className="anim-right opacity-0">
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
              Easily adapt to changes and scale your operations with our
              flexible infrastructure, designed to support your business growth.
            </p>

            <div className="flex gap-3">
              <button className="bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm transition">
                Get Started →
              </button>
              <button className="border border-gray-300 hover:border-gray-400 px-5 py-2.5 rounded-full text-sm transition">
                Free trial
              </button>
            </div>
          </div>
        </div>

        {/* MEDIA */}
        <div className="anim-media opacity-0 relative rounded-2xl overflow-hidden mb-10">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80"
            alt="Team"
            className="w-full h-[460px] object-cover object-top"
          />
        </div>

        {/* STATS STRIP */}
        <div className="anim-stats bg-white/40 rounded-2xl shadow-xs border border-primary/5 px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`anim-stat opacity-0 text-center ${
                i < stats.length - 1 ? "border-r border-primary/20" : ""
              }`}
            >
              <p className="text-4xl font-[600] text-primary">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
