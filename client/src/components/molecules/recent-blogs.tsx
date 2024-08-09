"use client";

import BlogCard from "../atoms/blog-card";
import RecentBlogLoader from "../atoms/recent-blogs-loader";
import { useGetAllBlogsQuery } from "../../lib/features/api/apiSlice";
import { useEffect, useState } from "react";
import { BlogInterface } from "./hero";

export interface BlogResponse {
  blogs: BlogInterface[];
  success: boolean;
}

export default function RecentBlogs() {
  const [blogs, setBlogs] = useState<BlogInterface[]>([]);
  const { data, isSuccess, isLoading, error } = useGetAllBlogsQuery();

  useEffect(() => {
    if (isSuccess && data?.blogs?.length > 0) {
      setBlogs(data.blogs);
    }
  }, [isSuccess, data]);

  if (isLoading) {
    return <RecentBlogLoader />;
  }

  if (error) {
    return <div className="text-red-500">Error loading blogs</div>;
  }

  return (
    <div className="flex items-center justify-center px-5 sm:px-10 py-10">
      <div className="w-full max-w-7xl">
        <h1 className="text-3xl font-semibold my-10 font-outfit">
          Recent Blogs
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.slice(1).map((blog: BlogInterface) => (
            <BlogCard key={blog._id} {...blog} />
          ))}
        </div>
      </div>
    </div>
  );
}
