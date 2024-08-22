"use client";
import axios from "axios";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import BlogCard from "../atoms/blog-card";

function TagTabs() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<any[] | null>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchAllTags = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/tags`
        );
        const fetchedTags = response.data?.tags || [];
        setTags(fetchedTags);
        if (fetchedTags.length > 0) {
          setActiveTag(fetchedTags[0].tag);
          fetchBlogsByTag(fetchedTags[0].tag);
        }
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllTags();
  }, []);

  const fetchBlogsByTag = useCallback(async (tag: string) => {
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
  }, []);

  const handleTagClick = (tag: string) => {
    if (tag !== activeTag) {
      setActiveTag(tag);
      fetchBlogsByTag(tag);
    }
  };

  const renderedBlogs = useMemo(() => {
    if (!Array.isArray(blogs)) return null;
    return blogs.map((blog) => <BlogCard {...blog} key={blog._id} />);
  }, [blogs]);

  return (
    <div className="flex items-center justify-center px-5 sm:px-10 py-10">
      <div className="w-full max-w-7xl">
        <div className="flex flex-wrap space-x-4 mb-10">
          {tags?.map((item) => (
            <button
              key={item.tag}
              onClick={() => handleTagClick(item.tag)}
              className={`px-4 py-2  ${
                activeTag === item.tag
                  ? "tag"
                  : "bg-blue-100 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold"
              }`}
            >
              {item.tag} ({item.count})
            </button>
          ))}
        </div>

        {!isLoading && blogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderedBlogs}
          </div>
        ) : (
          !isLoading && <p>No blogs available for this tag.</p>
        )}
      </div>
    </div>
  );
}

export default TagTabs;
