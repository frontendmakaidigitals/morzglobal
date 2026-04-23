"use client";
import { useEffect, useState } from "react";
import Logo from "@/pages/components/Logo";
import Menu from "./menu";

export const menuItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products", hasDropdown: true },
  { label: "Blogs", href: "/blogs" },
];

export const productItems = [
  {
    label: "Residential",
    desc: "Luxury apartments and villas curated for modern living",
    href: "/products/residential",
    icon: "grid",
  },
  {
    label: "Commercial",
    desc: "Premium office and retail spaces for businesses",
    href: "/products/commercial",
    icon: "building",
  },
  {
    label: "Off-plan",
    desc: "Invest early in upcoming landmark developments",
    href: "/products/off-plan",
    icon: "clock",
  },
  {
    label: "Holiday Homes",
    desc: "Seasonal rentals in the world's finest destinations",
    href: "/products/holiday",
    icon: "home",
  },
  {
    label: "New Launches",
    desc: "Be the first to access our latest exclusive listings",
    href: "/products/new",
    icon: "plus",
  },
  {
    label: "Investment",
    desc: "High-yield portfolios for serious real estate investors",
    href: "/products/investment",
    icon: "chart",
  },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 py-5 flex items-center transition-all duration-400 ease-in-out
        ${
          scrolled
            ? "bg-black/55 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent border-b border-white/[0.08]"
        }`}
    >
      <div className="w-full max-w-[94%] mx-auto flex items-center justify-between">
        <Logo />
        <Menu />
        <button className="text-[11.5px] font-medium tracking-[0.1em] uppercase text-[#1a1814] bg-white/93 hover:bg-white px-5 py-[9px] rounded-[2px] transition-all duration-200 hover:-translate-y-px cursor-pointer">
          Contact Us
        </button>
      </div>
    </header>
  );
};

export default Header;
