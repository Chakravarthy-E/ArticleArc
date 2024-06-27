"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAuthState } from "../lib/slices/auth";
import axios from "axios";
import BlogCard from "../components/atoms/blog-card";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import DeleteConfirmModal from "../components/atoms/delete-blog-modal";

function Profile() {
  const { profile } = useSelector(getAuthState);
  const [userBlogs, setUserBlogs] = useState<any[] | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/get-blogs-by-owner/${profile._id}`
        );

        setUserBlogs(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserBlogs();
  }, [profile]);

  const handleDeleteClick = (blog: any) => {
    setBlogToDelete(blog);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!blogToDelete) return;
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/delete/${blogToDelete._id}`
      );
      if (response.status === 200) {
        toast.success("Deleted successfully");
        setUserBlogs(
          (prevBlogs) =>
            prevBlogs?.filter((blog) => blog._id !== blogToDelete._id) || null
        );
        setOpenDeleteDialog(false);
        setBlogToDelete(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete the blog");
    }
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
    setBlogToDelete(null);
  };

  useEffect(() => {
    if (profile === null) {
      router.push("/auth/sign-in");
    }
  }, [profile, router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-5 sm:px-10 py-10">
      <div className="w-full max-w-7xl">
        <div className="flex items-center space-x-4 justify-between">
          <div>
            <p className="space-x-4">
              <span className="text-xl font-bold text-gray-700">Name</span>
              <span className="text-2xl font-bold">{profile?.name}</span>
            </p>
            <p className="space-x-4">
              <span className="text-xl font-bold text-gray-700">Email</span>
              <span className="text-2xl font-bold">{profile?.email}</span>
            </p>
          </div>
          <button
            className="button-style"
            onClick={() => router.push("/blog/create")}
          >
            Create New Blog
          </button>
        </div>
        <div className="mt-10">
          <h2 className="text-3xl font-semibold">Your Blogs</h2>
          <div className="mt-5">
            {profile?.blogs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {userBlogs?.map((blog: any) => (
                  <div key={blog._id} className="opacity-90 hover:opacity-100">
                    <BlogCard key={blog._id} {...blog} />
                    <div className="flex space-x-2 items-center w-full mt-2">
                      <button
                        className="button-style"
                        onClick={() => handleDeleteClick(blog)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500">No blogs available</div>
            )}
          </div>
        </div>
      </div>

      {openDeleteDialog && (
        <DeleteConfirmModal cancel={cancelDelete} confirm={confirmDelete} />
      )}
    </div>
  );
}

export default Profile;
