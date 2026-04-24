import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { menuItems, productItems } from "./header";

const iconMap: Record<string, React.ReactNode> = {
  grid: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
    />
  ),
  building: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
    />
  ),
  clock: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
  home: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12l8.954-8.955a1.5 1.5 0 012.092 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
    />
  ),
  plus: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  ),
  chart: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
    />
  ),
};

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const productsGridRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    setIsOpen(true);
    const items = itemsRef.current.filter(Boolean);
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.3,
      pointerEvents: "auto",
    });
    gsap.to(panelRef.current, { x: "0%", duration: 0.5, ease: "power3.out" });
    gsap.fromTo(
      items,
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.07,
        ease: "power2.out",
        delay: 0.25,
      },
    );
  };

  const closeMenu = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => setIsOpen(false),
    });
    gsap.to(panelRef.current, { x: "100%", duration: 0.45, ease: "power3.in" });
    setProductsOpen(false);
  };

  const toggleProducts = () => {
    const next = !productsOpen;
    setProductsOpen(next);
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
      {/* Hamburger trigger — wire this up in your Header */}
      <button
        onClick={openMenu}
        className="flex flex-col gap-[5px] p-1 w-9 h-9 justify-center"
        aria-label="Open menu"
      >
        <span className="block h-[1.5px] w-full bg-[#1a1a1a]" />
        <span className="block h-[1.5px] w-full bg-[#1a1a1a]" />
        <span className="block h-[1.5px] w-full bg-[#1a1a1a]" />
      </button>

      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={closeMenu}
        className="fixed inset-0 bg-black/50 z-40 opacity-0 pointer-events-none"
      />

      {/* Slide-in Panel */}
      <div
        ref={panelRef}
        className="fixed inset-0 z-50 bg-[#1a1a1a] flex flex-col translate-x-full"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 flex-shrink-0">
          <span
            className="text-[#f5f0eb] text-xl tracking-wide"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
            }}
          >
            Aurum
          </span>
          <button
            onClick={closeMenu}
            className="w-9 h-9 flex items-center justify-center"
            aria-label="Close menu"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f5f0eb"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="w-5 h-5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav Items */}
        <div className="flex-1 overflow-y-auto">
          {menuItems.map((item, i) => (
            <div
              key={item.label}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              className="border-b border-white/[0.06] px-6"
            >
              <div
                className="flex items-center justify-between py-[18px] cursor-pointer"
                onClick={item.hasDropdown ? toggleProducts : closeMenu}
              >
                <span
                  className="text-[26px] font-light tracking-wide transition-colors duration-200"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color:
                      item.hasDropdown && productsOpen ? "#c9a96e" : "#f5f0eb",
                  }}
                >
                  {item.label}
                </span>
                <span
                  className="text-lg transition-transform duration-300"
                  style={{
                    color:
                      item.hasDropdown && productsOpen
                        ? "#c9a96e"
                        : "rgba(255,255,255,0.3)",
                    transform:
                      item.hasDropdown && productsOpen
                        ? "rotate(90deg)"
                        : "none",
                  }}
                >
                  ›
                </span>
              </div>

              {/* Products Dropdown */}
              {item.hasDropdown && (
                <div
                  className="overflow-hidden transition-all duration-400 ease-in-out"
                  style={{ maxHeight: productsOpen ? "600px" : "0px" }}
                >
                  <div
                    ref={productsGridRef}
                    className="grid grid-cols-2 gap-px bg-white/[0.06] mb-px"
                  >
                    {productItems.map((product) => (
                      <div
                        key={product.label}
                        className="product-card bg-[#1a1a1a] p-4 cursor-pointer hover:bg-[#c9a96e]/10 transition-colors"
                        onClick={closeMenu}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#c9a96e"
                          strokeWidth="1.5"
                          className="w-5 h-5 mb-2"
                        >
                          {iconMap[product.icon]}
                        </svg>
                        <p className="text-[10px] font-medium tracking-widest uppercase text-[#c9a96e] mb-1">
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

          {/* Last item ref */}
          <div
            ref={(el) => {
              if (el) itemsRef.current[menuItems.length] = el;
            }}
            className="px-6 pt-6 pb-2"
          >
            <button
              onClick={closeMenu}
              className="w-full py-4 bg-[#c9a96e] text-[#1a1a1a] text-xs font-medium tracking-[0.12em] uppercase rounded-sm hover:bg-[#b8955a] transition-colors"
            >
              Book a Consultation
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
