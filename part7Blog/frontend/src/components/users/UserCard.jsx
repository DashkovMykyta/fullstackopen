import React from "react";
import usersService from "../../services/users";
import { useQuery } from "react-query";

export default function UserCard({ id }) {
  const { data, isLoading } = useQuery({
    queryFn: () => usersService.get(id),
    queryKey: ["users"],
  });

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <h3>{data.username}</h3>
      <h4>Added blogs</h4>
      <ul>
        {data.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}
