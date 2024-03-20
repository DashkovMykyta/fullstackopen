import React, { useState } from "react";
import ToggleVisibility from "../ToggleVisibility";
import BlogForm from "./BlogForm";
import Blog from "./Blog";
import blogService from "../../services/blogs";
import { useNotification } from "../../context/NotificationProvider";
import { useMutation, useQuery, useQueryClient } from "react-query";
import AppHeader from "../AppHeader";

function BlogsCard({ user }) {
  const [visible, setVisible] = useState(false);
  const notification = useNotification();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryFn: blogService.getAll,
    queryKey: ["blogs"],
  });

  // add ne blog
  const updateBlog = useMutation({
    mutationFn: blogService.update,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: async (d) => {
      d["user"] = { id: d.user };
      queryClient.setQueryData(["blogs"], (oldData) =>
        oldData.map((b) => (b.id === d.id ? d : b))
      );
      notification(`Blog ${d.title} liked`);
    },
  });

  // remove blog
  const removeBlog = useMutation({
    mutationFn: blogService.remove,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: async (id) => {
      const oldData = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        oldData.filter((b) => b.id !== id)
      );
      notification(`Blog deleted`);
    },
  });

  const handleChange = async (blog) => {
    try {
      blog.likes += 1;
      updateBlog.mutate({ id: blog.id, data: blog });
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
      <AppHeader
        text="Blogs"
        description={"Create, read and manage blogs"}
        btnText={visible ? "Close" : "Create new"}
        onClick={() => setVisible(!visible)}
      />

      {visible && <BlogForm />}

      <div className="grid grid-cols-4 gap-3">
        {data?.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleChange={handleChange}
            handleDelete={handleDelete}
            user={user}
          />
        ))}
      </div>
    </>
  );
}

export default BlogsCard;
