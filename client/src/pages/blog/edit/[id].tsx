import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import TipTapEditor from "@/src/components/ui/tiptapeditor";
import { BlogData } from "../[id]";

function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [editorContent, setEditorContent] = useState("");
  const [data, setData] = useState({
    banner: {
      public_id: "",
      url: "",
    },
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      description: editorContent,
    }));
  }, [editorContent]);

  useEffect(() => {
    async function fetchBlog() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/get-blog/${id}`
        );
        if (response.data.success) {
          const { banner, title, description } = response.data.blog;
          setBlogData(response.data.blog);
          setData({
            banner: {
              public_id: banner.public_id,
              url: banner.url,
            },
            title: title,
            description: description,
          });
          setEditorContent(description); // Update editor content
        }
      } catch (error) {
        toast.error("Error fetching blog data");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchBlog();
  }, [id]);

  const handleContentChange = (content: any) => {
    setEditorContent(content);
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/edit-blog/${id}`,
        data
      );
      if (response.status === 200) {
        toast.success("Successfully Edited");
        router.push(`/blog/${id}`); // Redirect to the updated blog page
      }
    } catch (error: any) {
      toast.error("Error updating blog");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center flex-col py-2 w-full font-outfit">
      <h1 className="text-3xl font-semibold my-3">Edit Blog</h1>
      <div className="mb-4 w-full max-w-lg">
        <label className="label-style" htmlFor="banner">
          Banner Public ID <span className="text-red-500">*</span>
        </label>
        <input
          className="input-style"
          id="banner"
          type="text"
          placeholder="Enter banner public ID"
          value={data.banner.public_id}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              banner: { ...prevData.banner, public_id: e.target.value },
            }))
          }
        />
      </div>
      <div className="mb-4 w-full max-w-lg">
        <label className="label-style" htmlFor="title">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          className="input-style"
          id="title"
          type="text"
          placeholder="Enter title"
          value={data.title}
          onChange={(e) =>
            setData((prevData) => ({
              ...prevData,
              title: e.target.value,
            }))
          }
        />
      </div>
      <div className="mb-4 w-full max-w-lg">
        <label className="label-style" htmlFor="description">
          Description <span className="text-red-500">*</span>
        </label>
        <TipTapEditor onContentChanged={handleContentChange} />
      </div>
      <button className="button-style" onClick={handleEdit}>
        Save
      </button>
    </div>
  );
}

export default Edit;
