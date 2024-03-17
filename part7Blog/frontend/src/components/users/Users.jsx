import React from "react";
import usersService from "../../services/users";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function Users() {
  const { data, isLoading } = useQuery({
    queryFn: usersService.getAll,
    queryKey: ["users"],
  });

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <h2>users</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data?.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
