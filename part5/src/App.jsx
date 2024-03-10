import { useState, useEffect } from "react";
import Blog from "./components/blogs/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import BlogForm from "./components/blogs/BlogForm";
import ToggleVisibility from "./components/ToggleVisibility";
import BlogsCard from "./components/blogs/BlogsCard";
import Register from "./components/Register";

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
      if (!user.token.toLowerCase().startsWith("bearer ") && user.token) {
        blogService.setToken("bearer " + user.token);
      }
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
      <h1>My app</h1>
      <div className="error">{message}</div>
      {user ? (
        <>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <h2>blogs</h2>
          <BlogsCard setMessage={setMessage} user={user} />
        </>
      ) : (
        <>
          <ToggleVisibility text="Login">
            <Login setUser={setUser} setMessage={setMessage} />
          </ToggleVisibility>
          <ToggleVisibility text="Register">
            <Register setUser={setUser} setMessage={setMessage} />
          </ToggleVisibility>
        </>
      )}
    </div>
  );
};

export default App;
