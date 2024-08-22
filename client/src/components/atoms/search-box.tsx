import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (query.trim()) {
      setIsLoading(true);
      timeoutId = setTimeout(async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/search`,
            {
              params: { query },
            }
          );
          setResults(response.data.blogs);
        } catch (error) {
          toast.error("Failed to fetch search results.");
        } finally {
          setIsLoading(false);
        }
      }, 1000);
    } else {
      setResults([]);
      setIsLoading(false);
    }

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="z-50 flex flex-col items-start p-4 bg-gray-100 rounded-lg w-full max-w-3xl mx-auto shadow-lg">
      <input
        type="text"
        placeholder="Search by title or tag"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {query.trim() && (
        <div className="mt-4 w-full">
          {isLoading ? (
            <p className="text-center text-gray-600">Searching...</p>
          ) : results.length > 0 ? (
            results.map((blog) => (
              <Link
                key={blog._id}
                href={`/blog/${blog._id}`}
                className=" bg-white p-4 mb-4 border flex items-center justify-between border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <span className="t">{blog.title}</span>{" "}
                <span className="tag">{blog.tag}</span>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-600">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
