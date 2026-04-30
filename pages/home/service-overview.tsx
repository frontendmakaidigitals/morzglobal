"use client";

import { ArrowRight, LayoutGrid, Circle } from "lucide-react";

const services = [
  {
    key: "onshore",
    label: "Onshore Projects",
    tag: "SECTOR A · EPC · BROWNFIELD",
    image: "/home/service-overview/onshore.jpg",
    points: [
      "Detail Engineering (EPC Stage)",
      "Brownfield Modifications",
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
  },
  {
    key: "Offshore",
    label: "Offshore Projects",
    tag: "SECTOR B · TOPSIDE · SUBSEA",
    image: "/home/service-overview/offshore.jpg",
    points: [
      "Detail Engineering (EPC Stage)",
      "Brownfield Modifications",
      "Structural Studies",
      "Topside & Jacket Design",
      "Lifting & Load Out Plan",
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
  },
];

export default function ServicesOverview() {
  return (
    <section className="relative py-24 bg-primary/5 text-[#1a1814]">
      {/* Technical Grid Background Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header - Editorial Style */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-20 border-b border-[#1a1814]/10 pb-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-primary"></div>
              <span className="text-xs font-mono tracking-widest uppercase text-neutral-500">
                Our Expertise
              </span>
            </div>
            <h2
              className="text-5xl md:text-6xl font-normal text-[#1a1814] leading-[1.1]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Precision Engineering
              <br />
              <span className="italic text-primary">Global Standards</span>
            </h2>
          </div>

          <div className="md:mt-4 max-w-xl space-y-4 text-sm text-neutral-700">
            <p className="  leading-relaxed ">
              We deliver reliable engineering solutions for modern industries
              MORZ Global is a multidisciplinary engineering consultancy
              specializing in technically complex projects across the energy and
              infrastructure sectors.
            </p>
            <p className="text-neutral-600">
              Our team of qualified engineers and project specialists deliver
              focused, reliable solutions across onshore and offshore oil & gas,
              power generation, solar energy, and civil works — supported by
              advanced capabilities in 3D modelling, drafting, and technical
              documentation. We are committed to bringing accuracy, efficiency,
              and long-term value to every project we undertake.
            </p>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, i) => (
            <div
              key={i}
              className="group bg-white border border-neutral-200 rounded-xl hover:border-primary/30 transition-colors duration-300 flex flex-col h-full shadow-sm"
            >
              {/* Technical Tag Strip */}
              <div className="flex items-center rounded-t-xl justify-between px-6 py-3 bg-[#1a1814] text-white">
                <span className="text-[10px] font-mono tracking-[0.2em] opacity-80 uppercase">
                  {service.tag}
                </span>
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              </div>

              {/* Image Area */}
              <div className="relative h-[280px] overflow-hidden border-b border-neutral-200">
                <img
                  src={service.image}
                  alt={service.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Content Body - Dense Layout */}
              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-8">
                  <h3
                    className="text-3xl font-medium text-[#1a1814] mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {service.label}
                  </h3>
                  <div className="w-12 h-0.5 bg-neutral-100 group-hover:bg-primary transition-colors duration-300 mt-4"></div>
                </div>

                {/* 2-Column List for Technical Feel */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-8 flex-1">
                  {service.points.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 group/item">
                      <span className="mt-1.5 text-primary opacity-60 group-hover/item:opacity-100 transition-opacity">
                        <Circle size={4} fill="currentColor" />
                      </span>
                      <span className="text-sm text-neutral-700 leading-snug font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Footer */}
                <div className="mt-auto pt-6 border-t border-neutral-100">
                  <button className="w-full py-4 flex items-center hover:bg-primary justify-center gap-2 text-sm font-bold uppercase tracking-[0.1em] text-[#1a1814] hover:text-white transition-colors duration-200 border border-neutral-200 hover:border-primary rounded-sm">
                    Specifications <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
