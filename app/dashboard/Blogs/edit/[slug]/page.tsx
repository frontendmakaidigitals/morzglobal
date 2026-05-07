"use client";
import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { DialogTitle } from "@radix-ui/react-dialog";
import Spinner from "@/components/spinner";
import { Editor } from "@/components/blocks/editor-00/editor";
import { toast } from "sonner";
import { Eye, Upload, User, Facebook, Twitter } from "lucide-react";
import { Label } from "@/components/ui/label";
type Blog = {
  id?: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  author: string;
  category: string;
  content: string;
  image: string | File;
  createdAt?: string;
  slugTitle?: string;
};

export default function Page() {
  const params = useParams();
  const blogId = (params?.slug as string) || "";
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
    image: "" as string | File,
    id: "",
    slugTitle: "",
  });
  const router = useRouter();
  useEffect(() => {
    async function fetchBlog() {
      const res = await fetch(`/api/blogs/${blogId}`);
      if (res.ok) {
        const data = await res.json();
        const blog = data.blog;

        setBlogData({
          id: blog.id,
          title: blog.title,
          metaTitle: blog.metaTitle,
          metaDesc: blog.metaDesc,
          author: blog.author,
          category: blog.category,
          content: blog.content,
          image: blog.image,
          slugTitle: blog.slugTitle,
        });
        if (typeof blog.image === "string" && blog.image) {
          setImagePreview(blog.image);
        }
      }
    }
    fetchBlog();
  }, [blogId]);

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
      if (
        !blogData.title ||
        !blogData.content ||
        !blogData.category ||
        !blogData.author ||
        !blogData.slugTitle
      ) {
        toast.error("Please fill in all required fields.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("metaTitle", blogData.metaTitle);
      formData.append("metaDesc", blogData.metaDesc);
      formData.append("author", blogData.author);
      formData.append("category", blogData.category);
      formData.append("content", blogData.content);
      formData.append("id", blogData.id);
      formData.append("slugTitle", blogData.slugTitle);

      if (blogData.image instanceof File) {
        formData.append("image", blogData.image);
      }

      const res = await fetch(`/api/blogs/${blogId}`, {
        method: "PUT",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        toast.success(
          blogData ? "Blog updated successfully!" : "Blog saved successfully!",
        );
        router.push("/dashboard/Blogs");

        if (!blogData) {
          setBlogData({
            title: "",
            metaTitle: "",
            metaDesc: "",
            author: "",
            category: "",
            content: "",
            image: "" as string | File,
            id: "",
            slugTitle: "",
          });
          setImagePreview(null);
        }
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

  if (!blogData) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-semibold">Blog Not Found</h1>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <h1 className="text-2xl font-semibold">Add New Blog</h1>

      <form className="grid space-y-8 !mt-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-5">
          <div>
            {" "}
            <Label
              className="block text-sm font-medium mb-[6px]"
              htmlFor="blogTitle"
            >
              Blog Title
            </Label>
            <Input
              id={"blogTitle"}
              name={"blogTitle"}
              placeholder="Blog Title"
              value={blogData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="h-12"
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
              Meta Title
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
              Meta Description
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
              Author
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
              Select Category
            </Label>
            <Select
              defaultValue={blogData.category}
              value={blogData.category ?? ""} // must match one of topic.key
              onValueChange={(value) => handleChange("category", value)}
            >
              <SelectTrigger id="category" className="!h-12 w-full">
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
              Image
            </Label>
            <div className="relative flex items-center border border-gray-100 shadow gap-3 line-clamp-1 bg-white w-full px-3 py-[.22rem] rounded-lg">
              <label
                htmlFor="fileAdd"
                className="px-3 rounded-md py-[.45rem] bg-lime-600 text-slate-50 cursor-pointer"
              >
                Choose
              </label>
              <p className="max-w-xs">
                {typeof blogData.image === "string"
                  ? blogData.image
                  : blogData.image instanceof File
                    ? blogData.image.name
                    : ""}
              </p>
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
            <div className="bg-gray-50  w-full overflow-hidden rounded-lg border">
              {blogData.content ? (
                <Editor
                  onSerializedChange={(val) =>
                    handleChange("content", JSON.stringify(val))
                  }
                  editorSerializedState={
                    typeof blogData.content === "string"
                      ? JSON.parse(blogData.content)
                      : blogData.content
                  }
                />
              ) : null}
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
            <DialogTitle>
              {typeof blogData.image === "string"
                ? blogData.image
                : blogData.image instanceof File
                  ? blogData.image.name
                  : ""}
            </DialogTitle>
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
        <DialogContent className="w-full min-w-full text-white max-h-full overflow-auto p-4 !border-transparent !bg-transparent">
          <DialogTitle>Blog Preview: {blogData.title}</DialogTitle>
          <PreviewBlog
            blog={{
              id: blogData?.id ?? "",
              title: blogData.title,
              metaTitle: blogData.metaTitle,
              metaDesc: blogData.metaDesc,
              author: blogData.author,
              category: blogData.category,
              content: blogData.content,
              image: typeof blogData.image === "string" ? blogData.image : "",
            }}
            imagePreview={imagePreview}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
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
    <div className="bg-[#eef7ff] w-full py-10 ">
      <div className="container">
        <div className="flex flex-col items-center">
          <p className="p-2 text-xs bg-red-100 text-red-900 rounded-lg font-bold font-quicksand text-center mb-2">
            {blog?.category}
          </p>
          <h1 className="text-5xl lg:text-6xl text-slate-900 tracking-tighter font-[600] text-center">
            {blog?.title}
          </h1>
        </div>

        <div className="flex flex-col items-center mt-8">
          <ul className="flex items-center gap-4 text-slate-900 text-sm divide-x divide-slate-300">
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

        <div className="w-full h-[300px] lg:h-[580px] mt-12 rounded-xl overflow-hidden">
          <img
            src={imagePreview || ""}
            alt={blog?.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-5xl mx-auto ">
          <div className="mt-8 text-slate-900">
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
