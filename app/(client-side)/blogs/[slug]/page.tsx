import { Metadata } from "next";
import BlogClient from "./BlogClient";
import { dbGet, dbAll } from "@/lib/db";
import zlib from "zlib";
import BlogSection from "@/pages/home/blogs";
type Blog = {
  id: string;
  title: string;
  author?: string;
  category?: string;
  content?: string;
  metaTitle?: string;
  metaDesc?: string;
  image?: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  slugTitle?: string;
};

type LexicalNode = {
  type: string;
  text?: string;
  format?: number;
  tag?: string;
  listType?: string;
  children?: LexicalNode[];
  url?: string;
  src?: string;
  altText?: string;
  level?: number;
};

const serverUrl = "https://www.bizgrowthconsultancy.com";

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const blog = await dbGet("SELECT * FROM blogs WHERE slugTitle = ?", [slug]);
    if (!blog) return null;

    if (blog.content?.startsWith("gz:")) {
      try {
        const compressed = Buffer.from(blog.content.slice(3), "base64");
        blog.content = zlib.gunzipSync(compressed).toString("utf-8");
      } catch (err) {
        console.warn("⚠️ Failed to decompress content for blog:", slug, err);
      }
    }

    return blog;
  } catch (err) {
    console.error("Failed to fetch blog from DB:", err);
    return null;
  }
}

function lexicalNodeToHtml(node: LexicalNode): string {
  const children = node.children
    ? node.children.map(lexicalNodeToHtml).join("")
    : "";

  switch (node.type) {
    case "root":
      return children;
    case "paragraph":
      return `<p>${children}</p>`;
    case "heading": {
      const tag = node.tag || "h2"; // ← Lexical stores "h1", "h2" etc directly in tag
      return `<${tag}>${children}</${tag}>`;
    }

    case "list":
      return node.listType === "bullet"
        ? `<ul>${children}</ul>`
        : `<ol>${children}</ol>`;
    case "listitem":
      return `<li>${children}</li>`;
    case "quote":
      return `<blockquote>${children}</blockquote>`;
    case "link":
      return `<a href="${node.url || "#"}">${children}</a>`;
    case "image":
      return `<img src="${node.src || ""}" alt="${node.altText || ""}" />`;
    case "text": {
      let text = node.text || "";
      if (node.format) {
        if (node.format & 16) text = `<code>${text}</code>`;
        if (node.format & 4) text = `<s>${text}</s>`;
        if (node.format & 8) text = `<u>${text}</u>`;
        if (node.format & 2) text = `<em>${text}</em>`;
        if (node.format & 1) text = `<strong>${text}</strong>`;
      }
      return text;
    }
    case "linebreak":
      return "<br />";
    default:
      return children;
  }
}

function lexicalToHtml(serializedState: { root: LexicalNode } | null): string {
  if (!serializedState?.root) return "";
  try {
    return lexicalNodeToHtml(serializedState.root);
  } catch {
    return "";
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  const imageUrl = blog?.image
    ? `${serverUrl}/api/uploads/${blog.image}`
    : undefined;

  return {
    title: blog?.metaTitle || blog?.title || "Blog",
    description: blog?.metaDesc || "",
    openGraph: {
      title: blog?.metaTitle || blog?.title,
      description: blog?.metaDesc || "",
      images: imageUrl ? [imageUrl] : [],
      url: `${serverUrl}/blogs/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: blog?.metaTitle || blog?.title,
      description: blog?.metaDesc || "",
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: { canonical: `${serverUrl}/blogs/${slug}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return <div className="p-8 text-center text-gray-500">Blog not found</div>;
  }

  // Parse and render HTML on the server — no client JS needed
  const parsedContent = (() => {
    if (typeof blog.content !== "string") return null;
    try {
      return JSON.parse(blog.content);
    } catch {
      return null;
    }
  })();

  const staticHtml = lexicalToHtml(parsedContent);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.metaTitle || blog.title,
    description: blog.metaDesc || "",
    image: blog.image ? `${serverUrl}/api/uploads/${blog.image}` : undefined,
    author: {
      "@type": "Person",
      name: blog.author || "Biz Growth Consultancy",
      url: `${serverUrl}/about-us`, // ← add this, point to your about/team page
    },
    publisher: {
      "@type": "Organization",
      name: "Biz Growth Consultancy",
      logo: {
        "@type": "ImageObject",
        url: `${serverUrl}/logo.png`,
      },
    },
    datePublished: blog.createdAt ?? undefined,
    dateModified: blog.updatedAt ?? blog.createdAt ?? undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${serverUrl}/blogs/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogClient blog={blog} staticHtml={staticHtml} />
      <BlogSection />
    </>
  );
}

export async function generateStaticParams() {
  try {
    const blogs = await dbAll(
      "SELECT slugTitle FROM blogs ORDER BY updatedAt DESC",
      [],
    );
    return (blogs ?? []).map((b: { slugTitle: string }) => ({
      slug: b.slugTitle,
    }));
  } catch (err) {
    console.error("Failed to fetch slugs for static params:", err);
    return [];
  }
}
