import React from "react";
import { Title } from "../ui/title";
import TagTabs from "./tag-tabs";
import Link from "next/link";
import AllBlogs from "./all-blogs";

function Home() {
  return (
    <div className="flex items-center justify-center py-5">
      <div className="w-full max-w-7xl flex flex-col space-y-6">
        <div className="flex items-center justify-between w-full">
          <Title title="Top Tags" />
          <Link href={"/tag/allTags"}>
            <span className="bg-blue-400 px-4 py-2 rounded-full text-white">
              See All
            </span>
          </Link>
        </div>
        <TagTabs />
        <AllBlogs />
      </div>
    </div>
  );
}

export default Home;
