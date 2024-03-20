import { useState } from "react";
import { Link } from "react-router-dom";

const Blog = ({ blog, handleChange, handleDelete, user }) => {
  return (
    <div className="border rounded-lg px-4 py-2 ">
      <div className="flex flex-row justify-between items-center">
        <Link
          to={`/blogs/${blog.id}`}
          className="capitalize text-md font-medium"
        >
          {blog.title}
        </Link>
        <p className="text-sm text-gray-500">
          {blog.likes}
          <span className="text-red-500 text-md ml-1">♡</span>
        </p>
      </div>
      <p className="text-xs text-gray-500">by {blog.author}</p>
    </div>
  );
};

export default Blog;
