"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import type { CarouselApi } from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Editor } from "@/components/blocks/editor-00/editor";
interface Blog {
  id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  category: string;
  createdAt: string;
  slugTitle: string;
}

export default function BlogSection() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");

        if (!res.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await res.json();

        setBlogs(data.blogs || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="bg-secondary/10 py-20">
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

        {/* Loading */}
        {loading && <p className="text-gray-500">Loading blogs...</p>}

        {/* Carousel */}
        {!loading && blogs.length > 0 && (
          <Carousel setApi={setApi} opts={{ align: "start" }}>
            <CarouselContent className="-ml-6">
              {blogs.map((blog) => (
                <CarouselItem
                  key={blog.id}
                  className="pl-6 basis-full md:basis-1/2 lg:basis-1/4"
                >
                  <BlogCard
                    title={blog.title}
                    content={blog.content}
                    date={new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    slugTitle={blog.slugTitle}
                    author={blog.author}
                    image={`/api/uploads/${blog.image}`}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}

        {/* Empty */}
        {!loading && blogs.length === 0 && (
          <p className="text-gray-500">No blogs found.</p>
        )}

        {/* CTA */}
        <div className="mt-12 flex items-center justify-between">
          <Link href={"/blogs"}>
            <button className="border cursor-pointer rounded-sm border-gray-900 px-6 py-3 text-sm flex items-center gap-3 hover:bg-gray-900 hover:text-white transition">
              View more articles →
            </button>
          </Link>

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
  content,
  date,
  author,
  image,
  slugTitle,
}: {
  title: string;
  content: string;
  date: string;
  author: string;
  image: string;
  slugTitle: string;
}) {
  return (
    <Link href={`/blogs/${slugTitle}`} className="group">
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

      <Editor
        editorSerializedState={
          typeof content === "string" ? JSON.parse(content) : content
        }
        readOnly
        clampLines={3}
        blogPage={false}
      />

      {/* Read more */}
      <button className="mt-4 cursor-pointer text-sm flex items-center gap-2 text-gray-900 group-hover:gap-3 transition-all">
        Read more →
      </button>
    </Link>
  );
}
