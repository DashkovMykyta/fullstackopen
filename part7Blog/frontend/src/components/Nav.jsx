import React from "react";
import { Link } from "react-router-dom";

export default function Nav({ user, handleLogout }) {
  return (
    <nav className="flex px-16 flex-row text-md justify-between items-center bg-gray-50 shadow-sm border-b p-2 mb-12">
      <div className="flex flex-row gap-2">
        <Link className="py-1 px-2 text-md hover:bg-gray-100 rounded-sm" to="/">
          Home
        </Link>
        <Link
          className="py-1 px-2 text-md hover:bg-gray-100 rounded-sm"
          to="/users"
        >
          Users
        </Link>
      </div>

      <div className="flex flex-row items-center gap-2">
        <div className="rounded-full bg-black text-sm  w-7 h-7 text-white flex justify-center items-center capitalize font-thin">
          {user.username[0]}
        </div>
        <p className="capitalize">{user.name}</p>
        <span className="h-6 border-r" />
        <button
          className="text-red-500 rounded-md hover:bg-red-50 px-2 py-1"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
