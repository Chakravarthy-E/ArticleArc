import React from "react";

function BlogLoader() {
  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center flex-col">
      <div className="max-w-4xl w-full">
        <div className="flex flex-col space-y-3">
          <span className="w-52 h-10 bg-slate-300 animate-pulse rounded-full"></span>
          <div className="rounded-lg h-80 w-full object-cover bg-slate-300 animate-pulse"></div>
          <div className="flex flex-col space-y-3">
            <span className="w-full h-20 bg-slate-300 animate-pulse"></span>
            <span className="w-full h-20 bg-slate-300 animate-pulse"></span>
            <span className="w-full h-20 bg-slate-300 animate-pulse"></span>
            <span className="w-full h-20 bg-slate-300 animate-pulse"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogLoader;
