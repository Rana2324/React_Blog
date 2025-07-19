import toast, { Toaster } from "react-hot-toast";

export const getBlogs = () => {
  try {
    const blogsString = localStorage.getItem("blogs");
    console.log("Raw blogs from localStorage:", blogsString);
    let blogs = JSON.parse(blogsString) || [];
    console.log("Parsed blogs from localStorage:", blogs);
    return blogs;
  } catch (error) {
    console.error("Error getting blogs from localStorage:", error);
    return [];
  }
};

export const saveBlog = (blog) => {
  if (!blog || !blog.id) {
    console.error("Invalid blog object for saving:", blog);
    toast.error("Cannot save invalid blog");
    return;
  }

  console.log("Attempting to save blog:", blog);
  let blogs = getBlogs();

  const isExist = blogs.find((b) => b.id === blog.id);
  if (isExist) {
    toast.error("Blog already saved");
    return;
  }
  
  // Ensure we're saving all necessary properties for display
  const blogToSave = {
    id: blog.id,
    title: blog.title,
    description: blog.description,
    cover_image: blog.cover_image,
    published_at: blog.published_at,
    url: blog.url,
    tags: blog.tags || []
  };
  
  blogs.push(blogToSave);
  localStorage.setItem("blogs", JSON.stringify(blogs));
  console.log("Updated blogs in localStorage:", blogs);
  toast.success("Blog saved successfully");
};

export default saveBlog;