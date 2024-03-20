import React, { useState } from "react";
import blogService from "../../services/blogs";
import { useNotification } from "../../context/NotificationProvider";
import { useMutation, useQueryClient } from "react-query";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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
    <div className="w-full py-2 pb-4 border rounded-lg mb-4 bg-gray-50 px-6">
      <form
        onSubmit={handleSunmit}
        className="flex flex-row gap-2 items-center w-full"
      >
        <div className="w-full">
          <label htmlFor="title" className="text-sm">
            Title
          </label>
          <Input
            type="text"
            name="title"
            value={blog.title}
            placeholder="My Blog Title"
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          />{" "}
        </div>
        <div className="w-full">
          <label htmlFor="author" className="text-sm">
            Author
          </label>
          <Input
            type="text"
            name="author"
            value={blog.author}
            placeholder="Juan Dela Cruz"
            className="w-full"
            onChange={(e) => setBlog({ ...blog, author: e.target.value })}
          />{" "}
        </div>
        <div className="w-full">
          <label htmlFor="url" className="text-sm">
            URL
          </label>
          <Input
            type="text"
            name="url"
            value={blog.url}
            className="w-full"
            placeholder="https://example.com"
            onChange={(e) => setBlog({ ...blog, url: e.target.value })}
          />{" "}
        </div>
        <Button className="h-10 self-end">Submit</Button>
      </form>
    </div>
  );
}

export default BlogForm;
