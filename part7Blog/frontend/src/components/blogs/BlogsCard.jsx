import React from "react";
import ToggleVisibility from "../ToggleVisibility";
import BlogForm from "./BlogForm";
import Blog from "./Blog";
import blogService from "../../services/blogs";
import { useNotification } from "../../context/NotificationProvider";
import { useMutation, useQuery, useQueryClient } from "react-query";

function BlogsCard({ user }) {
  const notification = useNotification();
  const queryClient = useQueryClient;

  const { data, isLoading } = useQuery({
    queryFn: blogService.getAll,
    queryKey: ["blogs"],
  });

  // add ne blog
  const addBlog = useMutation({
    mutationFn: blogService.update,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: async (data) => {
      queryClient.setQueryData(["blogs"], data);
      notification(`Blog ${data.title} liked`);
    },
  });

  // remove blog
  const removeBlog = useMutation({
    mutationFn: blogService.remove,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: async (data) => {
      const oldData = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        oldData.filter((b) => b.id !== data.id)
      );
      notification(`Blog ${data.title} by ${data.author} deleted`);
    },
  });

  const handleChange = async (blog) => {
    try {
      blog.likes += 1;
      addBlog.mutate(blog.id, blog);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        removeBlog.mutate(blog);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <ToggleVisibility text="Create New">
        <BlogForm />
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
