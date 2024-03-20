import React from "react";
import usersService from "../../services/users";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import AppHeader from "../AppHeader";

export default function Users() {
  const { data, isLoading } = useQuery({
    queryFn: usersService.getAll,
    queryKey: ["users"],
  });

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <AppHeader text="Users" description={"Users list"} />

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs rounded-lg border text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Blogs created
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.map((user) => (
                <tr
                  key={user.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Link to={`/users/${user.id}`}>{user.username}</Link>
                  </th>
                  <td className="px-6 py-4">{user.blogs.length}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/users/${user.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
