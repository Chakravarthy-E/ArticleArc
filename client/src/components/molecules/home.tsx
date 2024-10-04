"use client";
import React from "react";
import TagTabs from "./tag-tabs";
import AllBlogs from "./all-blogs";

function Home() {
  return (
    <div className="flex items-center justify-center py-5">
      <div className="w-full max-w-7xl flex flex-col space-y-6">
        <TagTabs />
        <AllBlogs />
      </div>
    </div>
  );
}

export default Home;
