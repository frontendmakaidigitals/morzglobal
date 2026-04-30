// app/about/page.tsx
"use client";

import { useState } from "react";

const services = [
  "Detailed Engineering Services for Oil & Gas Onshore and Offshore Projects",
  "Civil and Architectural Engineering",
  "Power Generation and Distribution",
  "Solar Power Engineering",
  "Drafting Services",
  "3D Modelling",
  "Structural Engineering",
  "Electrical Engineering",
  "Pipeline Engineering",
  "Process Engineering",
  "Instrumentation and Control Engineering",
  "Mechanical Engineering",
  "HVAC Engineering",
  "Specialized Structural, Electrical & Process Studies",
  "HSE Studies",
  "As-built Drawings",
];

const whyChooseUs = [
  {
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12l3 3 5-5" />
      </svg>
    ),
    title: "End-to-End Expertise",
    desc: "From feasibility studies to detailed engineering and final execution support, we cover the full project lifecycle using licensed software and tools.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        viewBox="0 0 24 24"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Industry Versatility",
    desc: "Our experience spans oil & gas, power generation, renewable energy, and infrastructure — adapting to diverse project requirements.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        viewBox="0 0 24 24"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Precision & Innovation",
    desc: "We leverage advanced tools, 3D modelling, and modern engineering practices to deliver accurate and optimized solutions.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        viewBox="0 0 24 24"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: "Client-Centric Approach",
    desc: "We prioritize transparency, collaboration, and tailored solutions to meet each client's unique goals.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        viewBox="0 0 24 24"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Commitment to Safety & Quality",
    desc: "Our work is guided by strict quality control measures and comprehensive HSE standards.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
      </svg>
    ),
    title: "Global Presence",
    desc: "Supporting clients across regional and international markets for both onshore and offshore projects.",
  },
];

const values = [
  {
    label: "Integrity",
    desc: "Highest ethical standards in every project and partnership.",
    color: "bg-slate-100 text-slate-700 border-slate-200",
  },
  {
    label: "Excellence",
    desc: "High-quality, precise, and reliable engineering solutions.",
    color: "bg-blue-50 text-blue-700 border-blue-100",
  },
  {
    label: "Innovation",
    desc: "New technologies and forward-thinking approaches for complex challenges.",
    color: "bg-sky-50 text-sky-700 border-sky-100",
  },
  {
    label: "Safety First",
    desc: "Prioritizing health, safety, and environmental responsibility.",
    color: "bg-amber-50 text-amber-700 border-amber-100",
  },
  {
    label: "Collaboration",
    desc: "Strong partnerships internally and with our clients.",
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
];

export default function AboutPage() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const cards = [
    {
      label: "Vision",
      heading: "Trusted Global Engineering Partner",
      body: "To be a trusted global engineering partner recognized for delivering innovative, sustainable, and high-quality solutions that shape the future of infrastructure and energy.",
      tags: ["Sustainable", "Global Reach"],
      img: "https://march-engineering.com/wp-content/uploads/2024/08/006.2_march_expertise_Integrated_engineering_solutions_the_challenges-scaled.jpeg", // replace with your image
      fadeColor: "13, 31, 20",
      object: "object-left object-cover",
    },
    {
      label: "Mission",
      heading: "Technical Excellence in Every Project",
      body: "To provide comprehensive engineering, design, and consultancy services that exceed client expectations through technical excellence, safety, and efficiency.",
      tags: ["Excellence", "Safety First"],
      img: "https://yaducorporation.com/wp-content/uploads/2023/10/consultancy.jpg", // replace with your image
      fadeColor: "13, 28, 53",
      object: "object-cover",
    },
  ];
  return (
    <main className="bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <img
          src="/about/hero.png"
          alt="Offshore engineering platform"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a162880] to-transparent" />
        <div className="relative z-10 container pb-20 w-full">
          <p className="text-[#4da6ff] text-sm font-medium tracking-widest uppercase mb-4">
            Engineering · Design · Consultancy
          </p>
          <h1
            className="text-white text-5xl lg:text-7xl font-light leading-[1.08] mb-6 max-w-3xl"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Built for the World's <em>Most Demanding</em> Projects
          </h1>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed">
            A multidisciplinary engineering and consultancy firm delivering
            end‑to‑end solutions across complex industrial and infrastructure
            projects.
          </p>
        </div>
        {/* Floating stat cards */}
        <div className="absolute bottom-10 right-10 hidden lg:flex gap-4 z-10">
          {[
            ["16+", "Engineering Disciplines"],
            ["Onshore &", "Offshore Expertise"],
            ["Global", "Project Reach"],
          ].map(([n, l]) => (
            <div
              key={l}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 text-white"
            >
              <p className="text-2xl font-semibold">{n}</p>
              <p className="text-xs text-white/60 mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="container mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2
            className="text-4xl lg:text-5xl font-[500] text-[#0a1628] leading-tight mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Who We Are
          </h2>
          <p className="text-gray-600 text-base leading-relaxed mb-5">
            We are a multidisciplinary engineering and consultancy firm
            delivering end‑to‑end solutions across complex industrial and
            infrastructure projects. With expertise spanning oil & gas, power,
            renewables, and the built environment, we provide integrated
            services from concept to completion.
          </p>
          <p className="text-gray-600 text-base leading-relaxed mb-8">
            Our capabilities include detailed engineering for onshore and
            offshore oil & gas projects, civil and architectural design, power
            generation and distribution, solar engineering, and technical
            services such as 3D modelling, drafting, and as‑built documentation.
          </p>
          <p className="text-gray-600 text-base leading-relaxed">
            Backed by a team of experienced engineers and project specialists,
            we bring precision, innovation, and efficiency to every stage —
            ensuring our clients receive reliable, scalable, and future‑ready
            solutions.
          </p>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
            alt="Engineering team"
            className="rounded-2xl w-full h-[500px] object-cover"
          />
          <div className="absolute -bottom-6 -left-6 bg-[#0a1628] rounded-2xl p-6 text-white shadow-2xl">
            <p
              className="text-3xl font-semibold"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              16+
            </p>
            <p className="text-sm text-white/60 mt-1">
              Engineering Disciplines
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className=" mt-28">
        <div className="container">
          <h2
            className="text-4xl lg:text-5xl font-light text-[#0a1628] mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Full Range of Services
          </h2>
          <p className="text-gray-500 text-base mb-14 max-w-xl">
            We offer comprehensive engineering, design, project management,
            planning and consultancy services across all project phases.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-10">
            {services.map((s, i) => (
              <div
                key={i}
                className={`group relative   aspect-[6/5] rounded-xl border transition-all duration-300 cursor-default overflow-hidden `}
              >
                <div className="absolute size-full inset-0 bg-black/10 z-10" />
                <img
                  src={
                    "https://images.unsplash.com/photo-1624771002998-4aadfd43e7c4?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  className="absolute inset-0 size-full"
                />
                <div className="w-full h-full  flex items-end">
                  <p
                    className={`relative z-10 bg-black/30 backdrop-blur-sm  p-6 w-full text-gray-50 font-poppins font-semibold leading-snug transition-all duration-300 `}
                  >
                    {s}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION + MISSION ── */}
      <section className="bg-stone-900 py-20 mt-20">
        <div className=" max-w-5xl mx-auto rounded-3xl p-5 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {cards.map((card, i) => (
              <div
                key={card.label}
                className="relative rounded-[22px] overflow-hidden flex flex-col min-h-160"
              >
                {/* Full-bleed image covers entire card */}
                <img
                  src={card.img}
                  alt={card.label}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${card.object}`}
                />

                {/* Content pinned to bottom */}
                <div className="relative bg-linear-to-t from-30% from-primary z-10 flex flex-col justify-end flex-1 gap-3 p-6 pb-5">
                  <span className="text-sm font-medium tracking-[0.12em] uppercase text-white">
                    {card.label}
                  </span>
                  <h3 className="text-3xl font-light leading-snug text-white m-0 font-poppins">
                    {card.heading}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60">
                    {card.body}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-3 py-1.5 rounded-full border border-white/20 text-white/70 bg-white/[0.08]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className="mt-2 w-full py-3.5 rounded-full bg-white text-[#111] text-[13px] font-medium hover:bg-gray-800 transition-colors hover:text-gray-50 duration-150"
                  >
                    Learn more
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="bg-primary/5 py-24">
        <div className="container">
          <h2
            className="text-4xl lg:text-5xl font-light text-[#0a1628] mb-14"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span className="text-primary">Why Choose</span> Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white hover:bg-primary rounded-2xl p-7 border border-gray-200 hover:border-white hover:shadow-md transition-all duration-200 group"
              >
                <div className="size-14 rounded-xl bg-primary text-white flex items-center justify-center mb-5 group-hover:bg-white group-hover:text-primary transition-colors">
                  {icon}
                </div>
                <h4 className="text-xl group-hover:text-gray-50 font-poppins font-semibold text-[#0a1628] mb-2">
                  {title}
                </h4>
                <p className="text-sm text-gray-500 group-hover:text-gray-100 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLOBAL PRESENCE ── */}
      <section className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1492171983775-a51717616c0d?w=1600&q=80"
          alt="Global offshore operations"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-[#0a1628]/80 flex items-center justify-center">
          <div className="text-center text-white max-w-2xl px-6">
            <h2
              className="text-4xl lg:text-5xl font-light mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Regional & International Reach
            </h2>
            <p className="text-white/60 text-base leading-relaxed">
              We support clients across regional and international markets,
              delivering engineering solutions for both onshore and offshore
              projects. Our flexible approach allows us to collaborate
              seamlessly with global partners while maintaining strong local
              expertise.
            </p>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className=" py-20  bg-lime-50/50">
        <div className="container ">
          <h2
            className="text-4xl lg:text-5xl font-light text-[#0a1628] mb-10"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Our <span className="text-secondary">Core Values</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {values.map(({ label, desc }) => (
              <div
                key={label}
                className={`rounded-2xl border p-6 transition-transform border-primary/10 bg-secondary/10 hover:-translate-y-1`}
              >
                <p className="text-xl font-semibold mb-2 text-lime-800 font-poppins">
                  {label}
                </p>
                <p className=" leading-relaxed opacity-80 text-lime-950">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
