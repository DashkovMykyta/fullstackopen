import React, { useState } from "react";
import loginService from "../services/login";

function Login({ setUser, setMessage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await loginService.login({ username, password }, setMessage);
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    setUser(user);
    setUsername("");
    setPassword("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
      <label htmlFor="username">Username</label>
      <br />
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />{" "}
      <br />
      <label htmlFor="username">Password</label>
      <br />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />{" "}
      <br />
      <button>Submit</button>
    </form>
  );
}

export default Login;
