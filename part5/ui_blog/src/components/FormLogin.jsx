import { useState } from "react";

import authService from "./../services/authentication";
import blogService from "./../services/posts";

function FormLogin({ setUser, lclStrUserKey, handleMessage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const SUCCESS_CLASS = "success";
  const ERROR_CLASS = "error";
  const INFO_CLASS = "info";

  const handleLogin = async (ev) => {
    ev.preventDefault();

    try {
      const user = await authService.login({ username, password });

      window.localStorage.setItem(lclStrUserKey, JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
      handleMessage(
        `Welcome, ${user.name}. You are logged in.`,
        4000,
        SUCCESS_CLASS
      );
      setUsername("");
      setPassword("");
    } catch (error) {
      handleMessage(`Wrong credentials, ${error.message}`, 5000, ERROR_CLASS);
      setUsername("");
      setPassword("");
    }
  };

  return (
    <form className="form" onSubmit={handleLogin}>
      <h1>Log in to application</h1>
      <div className="input-container">
        <div className="form-input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={({ target }) => {
              setUsername(target.value);
            }}
          />
        </div>
        <div className="form-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Log in</button>
      </div>
    </form>
  );
}

export default FormLogin;
