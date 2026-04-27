"use client";

import { Marquee } from "@/components/ui/marquee";

const logos = [
  {
    name: "Company 1",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Company 2",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "Company 3",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
  {
    name: "Company 4",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    name: "Company 5",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    name: "Company 6",
    src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  },
];

const LogoItem = ({ src, name }: { src: string; name: string }) => {
  return (
    <div className="mx-8 flex items-center justify-center">
      <img
        src={src}
        alt={name}
        className="h-10 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
      />
    </div>
  );
};

export function LogoMarquee() {
  return (
    <div className="relative w-full overflow-hidden py-20">
      <Marquee className="[--duration:25s]">
        {logos.map((logo, i) => (
          <LogoItem key={i} {...logo} />
        ))}
      </Marquee>

      {/* gradient fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent dark:from-black"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent dark:from-black"></div>
    </div>
  );
}
