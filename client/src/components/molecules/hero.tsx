"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { format } from "date-fns";
import Image from "next/image";
import HeroSectionLoader from "../atoms/hero-section-loader";
import axios from "axios";

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
    () => (blog ? format(new Date(blog.createdAt), "dd-MM-yyyy") : ""),
    [blog]
  );

  if (isLoading) {
    return <HeroSectionLoader />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5 sm:px-10 py-10">
      {blog ? (
        <div className="flex flex-col space-y-5 w-full max-w-7xl">
          <h1 className="text-3xl font-bold font-outfit underline">
            Latest Blog
          </h1>
          <Link href={`/blog/${blog._id}`}>
            <div className="flex flex-col-reverse md:flex-row md:space-x-5">
              <div className="md:w-1/2 flex justify-center md:justify-start">
                <Image
                  src={blog.banner.url}
                  alt="banner"
                  width={500}
                  height={400}
                  className="w-full rounded-lg h-96 object-cover"
                />
              </div>
              <div className="flex flex-col space-y-5 md:w-1/2">
                <div className="flex justify-between">
                  <span className="tag">{blog?.tag?.toUpperCase()}</span>
                  <span className="font-semibold">{formattedDate}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold font-outfit">
                  {blog.title}
                </h1>
                {owner && (
                  <p className="text-gray-500 font-bold text-xl my-2">
                    By {owner}
                  </p>
                )}
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <div>No blog available</div>
      )}
    </div>
  );
}
