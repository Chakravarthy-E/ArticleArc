"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { format } from "date-fns";
import Image from "next/image";
import HeroSectionLoader from "../atoms/hero-section-loader";
import {
  useGetAllBlogsQuery,
  useGetOwnerQuery,
} from "../../lib/features/api/apiSlice";

export interface BlogInterface {
  banner: {
    public_id: string;
    url: string;
  };
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

  // Fetch all blogs
  const {
    data: blogsData,
    isSuccess: blogsSuccess,
    isLoading: blogsLoading,
    error: blogsError,
  } = useGetAllBlogsQuery();

  const {
    data: ownerData,
    isSuccess: ownerSuccess,
    isLoading: ownerLoading,
    error: ownerError,
  } = useGetOwnerQuery(blog?.owner || "");

  useEffect(() => {
    if (blogsSuccess && blogsData?.blogs?.length > 0) {
      setBlog(blogsData.blogs[0]);
    }
  }, [blogsSuccess, blogsData]);

  useEffect(() => {
    if (ownerSuccess) {
      setOwner(ownerData.user.name);
    }
  }, [ownerData, ownerSuccess]);

  if (blogsLoading || ownerLoading) {
    return <HeroSectionLoader />;
  }

  if (blogsError || ownerError) {
    console.error("Error loading data:", blogsError || ownerError);
    return <div>Error loading data</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5 sm:px-10 py-10">
      {blog ? (
        <div className="flex flex-col space-y-5 w-full max-w-7xl">
          <h1 className="text-3xl font-bold font-outfit underline">
            Latest Blog
          </h1>
          <Link href={`/blog/${blog._id}`}>
            <div className="flex flex-col-reverse md:flex-row md:space-x-5 md:space-y-0">
              <div className="md:w-1/2 flex justify-center md:justify-start">
                <Image
                  src={blog.banner.url}
                  alt="banner"
                  width={500}
                  height={400}
                  className="w-full rounded-lg h-96 object-cover"
                  priority={false} // Ensuring lazy loading
                />
              </div>
              <div className="flex flex-col space-y-5 md:w-1/2">
                <div className="flex justify-between">
                  <span className="tag">{blog?.tag?.toLocaleUpperCase()}</span>
                  <span className="font-semibold">
                    {format(new Date(blog.createdAt), "dd-MM-yyyy")}
                  </span>
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
