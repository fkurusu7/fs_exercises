import { useState, useEffect } from "react";

import blogService from "./services/posts";
import authService from "./services/authentication";
import Notification from "./components/Notification";
import FormLogin from "./components/FormLogin";
import FormPosts from "./components/FormPosts";
import Post from "./components/Post";
import "./index.css";
import BlogHeader from "./components/BlogHeader";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState(null);
  const [notClassName, setNotClassName] = useState(null);

  const SUCCESS_CLASS = "success";
  const ERROR_CLASS = "error";
  const INFO_CLASS = "info";

  // ***********************
  // ******** LOGIN ********
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const LOCAL_STORAGE_USER_KEY = "loggedInUser";
  // ***********************

  // ***************************
  // ******** NEW POSTS ********
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  // ***************************

  // LOAD ALL POSTS From DB
  useEffect(() => {
    blogService.getAll().then((posts) => setPosts(posts));
  }, []);

  // CHECK if a USER is already logged in
  useEffect(() => {
    const userLoggedIn = window.localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (userLoggedIn) {
      const user = JSON.parse(userLoggedIn);
      setUser(user);
      // TODO: GET TOKEN and use it to create new posts using setToken
    }
    // return () => {};
  }, []);

  const handleMessage = (message, timeout, className) => {
    setMessage(message);
    setNotClassName(className);
    setTimeout(() => {
      setMessage(null);
    }, timeout);
  };

  const handleLogin = async (ev) => {
    ev.preventDefault();

    try {
      const user = await authService.login({ username, password });

      window.localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
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

  const handleLogout = () => {
    window.localStorage.clear();
    handleMessage(`You are logged out.`, 4000, INFO_CLASS);
    setUser(null);
  };

  const handleCreatePost = async (ev) => {
    ev.preventDefault();

    const newPost = {
      title,
      author,
      url,
    };

    try {
      const postCreated = await blogService.create(newPost);
      setPosts(posts.concat(postCreated));
      handleMessage(
        `A new Post "${postCreated.title}" by ${postCreated.author} added`,
        4000,
        SUCCESS_CLASS
      );
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (error) {
      let errorMessage;
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else {
        errorMessage = error.message || "An unknown error occurred";
      }
      handleMessage(
        `There was an error creating post: ${errorMessage}`,
        4000,
        ERROR_CLASS
      );

      setTitle("");
      setAuthor("");
      setUrl("");
    }
  };

  return (
    <div className="container">
      {message && <Notification message={message} className={notClassName} />}
      {!user ? (
        // LOG IN FORM
        <div className="login">
          <FormLogin
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </div>
      ) : (
        <div className="blog-content">
          <BlogHeader user={user} handleLogout={handleLogout} />
          <div className="main">
            <FormPosts
              handleCreatePost={handleCreatePost}
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setUrl={setUrl}
            />
            <ul className="posts-list">
              <h2>POSTS</h2>
              {posts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
