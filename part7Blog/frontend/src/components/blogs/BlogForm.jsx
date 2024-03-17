import React, { useState } from "react";
import blogService from "../../services/blogs";
import { useNotification } from "../../context/NotificationProvider";
import { useMutation, useQueryClient } from "react-query";

function BlogForm() {
  const notification = useNotification();
  const queryClient = useQueryClient();
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: "",
    likes: 0,
  });

  const addBlog = useMutation({
    mutationFn: blogService.create,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: async (data) => {
      data["user"] = { id: data.user };
      const oldData = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], [...oldData, data]);
      notification(`Blog ${data.title} by ${data.author} created`);
    },
  });

  const handleSunmit = async (e) => {
    try {
      e.preventDefault();
      addBlog.mutate({ data: blog });
      setBlog({
        title: "",
        author: "",
        url: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSunmit}>
      <h3>Create New</h3>
      <label htmlFor="title">Title</label>
      <br />
      <input
        type="text"
        name="title"
        value={blog.title}
        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
      />{" "}
      <br />
      <label htmlFor="author">Author</label>
      <br />
      <input
        type="text"
        name="author"
        value={blog.author}
        onChange={(e) => setBlog({ ...blog, author: e.target.value })}
      />{" "}
      <br />
      <label htmlFor="url">URL</label>
      <br />
      <input
        type="text"
        name="url"
        value={blog.url}
        onChange={(e) => setBlog({ ...blog, url: e.target.value })}
      />{" "}
      <br />
      <button>Submit</button>
    </form>
  );
}

export default BlogForm;
