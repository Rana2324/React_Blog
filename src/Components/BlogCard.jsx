import React from 'react';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

const BlogCard = ({ blog, deletable = false, handleDelete }) => {
    // Add debug logging to see what blog data we're receiving
    console.log("BlogCard rendering with data:", blog);
    
    // Safety check to ensure blog exists
    if (!blog) {
        console.error("BlogCard received null or undefined blog");
        return null;
    }
    
    return (
        <div className="relative border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white max-w-sm">
            {/* Delete button */}
            {deletable && (
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                    }}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white p-2 rounded-full shadow-md transition-colors duration-200 z-10"
                    title="Delete blog"
                >
                    <MdDelete size={20} />
                </button>
            )}
            
            <Link to={`/blog/${blog.id}`} className="block">
                {/* Image section */}
                <div className="w-full h-48 overflow-hidden">
                    <img 
                        src={blog.cover_image || "https://source.unsplash.com/random/480x360?1"} 
                        alt={blog.title || "Blog image"} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>
                
                {/* Content section */}
                <div className="p-5 bg-white">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                        {blog.title || "No title"}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                        {blog.description || "No description"}
                    </p>
                    
                    <div className="text-xs text-gray-500 mt-2">
                        {blog.published_at ? new Date(blog.published_at).toLocaleDateString() : "No date"}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default BlogCard;