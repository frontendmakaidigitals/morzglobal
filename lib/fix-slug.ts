import { dbAll, dbRun } from "../lib/db";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/—/g, "-")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

async function main() {
  try {
    const blogs = await dbAll("SELECT id, title, slugTitle FROM blogs");

    for (const blog of blogs) {
      if (!blog.slugTitle || blog.slugTitle.trim() === "") {
        const slug = slugify(blog.title);
        await dbRun("UPDATE blogs SET slugTitle = ? WHERE id = ?", [
          slug,
          blog.id,
        ]);
        console.log(`Updated blog id=${blog.id} with slug="${slug}"`);
      }
    }

    console.log("All old blogs have been updated with slugTitle!");
  } catch (err) {
    console.error("Failed to update slugs:", err);
  }
}

main();
