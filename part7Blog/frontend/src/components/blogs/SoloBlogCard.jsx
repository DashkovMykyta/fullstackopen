import React from "react";
import blogService from "../../services/blogs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Comments from "../Comments";
import { useNotification } from "../../context/NotificationProvider";

function SoloBlogCard({ id, user }) {
  const notification = useNotification();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryFn: () => blogService.get(id),
    queryKey: ["blog"],
  });

  // add ne blog
  const updateBlog = useMutation({
    mutationFn: blogService.update,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: async (d) => {
      console.log(d);
      d["user"] = { id: d.user };
      queryClient.setQueryData(["blog"], d);
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
      window.location.href = "/";
      notification(`Blog deleted`);
    },
  });

  const handleChange = async (blog) => {
    try {
      blog.likes += 1;
      console.log(blog);
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
    <div>
      <div className="flex flex-row justify-between items-center">
        <h3 className="text-2xl font-semibold">{data.title}</h3>
        <div>
          <button
            onClick={() => handleChange(data)}
            className="text-sm text-gray-500 "
          >
            {data.likes}
            <span className="text-red-500 text-md ml-1">♡</span>
          </button>
          {user?.id === data?.user?.id && (
            <button
              onClick={() => handleDelete(data)}
              className="text-sm text-red-500 ml-2"
            >
              delete
            </button>
          )}
        </div>
      </div>
      <p className="text-gray-500 mb-4">added by {data.user.username}</p>
      <a href={data.url} className="hover:underline">
        {data.url}
      </a>
      <Comments blog={data} />
    </div>
  );
}

export default SoloBlogCard;
