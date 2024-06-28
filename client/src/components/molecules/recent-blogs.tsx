"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "../atoms/blog-card";
import RecentBlogLoader from "../atoms/recent-blogs-loader";

export interface BlogData {
  _id: string;
  title: string;
  description: string;
  banner: {
    public_id: string;
    url: string;
  };
  createdAt: any;
  tag: string;
  owner: string;
}

export default function RecentBlogs() {
  const { data, isLoading, error } = useQuery<{
    data: { blogs: BlogData[] };
  }>({
    queryKey: ["blogs"],
    queryFn: () =>
      axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/get-all-blogs`),
  });

  if (isLoading) {
    return <RecentBlogLoader />;
  }

  if (error) {
    return <div>Error loading blogs</div>;
  }

  return (
    <>
      {data?.data.blogs && (
        <div className="flex items-center justify-center px-5 sm:px-10 py-10">
          <div className="w-full max-w-7xl">
            <h1 className="text-3xl font-semibold my-10 font-outfit">
              Recent Blog Posts
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {data?.data.blogs.slice(1)?.map((blog) => (
                <BlogCard key={blog._id} {...blog} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
