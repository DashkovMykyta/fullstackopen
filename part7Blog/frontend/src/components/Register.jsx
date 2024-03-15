import React, { useState } from "react";
import registerService from "../services/register";
import loginService from "../services/login";

function Register({ setUser, setMessage }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const registered = await registerService.register(
        { username, password, name },
        setMessage
      );

      //   if (registered) {
      //     const user = await loginService.login(
      //       { username, password },
      //       setMessage
      //     );
      //     window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      // setUser(user);
      setUsername("");
      setPassword("");
      setName("");
      setMessage("Registered successfully");
      //   }
    } catch (error) {
      setMessage("Error while registering in");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Registration</h3>
      <label htmlFor="username">Username</label>
      <br />
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />{" "}
      <br />
      <label htmlFor="name">Name</label>
      <br />
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
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

export default Register;
