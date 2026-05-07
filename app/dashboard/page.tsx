"use client";
import { ArrowUpRight, Circle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsRes = await fetch("/api/blogs");
        const blogsData = await blogsRes.json();
        setBlogs(blogsData.blogs || []);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-full ">
      <h1 className="text-2xl mb-3 font-[500]">
        <Circle className="inline-block size-[12px] fill-black align-middle" />{" "}
        Your Stats
      </h1>
      <div className="grid grid-cols-4  gap-7">
        <div className="border border-slate-900/40 rounded-3xl p-4">
          <h2 className="text-lg font-[600]">Blogs</h2>
          <p className="text-7xl mt-4">{blogs.length}</p>
          <Link
            href={"dashboard/Blogs"}
            className="flex items-center w-fit mt-6 gap-3 rounded-2xl bg-lime-600 hover:bg-lime-700  text-slate-50 px-4  py-2"
          >
            <span>View All</span>
            <span>
              <ArrowUpRight className="" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
