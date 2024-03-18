import React, { useState } from "react";
import registerService from "../services/register";
import loginService from "../services/login";
import { useNotification } from "../context/NotificationProvider";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
function Register() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const notification = useNotification();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const registered = await registerService.register(
        { username, password, name },
        notification("Registered successfully")
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

      //   }
    } catch (error) {
      notification("Error while registering in");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Registration</h3>
      <label htmlFor="username">Username</label>
      <br />
      <Input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />{" "}
      <br />
      <label htmlFor="name">Name</label>
      <br />
      <Input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />{" "}
      <br />
      <label htmlFor="username">Password</label>
      <br />
      <Input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />{" "}
      <br />
      <Button>Submit</Button>
    </form>
  );
}

export default Register;
