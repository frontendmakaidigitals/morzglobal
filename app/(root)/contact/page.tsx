"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const INQUIRY_TYPES = ["Offshore", "Onshore"];

type FormData = {
  firstName: string;
  lastName: string;
  country: string;
  phone: string;
  email: string;
  inquiryType: string;
  message: string;
  newsletter: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.firstName.trim()) errors.firstName = "First name is required";
  if (!data.lastName.trim()) errors.lastName = "Last name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address";
  }
  if (!data.phone.trim()) errors.phone = "Phone number is required";
  if (!data.country.trim()) errors.country = "Country is required";
  if (!data.inquiryType) errors.inquiryType = "Please select an inquiry type";
  if (!data.message.trim()) errors.message = "Message is required";
  return errors;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    country: "",
    phone: "",
    email: "",
    inquiryType: "",
    message: "",
    newsletter: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleInquiry(type: string) {
    setFormData((prev) => ({ ...prev, inquiryType: type }));
    if (errors.inquiryType)
      setErrors((prev) => ({ ...prev, inquiryType: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        country: "",
        phone: "",
        email: "",
        inquiryType: "",
        message: "",
        newsletter: false,
      });
    } catch {
      setStatus("error");
    }
  }

  const inputClass = (field: keyof FormData) =>
    `border rounded-full px-4 py-3 text-sm outline-none placeholder-gray-400 transition-colors w-full ${
      errors[field]
        ? "border-red-400 focus:border-red-400"
        : "border-gray-200 focus:border-gray-400"
    }`;

  return (
    <main
      className="min-h-screen font-sans"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
    >
      {/* ── Hero / Contact Section ── */}
      <section className="relative pt-18 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1578356058390-f58c575337a2?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury resort"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Content grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT — hero text + info */}
          <div className="text-white pt-4 h-full flex flex-col">
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
                <div className="flex gap-3 flex-wrap">
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
                  href="mailto:info@morzglobal.com"
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
                  href="tel:+971508287918"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  +971 508287918
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT — form card */}
          <form
            onSubmit={handleSubmit}
            noValidate
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

            {/* First / Last name */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <input
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={inputClass("firstName")}
                />
                {errors.firstName && (
                  <p className="text-[11px] text-red-500 mt-1 pl-2">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={inputClass("lastName")}
                />
                {errors.lastName && (
                  <p className="text-[11px] text-red-500 mt-1 pl-2">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Country / Phone */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <input
                  name="country"
                  type="text"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  className={inputClass("country")}
                />
                {errors.country && (
                  <p className="text-[11px] text-red-500 mt-1 pl-2">
                    {errors.country}
                  </p>
                )}
              </div>
              <div>
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass("phone")}
                />
                {errors.phone && (
                  <p className="text-[11px] text-red-500 mt-1 pl-2">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="mb-5">
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className={inputClass("email")}
              />
              {errors.email && (
                <p className="text-[11px] text-red-500 mt-1 pl-2">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Inquiry type */}
            <p className="text-sm font-medium text-gray-700 mb-3">
              Type of Inquiry
            </p>
            <div className="flex flex-wrap gap-2 mb-1">
              {INQUIRY_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleInquiry(type)}
                  className={`px-4 py-1.5 rounded-full text-sm border transition-all ${
                    formData.inquiryType === type
                      ? "bg-secondary text-white border-secondary"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {errors.inquiryType && (
              <p className="text-[11px] text-red-500 mb-3 pl-1">
                {errors.inquiryType}
              </p>
            )}

            {/* Message */}
            <div className="mt-4">
              <textarea
                name="message"
                placeholder="Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={`w-full border rounded-2xl px-4 py-3 text-sm outline-none placeholder-gray-400 resize-none mb-1 transition-colors ${
                  errors.message
                    ? "border-red-400 focus:border-red-400"
                    : "border-gray-200 focus:border-gray-400"
                }`}
              />
              {errors.message && (
                <p className="text-[11px] text-red-500 pl-1">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Newsletter */}
            <label className="flex items-center gap-2.5 my-5 cursor-pointer group">
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
                className="w-4 h-4 accent-gray-900 cursor-pointer"
              />
              <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">
                I&apos;d like to receive exclusive offers and updates
              </span>
            </label>

            {/* Status messages */}
            {status === "success" && (
              <p className="text-[12px] text-green-600 mb-3">
                ✓ Message sent! We'll get back to you within 24h.
              </p>
            )}
            {status === "error" && (
              <p className="text-[12px] text-red-500 mb-3">
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-primary border border-gray-300 hover:bg-gray-900 hover:text-white hover:border-gray-900 text-gray-50 rounded-full py-3.5 text-sm font-medium transition-all duration-300 tracking-wide disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : "Submit"}
            </button>
          </form>
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
        {/* Map */}
        <div className="relative rounded-2xl overflow-hidden h-[320px] lg:h-[420px] bg-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1499.271466566598!2d55.26206505851963!3d25.1811835565225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69ce4be99a07%3A0xe359738b5b1bb1d3!2sChurchill%20Tower%20-%20Al%20Amal%20St%20-%20Business%20Bay%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1777533493430!5m2!1sen!2sin"
            width="600"
            height="450"
            loading="lazy"
            className="w-full"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Location card */}
        <div className="relative rounded-2xl overflow-hidden h-[320px] lg:h-[420px]">
          <img
            src="https://www.eni.ae/wp-content/uploads/2019/04/image-5-1.jpg"
            alt="location"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
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
