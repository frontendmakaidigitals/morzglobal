"use client";
import { FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Spinner from "@/components/spinner";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { DialogTitle } from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { Editor } from "@/components/blocks/editor-00/editor";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye, Upload, User, Facebook, Twitter } from "lucide-react";
import { Label } from "@/components/ui/label";
import { slugify } from "@/lib/slugify";
export default function AddBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    metaTitle: "",
    metaDesc: "",
    author: "",
    category: "",
    content: "",
    slugTitle: "",
    image: null as File | null,
  });

  const topics = [
    {
      key: "Banking ",
      label: "Banking",
    },
    {
      key: "Engineering",
      label: "Engineering",
    },
    {
      key: "Corporate",
      label: "Corporate",
    },
    {
      key: "Commercial",
      label: "Commercial",
    },
    {
      key: "Hospitality",
      label: "Hospitality",
    },
    {
      key: "Pharmaceutical",
      label: "Pharmaceutical",
    },
    {
      key: "Logistics",
      label: "Logistics",
    },
    {
      key: "Technology",
      label: "Technology",
    },
  ];

  const handleChange = (
    key: keyof typeof blogData,
    value: string | File | null,
  ) => {
    setBlogData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleChange("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (blogData.slugTitle) {
        const slugRegex = /^[a-z0-9-]+$/;

        if (!slugRegex.test(blogData.slugTitle)) {
          toast.error(
            "Slug can only contain lowercase letters, numbers, and hyphens.",
            { className: "!bg-red-500/80 !text-slate-50" },
          );
          return;
        }
      }
      if (
        !blogData.title ||
        !blogData.content ||
        !blogData.image ||
        !blogData.category ||
        !blogData.author ||
        !blogData.slugTitle
      ) {
        toast.error("Please fill in all fields and upload an image.");
        setLoading(false);
        return;
      }

      // Build FormData for file + text fields
      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("metaTitle", blogData.metaTitle);
      formData.append("metaDesc", blogData.metaDesc);
      formData.append("author", blogData.author);
      formData.append("category", blogData.category);
      formData.append("content", blogData.content);
      formData.append("slugTitle", blogData.slugTitle);
      formData.append("image", blogData.image as File);

      const res = await fetch("/api/blogs", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Blog saved successfully!");
        router.push("/dashboard/Blogs");
        setBlogData({
          title: "",
          metaTitle: "",
          metaDesc: "",
          author: "",
          category: "",
          content: "",
          image: null,
          slugTitle: "",
        });
        setImagePreview(null);
      } else {
        toast.error("Failed to save blog");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const [showPreview, setShowPreview] = useState(false);
  const handlePreview = () => {
    if (
      !blogData.title ||
      !blogData.content ||
      !blogData.image ||
      !blogData.category ||
      !blogData.author
    ) {
      toast.error("Something went wrong");
      return;
    }
    setShowPreview(true);
  };
  useEffect(() => {
    if (blogData.title) {
      setBlogData((prev) => ({
        ...prev,
        slugTitle: slugify(blogData.title),
      }));
    }
  }, [blogData.title]);
  return (
    <div className="pb-10">
      <h1 className="text-2xl font-semibold">Add New Blog</h1>

      <form className="grid space-y-8 !mt-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <Label
              className="block text-sm font-medium mb-[6px]"
              htmlFor="blogTitle"
            >
              Blog Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id={"blogTitle"}
              name={"blogTitle"}
              placeholder="Blog Title"
              value={blogData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="h-12 "
            />
          </div>
          <div>
            <Label
              className="block text-sm font-medium mb-[6px]"
              htmlFor="slugTitle"
            >
              Blog Slug <span className="text-red-500">*</span>
            </Label>
            <Input
              id={"slugTitle"}
              name={"slugTitle"}
              placeholder="Slug Title"
              value={blogData.slugTitle}
              onChange={(e) => handleChange("slugTitle", e.target.value)}
              className="h-12"
            />
          </div>
          <div>
            <Label
              className="block text-sm font-medium mb-[6px]"
              htmlFor="metaTitle"
            >
              Meta Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id={"metaTitle"}
              name={"metaTitle"}
              placeholder="Meta Title"
              value={blogData.metaTitle}
              onChange={(e) => handleChange("metaTitle", e.target.value)}
              className="h-12"
            />
          </div>
          <div>
            <Label
              className="block text-sm font-medium mb-[6px]"
              htmlFor="metaDesc"
            >
              Meta Description <span className="text-red-500">*</span>
            </Label>
            <Input
              id={"metaDesc"}
              name={"metaDesc"}
              placeholder="Meta Description"
              value={blogData.metaDesc}
              onChange={(e) => handleChange("metaDesc", e.target.value)}
              className="h-12"
            />
          </div>
          <div>
            <Label
              className="block text-sm font-medium mb-[6px]"
              htmlFor="author"
            >
              Author <span className="text-red-500">*</span>
            </Label>
            <Input
              name={"author"}
              id={"author"}
              placeholder="Author"
              value={blogData.author}
              className="h-12" //
              onChange={(e) => handleChange("author", e.target.value)}
            />
          </div>

          <div>
            <Label
              htmlFor="category"
              className="block text-sm font-medium mb-[6px]"
            >
              Select Category <span className="text-red-500">*</span>
            </Label>
            <Select
              value={blogData.category}
              onValueChange={(value) => handleChange("category", value)}
            >
              <SelectTrigger
                name={"category"}
                id={"category"}
                className="!h-12 w-full bg-gray-50 text-stone-500 border-stone-300"
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                {topics.map((topic) => (
                  <SelectItem key={topic.key} value={topic.key}>
                    {topic.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label
              htmlFor="fileAdd"
              className="block text-sm font-medium mb-[6px]"
            >
              Image <span className="text-red-500">*</span>
            </Label>
            <div className="relative flex items-center border border-stone-300 shadow gap-3 line-clamp-1 bg-gray-50 w-full px-3 !h-12 rounded-lg">
              <label
                htmlFor="fileAdd"
                className="px-3 rounded-md py-[.45rem] bg-lime-500 text-slate-50 cursor-pointer"
              >
                Choose
              </label>
              <p className="max-w-xs">{blogData.image?.name}</p>
              <Input
                id="fileAdd"
                className="hidden"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <AnimatePresence mode="wait">
                {imagePreview && (
                  <motion.button
                    type="button"
                    initial={{ scale: 0, y: "-50%" }}
                    animate={{ scale: 1, y: "-50%" }}
                    onClick={() => setOpen(true)}
                    className="absolute rounded-lg bg-lime-300 px-4 py-2 top-1/2 right-3"
                  >
                    View
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="col-span-2">
            <div className="bg-gray-50 w-full overflow-hidden rounded-lg border">
              <Editor
                onSerializedChange={(val) =>
                  handleChange("content", JSON.stringify(val))
                }
              />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end gap-4">
          <Button
            type="button"
            onClick={handlePreview}
            size="lg"
            className="py-6 bg-blue-600 hover:bg-blue-700 text-slate-50"
          >
            <Eye /> Preview
          </Button>

          <Button
            disabled={loading}
            type="submit"
            size="lg"
            className="py-6 bg-teal-700 text-slate-50 hover:bg-teal-800"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Spinner /> Uploading
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Upload /> Submit
              </span>
            )}
          </Button>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-3xl text-white max-h-[90vh] overflow-auto p-4 !border-transparent !bg-transparent">
            <DialogTitle>{blogData.image?.name}</DialogTitle>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Full Preview"
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            )}
          </DialogContent>
        </Dialog>
      </form>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-8xl text-white max-h-full overflow-auto p-4 !border-transparent !bg-transparent">
          <DialogTitle>Blog Preview: {blogData.title}</DialogTitle>
          <PreviewBlog blog={blogData} imagePreview={imagePreview} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface Blog {
  author: string;
  category: string;
  content: string;
  metaDesc: string;
  metaTitle: string;
  title: string;
}
const PreviewBlog = ({
  blog,
  imagePreview,
}: {
  blog: Blog;
  imagePreview: string | null;
}) => {
  function calculateReadTime(text: string) {
    const wordsPerMinute = 200; // average reading speed
    const wordCount = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  }
  return (
    <div className="bg-[#eef7ff] py-10 ">
      {/* Hero Section */}
      <div className="container">
        <div className="flex flex-col items-center">
          <p className="p-2 text-xs bg-teal-100 text-teal-700 rounded-lg font-bold font-quicksand text-center mb-2">
            {blog?.category}
          </p>
          <h1 className="text-5xl lg:text-6xl tracking-tighter font-[600] text-center">
            {blog?.title}
          </h1>
        </div>

        <div className="flex flex-col items-center mt-8">
          <ul className="flex items-center gap-4 text-sm divide-x divide-slate-300">
            <li className="flex items-center gap-3 ">
              <div className="w-fit p-2 rounded-full bg-slate-200">
                <User size={16} />
              </div>
              <p>{blog?.author}</p>
            </li>
            <li className="pl-3">{new Date().toDateString()}</li>

            <li className="pl-3">
              {blog?.content ? calculateReadTime(blog?.content) : null}
            </li>
          </ul>

          <ul className="flex justify-center items-center mt-5">
            <li className="flex items-center gap-3">
              <button
                disabled
                className="px-4 flex disabled:bg-slate-200 disabled:text-slate-600 items-center gap-2 py-[.4rem] border border-slate-200 rounded-lg "
              >
                <Facebook /> Share
              </button>
              <button
                disabled
                className="px-4 disabled:bg-slate-200 disabled:text-slate-600 flex items-center gap-2 py-[.4rem] border border-slate-200 rounded-lg "
              >
                <Twitter /> Tweet
              </button>
            </li>
          </ul>
        </div>

        <div className="w-full h-[580px] mt-12 rounded-xl overflow-hidden">
          <img
            src={imagePreview || ""}
            alt={blog?.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-5xl mx-auto ">
          <div className="mt-8">
            {blog?.content ? (
              <Editor
                editorSerializedState={
                  typeof blog.content === "string"
                    ? JSON.parse(blog.content)
                    : null
                }
                readOnly
                blogPage={true}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
