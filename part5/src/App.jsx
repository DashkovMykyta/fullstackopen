import { useState, useEffect } from "react";
import Blog from "./components/blogs/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import BlogForm from "./components/blogs/BlogForm";
import ToggleVisibility from "./components/ToggleVisibility";
import BlogsCard from "./components/blogs/BlogsCard";

const App = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
  };

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [message]);
  return (
    <div>
      {message && <p>{message}</p>}
      {user ? (
        <>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <h2>blogs</h2>
          <BlogsCard setMessage={setMessage} user={user} />
        </>
      ) : (
        <ToggleVisibility text="Login">
          <Login setUser={setUser} setMessage={setMessage} />
        </ToggleVisibility>
      )}
    </div>
  );
};

export default App;
