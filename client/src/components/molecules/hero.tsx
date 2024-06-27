"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import Image from "next/image";
import { getUser } from "@/src/lib/actions/user";

interface BlogInterface {
  banner: {
    public_id: string;
    url: string;
  };
  title: string;
  description: string;
  _id: string;
  tag?: string;
  createdAt: string;
  owner?: any;
}

export default function Hero() {
  const [blog, setBlog] = useState<BlogInterface | null>(null);
  const [owner, setOwner] = useState("");

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/get-all-blogs`
        );
        if (response.data.success) {
          setBlog(response.data.blogs[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getBlog();
  }, []);

  useEffect(() => {
    const getOwner = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/get-user/${blog?.owner}`
        );
        console.log(response);
        setOwner(response.data.user.name);
      } catch (error) {
        console.log(error);
      }
    };
    getOwner();
  }, [blog?.owner]);
  console.log(owner);
  console.log(blog);
  return (
    <div className="min-h-screen flex items-center justify-center px-5 sm:px-10 py-10">
      {blog && (
        <div className="flex flex-col space-y-5 w-full max-w-7xl">
          <h1 className="text-3xl font-bold font-outfit underline">Featured</h1>
          <Link
            href={`/blog/${blog._id}`}
            as={`/blog/${blog._id}`}
            className=""
          >
            <div className="flex flex-col-reverse md:flex-row md:space-x-5 md:space-y-0">
              <div className="md:w-1/2 flex justify-center md:justify-start">
                <Image
                  src={blog.banner.url}
                  alt="banner"
                  width={500}
                  height={400}
                  className="w-full rounded-lg"
                />
              </div>
              <div className="flex flex-col space-y-5 md:w-1/2">
                <div className="flex justify-between">
                  <span className="tag">{blog?.tag?.toLocaleUpperCase()}</span>
                  <span className="font-semibold">
                    {format(blog.createdAt, "dd-MM-yyyy")}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold font-outfit">
                  {blog.title}
                </h1>
                <p className="text-gray-500 font-bold text-xl">By {owner}</p>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
