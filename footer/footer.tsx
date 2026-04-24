"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "@/pages/components/Logo";

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

const SocialIcon = ({ children }: { children: React.ReactNode }) => (
  <span className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 cursor-pointer transition">
    {children}
  </span>
);

export default function Footer() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // CTA card — slides up from below
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

      // Logo + tagline
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

      // Footer columns — staggered
      gsap.fromTo(
        ".anim-col",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".anim-footer-body",
            start: "top 88%",
            toggleActions: "play none none none",
          },
          delay: 0.15,
        },
      );

      // Bottom bar
      gsap.fromTo(
        ".anim-bottom",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".anim-bottom",
            start: "top 95%",
            toggleActions: "play none none none",
          },
        },
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="flex flex-col bg-[#f0f0ed] mt-60 font-sans"
    >
      {/* CTA */}
      <CTACard />
      <div className="flex-1" />

      {/* Footer */}
      <footer className="anim-footer-body px-10 pb-10 pt-52 grid grid-cols-1 lg:grid-cols-[auto_auto] container">
        <div className="anim-logo opacity-0 flex flex-col gap-3">
          <h4 className="text-4xl text-primary">Logo</h4>
          <p className="text-xs text-gray-900/70 max-w-xs leading-relaxed font-light">
            Delivering advanced industrial machinery solutions with a focus on
            performance, safety, and reliability.
          </p>
        </div>

        {/* Columns */}
        <div className="mt-10 lg:mt-0 grid grid-cols-2 md:grid-cols-5 gap-10 mb-16 max-w-5xl">
          {footerColumns.map((col) => (
            <div key={col.title} className="anim-col opacity-0">
              <p className="text-xs font-semibold text-gray-900 mb-4 tracking-wide uppercase">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => {
                  const label = typeof link === "string" ? link : link.label;
                  const arrow = typeof link === "object" && link.arrow;
                  return (
                    <li key={label}>
                      <a className="text-sm text-gray-500 hover:text-gray-900 transition flex items-center gap-1 cursor-pointer">
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
      <div className="anim-bottom opacity-0 container">
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <span className="text-xs text-gray-400">
            © dsddd 2025. All rights reserved
          </span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <SocialIcon key={i}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-8.073-.779-.565-1.202-.394-1.202.414 0 .394.047 3.44.047 5.508 0 .394-.246.739-.492.852-2.466 1.166-3.02 3.617-.738 5.068 1.5.905 3.574.738 4.923-.738.197-.21.492-.394.738-.394.246 0 .541.184.738.394 1.349 1.476 3.423 1.643 4.923.738 2.282-1.451 1.728-3.902-.738-5.068-.246-.113-.492-.458-.492-.852 0-2.068.047-5.114.047-5.508 0-.808-.423-.979-1.202-.414C16.046 4.747 13.087 8.686 12 10.8z" />
                </svg>
              </SocialIcon>
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
            Partner with Morz Global for reliable, high-performance machinery
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
