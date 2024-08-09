import { useEffect, useState } from "react";
import {
  BlogData,
  useGetBlogQuery,
  useGetOwnerQuery,
} from "../../lib/features/api/apiSlice";
import BlogLoader from "../../components/atoms/blog-loader";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Blog() {
  const router = useRouter();
  const { id } = router.query;

  const [owner, setOwner] = useState<string>("");
  const [data, setData] = useState<BlogData | null>(null);

  const {
    data: blogResponse,
    isSuccess: blogSuccess,
    isLoading: blogLoading,
    error: blogError,
  } = useGetBlogQuery(id as string);

  const {
    data: ownerData,
    isSuccess: ownerSuccess,
    isLoading: ownerLoading,
    error: ownerError,
  } = useGetOwnerQuery(data?.owner || "");

  useEffect(() => {
    if (blogSuccess && blogResponse) {
      setData(blogResponse.blog);
    }
  }, [blogSuccess, blogResponse]);

  useEffect(() => {
    if (ownerSuccess && ownerData) {
      setOwner(ownerData.user.name);
    }
  }, [ownerSuccess, ownerData]);

  if (blogLoading || router.isFallback) {
    return <BlogLoader />;
  }

  if (blogError) {
    return <div>Error loading blog data</div>;
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
              <span>{ownerLoading ? "loading..." : owner}</span>
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
              dangerouslySetInnerHTML={{ __html: data?.description || "" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
