"use client";
import { BlogInterface, BlogResponse } from "@/types/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../atoms/blog-card";
import { Title } from "../ui/title";

function AllBlogs() {
  const [blogs, setBlogs] = useState<BlogInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<BlogResponse>(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/get-all-blogs`
        );

        if (response.status === 200 && response.data.blogs) {
          setBlogs(response.data.blogs);
        } else {
          setError("No blogs found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch blogs.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (isLoading) {
    return (
      <p className="flex items-center justify-center min-h-screen">
        Loading...
      </p>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (blogs.length === 0) {
    return <p>No blogs available.</p>;
  }

  return (
    <>
      <div className="flex flex-col space-y-6 w-full">
        <Title title="Articles" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} {...blog} />
          ))}
        </div>
      </div>
    </>
  );
}

export default AllBlogs;
