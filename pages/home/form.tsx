"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmootherReady } from "@/app/smoother-context";

gsap.registerPlugin(ScrollTrigger);

export default function ContactForm() {
  const smootherReady = useSmootherReady();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!smootherReady) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        ".cf-eyebrow",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
      )
        .fromTo(
          ".cf-heading",
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
          "-=0.3",
        )
        .fromTo(
          ".cf-subtext",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.45",
        )
        .fromTo(
          ".cf-info",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.35",
        )
        .fromTo(
          ".cf-form-panel",
          { opacity: 0, x: 40, scale: 0.98 },
          { opacity: 1, x: 0, scale: 1, duration: 0.85, ease: "power3.out" },
          "-=0.9",
        );

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [smootherReady]);

  return (
    <div ref={sectionRef} className="w-full mt-18">
      <div className="container grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">
        {/* LEFT — info panel */}
        <div className="lg:px-[52px] flex flex-col justify-between">
          <div>
            <p className="cf-eyebrow opacity-0 text-[11px] tracking-[0.16em] text-[#999] italic mb-5">
              / get in touch /
            </p>
            <h1
              className="cf-heading opacity-0 text-5xl font-normal leading-[1.1] text-[#111] tracking-[-0.01em] mb-5"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              We are always ready to help you and{" "}
              <span className="text-primary">answer your questions</span>
            </h1>
            <p className="cf-subtext opacity-0 text-[13.5px] leading-[1.8] text-[#888] font-light mb-10">
              Have questions or need a customized machinery solution? Our team
              is ready to assist you with expert guidance and tailored
              recommendations.
            </p>
          </div>

          <div className="cf-info opacity-0 grid grid-cols-2 gap-y-7 gap-x-5">
            {[
              {
                label: "Call Center",
                lines: ["800 100 975 20 34", "+1 (123) 1800-234-5678"],
              },
              {
                label: "Our Location",
                lines: ["USA, New York – 1060", "Str. First Avenue 1"],
              },
              {
                label: "Email",
                lines: ["hello@elienis.co", "support@elienis.co"],
              },
            ].map(({ label, lines }) => (
              <div key={label}>
                <p className="text-[10.5px] font-medium tracking-[0.1em] uppercase text-primary mb-2">
                  {label}
                </p>
                {lines.map((l) => (
                  <p
                    key={l}
                    className="text-[13px] text-[#555] font-light leading-[1.75]"
                  >
                    {l}
                  </p>
                ))}
              </div>
            ))}

            <div>
              <p className="text-[10.5px] font-medium tracking-[0.1em] uppercase text-primary mb-3">
                Social Network
              </p>
              <div className="flex gap-2.5">
                {[
                  {
                    title: "Facebook",
                    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                  },
                  {
                    title: "X",
                    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                  },
                  {
                    title: "LinkedIn",
                    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                  },
                  {
                    title: "YouTube",
                    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
                  },
                ].map(({ title, path }) => (
                  <button
                    key={title}
                    title={title}
                    className="w-8 h-8 border border-[#e0dbd4] rounded-[3px] flex items-center justify-center text-[#888] bg-[#faf9f7] hover:border-[#aaa] hover:text-[#333] hover:bg-[#f0ede8] transition-all duration-200"
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d={path} />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — form panel */}
        <div className="cf-form-panel opacity-0 bg-white shadow border border-gray-400/20 px-5 mt-10 lg:mt-0 lg:px-12 py-14 rounded-2xl flex flex-col justify-center">
          <h2
            className="text-2xl font-normal text-[#111] mb-1.5"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Get in Touch
          </h2>
          <p className="text-[13px] text-[#aaa] font-light mb-8">
            Define your goals and let us help you find the right solution.
          </p>

          <div className="flex flex-col">
            {[
              { label: "Full name", type: "text", placeholder: "John Doe" },
              { label: "Email", type: "email", placeholder: "you@example.com" },
              {
                label: "Subject",
                type: "text",
                placeholder: "How can we help?",
              },
            ].map(({ label, type, placeholder }) => (
              <div
                key={label}
                className="group relative border-b border-[#e0dbd4] pt-3.5 pb-2.5 focus-within:[&_.underline-bar]:scale-x-100"
              >
                <label className="block text-sm font-[400] tracking-[0.1em] text-gray-900/60 mb-1.5">
                  {label}
                </label>
                <input
                  type={type}
                  placeholder={placeholder}
                  className="w-full bg-transparent border-none outline-none font-light text-[13.5px] text-[#333] placeholder:text-[#ccc]"
                />
                <div className="underline-bar absolute bottom-[-1px] left-0 right-0 h-px bg-[#333] scale-x-0 origin-left transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]" />
              </div>
            ))}

            <div className="group relative border-b border-[#e0dbd4] pt-3.5 pb-2.5 focus-within:[&_.underline-bar]:scale-x-100">
              <label className="block text-sm font-[400] tracking-[0.1em] text-gray-900/60 mb-1.5">
                Message
              </label>
              <textarea
                placeholder="Tell us more about your enquiry..."
                rows={3}
                className="w-full bg-transparent border-none outline-none font-light text-[13.5px] text-[#333] placeholder:text-[#ccc] resize-none leading-relaxed"
              />
              <div className="underline-bar absolute bottom-[-1px] left-0 right-0 h-px bg-[#333] scale-x-0 origin-left transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]" />
            </div>
          </div>

          <div className="flex items-center justify-between mt-7">
            <button className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-sm text-xs font-medium uppercase transition-all duration-200 hover:scale-[1.03] group">
              Send a message
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="#fff"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span className="text-[11px] text-gray-500 font-light tracking-[0.04em]">
              We reply within 24h
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
