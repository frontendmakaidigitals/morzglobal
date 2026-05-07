import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { updateSitemap } from "@/lib/updatesitemap";
import { dbAll, dbRun } from "@/lib/db";
import zlib from "zlib";

export async function GET() {
  try {
    const blogs = await dbAll("SELECT * FROM blogs ORDER BY updatedAt DESC");

    interface CompressedBlog extends Blog {
      content: string;
    }

    const processedBlogs: Blog[] = blogs.map((blog: CompressedBlog) => {
      if (blog.content?.startsWith("gz:")) {
        try {
          const compressed: Buffer = Buffer.from(
            blog.content.slice(3),
            "base64",
          );
          blog.content = zlib.gunzipSync(compressed).toString("utf-8");
        } catch (err: unknown) {
          console.warn("Failed to decompress blog", blog.id, err);
        }
      }
      return blog;
    });

    return NextResponse.json({ blogs: processedBlogs });
  } catch (err) {
    console.error("Error reading blogs:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}

interface Blog {
  id: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  author: string;
  category: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  slugTitle: string;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string | null;
    const metaTitle = formData.get("metaTitle") as string | null;
    const metaDesc = formData.get("metaDesc") as string | null;
    const author = formData.get("author") as string | null;
    const category = formData.get("category") as string | null;
    const slugTitle = formData.get("slugTitle") as string | null;
    const content = formData.get("content") as string | null;
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 },
      );
    }

    // ✅ Save image in data/uploads
    const uploadsDir = path.join(process.cwd(), "data", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, file.name);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    const imageUrl = file.name;

    const now = new Date().toISOString();

    // ✅ Insert into SQLite - let database auto-generate the ID
    const result = await dbRun(
      `INSERT INTO blogs 
   (title, metaTitle, metaDesc, author, category, content, image, slugTitle, createdAt, updatedAt)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title ?? "",
        metaTitle ?? "",
        metaDesc ?? "",
        author ?? "",
        category ?? "",
        content ?? "",
        imageUrl ?? "",
        slugTitle ?? "",
        now,
        now,
      ],
    );

    const blog: Blog = {
      id: result.lastID.toString(), // Use the auto-generated integer ID
      title: title ?? "",
      metaTitle: metaTitle ?? "",
      metaDesc: metaDesc ?? "",
      author: author ?? "",
      category: category ?? "",
      content: content ?? "",
      image: imageUrl ?? "",
      slugTitle: slugTitle ?? "",
      createdAt: now,
      updatedAt: now,
    };
    const blogs = await dbAll(
      "SELECT slugTitle, updatedAt FROM blogs ORDER BY updatedAt DESC",
    );
    await updateSitemap(blogs);

    return NextResponse.json({ success: true, blog });
  } catch (err) {
    console.error("Error creating blog:", err);
    return NextResponse.json(
      { success: false, error: "Upload failed" },
      { status: 500 },
    );
  }
}
