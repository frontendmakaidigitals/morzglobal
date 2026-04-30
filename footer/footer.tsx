"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmootherReady } from "@/app/smoother-context";
import Logo from "@/pages/components/Logo";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

const footerColumns = [
  {
    title: "Product",
    links: ["Import From Figma", "Design", "Animate", "Collaborate", "Export"],
  },
  {
    title: "Templates",
    links: [
      "Community",
      "Devices",
      "Text Animations",
      "Logos",
      "Animated Icons",
      "Charts",
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Pricing" },
      { label: "Join Our Discord", arrow: true },
      { label: "Documentation", arrow: true },
      { label: "Tutorials", arrow: true },
      { label: "Hire An Expert", arrow: true },
      { label: "Changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Customers" },
      { label: "Terms & Conditions" },
      { label: "Privacy Policy" },
      { label: "Careers", arrow: true },
    ],
  },
  {
    title: "Connect",
    links: ["Sales", "Support"],
  },
];

const socialIcons = [
  { name: "Twitter", icon: "twitter.png" },
  { name: "LinkedIn", icon: "linkedin.png" },
  { name: "Facebook", icon: "facebook.png" },
  { name: "Instagram", icon: "instagram.png" },
];

export default function Footer() {
  const smootherReady = useSmootherReady();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!smootherReady) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".anim-cta",
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".anim-cta",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        ".anim-logo",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-footer-body",
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        ".anim-col",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          delay: 0.15,
          scrollTrigger: {
            trigger: ".anim-footer-body",
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );

      ScrollTrigger.refresh();
    }, wrapperRef);

    return () => ctx.revert();
  }, [smootherReady]);

  return (
    <div ref={wrapperRef} className="flex flex-col bg-[#333] mt-60 font-sans">
      {/* CTA */}
      <CTACard />
      <div className="flex-1" />

      {/* Footer */}
      <footer className="anim-footer-body px-10 pb-10 pt-52 grid grid-cols-1 lg:grid-cols-[auto_auto] container">
        <div className="anim-logo opacity-0 flex flex-col gap-3">
          <Logo light />
          <p className="text-xs text-gray-50/70 max-w-xs leading-relaxed font-light">
            Delivering advanced industrial engineering solutions with a focus on
            performance, safety, and reliability.
          </p>
        </div>

        {/* Columns */}
        <div className="mt-10 lg:mt-0 grid grid-cols-2 md:grid-cols-5 gap-10 mb-16 max-w-5xl">
          {footerColumns.map((col) => (
            <div key={col.title} className="anim-col opacity-0">
              <p className="text-xs font-semibold text-gray-100 mb-4 tracking-wide uppercase">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => {
                  const label = typeof link === "string" ? link : link.label;
                  const arrow = typeof link === "object" && link.arrow;
                  return (
                    <li key={label}>
                      <a className="text-sm text-gray-200 hover:text-gray-300 transition flex items-center gap-1 cursor-pointer">
                        {label}
                        {arrow && <span className="text-xs opacity-70">↗</span>}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </footer>

      {/* Bottom */}
      <div className="anim-bottom  bg-primary">
        <div className="container border-gray-50 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <span className="text-xs text-gray-50">
            © MORZ Global 2026. All rights reserved
          </span>
          <div className="flex items-center gap-3">
            {socialIcons.map((icon, i) => (
              <Image
                key={i}
                src={`/social-icon/${icon.icon}`}
                alt={icon.name}
                width={24}
                className="invert brightness-0"
                height={24}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CTACard() {
  return (
    <div className="anim-cta opacity-0 bg-black -translate-y-1/2 absolute left-1/2 -translate-x-1/2 max-w-[94%] lg:max-w-5xl w-full rounded-2xl overflow-hidden flex items-stretch">
      <div className="flex-1 p-12 flex flex-col justify-between z-10 relative">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight mb-2.5">
            Powering industrial performance
            <br />
            with precision engineering
          </h2>
          <p className="text-xs text-[#888888]">
            Partner with Morz Global for reliable, high-performance engineering
            solutions built to last.
          </p>
        </div>
        <div className="mt-7">
          <button className="bg-[#1e1e1e] text-[#cccccc] border border-[#333333] rounded-lg px-4 py-2 text-xs cursor-pointer hover:bg-[#2a2a2a] transition-colors">
            Get started
          </button>
        </div>
      </div>
      <div className="w-xs lg:w-md scale-[1.2] lg:scale-[1.4] absolute translate-y-1/4 right-0 translate-x-1/2 p-3 flex-shrink-0 overflow-hidden">
        <img
          src="/globe.png"
          className="w-full h-full object-cover"
          alt="globe"
        />
      </div>
    </div>
  );
}
