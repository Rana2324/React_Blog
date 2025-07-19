import React, { useEffect, useState } from "react";
import { getBlogs } from "../utils/saveBlog.js";
import BlogCard from "../Components/BlogCard";
import EmptyState from "../Components/EmptyState";
import toast from "react-hot-toast";

const BookmarkPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    try {
      setIsLoading(true);
      const savedBlogs = getBlogs();
      console.log("Retrieved bookmark blogs:", savedBlogs);
      
      if (!Array.isArray(savedBlogs)) {
        console.error("savedBlogs is not an array:", savedBlogs);
        setError("Saved blogs data is corrupt");
        setBlogs([]);
      } else {
        setBlogs(savedBlogs);
        setError(null);
      }
    } catch (err) {
      console.error("Error loading bookmarks:", err);
      setError(err.message);
      setBlogs([]);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleDelete = (id) => {
    console.log("Deleting bookmark with ID:", id);
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    toast.success("Blog removed from bookmarks");
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full border-primary animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-gray-600">Loading bookmarks...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <EmptyState
        message={`Error loading bookmarks: ${error}`}
        address="/blog"
        label="Go to blogs"
      />
    );
  }

  // Show empty state if no blogs are found
  if (blogs.length === 0) {
    return (
      <EmptyState
        message="No bookmarked blogs found"
        address="/blog"
        label="Go to blogs"
      />
    );
  }

  return (
    <section className="bg-gray-50 px-4 sm:px-8 lg:px-12 py-12">
      <div className="container max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Your Bookmarked Blogs</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="flex justify-center">
              <BlogCard
                blog={blog}
                deletable={true}
                handleDelete={() => handleDelete(blog.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookmarkPage;