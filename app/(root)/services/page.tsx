"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmootherReady } from "@/app/smoother-context";
import FAQSection from "./faq";
gsap.registerPlugin(ScrollTrigger);

const offshore = {
  key: "offshore",
  label: "Offshore Projects",
  tag: "SECTOR B · TOPSIDE · SUBSEA",
  points: [
    {
      label: "Detail Engineering (EPC Stage)",
      image: "/offshore/detail engineering.jpg",
    },
    {
      label: "Brownfield Modifications",
      image: "/offshore/brownfield.jpg",
    },
    {
      label: "Lifting & Load Out Plan",
      image: "/offshore/Structural studies.jpg",
    },
    {
      label: "Process & Process Safety Engineering",
      image: "/offshore/Safety.jpg",
    },
    {
      label: "Mechanical (Static & Rotary) Engineering",
      image: "/offshore/mechanical-engieneering.jpeg",
    },
    { label: "Piping Engineering", image: "/offshore/piping.jpg" },
    {
      label: "Electrical Engineering",
      image: "/offshore/electrial engine.png",
    },
    {
      label: "Instrumentation Engineering",
      image: "/offshore/instrument.jpeg",
    },
    {
      label: "Civil/Structural Engineering",
      image: "/offshore/structural-engineering.jpg",
    },
    {
      label: "Project Management & Project Planning",
      image: "/offshore/Project management.jpg",
    },
    {
      label: "Cost Estimation & Budgeting",
      image: "/offshore/cost estimation.jpg",
    },
    { label: "3D Modelling", image: "/offshore/3d.jpg" },
  ],
};

const onshore = {
  key: "onshore",
  label: "Onshore Projects",
  tag: "SECTOR A · EPC · BROWNFIELD",
  points: [
    {
      label: "Detail Engineering (EPC Stage)",
      image: "/onshore/detail engineering.jpg",
    },
    {
      label: "Solar Power Engineering",
      image: "/onshore/solar power engineering.jpg",
    },
    {
      label: "Process & Safety Engineering",
      image: "/onshore/processing facility.jpg",
    },
    {
      label: "Mechanical (Static & Rotary) Engineering",
      image: "/onshore/mechanical-engieneering.jpeg",
    },
    {
      label: "Piping and Pipeline Engineering",
      image: "/onshore/piping.jpg",
    },
    {
      label: "Electrical Engineering",
      image: "/onshore/electrial engine.png",
    },
    {
      label: "Instrumentation Engineering",
      image: "/onshore/instrument.jpeg",
    },
    {
      label: "Civil/Structural Engineering",
      image: "/onshore/civil.jpg",
    },
    {
      label: "Project Management & Project Planning",
      image: "/onshore/project planning.jpg",
    },
    {
      label: "Cost Estimation & Budgeting",
      image: "/onshore/cost estimation.jpg",
    },
    { label: "3D Modelling", image: "/onshore/3D-Design.jpg" },
  ],
};

const bim = {
  key: "bim ",
  label: "BIM Service",
  tag: "SECTOR A · EPC · BROWNFIELD",
  points: [
    {
      label: "BIM Modelling",
      image: "/bim/bim-model.jpg",
    },
    {
      label: "Scan to Drawing Conversion",
      image: "/bim/scan-to-draw.png",
    },
    {
      label: "Laser Scan",
      image: "/bim/bim-laser-scan.jpeg",
    },
  ],
};

/* ─────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────── */
function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const smootherReady = useSmootherReady();

  useEffect(() => {
    if (!smootherReady) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Image — zooms from 1.12 → 1 while fading in
      tl.fromTo(
        ".hero-image",
        { scale: 1.12, opacity: 0.4 },
        { scale: 1, opacity: 1, duration: 1.6, ease: "power2.out" },
        0,
      );

      // Eyebrow — clip-wipe left → right
      tl.fromTo(
        ".hero-eyebrow",
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.7 },
        0,
      );

      // Headline — each word slides up from below with a clip mask
      tl.fromTo(
        ".hero-word",
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.75,
          stagger: 0.06,
          ease: "power4.out",
        },
        0.25,
      );

      // Body paragraph — fade + drift up
      tl.fromTo(
        ".hero-body",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.65,
      );

      // CTA button — scale in
      tl.fromTo(
        ".hero-cta",
        { opacity: 0, scale: 0.9, y: 12 },
        { opacity: 1, scale: 1, y: 0, duration: 0.55 },
        0.82,
      );

      // Parallax: image drifts up as you scroll out
      gsap.to(".hero-image", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [smootherReady]);

  const headline =
    "Empowering Your Engineering Projects with Cutting-Edge Innovation";
  const words = headline.split(" ");

  return (
    <section ref={heroRef} className="h-screen overflow-hidden relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1493476523860-a6de6ce1b0c3?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Engineering project"
        fill
        className="object-cover hero-image"
        priority
      />

      {/* Content — centered */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
        <div className="text-white max-w-5xl w-full">
          {/* Headline */}
          <h2 className="  mb-6 text-4xl font-light tracking-tighter md:text-7xl flex flex-wrap justify-center gap-x-[0.15em] gap-y-1">
            {words.map((word, i) => (
              <span
                key={i}
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="inline-block overflow-hidden"
              >
                <span
                  className={`hero-word leading-tight inline-block  ${word.toLowerCase() === "innovation" ? "text-white" : ""}`}
                >
                  {word}
                </span>
              </span>
            ))}
          </h2>

          {/* Body */}
          <p className="hero-body text-sm lg:text-md text-white/70 leading-relaxed mb-8 max-w-xl mx-auto">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste enim
            incidunt maiores minus porro sint accusantium temporibus amet itaque
            pariatur unde voluptate harum aperiam soluta ad, esse ut non
            tempore!
          </p>

          {/* CTA */}
          <button className="hero-cta bg-primary text-white font-semibold px-7 py-3.5 rounded hover:bg-primary/90 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SERVICE SECTION
───────────────────────────────────────────────────────────── */
function ServiceSection({
  service,
  bgColor,
  cardBg,
  textColor,
  accentBg,
  sectionId,
}: {
  service: typeof offshore;
  bgColor: string;
  cardBg: string;
  textColor: string;
  accentBg: string;
  sectionId: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleColRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const smootherReady = useSmootherReady();

  useEffect(() => {
    if (!smootherReady) return;
    if (!sectionRef.current || !titleColRef.current || !cardsRef.current)
      return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        endTrigger: cardsRef.current,
        end: "bottom bottom",
        pin: titleColRef.current,
        pinSpacing: false,
      });

      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      const cards =
        cardsRef.current!.querySelectorAll<HTMLElement>(".service-card");
      gsap.set(cards, { opacity: 0, y: 48, scale: 0.95 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.55,
        stagger: { amount: 0.9, grid: "auto", from: "start" },
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      cards.forEach((card) => {
        card.addEventListener("mouseenter", () =>
          gsap.to(card, {
            y: -6,
            scale: 1.02,
            duration: 0.25,
            ease: "power2.out",
          }),
        );
        card.addEventListener("mouseleave", () =>
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.inOut",
          }),
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [smootherReady]);

  return (
    <section id={sectionId} ref={sectionRef} className={`${bgColor} relative`}>
      <div className="flex flex-col lg:flex-row">
        <div
          ref={titleColRef}
          className="lg:w-72 xl:w-80  shrink-0 px-6 pt-10 pb-0 lg:px-10 lg:pt-40 lg:pb-14 flex items-start"
        >
          <div ref={headerRef} className="w-full">
            <div className="flex items-center gap-3 mb-4">
              <span className={`w-6 h-0.5 shrink-0 ${accentBg}`} />
              <p
                className={`text-[10px] tracking-[0.18em] font-medium uppercase opacity-60 ${textColor}`}
              >
                {service.tag}
              </p>
            </div>
            <h2
              className={`font-serif text-3xl xl:text-4xl leading-tight ${textColor}`}
            >
              {service.label}
            </h2>
            <p
              className={`mt-4 text-[13px] leading-relaxed opacity-50 ${textColor}`}
            >
              {service.points.length} disciplines covered across the full
              project lifecycle.
            </p>
          </div>
        </div>

        <div
          ref={cardsRef}
          className="flex-1 px-6 pb-12 pt-4 lg:px-10 lg:py-14 grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 content-start"
        >
          {service.points.map((point, i) => (
            <div
              key={i}
              className={`service-card ${cardBg} rounded-md relative overflow-hidden aspect-[4/3] p-4 md:p-5 flex flex-col justify-end cursor-default`}
            >
              <div className="absolute inset-0 transition-opacity duration-300">
                <Image
                  src={point.image}
                  alt={point.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10">
                <p className="text-sm text-gray-50 font-medium leading-snug">
                  {point.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
export default function ServicesPage() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const init = async () => {
      const { ScrollSmoother } = await import("gsap/ScrollSmoother");
      const getSmoother = () =>
        new Promise<ReturnType<typeof ScrollSmoother.get>>((resolve) => {
          const id = setInterval(() => {
            const s = ScrollSmoother.get();
            if (s) {
              clearInterval(id);
              resolve(s);
            }
          }, 30);
        });

      const smoother = await getSmoother();
      const target = document.querySelector(hash);
      if (target && smoother) {
        smoother.scrollTo(target, true);
      }
    };

    // Wait for page + smoother to be ready
    setTimeout(init, 300);
  }, []);
  return (
    <main className="font-sans">
      <HeroSection />

      <ServiceSection
        service={offshore}
        sectionId="offshore"
        bgColor="bg-[#0d1a2b]"
        cardBg="bg-[#0f2236]"
        textColor="text-white"
        accentBg="bg-[#1e7fc2]"
      />

      <ServiceSection
        service={onshore}
        sectionId="onshore"
        bgColor="bg-[#0f2236]"
        cardBg="bg-[#0d1a2b]"
        textColor="text-white"
        accentBg="bg-[#3dba5a]"
      />

      <ServiceSection
        service={bim}
        sectionId="bim"
        bgColor="bg-[#0a1520]"
        cardBg="bg-[#0f2236]"
        textColor="text-white"
        accentBg="bg-[#1e7fc2]"
      />
      <FAQSection />
    </main>
  );
}
