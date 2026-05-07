"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What engineering services do you offer?",
    answer:
      "We offer full-spectrum engineering services across onshore and offshore sectors, including Detail Engineering (EPC Stage), Brownfield Modifications, Process & Safety Engineering, Mechanical, Piping, Electrical, Instrumentation, and Civil/Structural Engineering, along with 3D Modelling, As-built Drawings, Project Management, and Cost Estimation.",
  },
  {
    question: "What is the difference between onshore and offshore projects?",
    answer:
      "Onshore projects cover land-based facilities such as refineries, pipelines, and substations. Offshore projects involve marine structures including topsides, jackets, subsea systems, and floating platforms. Both require specialist engineering disciplines, though offshore work additionally demands expertise in structural studies, sea fastening, and lifting & load-out planning.",
  },
  {
    question: "Do you handle brownfield modifications?",
    answer:
      "Yes. Brownfield modifications are a core part of our offering. We work with existing infrastructure to retrofit, upgrade, or expand facilities with minimal disruption to ongoing operations, applying rigorous process safety and change-management principles throughout.",
  },
  {
    question: "What does your 3D modelling service include?",
    answer:
      "Our 3D modelling service covers intelligent plant design using industry-standard tools. We produce clash-free models used for review, construction support, and handover. Models can be integrated with laser-scan data for brownfield sites and used to generate isometrics, layouts, and as-built documentation.",
  },
  {
    question: "How do you manage project costs and schedules?",
    answer:
      "We provide dedicated Project Management and Cost Estimation & Budgeting services. Our project managers embed within the delivery team to track scope, schedule, and cost against agreed baselines, providing regular progress reports and early-warning indicators to keep projects on time and within budget.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white pt-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-4xl md:text-5xl font-light text-[#0d1e35] leading-tight"
          >
            Common{" "}
            <em className="font-serif font-normal italic text-secondary">
              questions
            </em>
          </h2>
        </div>

        {/* Top rule */}
        <div className="h-px bg-black/10" />

        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              {/* Trigger row */}
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center gap-5 px-2 py-5 text-left cursor-pointer group"
              >
                <span className="text-[11px] font-mono text-black/30 tabular-nums shrink-0 w-7">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-[17px] font-semibold text-[#0d1e35] leading-snug group-hover:text-black/80 transition-colors">
                  {faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp size={16} className="shrink-0 text-black/40" />
                ) : (
                  <ChevronDown size={16} className="shrink-0 text-black/40" />
                )}
              </button>

              {/* Answer — slides open */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-2 pb-8 pl-12 text-[15px] text-black/50 leading-relaxed">
                  {faq.answer}
                </p>
              </div>

              {/* Bottom rule — gold when open, subtle when closed */}
              <div
                className={`h-[2px] transition-colors duration-300 ${
                  isOpen ? "bg-primary" : "bg-black/10"
                }`}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
