"use client";
import { useEffect, useState } from "react";
import Logo from "@/pages/components/Logo";
import Menu from "./menu";
import MobileMenu from "./mobile-menu";

export const menuItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/" },
  { label: "Products", href: "/products", hasDropdown: true },
  { label: "Blogs", href: "/" },
];

export const productItems = [
  {
    label: "Residential",
    desc: "Luxury apartments and villas curated for modern living",
    href: "/",
    icon: "grid",
  },
  {
    label: "Commercial",
    desc: "Premium office and retail spaces for businesses",
    href: "/",
    icon: "building",
  },
  {
    label: "Off-plan",
    desc: "Invest early in upcoming landmark developments",
    href: "/-plan",
    icon: "clock",
  },
  {
    label: "Holiday Homes",
    desc: "Seasonal rentals in the world's finest destinations",
    href: "/",
    icon: "home",
  },
  {
    label: "New Launches",
    desc: "Be the first to access our latest exclusive listings",
    href: "/",
    icon: "plus",
  },
  {
    label: "Investment",
    desc: "High-yield portfolios for serious real estate investors",
    href: "/",
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
      className={`fixed top-0 inset-x-0 z-50 py-4 flex items-center transition-all duration-400 ease-in-out
        ${
          scrolled
            ? "bg-black/55 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent border-b border-white/[0.08]"
        }`}
    >
      <div className="w-full max-w-[94%] mx-auto flex items-center justify-between">
        <Logo light={true} />
        <Menu />
        <div className="block lg:hidden">
          <MobileMenu />
        </div>
        <button className="hidden lg:block text-sm font-medium uppercase   bg-primary text-white hover:bg-primary/80 px-5 py-3 rounded-[2px] transition-all duration-200 hover:scale-[1.03] cursor-pointer">
          Contact Us
        </button>
      </div>
    </header>
  );
};

export default Header;
