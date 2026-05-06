"use client";
import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmootherReady } from "@/app/smoother-context";
import Logo from "@/pages/components/Logo";
import Image from "next/image";
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger);

const footerColumns = [
  {
    title: "Offshore",
    links: [
      "Detail Engineering (EPC Stage)",
      "Brownfield Modifications",
      "Structural Studies",
      "Topside and Jacket Design",
      "Lifting and load out plan",
      "Sea Fastening Designs",
      "Process & Process Safety Engineering",
      "Mechanical (Static & Rotary) Engineering",
      "Piping Engineering",
      "Electrical Engineering",
      "Instrumentation Engineering",
      "Civil/Structural Engineering",
      "Project Management & Project Planning",
      "Cost Estimation & Budgeting",
      "3D Modelling",
      "As-built Drawings",
    ],
    link: "/services#offshore",
  },
  {
    title: "Onshore",
    links: [
      "Detail Engineering (EPC Stage)",
      "Solar Power Engineering",
      "Process & Safety Engineering",
      "Mechanical (Static & Rotary) Engineering",
      "Piping and Pipeline Engineering",
      "Electrical Engineering",
      "Instrumentation Engineering",
      "Civil/Structural Engineering",
      "Substation Design",
      "Project Management & Project Planning",
      "Cost Estimation & Budgeting",
      "3D Modelling",
      "As-built Drawings",
    ],
    link: "/services#onshore",
  },
  {
    title: "Bim",
    links: [
      "BIM Modelling",
      "Scan to Drawing Conversion",
      "Laser Scan Services",
    ],
    link: "/services#bim",
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
      <footer className="anim-footer-body px-10 pb-10 pt-52 container">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10">
          {/* Left — logo + description */}
          <div className="anim-logo opacity-0 flex flex-col gap-3">
            <Logo light />
            <p className="text-xs text-gray-50/70 max-w-2xs leading-relaxed font-light">
              Delivering advanced industrial engineering solutions with a focus
              on performance, safety, and reliability.
            </p>
          </div>

          {/* Right — columns + contact */}
          <div className="mt-10 lg:mt-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {/* Link columns */}
              {footerColumns.map((col) => (
                <div key={col.title} className="anim-col opacity-0">
                  <p className="text-xs font-semibold text-gray-100 mb-4 tracking-wide uppercase">
                    {col.title}
                  </p>
                  <ul className="space-y-2.5">
                    {col.links.map((link) => {
                      const isObject = typeof link === "object";
                      const label = isObject ? (link as any).label : link;
                      const href = isObject ? (link as any).href : "#";
                      return (
                        <li key={label}>
                          <Link
                            href={col.link}
                            className="group text-sm text-gray-200 hover:text-white transition flex items-center gap-1 cursor-pointer w-fit"
                          >
                            <span className="relative">
                              {label}
                              {/* underline animation */}
                              <span className="absolute left-0 -bottom-px h-px w-0 bg-white group-hover:w-full transition-all duration-300 ease-out" />
                            </span>
                            {isObject && (
                              <span className="text-xs opacity-70">↗</span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}

              {/* Contact — 4th column in the same grid */}
              <div className="anim-col opacity-0">
                <p className="text-xs font-semibold text-gray-100 mb-4 tracking-wide uppercase">
                  Get in Touch
                </p>
                <div className="flex flex-col gap-4">
                  <a
                    href="mailto:mohammed@morzglobal.com"
                    className="flex items-center gap-3 text-sm text-gray-200 hover:text-white transition group"
                  >
                    <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center shrink-0 transition">
                      <Mail size={14} />
                    </span>
                    info@morzglobal.com
                  </a>

                  <div className="flex items-center gap-3 text-sm text-gray-200">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <MapPin size={14} />
                    </span>
                    Churchill Tower Business Bay, Dubai- UAE
                  </div>

                  <a
                    href="tel:+971503785060"
                    className="flex items-center gap-3 text-sm text-gray-200 hover:text-white transition group"
                  >
                    <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center shrink-0 transition">
                      <Phone size={14} />
                    </span>
                    +971 50 739 0680
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom bar */}
      <div className="anim-bottom bg-primary">
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
