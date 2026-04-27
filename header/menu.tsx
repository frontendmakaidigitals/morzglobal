"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { menuItems, productItems } from "./header";

const ProductsDropdown = ({ open }: { open: boolean }) => (
  <div
    className={`absolute top-[calc(100%+12px)] left-1/2 w-[580px] -translate-x-1/2
      bg-[#0e0c0a]/88 backdrop-blur-[20px] border border-white/10 rounded-[4px] p-6
      transition-all duration-200 ease-out pointer-events-none
      ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1.5"}`}
  >
    {/* Header row */}
    <div className="flex items-center justify-between mb-[18px] pb-3.5 border-b border-white/[0.08]">
      <span
        className="text-[15px] text-white/50 tracking-[0.1em]"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Our Products
      </span>
      <Link
        href="/products"
        className="text-[11px] text-white/40 hover:text-white flex items-center gap-1.5 tracking-[0.1em] transition-colors duration-200"
      >
        View all
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-3 gap-[2px]">
      {productItems.map((item, i) => (
        <Link
          key={i}
          href={item.href}
          className="group flex flex-col gap-1.5 p-3.5 rounded-[3px] bg-white/[0.03] hover:bg-white/[0.08] transition-colors duration-150"
        >
          <div className="w-7 h-7 border border-white/[0.18] group-hover:border-white/40 rounded-[3px] flex items-center justify-center mb-1.5 transition-colors duration-200">
            <ProductIcon type={item.icon} />
          </div>
          <span className="text-[12.5px] font-medium text-white/85 tracking-[0.04em]">
            {item.label}
          </span>
          <span className="text-[11px] text-white/38 leading-relaxed tracking-[0.02em]">
            {item.desc}
          </span>
        </Link>
      ))}
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between mt-[18px] pt-3.5 border-t border-white/[0.08]">
      <span className="text-[10px] tracking-[0.12em] uppercase text-white/30">
        10+ Years · 250+ Properties
      </span>
      <Link
        href="/contact"
        className="group text-[11px] font-medium tracking-[0.08em] uppercase text-[#C9A96E] flex items-center gap-1.5 transition-all duration-200 hover:gap-2.5"
      >
        Book a consultation
        <svg
          width="13"
          height="13"
          viewBox="0 0 16 16"
          fill="none"
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="#C9A96E"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  </div>
);

const ProductIcon = ({ type }: { type: string }) => {
  const s = {
    stroke: "rgba(255,255,255,0.6)",
    strokeWidth: "1.2",
    strokeLinecap: "round" as const,
    fill: "none",
  };
  const icons: Record<string, React.ReactNode> = {
    grid: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="2" width="5" height="5" {...s} />
        <rect x="9" y="2" width="5" height="5" {...s} />
        <rect x="2" y="9" width="5" height="5" {...s} />
        <rect x="9" y="9" width="5" height="5" {...s} />
      </svg>
    ),
    building: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M2 14V6l6-4 6 4v8" {...s} />
        <rect x="6" y="9" width="4" height="5" {...s} />
      </svg>
    ),
    clock: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="5.5" {...s} />
        <path d="M8 5v3l2 2" {...s} />
      </svg>
    ),
    home: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M2 14V6l6-4 6 4v8" {...s} />
        <path d="M5 14V9h6v5" {...s} />
      </svg>
    ),
    plus: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M3 8h10M8 3v10" {...s} />
      </svg>
    ),
    chart: (
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M2 12l4-4 3 3 5-6" {...s} strokeLinejoin="round" />
      </svg>
    ),
  };
  return <>{icons[type]}</>;
};

const Menu = () => {
  const pathname = usePathname();
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {menuItems.map((item, index) => {
        const isActive =
          pathname === item.href ||
          (pathname?.startsWith(item.href + "/") ?? false);

        if (item.hasDropdown) {
          return (
            <div key={item.href} ref={dropRef} className="relative">
              <button
                onClick={() => setDropOpen((p) => !p)}
                className={`relative flex items-center gap-1.5 tracking-[0.08em] px-3.5 py-1.5 transition-colors duration-200
                  after:absolute after:left-3.5 after:right-3.5 after:bottom-0.5 after:h-px after:bg-white/80
                  after:origin-left after:transition-transform after:duration-300
                  ${isActive || dropOpen ? "text-white after:scale-x-100" : "text-white/70 hover:text-white after:scale-x-0 hover:after:scale-x-100"}`}
              >
                {item.label}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={`transition-transform duration-250 ${dropOpen ? "rotate-180" : ""}`}
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="rgba(255,255,255,0.7)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <ProductsDropdown open={dropOpen} />
            </div>
          );
        }

        return (
          <Link
            key={index}
            href={item.href}
            style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            className={`relative tracking-[0.08em] px-3.5 py-1.5 transition-colors duration-200 animate-slideDown
              after:absolute after:left-3.5 after:right-3.5 after:bottom-0.5 after:h-px after:bg-white/80
              after:origin-left after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.4,0,0.2,1)]
              ${isActive ? "text-white after:scale-x-100" : "text-white/70 hover:text-white after:scale-x-0 hover:after:scale-x-100"}`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default Menu;
