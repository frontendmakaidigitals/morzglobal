"use client";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
const blogs = [
  {
    title: "Improving Flow Efficiency in Industrial Systems",
    desc: "Small optimizations in valve systems can significantly improve performance and reduce downtime.",
    date: "February 22, 2024",
    author: "Ethan Brooks",
    image:
      "https://images.unsplash.com/photo-1661864667506-c8d0dbd59004?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Choosing the Right Safety Valve for Your Operations",
    desc: "Understanding safety systems is key to maintaining compliance and operational continuity.",
    date: "March 27, 2024",
    author: "Lily Thompson",
    image:
      "https://images.unsplash.com/photo-1711571603473-6119c6ede1ee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "High-Pressure Systems: Best Practices",
    desc: "Ensure reliability and safety in high-pressure environments with the right equipment.",
    date: "April 30, 2024",
    author: "Oliver Davis",
    image:
      "https://images.unsplash.com/photo-1674471361523-195aa08e69b5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Predictive Maintenance in Industrial Systems",
    desc: "Leveraging data and smart sensors to anticipate failures, reduce downtime, and optimize asset performance.",
    date: "May 18, 2024",
    author: "Sophia Carter",
    image:
      "https://images.unsplash.com/photo-1597036621246-6f17bd303f76?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function BlogSection() {
  const [api, setApi] = useState<CarouselApi | null>(null);

  return (
    <section className="bg-secondary/10 py-20 ">
      <div className="container">
        {/* Header */}
        <p className="text-sm text-gray-500 mb-2">Blogs</p>
        <h2 className="text-4xl md:text-6xl max-w-2xl font-serif text-gray-900 mb-4">
          Industrial insights for smarter operations
        </h2>
        <p className="text-gray-600 mb-12 max-w-xl">
          Stay updated with trends, technologies, and best practices in
          industrial machinery and engineering.
        </p>

        {/* Carousel */}
        <Carousel setApi={setApi} opts={{ align: "start" }}>
          <CarouselContent className="-ml-6">
            {blogs.map((blog, i) => (
              <CarouselItem
                key={i}
                className="pl-6 basis-full md:basis-1/2 lg:basis-1/4"
              >
                <BlogCard {...blog} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* CTA */}
        <div className="mt-12 flex items-center justify-between">
          <button className="border rounded-sm border-gray-900 px-6 py-3 text-sm flex items-center gap-3 hover:bg-gray-900 hover:text-white transition">
            View more articles →
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => api?.scrollPrev()}
              className="border border-primary rounded-sm hover:bg-primary text-primary hover:text-white p-3"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={() => api?.scrollNext()}
              className="border border-primary rounded-sm hover:bg-primary text-primary hover:text-white p-3"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogCard({
  title,
  desc,
  date,
  author,
  image,
}: {
  title: string;
  desc: string;
  date: string;
  author: string;
  image: string;
}) {
  return (
    <div className="group">
      {/* Image */}
      <div className="relative w-full h-[260px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          className="object-cover inset-0 size-full group-hover:scale-105 transition duration-500"
          fill
        />
      </div>

      {/* Meta */}
      <p className="text-xs text-gray-500 mt-4">
        {date} • {author}
      </p>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-serif text-gray-900 mt-2 leading-snug">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mt-2 leading-relaxed">{desc}</p>

      {/* Read more */}
      <button className="mt-4 text-sm flex items-center gap-2 text-gray-900 group-hover:gap-3 transition-all">
        Read more →
      </button>
    </div>
  );
}
