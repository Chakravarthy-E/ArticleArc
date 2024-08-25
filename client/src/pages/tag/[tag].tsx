"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import BlogCard from "../../components/atoms/blog-card";
import { Title } from "@/src/components/ui/title";

function Tag() {
  const router = useRouter();
  const { tag } = router.query;

  // State Types
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    // Fetch Blogs by Tag - With Type Annotations
    const fetchBlogsByTag = async (tag: string) => {
      if (!tag) return; // Ensure tag is defined before fetching
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/tag/${tag}`
        );
        setBlogs(response.data.blogs || []);
      } catch (error) {
        console.error("Failed to fetch blogs for tag:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (typeof tag === "string") {
      fetchBlogsByTag(tag);
    }
  }, [tag]);

  const renderedBlogs = useMemo(() => {
    return blogs.map((blog) => <BlogCard {...blog} key={blog._id} />);
  }, [blogs]);

  return (
    <div className="flex items-center justify-center py-5">
      <div className="w-full max-w-7xl  space-y-6">
        <Title title={`All ${tag} Related Articles`} />

        {isLoading ? (
          <p>Loading...</p>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderedBlogs}
          </div>
        ) : (
          <p>No blogs available for this tag.</p>
        )}
      </div>
    </div>
  );
}

export default Tag;
