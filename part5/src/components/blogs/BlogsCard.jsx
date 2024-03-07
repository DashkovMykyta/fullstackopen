import React, { useEffect, useState } from "react";
import ToggleVisibility from "../ToggleVisibility";
import BlogForm from "./BlogForm";
import Blog from "./Blog";
import blogService from "../../services/blogs";
function BlogsCard({ setMessage, user }) {
  const [blogs, setBlogs] = useState([]);

  const handleChange = async (blog) => {
    try {
      blog.likes += 1;
      await blogService.update(blog.id, blog);
      setBlogs(blogs.map((b) => (b.id === blog.id ? blog : b)));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.remove(blog.id, setMessage);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    blogService
      .getAll(setMessage)
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  return (
    <>
      <ToggleVisibility text="Create New">
        <BlogForm setMessage={setMessage} blogs={blogs} setBlogs={setBlogs} />
      </ToggleVisibility>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleChange={handleChange}
          handleDelete={handleDelete}
          user={user}
        />
      ))}
    </>
  );
}

export default BlogsCard;
