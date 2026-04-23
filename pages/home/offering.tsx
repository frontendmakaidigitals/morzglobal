"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Flow & Control Systems",
    subtitle: "Downloadable Profile",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
  {
    title: "High-Pressure & Gas Systems",
    subtitle: "Downloadable Profile",
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Specialties() {
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const imgRefs = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const label = labelRef.current;
    const heading = headingRef.current;
    const cards = cardRefs.current;
    const imgs = imgRefs.current;

    if (!label || !heading || !cards.length) return;

    // ── HEADER ──────────────────────────────────────────────────
    gsap.fromTo(
      [label, heading],
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: label,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      },
    );

    // ── CARDS — reveal wipe + image zoom ───────────────────────
    cards.forEach((card, i) => {
      const img = imgs[i];
      const direction = i % 2 === 0 ? -60 : 60; // left card from left, right from right

      // card slides in from side + fades
      gsap.fromTo(
        card,
        { opacity: 0, x: direction },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );

      // image starts zoomed in, settles to normal
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.15 },
          {
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="bg-black text-white py-24 px-6 md:px-12">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-16">
          <p
            ref={labelRef}
            className="text-xs tracking-widest text-gray-400 mb-3"
          >
            WHAT WE&#39;RE OFFERING
          </p>
          <h2 ref={headingRef} className="text-4xl md:text-6xl font-bold">
            More Specialties
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-10">
          {services.map((item, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
              className="group relative overflow-hidden rounded-xl h-[420px]"
            >
              {/* Image */}
              <img
                ref={(el) => {
                  if (el) imgRefs.current[i] = el;
                }}
                src={item.image}
                alt={item.title}
                className="absolute size-full object-cover group-hover:scale-110 transition duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 p-6 md:p-8">
                <p className="text-sm text-gray-300 mb-1">{item.subtitle}</p>
                <h3 className="text-xl md:text-2xl font-semibold mb-4 max-w-md">
                  {item.title}
                </h3>
                <button className="border border-white/40 px-5 py-2 rounded-full text-sm hover:bg-white hover:text-black transition flex items-center gap-2">
                  Download Profile →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
