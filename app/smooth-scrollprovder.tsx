"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { SmootherReadyContext } from "./smoother-context";
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [smootherReady, setSmootherReady] = useState(false); // 👈 new

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;

    let smoother: any;
    let timeout: ReturnType<typeof setTimeout>;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { ScrollSmoother } = await import("gsap/ScrollSmoother");

      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      ScrollSmoother.get()?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ScrollTrigger.clearScrollMemory();

      timeout = setTimeout(() => {
        if (!wrapperRef.current || !contentRef.current) return;

        smoother = ScrollSmoother.create({
          wrapper: wrapperRef.current,
          content: contentRef.current,
          smooth: 1,
          effects: true,
          normalizeScroll: true,
        });

        setSmootherReady(true); // 👈 signal children
      }, 50);
    };

    init();

    return () => {
      clearTimeout(timeout);
      smoother?.kill();
      setSmootherReady(false);
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
        ScrollTrigger.clearScrollMemory();
      });
    };
  }, [mounted]);

  return (
    <SmootherReadyContext.Provider value={smootherReady}>
      <div id="smooth-wrapper" ref={wrapperRef}>
        <div id="smooth-content" ref={contentRef}>
          {children}
        </div>
      </div>
    </SmootherReadyContext.Provider>
  );
}
