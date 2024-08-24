import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import authService from "./services/authentication";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);

  // ***********************
  // ******** LOGIN ********
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleMessage = (message, timeout) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, timeout);
  };

  const handleLogin = async (ev) => {
    ev.preventDefault();
    console.log(`Logged in with: ${username} ${password}`);

    try {
      const user = await authService.login({ username, password });
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));

      setUser(user);
      handleMessage(`Welcome, ${user.name}. You are logged in.`, 4000);
      setUsername("");
      setPassword("");
    } catch (error) {
      handleMessage(`Wrong credentials, ${error.message}`, 5000);
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div>
      {message && <Notification message={message} />}
      {!user ? (
        // LOG IN FORM
        <div>
          <h1>Log in to application</h1>
          <form onSubmit={handleLogin}>
            <div>
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
            <div>
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
          </form>
        </div>
      ) : (
        // BLOGS
        <div>
          <h1>blogs</h1>
          <h2>{user.name.toUpperCase()} logged in</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
