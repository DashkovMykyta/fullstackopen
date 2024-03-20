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

import LoginRegister from "./components/LoginRegister";
import "./App.css";
import Nav from "./components/Nav";

const App = () => {
  const { user, setUser } = useContext(SessionContext);
  const notification = useNotification();

  const matchUser = useMatch("/users/:id");
  const matchBlog = useMatch("/blogs/:id");

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    window.location.reload();
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
  return user ? (
    <>
      <Nav user={user} handleLogout={handleLogout} />
      <div className="px-16">
        <Notification />
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
      </div>
    </>
  ) : (
    <LoginRegister />
  );
};

export default App;
