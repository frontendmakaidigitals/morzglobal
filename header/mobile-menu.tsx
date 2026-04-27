"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { menuItems, productItems } from "./header";
import { Menu } from "lucide-react";
import Logo from "@/pages/components/Logo";
import { ScrollSmoother } from "gsap/ScrollSmoother";
const MobileMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [productsOpen, setProductsOpen] = React.useState(false);

  // Refs
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null); // Used for staggering children
  const productsGridRef = useRef<HTMLDivElement>(null);

  // Store GSAP context/tweens for cleanup
  const ctx = useRef<gsap.Context | null>(null);

  // --- Effects ---
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
  // Handle Body Scroll Lock
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

  // Handle Escape Key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeMenu();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  // --- Animations ---

  const openMenu = () => {
    setIsOpen(true);

    // Create a context for easy cleanup
    const context = gsap.context(() => {
      // Animate Overlay
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        pointerEvents: "auto",
        ease: "power2.out",
      });

      // Animate Panel Slide
      gsap.fromTo(
        panelRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.6, ease: "power4.out" },
      );

      // Stagger in Content Items (Menu Items + CTA Button)
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
    }, panelRef); // Scope to panelRef

    ctx.current = context;
  };

  const closeMenu = () => {
    if (ctx.current) ctx.current.revert(); // Kill animations

    // Close Panel
    gsap.to(panelRef.current, {
      x: "100%",
      duration: 0.5,
      ease: "power4.in",
      onComplete: () => {
        setIsOpen(false);
        setProductsOpen(false);
      },
    });

    // Fade Overlay
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      pointerEvents: "none",
    });
  };

  const toggleProducts = (e: React.MouseEvent) => {
    // Stop propagation if needed, but handled by div structure here
    const next = !productsOpen;
    setProductsOpen(next);

    // Animate Product Cards
    if (next && productsGridRef.current) {
      const cards = productsGridRef.current.querySelectorAll(".product-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" },
      );
    }
  };

  return (
    <>
      {/* Hamburger Trigger */}
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
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 opacity-0 pointer-events-none transition-opacity duration-300"
      />

      {/* Slide-in Panel */}
      <div
        ref={panelRef}
        className="fixed inset-0 z-50 bg-[#1a1a1a] flex flex-col translate-x-full will-change-transform"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 flex-shrink-0">
          <Logo light={true} />
          <button
            onClick={closeMenu}
            className="w-9 h-9 flex items-center justify-center text-[#f5f0eb] hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <Menu className="text-white" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {/* Wrapper for staggering animations */}
          <div ref={contentWrapperRef}>
            {menuItems.map((item, i) => (
              <div
                key={item.label}
                className="border-b border-white/[0.06] px-6"
              >
                <div
                  className="flex items-center justify-between py-[18px] cursor-pointer group"
                  onClick={item.hasDropdown ? toggleProducts : closeMenu}
                >
                  <span
                    className="text-[26px] font-light tracking-wide transition-colors duration-200"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      color:
                        item.hasDropdown && productsOpen
                          ? "#1b93d0"
                          : "#f5f0eb",
                    }}
                  >
                    {item.label}
                  </span>
                  {item.hasDropdown && (
                    <span
                      className="text-lg transition-transform duration-300"
                      style={{
                        color: productsOpen
                          ? "#1b93d0"
                          : "rgba(255,255,255,0.3)",
                        transform: productsOpen ? "rotate(90deg)" : "none",
                      }}
                    >
                      ›
                    </span>
                  )}
                </div>

                {/* Products Dropdown */}
                {item.hasDropdown && (
                  <div
                    className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    style={{
                      maxHeight: productsOpen ? "800px" : "0px",
                      opacity: productsOpen ? 1 : 0.5,
                    }}
                  >
                    <div
                      ref={productsGridRef}
                      className="grid grid-cols-2 gap-px bg-white/[0.06] mb-px"
                    >
                      {productItems.map((product) => (
                        <div
                          key={product.label}
                          className="product-card bg-[#1a1a1a] p-4 cursor-pointer hover:bg-primary/10 transition-colors group/sub"
                          onClick={(e) => {
                            e.stopPropagation();
                            closeMenu();
                          }}
                        >
                          <p className="text-[10px] font-medium tracking-widest uppercase text-primary mb-1">
                            {product.label}
                          </p>
                          <p className="text-[10px] text-white/40 leading-relaxed">
                            {product.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* CTA Button (Part of stagger animation) */}
            <div className="px-6 pt-8 pb-4">
              <button
                onClick={closeMenu}
                className="w-full py-4 bg-primary text-gray-100 text-xs font-medium tracking-[0.12em] uppercase rounded-sm hover:bg-[#b8955a] hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              >
                Book a Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
