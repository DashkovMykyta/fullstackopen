import React, { useState } from "react";
import blogService from "../../services/blogs";

function BlogForm({ blogs, setBlogs, setMessage }) {
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleSunmit = async (e) => {
    try {
      e.preventDefault();
      await blogService.create(blog, setMessage);
      setBlogs(blogs.concat(blog));
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
