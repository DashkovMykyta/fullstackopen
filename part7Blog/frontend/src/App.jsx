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

const App = () => {
  const { user, setUser } = useContext(SessionContext);
  const notification = useNotification();

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
    <div>
      <h1>My app</h1>
      <Notification />
      {user ? (
        <>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <h2>blogs</h2>
          <BlogsCard user={user} />
        </>
      ) : (
        <>
          <ToggleVisibility text="Login">
            <Login />
          </ToggleVisibility>
          <ToggleVisibility text="Register">
            <Register />
          </ToggleVisibility>
        </>
      )}
    </div>
  );
};

export default App;
