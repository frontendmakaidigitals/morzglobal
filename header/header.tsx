"use client";
import { useEffect, useState } from "react";
import Logo from "@/pages/components/Logo";
import Menu from "./menu";
import MobileMenu from "./mobile-menu";
import Image from "next/image";
export const menuItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
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
        <a
          href="https://wa.me/971508287918?text=Hi%20I%20want%20to%20know%20more"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:block"
        >
          <div className="bg-[#16a74b] hover:bg-[#0ebf4f] rounded flex items-center gap-2 pl-2 pr-3 py-1.5">
            <Image
              src="/whatsapp.png"
              alt="whatsapp"
              width={18}
              height={18}
              className="size-8! w-full h-full object-contain"
            />
            <span className="text-gray-50 font-medium">Whatsapp</span>
          </div>
        </a>
      </div>
    </header>
  );
};

export default Header;
