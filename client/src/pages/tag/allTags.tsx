"use client";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Title } from "../../components/ui/title";

function AllTags() {
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
  return (
    <div className="flex items-center justify-center py-5 ">
      <div className="w-full max-w-7xl flex flex-col space-y-6">
        <Title title="All Tags" />
        <div className="grid grid-cols-3 gap-10">
          {tags?.map((item) => (
            <Link
              key={item._id}
              href={`/tag/${item.tag}`}
              as={`/tag/${item.tag}`}
            >
              <div
                key={item.tag}
                className={`px-10 py-4 text-start rounded shadow-md `}
              >
                <p className="text-xl font-semibold">{item.tag}</p>
                <p>
                  {item.count} {item.count > 1 ? "Articles" : "Article"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllTags;
