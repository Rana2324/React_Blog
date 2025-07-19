import React, { useEffect, useState } from "react";
import { BsMarkdown } from "react-icons/bs";
import { useParams } from "react-router-dom";
import handleBlog from "../utils/api";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const Content = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full py-12">
        <div className="w-16 h-16 border-4 border-dashed rounded-full border-primary animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-gray-600">Loading content...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto transition border-2 p-2 border-opacity-30 group hover:no-underline focus:no-underline">
      <img
        className="object-cover w-full rounded h-44"
        src={blog?.cover_image || "https://source.unsplash.com/random/480x360?1"}
        alt={blog?.title || "Blog image"}
      />
      <div>
        <div className="flex flex-wrap py-6 gap-2 border-t border-dashed">
          {blog?.tags &&
            blog?.tags.map((tag) => (
              <a
                key={tag}
                rel="noopener noreferrer"
                href="#"
                className="px-3 py-1 rounded-sm hover:underline"
              >
                #{tag}
              </a>
            ))}
        </div>
      </div>
      <div className="space-y-2">
        <a
          target="_blank"
          href={blog?.url}
          className="text-2xl font-semibold group-hover:underline group-focus:underline"
        >
          {blog?.title}
        </a>

        <Markdown rehypePlugins={[rehypeRaw]}>{blog?.body_markdown}</Markdown>
      </div>
    </div>
  );
};

export default Content;