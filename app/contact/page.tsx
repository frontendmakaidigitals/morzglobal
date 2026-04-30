"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const INQUIRY_TYPES = ["Offshore", "Onshore"];

export default function ContactPage() {
  const [inquiry, setInquiry] = useState("General");
  const [newsletter, setNewsletter] = useState(false);

  return (
    <main
      className="min-h-screen  font-sans"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
    >
      {/* ── Hero / Contact Section ── */}
      <section className="relative pt-18 overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1578356058390-f58c575337a2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Luxury resort"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT — hero text + info */}
          <div className="text-white pt-4 h-full flex flex-col">
            {/* Heading */}
            <div>
              <h1
                className="text-5xl lg:text-6xl font-light leading-tight mb-6 tracking-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                You Have Questions,
                <br />
                <span className="italic">We Have Answers</span>
              </h1>
              <p
                className="text-white/60 text-sm leading-relaxed max-w-md mb-16"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Discover experiences you won&apos;t find anywhere else —
                thoughtfully designed to immerse you in the heart of the
                destination. Soulful stories waiting to be lived.
              </p>
            </div>

            {/* Info grid */}
            <div
              className="grid grid-cols-2 gap-x-8 gap-y-8 text-sm mt-auto"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <div>
                <p className="text-white/40 uppercase tracking-widest text-xs mb-3">
                  Location
                </p>
                <p className="text-white/80 leading-relaxed">
                  Churchill Tower Business Bay, Dubai- UAE
                </p>
              </div>
              <div>
                <p className="text-white/40 uppercase tracking-widest text-xs mb-3">
                  Social Media
                </p>
                <div className="flex  gap-3">
                  {["Instagram", "LinkedIn", "Facebook", "TikTok"].map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      {s}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-white/40 uppercase tracking-widest text-xs mb-3">
                  Email
                </p>
                <a
                  href="mailto:stay@anantararesort.com"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  info@morzglobal.com
                </a>
              </div>
              <div>
                <p className="text-white/40 uppercase tracking-widest text-xs mb-3">
                  Contact
                </p>
                <a
                  href="tel:+6677123456"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  +971 50 739 0680
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT — white form card */}
          <div
            className="bg-white rounded-2xl p-8 shadow-2xl"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <h2
              className="text-2xl font-semibold text-gray-900 mb-1"
              style={{ fontFamily: "'Cormorant Garamond', sans-serif" }}
            >
              Tell Us What You Need
            </h2>
            <p className="text-sm text-gray-400 mb-7">
              Our team is ready to assist you with every detail, big or small.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="First Name"
                className="border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-gray-400 placeholder-gray-400 transition-colors"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-gray-400 placeholder-gray-400 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="Country"
                className="border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-gray-400 placeholder-gray-400 transition-colors"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-gray-400 placeholder-gray-400 transition-colors"
              />
            </div>

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-gray-400 placeholder-gray-400 mb-5 transition-colors"
            />

            {/* Inquiry type */}
            <p className="text-sm font-medium text-gray-700 mb-3">
              Type of Inquiry
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              {INQUIRY_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setInquiry(type)}
                  className={`px-4 py-1.5 rounded-full text-sm border transition-all ${
                    inquiry === type
                      ? "bg-secondary text-white border-secondary.80"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Message */}
            <textarea
              placeholder="Message"
              rows={5}
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:border-gray-400 placeholder-gray-400 resize-none mb-5 transition-colors"
            />

            {/* Newsletter */}
            <label className="flex items-center gap-2.5 mb-6 cursor-pointer group">
              <input
                type="checkbox"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                className="w-4 h-4 accent-gray-900 cursor-pointer"
              />
              <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">
                I&apos;d like to receive exclusive offers and updates
              </span>
            </label>

            <button className="w-full bg-primary border border-gray-300 hover:bg-gray-900 hover:text-white hover:border-gray-900 text-gray-50 rounded-full py-3.5 text-sm font-medium transition-all duration-300 tracking-wide">
              Submit
            </button>
          </div>
        </div>
      </section>

      <LocationSection />
    </main>
  );
}

function LocationSection() {
  return (
    <section className="w-full pt-24 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_.8fr] gap-6">
        {/* LEFT: Map */}
        <div className="relative rounded-2xl overflow-hidden h-[320px] lg:h-[420px] bg-gray-200">
          {/* Fake map image (replace with real map or iframe) */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1499.271466566598!2d55.26206505851963!3d25.1811835565225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69ce4be99a07%3A0xe359738b5b1bb1d3!2sChurchill%20Tower%20-%20Al%20Amal%20St%20-%20Business%20Bay%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1777533493430!5m2!1sen!2sin"
            width="600"
            height="450"
            loading="lazy"
            className="w-full"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* RIGHT: Location Card */}
        <div className="relative rounded-2xl overflow-hidden h-[320px] lg:h-[420px]">
          {/* Background Image */}
          <img
            src="https://www.eni.ae/wp-content/uploads/2019/04/image-5-1.jpg"
            alt="location"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-8 text-white">
            <h2
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              className="text-3xl lg:text-5xl font-light mb-3 tracking-wide"
            >
              Our Location
            </h2>
            <p className="text-white/80 mb-6 text-sm lg:text-base">
              Churchill Tower Business Bay, Dubai- UAE
            </p>

            <button className="bg-primary hover:bg-primary/90 transition px-6 py-3 rounded-full text-sm font-semibold w-fit flex items-center gap-2">
              View Location
              <ArrowUpRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
