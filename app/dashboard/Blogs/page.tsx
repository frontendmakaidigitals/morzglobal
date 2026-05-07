"use client";
import { Plus } from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

const BlogListPage = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  interface Blog {
    id: string;
    title: string;
    content: string;
    image: string;
    createdAt: string;
    author: string;
    category?: string;
    slugTitle: string;
  }

  const [blogs, setBlogs] = useState<Blog[]>([]);
  type BlogsResponse = {
    blogs: Blog[];
  };
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data: BlogsResponse = await res.json();
        setBlogs(data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleDeleteBlog = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?",
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete blog");

      // Remove from frontend state
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert("Failed to delete blog. Please try again.");
    }
  };

  return (
    <div>
      <div className="fixed bottom-5 right-5">
        <motion.button
          onClick={() => router.push("/dashboard/Blogs/add")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={{ width: isHovered ? "7.8rem" : "3rem" }}
          className="h-12 group bg-lime-500 hover:bg-lime-600 rounded-full flex justify-center items-center gap-2"
        >
          <Plus />
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { delay: 0.2, duration: 0.2 },
              }}
              exit={{ opacity: 0, x: 10 }}
            >
              Add blog
            </motion.span>
          )}
        </motion.button>
      </div>

      <h1 className="text-2xl font-semibold mb-6">All Blogs</h1>

      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-lime-600 text-white">
            <tr>
              <th className="text-left px-6 py-3">Image</th>
              <th className="text-left px-6 py-3">Title</th>
              <th className="text-left px-6 py-3">Date</th>
              <th className="text-left px-6 py-3">Category</th>
              <th className="text-left px-6 py-3">Author</th>
              <th className="text-left px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <tr key={blog.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      src={`/api/uploads/${blog.image}`}
                      alt={blog.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium">{blog.title}</td>
                  <td className="px-6 py-4">
                    {new Date(blog.id).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2 py-1 text-xs rounded bg-red-100 text-red-900">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">{blog.author}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          router.push(`/dashboard/Blogs/edit/${blog.slugTitle}`)
                        }
                        className="px-3 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog.slugTitle)}
                        className="px-3 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center text-lg p-6 text-slate-500"
                >
                  No Blogs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogListPage;
