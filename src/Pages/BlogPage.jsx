import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import BlogCard from "../Components/BlogCard";
// import BlogCard from "../Components/BlogCard";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const handleBlogs = () => {
      fetch("https://dev.to/api/articles?per_page=20&top=7")
        .then((res) => res.json())
        .then((data) => setBlogs(data));

      console.log(blogs);
    };
    handleBlogs();
  }, [blogs]);

  return (
    <section className=" text-gray-800">
      <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
        <Link
          rel="noopener noreferrer"
          href="#"
          className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 bg-gray-50"
        >
          <img
            src={
              blogs[0]?.cover_image ||
              "https://source.unsplash.com/random/480x360?1"
            }
            alt=""
            className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 bg-gray-500"
          />
          <div className="p-6 space-y-2 lg:col-span-5">
            <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
              {blogs[0]?.title || "No title"}
            </h3>
            <span className="text-xs text-gray-600">
              {new Date(blogs[0]?.published_at).toLocaleDateString() ||
                "No date"}
            </span>
            <p>{blogs[0]?.description || "No description"}</p>
          </div>
        </Link>
        <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.slice(1).map((blog) => (
            <BlogCard key={blog.id} blog={blog}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogsPage;