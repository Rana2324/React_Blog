import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../Components/BlogCard";
import EmptyState from "../Components/EmptyState";
import toast from "react-hot-toast";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://dev.to/api/articles?per_page=20&top=7");
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }
        const data = await response.json();
        setBlogs(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBlogs();
  }, []); // Remove blogs from dependency to avoid infinite loop

  // Handle blog deletion
  const handleDelete = (id) => {
    // Filter out the blog with the matching ID
    const updatedBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(updatedBlogs);
    toast.success("Blog removed from listing");
  };

  // Show loading spinner
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full border-primary animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-gray-600">Loading blogs...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <EmptyState
        message={`Failed to load blogs: ${error}`}
        address="/"
        label="Go to Home"
      />
    );
  }

  // Show empty state if no blogs are found
  if (!blogs || blogs.length === 0) {
    return (
      <EmptyState
        message="No blogs found"
        address="/"
        label="Refresh Page"
      />
    );
  }

  return (
    <section className="text-gray-800">
      <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
        <Link
          to={`/blog/${blogs[0]?.id}`} 
          className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 bg-gray-50"
        >
          <img
            src={
              blogs[0]?.cover_image ||
              "https://source.unsplash.com/random/480x360?1"
            }
            alt={blogs[0]?.title || "Featured blog"}
            className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 bg-gray-500"
          />
          <div className="p-6 space-y-2 lg:col-span-5">
            <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
              {blogs[0]?.title || "No title"}
            </h3>
            <span className="text-xs text-gray-600">
              {blogs[0]?.published_at 
                ? new Date(blogs[0].published_at).toLocaleDateString() 
                : "No date"}
            </span>
            <p>{blogs[0]?.description || "No description"}</p>
          </div>
        </Link>
        <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.slice(1).map((blog) => (
            <BlogCard 
              key={blog.id} 
              blog={blog} 
              deletable={true}
              handleDelete={() => handleDelete(blog.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogsPage;