"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { menuItems } from "./header";
import { Menu } from "lucide-react";
import Logo from "@/pages/components/Logo";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Link from "next/link";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const smoother = ScrollSmoother.get();
    if (isOpen) {
      smoother?.paused(true);
    } else {
      smoother?.paused(false);
    }
    return () => {
      smoother?.paused(false);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) closeMenu();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  const openMenu = () => {
    setIsOpen(true);

    const context = gsap.context(() => {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        pointerEvents: "auto",
        ease: "power2.out",
      });

      gsap.fromTo(
        panelRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.6, ease: "power4.out" },
      );

      if (contentWrapperRef.current) {
        const items = gsap.utils.toArray(
          contentWrapperRef.current.children,
        ) as HTMLElement[];

        gsap.fromTo(
          items,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.3,
          },
        );
      }
    }, panelRef);

    ctx.current = context;
  };

  const closeMenu = () => {
    if (ctx.current) ctx.current.revert();

    gsap.to(panelRef.current, {
      x: "100%",
      duration: 0.5,
      ease: "power4.in",
      onComplete: () => setIsOpen(false),
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      pointerEvents: "none",
    });
  };

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={openMenu}
        className="flex flex-col gap-[5px] p-1 w-9 h-9 justify-center z-50 relative"
        aria-label="Open menu"
      >
        <span className="block h-[1.5px] w-full bg-gray-100" />
        <span className="block h-[1.5px] w-full bg-gray-100" />
        <span className="block h-[1.5px] w-full bg-gray-100" />
      </button>

      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={closeMenu}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 opacity-0 pointer-events-none"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="fixed inset-0 z-50 bg-[#1a1a1a] flex flex-col translate-x-full will-change-transform"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 flex-shrink-0">
          <Logo light={true} />
          <button
            onClick={closeMenu}
            className="w-9 h-9 flex items-center justify-center text-white"
            aria-label="Close menu"
          >
            <Menu className="text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div ref={contentWrapperRef}>
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="border-b border-white/[0.06] px-6"
              >
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="flex items-center py-[18px]"
                >
                  <span
                    className="text-[26px] font-light tracking-wide text-[#f5f0eb]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {item.label}
                  </span>
                </Link>
              </div>
            ))}

            {/* CTA */}
            <div className="px-6 pt-8 pb-4">
              <Link href="/contact" onClick={closeMenu}>
                <button className="w-full py-4 bg-primary text-gray-100 text-xs font-medium tracking-[0.12em] uppercase rounded-sm hover:bg-primary/90 transition-all duration-300">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
