"use client";
import BlogLoader from "@/src/components/atoms/blog-loader";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface BlogData {
  banner: {
    public_id: string;
    url: string;
  };
  title: string;
  description: string;
  _id: string;
  createdAt: any;
  owner: string;
  tag: string;
}

export default function Blog() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBlog() {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/get-blog/${id}`
        );
        if (response.data.success) {
          setData(response.data.blog);
          setLoading(false);
        }
      } catch (error) {
        toast.error("error");
      }
      setLoading(false);
    }
    fetchBlog();
  }, [id]);

  if (loading) {
    return <BlogLoader />;
  }
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center flex-col">
      <div className="max-w-4xl w-full">
        <div className="flex flex-col space-y-3">
          <p className="flex justify-between items-center">
            <span className="tag">{data?.tag}</span>
          </p>
          <Image
            src={data?.banner?.url || ""}
            width={800}
            height={200}
            alt="image"
            className="rounded-lg h-80 w-full object-cover"
          />
          <div
            className="font-outfit text-gray-500 blogDescription"
            dangerouslySetInnerHTML={{ __html: data?.description || "" }}
          />
        </div>
      </div>
    </div>
  );
}
