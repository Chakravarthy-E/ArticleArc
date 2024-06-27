"use client";
import TipTapEditor from "@/src/components/ui/tiptapeditor";
import Protected from "../../hooks/useProtected";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getAuthState } from "@/src/lib/slices/auth";
import axios from "axios";

export default function CreateBlog() {
  const { profile } = useSelector(getAuthState);
  console.log(profile);

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

  // Handle changes from the TipTap editor
  const handleContentChange = (content: any) => {
    setEditorContent(content);
  };

  const createNewBlog = async () => {
    if (!profile?._id) {
      toast.error("User ID is not available");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/create-blog/${profile._id}`,
        data
      );
      if (response.status === 201) {
        toast.success("Blog created successfully:");
      }
      setData({
        banner: "",
        title: "",
        description: "",
        tag: "",
      });
    } catch (error: any) {
      toast.error("Error creating blog:", error?.message);
    }
  };

  return (
    <>
      <Protected>
        <div className="flex items-center justify-center flex-col py-2 w-full font-outfit">
          <h1 className="text-3xl font-semibold my-3">Create A Blog</h1>
          <div className="mb-4">
            <label className="label-style" htmlFor="banner">
              Banner <span className="text-red-500">*</span>
            </label>
            <input
              className="input-style"
              placeholder="Paste image URL"
              required
              onChange={(e) =>
                setData((prevData) => ({ ...prevData, banner: e.target.value }))
              }
            />
          </div>
          <div className="mb-4">
            <label className="label-style" htmlFor="title">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              className="input-style"
              id="title"
              type="text"
              placeholder="Enter title for this blog"
              required
              onChange={(e) =>
                setData((prevData) => ({ ...prevData, title: e.target.value }))
              }
            />
          </div>
          <div className="mb-4">
            <label className="label-style" htmlFor="title">
              Tag <span className="text-red-500">*</span>
            </label>
            <input
              className="input-style"
              id="title"
              type="text"
              placeholder="Enter Tag for this blog"
              required
              onChange={(e) =>
                setData((prevData) => ({ ...prevData, tag: e.target.value }))
              }
            />
          </div>
          <div className="mb-4">
            <label className="label-style" htmlFor="description">
              Description <span className="text-red-500">*</span>
            </label>
            <TipTapEditor onContentChanged={handleContentChange} />
          </div>
          <button className="button-style" onClick={createNewBlog}>
            Create
          </button>
        </div>
      </Protected>
    </>
  );
}
