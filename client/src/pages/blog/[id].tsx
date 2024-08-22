import { useEffect, useState } from "react";
import BlogLoader from "../../components/atoms/blog-loader";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import type { Blog } from "@/types/types";
export default function Blog() {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Blog | null>(null);
  const [owner, setOwner] = useState<string>("");

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        return;
      }
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/get-blog/${id}`
        );

        if (response.status === 200) {
          setData(response.data.blog);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  useEffect(() => {
    const fetchOwner = async () => {
      if (!data?.owner) {
        return;
      }
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/get-user/${data?.owner}`
        );

        if (response.status === 200) {
          setOwner(response.data.user.name);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOwner();
  }, [data?.owner]);

  if (isLoading) {
    return <BlogLoader />;
  }

  return (
    <>
      <Head>
        <title>{data?.title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/blog.svg" />
      </Head>
      <div className="py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center flex-col">
        <div className="max-w-4xl w-full">
          <div className="flex flex-col space-y-3">
            <p className="flex justify-between items-center">
              <span className="tag">{data?.tag}</span>
              <span>{isLoading ? "loading..." : owner}</span>
            </p>
            <Image
              src={data?.banner?.url || ""}
              width={800}
              height={200}
              alt="image"
              className="rounded-lg h-80 w-full object-cover"
              title={data?.title}
              priority={false}
            />
            <div
              className="font-outfit text-gray-500 blogDescription"
              dangerouslySetInnerHTML={{
                __html: data?.description || "",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
