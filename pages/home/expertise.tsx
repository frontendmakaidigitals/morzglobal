"use client";

import { useEffect, useRef } from "react";
import { Factory, Settings, ClipboardCheck, Network } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const expertise = [
  {
    variant: "dark",
    icon: <Factory className="w-12 h-12" />,
    label: "Flow Control Systems",
    points: [
      "Control valves & regulators",
      "Valve automation & instrumentation",
      "Pressure management solutions",
    ],
  },
  {
    variant: "light",
    icon: <Settings className="w-12 h-12" />,
    label: "Safety & Protection Systems",
    points: [
      "Safety & relief valves",
      "Monitoring & compliance tools",
      "Critical system protection",
    ],
  },
  {
    variant: "dark",
    icon: <ClipboardCheck className="w-12 h-12" />,
    label: "Power & Motion Solutions",
    points: [
      "Gear systems & transmission",
      "Bearings, couplings & drives",
      "Motion control components",
    ],
  },
  {
    variant: "light",
    icon: <Network className="w-12 h-12" />,
    label: "High-Pressure & Pump Systems",
    points: [
      "Gas boosters & amplifiers",
      "Hydrotesting systems",
      "Pneumatic-driven pumps",
    ],
  },
];

export default function AreasOfExpertise() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardRefs.current;
    const label = labelRef.current;
    const heading = headingRef.current;

    if (!cards.length || !label || !heading) return;

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

    // ── CARDS ───────────────────────────────────────────────────
    gsap.fromTo(
      cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: cards[0],
          start: "top 88%",
          toggleActions: "play none none none",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 container">
      {/* HEADER */}
      <div className="text-center mb-14">
        <p
          ref={labelRef}
          className="text-xs uppercase tracking-widest text-gray-400 mb-3"
        >
          Areas of Expertise
        </p>
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl font-bold text-gray-900"
        >
          Our Machinery Expertise
        </h2>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {expertise.map((item, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) cardRefs.current[i] = el;
            }}
            className={`p-6 rounded-2xl cursor-pointer transition-all duration-300
              hover:-translate-y-1 hover:shadow-xl
              ${
                item.variant === "dark"
                  ? "bg-[#0d2f6b] text-white"
                  : "bg-[#e7eef8] text-gray-900"
              }`}
          >
            <div
              className={`mb-6 ${
                item.variant === "dark" ? "stroke-white" : "stroke-gray-900"
              } opacity-70`}
            >
              {item.icon}
            </div>
            <h3 className="text-lg font-semibold mb-3 leading-snug opacity-90">
              {item.label}
            </h3>
            <ul className="space-y-1.5 text-sm leading-relaxed opacity-80">
              {item.points.map((p, j) => (
                <li key={j}>• {p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
