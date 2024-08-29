import { useState, useEffect } from "react";
import blogService from "./services/posts";
import Notification from "./components/Notification";
import FormLogin from "./components/FormLogin";
import FormPosts from "./components/FormPosts";
import Post from "./components/Post";
import BlogHeader from "./components/BlogHeader";
import helpers from "./utils/helpers";
import "./index.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState(null);
  const [notClassName, setNotClassName] = useState(null);
  const [user, setUser] = useState(null);
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const LOCAL_STORAGE_USER_KEY = "loggedInUser";
  const INFO_CLASS = "info";

  // LOAD ALL POSTS From DB
  useEffect(() => {
    async function getAllPosts() {
      const getPosts = await blogService.getAll();
      helpers.sortPosts(getPosts);
      setPosts(getPosts);
    }
    getAllPosts();
  }, []);

  // CHECK if a USER is already logged in
  useEffect(() => {
    const userLoggedIn = window.localStorage.getItem(LOCAL_STORAGE_USER_KEY);

    if (userLoggedIn) {
      const user = JSON.parse(userLoggedIn);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleMessage = (message, timeout, className) => {
    setMessage(message);
    setNotClassName(className);
    setTimeout(() => {
      setMessage(null);
    }, timeout);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    handleMessage(`You are logged out.`, 4000, INFO_CLASS);
    setUser(null);
  };

  return (
    <div className="container">
      {message && <Notification message={message} className={notClassName} />}
      {!user ? (
        // LOG IN FORM
        <div className="login">
          <FormLogin
            setUser={setUser}
            lclStrUserKey={LOCAL_STORAGE_USER_KEY}
            handleMessage={handleMessage}
          />
        </div>
      ) : (
        <div className="blog-content">
          <BlogHeader user={user} handleLogout={handleLogout} />
          <div className="main">
            {showNewPostForm ? (
              <FormPosts
                posts={posts}
                setPosts={setPosts}
                handleMessage={handleMessage}
                setShowNewPostForm={setShowNewPostForm}
                user={user}
              />
            ) : (
              <div>
                <button
                  type="button"
                  onClick={() => setShowNewPostForm(!showNewPostForm)}
                >
                  New Post
                </button>
              </div>
            )}
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
