import React from "react";

function HeroSectionLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen px-5 sm:px-10 py-10">
      <div className="flex flex-col space-y-5 w-full max-w-7xl">
        <div className="flex flex-col-reverse md:flex-row md:space-x-5 md:space-y-0">
          <div className="md:w-1/2 flex justify-center md:justify-start bg-slate-300 h-96 rounded-lg animate-pulse"></div>
          <div className="flex flex-col space-y-5 md:w-1/2">
            <div className="flex justify-between">
              <span className="w-32 h-10 bg-slate-300 rounded-full animate-pulse"></span>
              <span className="w-32 h-10 bg-slate-200 rounded-lg animate-pulse"></span>
            </div>
            <div className="flex flex-col space-y-3 ">
              <span className="w-full h-20 bg-slate-300 rounded animate-pulse"></span>
              <span className="w-52 h-10 bg-slate-300 rounded-lg mb-2 animate-pulse"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSectionLoader;
