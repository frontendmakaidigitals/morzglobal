"use client";
import { User, Facebook, Twitter, Linkedin, Calendar } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const serverUrl = "https://www.bizgrowthconsultancy.com";

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "";
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

function calculateReadTime(text: string): string {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export default function BlogClient({
  blog,
  staticHtml,
}: {
  blog: any;
  staticHtml: string;
}) {
  const pathname = usePathname();
  const blogURL = `${serverUrl}${pathname}`;
  const blogTitle = blog?.title || "";

  return (
    <main className="pt-32 mb-20 relative container">
      {/* Title */}
      <div className="flex flex-col items-center">
        <p className="p-2 text-xs bg-teal-100 text-teal-700 rounded-lg font-bold font-quicksand text-center mb-2">
          {blog?.category}
        </p>
        <h1 className="text-4xl lg:text-5xl tracking-tighter font-[600] text-center">
          {blog?.title}
        </h1>
      </div>

      {/* Meta */}
      <div className="flex flex-col items-center mt-8">
        <ul className="flex flex-row justify-between lg:justify-center items-center text-sm sm:divide-y-0 sm:divide-x divide-slate-300 w-full lg:px-0">
          <li className="flex items-center gap-3 py-2 sm:py-0 px-3">
            <User size={16} />
            <p>{blog?.author}</p>
          </li>
          <li className="flex items-center gap-3 py-2 sm:py-0 px-3">
            <Calendar size={16} />
            <time dateTime={blog?.createdAt ?? undefined}>
              {formatDate(blog?.createdAt)}
            </time>
          </li>
          <li className="hidden lg:flex items-center py-2 sm:py-0 px-3">
            {blog?.content ? calculateReadTime(blog.content) : null}
          </li>
        </ul>

        {/* Share Buttons */}
        <ul className="grid grid-cols-2 lg:flex lg:flex-wrap lg:justify-center lg:items-center mt-5 gap-3 w-full">
          <li className="w-full lg:w-auto">
            <Link
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blogTitle)}&url=${encodeURIComponent(blogURL)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-full justify-center p-2 flex text-slate-50 items-center gap-2 border border-slate-200 rounded-lg bg-[#1DA1F2]">
                <Twitter />
              </button>
            </Link>
          </li>
          <li className="w-full lg:w-auto">
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogURL)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-full justify-center p-2 flex text-slate-50 items-center gap-2 border border-slate-200 rounded-lg bg-[#1877F2]">
                <Facebook />
              </button>
            </Link>
          </li>
          <li className="w-full lg:w-auto">
            <Link
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogURL)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-full justify-center p-2 flex text-slate-50 items-center gap-2 border border-slate-200 rounded-lg bg-[#0A66C2]">
                <Linkedin />
              </button>
            </Link>
          </li>
        </ul>
      </div>

      {/* Hero Image */}
      <div className="w-full relative h-[300px] lg:h-[580px] mt-12 rounded-xl overflow-hidden">
        <Image
          fill
          src={`/api/uploads/${blog.image}`}
          alt={blog?.title || "Blog image"}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="">
        <div
          className="blog-content mt-8"
          dangerouslySetInnerHTML={{ __html: staticHtml }}
        />
      </div>
    </main>
  );
}
