"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { format } from "date-fns";
import Image from "next/image";
import HeroSectionLoader from "../atoms/hero-section-loader";
import axios from "axios";
import SearchBox from "../atoms/search-box";

export interface BlogInterface {
  banner: { public_id: string; url: string };
  title: string;
  description: string;
  _id: string;
  tag?: string;
  createdAt: string;
  owner?: string;
}

export default function Hero() {
  const [blog, setBlog] = useState<BlogInterface | null>(null);
  const [owner, setOwner] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/get-all-blogs`
        );
        if (response.status === 200 && response.data?.blogs?.length > 0) {
          setBlog(response.data.blogs[0]);
        } else {
          setError("No blog found.");
        }
      } catch (err) {
        setError("Failed to fetch blog.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogData();
  }, []);

  useEffect(() => {
    const fetchOwnerData = async () => {
      if (blog?.owner) {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/get-user/${blog.owner}`
          );
          if (response.status === 200) {
            setOwner(response.data?.user?.name);
          }
        } catch (err) {
          setError("Failed to fetch owner data.");
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchOwnerData();
  }, [blog?.owner]);

  const formattedDate = useMemo(
    () => (blog ? format(new Date(blog.createdAt), "dd MMM yyyy") : ""),
    [blog]
  );

  if (isLoading) {
    return <HeroSectionLoader />;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-5 bg-gray-50">
      <div className="w-full max-w-3xl mb-8">
        <SearchBox />
      </div>
      {blog ? (
        <div className="flex flex-col space-y-6 w-full max-w-7xl">
          <h1 className="text-4xl font-bold font-outfit text-start underline decoration-blue-500">
            Latest Blog
          </h1>
          <Link href={`/blog/${blog._id}`}>
            <div className="flex flex-col md:flex-row md:space-x-6">
              <div className="md:w-1/2 flex justify-center md:justify-start">
                <Image
                  src={blog.banner.url}
                  alt={blog.title}
                  width={600}
                  height={400}
                  className="w-full rounded-lg h-80 object-cover"
                />
              </div>
              <div className="flex flex-col space-y-4 md:w-1/2 p-4 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {blog?.tag?.toUpperCase()}
                  </span>
                  <span className="text-gray-600 font-semibold">
                    {formattedDate}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold font-outfit">
                  {blog.title}
                </h1>
                {owner && (
                  <p className="text-gray-600 font-semibold text-lg mt-2">
                    By {owner}
                  </p>
                )}
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <div className="text-center text-gray-600">No blog available</div>
      )}
    </div>
  );
}
