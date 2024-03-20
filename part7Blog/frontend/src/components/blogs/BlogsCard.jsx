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

  const { data, isLoading } = useQuery({
    queryFn: blogService.getAll,
    queryKey: ["blogs"],
  });

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
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </div>
    </>
  );
}

export default BlogsCard;
