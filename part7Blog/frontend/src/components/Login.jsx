import React, { useContext, useState } from "react";
import loginService from "../services/login";
import { SessionContext } from "../context/SessionProvider";
import { useField } from "../hooks/useField";
import { useNotification } from "../context/NotificationProvider";

function Login() {
  const username = useField("text");
  const password = useField("password");

  const { setUser } = useContext(SessionContext);
  const notification = useNotification();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      });
      if (!user) {
        return;
      }
      user["token"] = "bearer " + user.token;
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      username.reset();
      password.reset();
    } catch (error) {
      console.log(error);
      notification("Wrong username or password");
    }
  };
  return (
    <form name="Login" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <label htmlFor="username">Username</label>
      <br />
      <input
        type={username.type}
        value={username.value}
        onChange={username.onChange}
      />{" "}
      <br />
      <label htmlFor="username">Password</label>
      <br />
      <input
        type={password.type}
        value={password.value}
        onChange={password.onChange}
      />{" "}
      <br />
      <button>Submit</button>
    </form>
  );
}

export default Login;
