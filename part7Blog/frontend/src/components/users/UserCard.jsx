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
      <h3 className="text-2xl font-medium capitalize mb-4">{data.username}</h3>
      <h4 className="mb-2">Added blogs:</h4>

      <ul className="w-96 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {data?.blogs?.map((blog) => (
          <li
            key={blog.id}
            className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600"
          >
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
