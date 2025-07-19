import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import handleBlog from "../utils/api.js";
import { MdBookmarkAdd } from "react-icons/md";
import saveBlog from "../utils/saveBlog.js";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        const data = await handleBlog(id);
        setBlog(data);
        console.log("Blog data loaded:", data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleBookmark = (blog) => {
    saveBlog(blog);
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl px-6 py-16 mx-auto">
        <div className="flex flex-col items-center justify-center w-full py-12">
          <div className="w-16 h-16 border-4 border-dashed rounded-full border-primary animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-600">Loading blog details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl px-6 py-16 mx-auto space-y-12 overflow-hidden">
      <article className="space-y-8 ">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">
            {blog?.title}
          </h1>

          <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center ">
            <p className="text-sm">
              {blog?.reading_time_minutes} min read •{" "}
              {new Date(blog?.published_at).toLocaleDateString()}
            </p>
            <p className="flex-shrink-0 mt-3 text-sm md:mt-0">
              {blog?.comments_count} comments • {blog?.public_reactions_count} views
            </p>
          </div>
          <div className="flex items-center overflow-x-auto overflow-y-hidden sm:justify-start flex-nowrap ">
            <Link
              to={`/blog/${id}`}
              onClick={() => setTabIndex(0)}
              className={`flex cursor-pointer items-center flex-shrink-0 px-5 py-3 space-x-2 ${
                tabIndex === 0 ? "border border-b-0" : "border-b"
              }  `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>Content</span>
            </Link>
            <Link
              to={`author`}
              onClick={() => setTabIndex(1)}
              className={`flex cursor-pointer items-center flex-shrink-0 px-5 py-3 space-x-2 ${
                tabIndex === 1 ? "border border-b-0" : "border-b"
              }  `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              <span>Author</span>
            </Link>
            <div
              className="bg-primary p-3 ml-5 rounded-full hover:bg-opacity-30 bg-opacity-20 cursor-pointer hover:scale-105 overflow-hidden"
            >
              <MdBookmarkAdd
              onClick={()=> handleBookmark(blog)}
               size={20} className="text-secondary" />
            </div>
          </div>
        </div>
        <Outlet />
      </article>
    </div>
  );
};

export default BlogDetailsPage;