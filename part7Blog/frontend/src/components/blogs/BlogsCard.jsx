import React, { useEffect, useState } from "react";
import ToggleVisibility from "../ToggleVisibility";
import BlogForm from "./BlogForm";
import Blog from "./Blog";
import blogService from "../../services/blogs";
import { useNotification } from "../../context/NotificationProvider";
import { useQuery } from "react-query";

function BlogsCard({ user }) {
  const notification = useNotification();

  const { data, isLoading } = useQuery({
    queryFn: blogService.getAll,
    queryKey: "blogs",
  });
  const handleChange = async (blog) => {
    try {
      blog.likes += 1;
      await blogService.update(blog.id, blog);
      notification(`Blog ${blog.title} by ${blog.author} liked`);
      // setBlogs(blogs.map((b) => (b.id === blog.id ? blog : b)));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.remove(blog.id);

        notification(`Blog ${blog.title} by ${blog.author} deleted`);
        // setBlogs(blogs.filter((b) => b.id !== blog.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToggleVisibility text="Create New">
        <BlogForm blogs={data} />
      </ToggleVisibility>
      {data.map((blog) => (
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
