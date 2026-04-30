"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmootherReady } from "@/app/smoother-context";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Engineering Design & Delivery",
    sub: "Precise and fully coordinated engineering solutions across project engineering, procurement and construction stages.",
    badge: "Core",
    img: "/Engineering.jpg",
  },
  {
    title: "Process & Safety Engineering",
    sub: "Ensuring optimal process performance and the highest safety standards across engineering execution.",
    badge: "Safety",
    img: "/safety.jpg",
  },
  {
    title: "Piping & Pipeline Engineering",
    sub: "Specialist design and engineering for complex piping systems.",
    badge: "Engineering",
    img: "/piping.png",
  },
  {
    title: "Electrical & Instrumentation Engineering",
    sub: "Reliable power distribution, solar systems, and advanced instrumentation & control solutions.",
    badge: "Energy",
    img: "/electrical-engineering.jpg",
  },
  {
    title: "Civil & Architectural Engineering",
    sub: "Civil, architectural, and structural design ensuring integrity and longevity of installations.",
    badge: "Infrastructure",
    img: "/architectural-engineer.jpeg",
  },
  {
    title: "Offshore Specialist Services",
    sub: "Expertise in offshore structures, including jacket and topside design.",
    badge: "Offshore",
    img: "/offshore-specialist.webp",
  },
];

export default function ServicesGrid() {
  const smootherReady = useSmootherReady();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!smootherReady) return;

    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [smootherReady]);

  return (
    <section ref={sectionRef} className="py-20 bg-[#0a0a0a]">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-6xl font-[500] text-gray-100"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Our Services
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-black cursor-pointer"
            >
              <img
                src={`/services${s.img}`}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover scale-[1.08] group-hover:scale-[1.14] transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Content */}
              <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-medium rounded-full mb-2">
                {s.badge}
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-[17px] font-medium text-white mb-1 leading-snug">
                  {s.title}
                </h3>
                <p className="text-[12px] text-white/60 leading-relaxed">
                  {s.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center mt-12">
          <button className="border rounded-sm border-primary text-primary px-6 py-3 text-sm flex items-center gap-3 hover:bg-primary hover:text-white transition">
            View all services
          </button>
        </div>
      </div>
    </section>
  );
}
