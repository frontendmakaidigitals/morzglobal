"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

const DURATION = 1;
const EASE = "power4.inOut";
const AUTO_INTERVAL = 5000;

const SLIDES = [
  {
    num: "01 / 06",
    title: "Onshore",
    titleEm: "Engineering",
    subtitle:
      "Precision-engineered solutions for land-based oil, gas, and industrial projects — from feasibility through commissioning.",
    image: "/home/service-overview/onshore.jpeg",
    label: "Onshore",
  },
  {
    num: "02 / 06",
    title: "Offshore",
    titleEm: "Engineering",
    subtitle:
      "Specialist engineering for subsea, platform, and marine environments — built to withstand the harshest conditions at sea.",
    image: "/home/service-overview/offshore.jpeg",
    label: "Offshore",
  },
  {
    num: "03 / 06",
    title: "Process &",
    titleEm: "Safety Engineering",
    subtitle:
      "Rigorous hazard analysis, risk assessment, and safety management systems protecting people, assets, and the environment.",
    image: "/home/Safety.jpg",
    label: "Process Safety",
  },
  {
    num: "04 / 06",
    title: "Civil &",
    titleEm: "Structural Engineering",
    subtitle:
      "Robust civil and structural design for industrial facilities, infrastructure, and complex multi-discipline projects worldwide.",
    image: "/home/civil.jpg",
    label: "Civil & Structural",
  },
  {
    num: "05 / 06",
    title: "Solar Powered",
    titleEm: "Energy",
    subtitle:
      "End-to-end engineering for utility-scale and commercial solar installations — from site assessment to grid integration.",
    image: "/home/solar.jpg",
    label: "Solar",
  },
  {
    num: "06 / 06",
    title: "Project Management &",
    titleEm: "Project Planning ",
    subtitle:
      "Disciplined delivery through rigorous planning, cost control, and cross-functional leadership on complex engineering programmes.",
    image: "/home/Project management.jpg",
    label: "Project Management",
  },
];

type SlideRefs = {
  wrap: HTMLDivElement | null;
  imgWrapper: HTMLDivElement | null;
  titleWrap: HTMLDivElement | null;
  inner: HTMLDivElement | null;
};

export default function SliderSection() {
  const [current, setCurrent] = useState(0);
  const animating = useRef(false);
  const currentRef = useRef(0);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPaused = useRef(false);

  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);

  const slideRefs = useRef<SlideRefs[]>(
    SLIDES.map(() => ({
      wrap: null,
      imgWrapper: null,
      titleWrap: null,
      inner: null,
    })),
  );
  const slideElRefs = useRef<(HTMLDivElement | null)[]>(SLIDES.map(() => null));

  const getRef = (idx: number) => slideRefs.current[idx];

  const showSlide = (
    slideEl: HTMLDivElement | null,
    refs: SlideRefs,
    direction: "right" | "left",
  ) => {
    if (!slideEl) return;
    slideEl.style.zIndex = "11";
    slideEl.style.opacity = "1";

    gsap.fromTo(
      refs.wrap,
      { x: direction === "right" ? "100%" : "-100%" },
      { x: "0%", duration: DURATION, ease: EASE },
    );
    gsap.fromTo(
      refs.titleWrap,
      { x: direction === "right" ? "-100%" : "100%" },
      { x: "0%", duration: DURATION, ease: EASE },
    );
    gsap.fromTo(
      refs.imgWrapper,
      { x: direction === "right" ? "-100%" : "100%", scale: 1.1 },
      {
        x: "0%",
        scale: 1,
        duration: DURATION,
        ease: EASE,
        onStart() {
          if (refs.imgWrapper)
            refs.imgWrapper.style.transformOrigin =
              direction === "right" ? "0% 50%" : "100% 50%";
        },
      },
    );
    gsap.fromTo(
      refs.inner,
      { filter: "blur(30px)", opacity: 0 },
      {
        filter: "blur(0px)",
        opacity: 1,
        duration: DURATION,
        ease: EASE,
        delay: DURATION * 0.3, // starts halfway through the slide transition
      },
    );
  };

  const hideSlide = (
    slideEl: HTMLDivElement | null,
    refs: SlideRefs,
    direction: "right" | "left",
  ): Promise<void> => {
    return new Promise((resolve) => {
      if (!slideEl) {
        resolve();
        return;
      }

      // Exit direction is opposite to the incoming direction
      const exitX = direction === "right" ? "-100%" : "100%";

      gsap.fromTo(
        refs.inner,
        { filter: "blur(0px)", opacity: 1 },
        { filter: "blur(30px)", opacity: 0.2, duration: DURATION, ease: EASE },
      );

      // Move the slide wrapper OUT (opposite of where new slide enters from)
      gsap.to(refs.wrap, {
        x: exitX,
        duration: DURATION,
        ease: EASE,
      });

      // Also counter-move the img wrapper to create the parallax reveal
      gsap.to(refs.imgWrapper, {
        x: direction === "right" ? "100%" : "-100%",
        scale: 1.1,
        duration: DURATION,
        ease: EASE,
        onStart() {
          if (refs.imgWrapper)
            refs.imgWrapper.style.transformOrigin =
              direction === "right" ? "100% 50%" : "0% 50%";
        },
        onComplete() {
          // Reset position so the slide is ready to re-enter from the correct side next time
          gsap.set(refs.wrap, { x: "0%" });
          gsap.set(refs.imgWrapper, { x: "0%", scale: 1 });
          slideEl.style.zIndex = "9";
          slideEl.style.opacity = "0";
          resolve();
        },
      });
    });
  };

  const navigate = useCallback((idx: number) => {
    const currentIdx = currentRef.current;
    if (animating.current || idx === currentIdx) return;
    animating.current = true;

    const direction: "right" | "left" = idx > currentIdx ? "right" : "left";

    hideSlide(
      slideElRefs.current[currentIdx],
      getRef(currentIdx),
      direction,
    ).then(() => {
      animating.current = false;
    });
    showSlide(slideElRefs.current[idx], getRef(idx), direction);

    currentRef.current = idx;
    setCurrent(idx);
  }, []);

  const startAuto = useCallback(() => {
    if (autoTimer.current) clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => {
      if (!isPaused.current) {
        navigate((currentRef.current + 1) % SLIDES.length);
      }
    }, AUTO_INTERVAL);
  }, [navigate]);

  useEffect(() => {
    startAuto();
    return () => {
      if (autoTimer.current) clearInterval(autoTimer.current);
    };
  }, [startAuto]);

  const handleNavigate = (idx: number) => {
    navigate(idx);
    startAuto();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.targetTouches[0].clientX;
    touchEnd.current = null;
    isPaused.current = true;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };
  const onTouchEnd = () => {
    isPaused.current = false;
    if (!touchStart.current || !touchEnd.current) return;
    const delta = touchStart.current - touchEnd.current;
    if (Math.abs(delta) < 50) return;
    handleNavigate(
      delta > 0
        ? (currentRef.current + 1) % SLIDES.length
        : (currentRef.current - 1 + SLIDES.length) % SLIDES.length,
    );
  };

  return (
    <section
      className="relative w-full overflow-hidden  h-[80svh] lg:h-screen min-h-[520px]"
      onMouseEnter={() => {
        isPaused.current = true;
      }}
      onMouseLeave={() => {
        isPaused.current = false;
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.label}
          ref={(el) => {
            slideElRefs.current[i] = el;
          }}
          className="absolute inset-0 overflow-hidden"
          style={{
            opacity: i === 0 ? 1 : 0,
            zIndex: i === 0 ? 10 : 1,
            pointerEvents: i === current ? "initial" : "none",
          }}
        >
          {/* slide-wrapper */}
          <div
            ref={(el) => {
              slideRefs.current[i].wrap = el;
            }}
            className="relative h-full w-full overflow-hidden"
          >
            {/* img-wrapper */}
            <div
              ref={(el) => {
                slideRefs.current[i].imgWrapper = el;
              }}
              className="absolute inset-0 bg-[rgba(20,30,55,0.55)]"
            >
              <img
                src={slide.image}
                alt={slide.label}
                className="absolute  top-[-10px] h-[calc(100%+20px)] w-[calc(100%+20px)] object-cover mix-blend-luminosity"
              />
            </div>
            <div className="absolute inset-0 bg-black/60 size-full pointer-events-none" />

            {/* title-wrapper */}
            {/* inner-wrapper */}
            <div
              ref={(el) => {
                slideRefs.current[i].inner = el;
              }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 sm:px-16 lg:px-24"
            >
              <h2 className="font-['Cormorant_Garamond'] text-primary text-5xl lg:text-8xl font-light leading-[1.04] tracking-tighter mb-1">
                {slide.title}
                <br />
                <em className="font-light italic text-white/60">
                  {slide.titleEm}
                </em>
              </h2>

              <p className="mt-3  lg:max-w-md font-['Roboto'] font-light leading-relaxed text-white/60 sm:block">
                {slide.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation tabs */}
      <nav className="hidden absolute bottom-0 left-0 right-0 z-20 lg:flex border-t border-white/10">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.label}
            onClick={() => handleNavigate(i)}
            className={[
              "flex flex-1 cursor-pointer flex-col items-start border-r border-white/[0.07] px-2 pb-3 pt-2 text-left transition-colors duration-200 last:border-r-0 sm:px-3 sm:pb-4 sm:pt-3 lg:px-4",
              i === current ? "bg-white/[0.05]" : "hover:bg-white/[0.03]",
            ].join(" ")}
          >
            {/* Number */}
            <span
              className={`mb-[3px] block font-['Roboto'] text-xs font-light tracking-[0.18em] transition-colors duration-300 ${i == current ? "text-secondary" : "text-white/40"}`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Label */}
            <span
              className="block font-['Roboto'] text-[9px] font-light tracking-[0.04em] transition-colors duration-300 lg:text-lg"
              style={{
                color: i === current ? "#fff" : "rgba(255,255,255,0.35)",
              }}
            >
              <span className="sm:hidden">{slide.label.split(" ")[0]}</span>

              <span className="hidden sm:inline">{slide.label}</span>
            </span>

            {/* Progress */}
            <div className="relative mt-[5px] h-[2px] w-full overflow-hidden rounded-sm bg-white/10">
              {i === current ? (
                <div
                  key={`progress-${i}-${current}`}
                  className="absolute inset-y-0 left-0 bg-secondary animate-[tabProgress_var(--duration)_linear_forwards]"
                  style={{
                    ["--duration" as any]: `${AUTO_INTERVAL}ms`,
                  }}
                />
              ) : (
                <div className="absolute inset-0 bg-white/20" />
              )}
            </div>
          </button>
        ))}
      </nav>
      <div className="absolute bottom-5 left-0 right-0 z-20 flex items-center justify-center gap-2 lg:hidden">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => handleNavigate(i)}
            className={[
              "transition-all duration-300 rounded-full",
              i === current
                ? "w-6 h-[6px] bg-secondary"
                : "w-[6px] h-[6px] bg-white/30",
            ].join(" ")}
          />
        ))}
      </div>

      {/* Keyframe */}
      <style>{`
    @keyframes tabProgress {
      from { width: 0% }
      to { width: 100% }
    }
  `}</style>
    </section>
  );
}
