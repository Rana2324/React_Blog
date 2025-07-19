const handleBlog = async (id) => {
  try {
    const response = await fetch(`https://dev.to/api/articles/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
};
export default handleBlog;
