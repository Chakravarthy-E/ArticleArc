import React from "react";

function RecentBlogLoader() {
  return (
    <div className="flex items-center justify-center px-5 sm:px-10 py-10">
      <div className="w-full max-w-7xl">
        <span className="h-32 w-96 bg-slate-300 animate-pulse"></span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="w-96 h-96 rounded-lg bg-slate-300 animate-pulse"></div>
          <div className="w-96 h-96 rounded-lg bg-slate-300 animate-pulse"></div>
          <div className="w-96 h-96 rounded-lg bg-slate-300 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default RecentBlogLoader;
