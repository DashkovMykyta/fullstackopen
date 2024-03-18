import { useState, useEffect, useContext } from "react";
import Blog from "./components/blogs/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import BlogForm from "./components/blogs/BlogForm";
import ToggleVisibility from "./components/ToggleVisibility";
import BlogsCard from "./components/blogs/BlogsCard";
import Register from "./components/Register";
import { useNotification } from "./context/NotificationProvider";
import Notification from "./components/Notification";
import { SessionContext } from "./context/SessionProvider";
import Users from "./components/users/Users";
import { Link } from "react-router-dom";
import { Routes, Route, useMatch } from "react-router-dom";
import UserCard from "./components/users/UserCard";
import SoloBlogCard from "./components/blogs/SoloBlogCard";
import { Card, CardContent } from "./components/ui/card";

import "./index.css";
const App = () => {
  const { user, setUser } = useContext(SessionContext);
  const notification = useNotification();

  const matchUser = useMatch("/users/:id");
  const matchBlog = useMatch("/blogs/:id");

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
  };

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      notification(`Welcome back ${user.name}`);
      if (!user.token.toLowerCase().startsWith("bearer ") && user.token) {
        blogService.setToken("bearer " + user.token);
      }
    }
  }, []);
  return (
    <div className="w-full h-full min-h-screen">
      {user ? (
        <>
          <nav
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 20,
              backgroundColor: "lightgray",
            }}
          >
            <Link className="py-1 px-2 hover:bg-gray-500" to="/">
              home
            </Link>
            <Link to="/users">users</Link>

            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>
          </nav>
          <Notification />
          <h1>My app</h1>

          <Routes>
            <Route path="/" element={<BlogsCard user={user} />} />
            <Route
              path="/blogs/:id"
              element={<SoloBlogCard id={matchBlog?.params?.id} />}
            />
            <Route path="/users" element={<Users />} />
            <Route
              path="/users/:id"
              element={<UserCard id={matchUser?.params?.id} />}
            />
          </Routes>
        </>
      ) : (
        <div>
          <ToggleVisibility text="Login">
            <Login />
          </ToggleVisibility>
          <ToggleVisibility text="Register">
            <Register />
          </ToggleVisibility>
        </div>
      )}
    </div>
  );
};

export default App;
