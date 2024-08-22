"use client";

import TipTapEditor from "../../components/ui/tiptapeditor";
import Protected from "../../hooks/useProtected";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import Cookies from "js-cookie";

export default function CreateBlog() {
  const router = useRouter();

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (!userCookie) {
      router.push("/auth/sign-in");
      return;
    }
  }, [router]);

  const [editorContent, setEditorContent] = useState("");
  const [data, setData] = useState({
    banner: "",
    title: "",
    description: "",
    tag: "",
  });

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      description: editorContent,
    }));
  }, [editorContent]);

  const handleContentChange = (content: string) => {
    setEditorContent(content);
  };

  const createNewBlog = async () => {
    if (!data.banner || !data.title || !data.tag || !data.description) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const userCookie = Cookies.get("user");
      if (!userCookie) {
        router.push("/auth/sign-in");
        return;
      }

      const user = JSON.parse(userCookie);
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/create-blog/${user._id}`,
        data
      );

      toast.success("Blog created successfully!");
      router.push("/profile");
    } catch (error) {
      toast.error("Failed to create blog.");
    }
  };

  return (
    <>
      <Head>
        <title>Create - New Blog</title>
        <meta name="description" content="Create a new blog post" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/blog.svg" />
      </Head>
      <Protected>
        <div className="flex items-center justify-center flex-col py-10 w-full font-outfit min-h-screen bg-gray-50 px-4">
          <h1 className="text-3xl font-semibold my-6 text-center">
            Create A Blog
          </h1>

          <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
            <div className="mb-6">
              <label className="label-style" htmlFor="banner">
                Banner <span className="text-red-500">*</span>
              </label>
              <input
                className="input-style w-full"
                id="banner"
                placeholder="Paste image URL"
                required
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    banner: e.target.value,
                  }))
                }
              />
            </div>

            <div className="mb-6">
              <label className="label-style" htmlFor="title">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                className="input-style w-full"
                id="title"
                type="text"
                placeholder="Enter title for this blog"
                required
                onChange={(e) =>
                  setData((prevData) => ({
                    ...prevData,
                    title: e.target.value,
                  }))
                }
              />
            </div>

            <div className="mb-6">
              <label className="label-style" htmlFor="tag">
                Tag <span className="text-red-500">*</span>
              </label>
              <input
                className="input-style w-full"
                id="tag"
                type="text"
                placeholder="Enter tag for this blog"
                required
                onChange={(e) =>
                  setData((prevData) => ({ ...prevData, tag: e.target.value }))
                }
              />
            </div>

            <div className="mb-6">
              <label className="label-style" htmlFor="description">
                Description <span className="text-red-500">*</span>
              </label>
              <TipTapEditor onContentChanged={handleContentChange} />
            </div>

            <button
              className="button-style w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold"
              onClick={createNewBlog}
            >
              Create
            </button>
          </div>
        </div>
      </Protected>
    </>
  );
}
