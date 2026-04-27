"use client";
import React, { useState } from "react";

const services = [
  "Residential",
  "Commercial",
  "Off-plan",
  "Holiday Homes",
  "Investment",
  "New Launches",
];

const ContactPage = () => {
  const [selected, setSelected] = useState<string[]>(["Residential"]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleService = (s: string) =>
    setSelected((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] font-['DM_Sans',sans-serif]">
      <div className="grid grid-cols-2 min-h-[calc(100vh-62px)]">
        {/* LEFT */}
        <div className="relative px-12 py-[72px] pr-16 border-r border-black/[0.08] overflow-hidden">
          {/* Glow */}
          <div className="absolute -top-20 -left-20 w-[340px] h-[340px] rounded-full bg-[radial-gradient(circle,rgba(181,134,74,0.09)_0%,transparent_70%)] pointer-events-none" />

          <div className="flex items-center gap-2.5 mb-5 text-[#b5864a] text-[10px] font-medium tracking-[0.2em] uppercase">
            <span className="w-7 h-px bg-[#b5864a]" />
            Get in Touch
          </div>

          <h1 className="font-['Cormorant_Garamond',serif] text-[60px] font-light leading-[1.06] text-[#1c1814] mb-7">
            Let's start
            <br />a <em className="italic text-[#b5864a]">conversation.</em>
          </h1>

          <p className="text-[13px] text-[#1c1814]/42 leading-[1.75] max-w-[360px] mb-14">
            Whether you're exploring your first investment or expanding a
            portfolio, our advisors are here to guide you toward your ideal
            property.
          </p>

          <div className="flex flex-col gap-7">
            {[
              {
                label: "Phone",
                value: "+971 4 000 0000",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                ),
              },
              {
                label: "Email",
                value: "hello@aurum.ae",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                ),
              },
              {
                label: "Office",
                value: "Downtown Dubai, UAE",
                icon: (
                  <>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </>
                ),
              },
              {
                label: "Hours",
                value: "Mon–Sat, 9am – 7pm GST",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ),
              },
            ].map(({ label, value, icon }) => (
              <div key={label} className="flex gap-4 items-start">
                <div className="w-[38px] h-[38px] flex-shrink-0 border border-black/[0.1] rounded-[10px] bg-white flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#b5864a"
                    strokeWidth="1.5"
                    className="w-4 h-4"
                  >
                    {icon}
                  </svg>
                </div>
                <div>
                  <p className="text-[9px] font-medium tracking-[0.14em] uppercase text-[#1c1814]/40 mb-0.5">
                    {label}
                  </p>
                  <p className="text-[13px] text-[#1c1814]">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="my-12 h-px bg-black/[0.08]" />

          <div className="flex gap-2.5">
            {["Instagram", "LinkedIn", "Twitter"].map((s) => (
              <a
                key={s}
                href="#"
                className="flex items-center gap-1.5 px-4 py-1.5 border border-black/[0.1] rounded-full text-[11px] text-[#1c1814]/40 hover:border-[#b5864a] hover:text-[#b5864a] hover:bg-[#b5864a]/10 transition-all duration-200"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="px-16 py-[72px] pl-12 flex flex-col justify-center">
          <h2 className="font-['Cormorant_Garamond',serif] text-[28px] font-light text-[#1c1814] mb-2">
            Send us a message
          </h2>
          <p className="text-[12px] text-[#1c1814]/40 mb-11 leading-relaxed">
            We typically respond within one business day.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="grid grid-cols-2 gap-5">
              {["First Name", "Last Name"].map((f) => (
                <div key={f} className="flex flex-col mb-5">
                  <label className="text-[10px] font-medium tracking-[0.12em] uppercase text-[#1c1814]/40 mb-2">
                    {f}
                  </label>
                  <input
                    type="text"
                    placeholder={f === "First Name" ? "James" : "Anderson"}
                    className="bg-white border border-black/[0.1] rounded px-4 py-3 text-[13px] text-[#1c1814] outline-none focus:border-[#b5864a] focus:ring-2 focus:ring-[#b5864a]/10 transition-all placeholder:text-[#1c1814]/20"
                    required={f === "First Name"}
                  />
                </div>
              ))}
            </div>

            {[
              {
                label: "Email Address",
                type: "email",
                placeholder: "james@example.com",
                required: true,
              },
              {
                label: "Phone Number",
                type: "tel",
                placeholder: "+971 00 000 0000",
              },
            ].map((f) => (
              <div key={f.label} className="flex flex-col mb-5">
                <label className="text-[10px] font-medium tracking-[0.12em] uppercase text-[#1c1814]/40 mb-2">
                  {f.label}
                </label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  required={f.required}
                  className="bg-white border border-black/[0.1] rounded px-4 py-3 text-[13px] text-[#1c1814] outline-none focus:border-[#b5864a] focus:ring-2 focus:ring-[#b5864a]/10 transition-all placeholder:text-[#1c1814]/20"
                />
              </div>
            ))}

            <div className="flex flex-col mb-5">
              <label className="text-[10px] font-medium tracking-[0.12em] uppercase text-[#1c1814]/40 mb-2">
                Budget Range
              </label>
              <select className="bg-white border border-black/[0.1] rounded px-4 py-3 text-[13px] text-[#1c1814] outline-none focus:border-[#b5864a] focus:ring-2 focus:ring-[#b5864a]/10 transition-all appearance-none cursor-pointer">
                <option value="" disabled>
                  Select a range
                </option>
                {[
                  "Under AED 1M",
                  "AED 1M – 3M",
                  "AED 3M – 7M",
                  "AED 7M – 15M",
                  "AED 15M+",
                ].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <p className="text-[10px] font-medium tracking-[0.12em] uppercase text-[#1c1814]/40 mb-2.5">
                I'm interested in
              </p>
              <div className="flex flex-wrap gap-2">
                {services.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleService(s)}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] border transition-all duration-200 ${selected.includes(s) ? "border-[#b5864a] text-[#b5864a] bg-[#b5864a]/10 font-medium" : "border-black/[0.1] text-[#1c1814]/40 hover:border-[#b5864a] hover:text-[#b5864a]"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col mb-7">
              <label className="text-[10px] font-medium tracking-[0.12em] uppercase text-[#1c1814]/40 mb-2">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your property goals…"
                className="bg-white border border-black/[0.1] rounded px-4 py-3 text-[13px] text-[#1c1814] outline-none focus:border-[#b5864a] focus:ring-2 focus:ring-[#b5864a]/10 transition-all resize-none leading-relaxed placeholder:text-[#1c1814]/20"
              />
            </div>

            <div className="flex items-center gap-5">
              <button
                type="submit"
                disabled={loading || submitted}
                className="flex-shrink-0 px-10 py-4 bg-[#1c1814] hover:bg-[#b5864a] text-[#faf8f5] text-[11px] font-medium tracking-[0.14em] uppercase rounded-sm transition-colors duration-300 disabled:opacity-60"
              >
                {submitted ? "Sent ✓" : loading ? "Sending…" : "Send Message"}
              </button>
              <p className="text-[11px] text-[#1c1814]/35 leading-snug">
                Your data is safe.
                <br />
                We never share your information.
              </p>
            </div>

            {submitted && (
              <div className="mt-4 px-5 py-4 bg-[#b5864a]/08 border border-[#b5864a]/30 rounded text-[13px] text-[#1c1814] leading-relaxed">
                <strong className="text-[#b5864a]">Message received!</strong>{" "}
                One of our advisors will be in touch within one business day.
              </div>
            )}
          </form>

          {/* Map Strip */}
          <div className="mt-12 h-[120px] rounded-md bg-gradient-to-br from-[#ede8e0] to-[#ddd5c8] border border-black/[0.08] flex items-center justify-center cursor-pointer relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(0,0,0,0.04) 28px,rgba(0,0,0,0.04) 29px),repeating-linear-gradient(90deg,transparent,transparent 28px,rgba(0,0,0,0.04) 28px,rgba(0,0,0,0.04) 29px)",
              }}
            />
            <div className="relative z-10 flex items-center gap-2.5 bg-white px-4 py-2 rounded-full border border-black/[0.08] text-[11px] font-medium tracking-[0.1em] uppercase text-[#1c1814]/40">
              <span className="w-2 h-2 rounded-full bg-[#b5864a] animate-pulse" />
              Downtown Dubai, UAE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
