import React from "react";
import RecentBlogLoader from "./recent-blogs-loader";

function ProfileLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5 sm:px-10 py-10">
      <div className="w-full max-w-7xl">
        <div className="flex items-start justify-start space-y-2 flex-col">
          <span className="h-10 w-96 bg-slate-300 animate-pulse rounded-lg"></span>
          <span className="h-10 w-96 bg-slate-300 animate-pulse rounded-lg"></span>
        </div>
        <RecentBlogLoader />
      </div>
    </div>
  );
}

export default ProfileLoader;
