import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import authService from "./services/authentication";
import Notification from "./components/Notification";
import FormLogin from "./components/FormLogin";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState(null);

  // ***********************
  // ******** LOGIN ********
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const LOCAL_STORAGE_USER_KEY = "loggedInUser";

  // LOAD ALL POSTS From DB
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // CHECK if a USER is already logged in
  useEffect(() => {
    const userLoggedIn = window.localStorage.getItem(LOCAL_STORAGE_USER_KEY);

    if (userLoggedIn) {
      const user = JSON.parse(userLoggedIn);
      setUser(user);
      // TODO: GET TOKEN and use it to create new posts
    }

    // return () => {};
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
      window.localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));

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

  const handleLogout = () => {
    window.localStorage.clear();
    handleMessage(`You are logged out.`, 4000);
    setUser(null);
  };

  return (
    <div>
      {message && <Notification message={message} />}
      {!user ? (
        // LOG IN FORM
        <div>
          <h1>Log in to application</h1>
          <FormLogin
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </div>
      ) : (
        // BLOGS
        <div>
          <h1>blogs</h1>
          <h2>
            {user.name.toUpperCase()} logged in{" "}
            <button onClick={handleLogout}>Log out</button>
          </h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
