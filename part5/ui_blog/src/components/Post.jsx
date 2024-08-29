import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import blogService from "./../services/posts";

function Post({ post, setPosts, handleMessage }) {
  const [renderPost, setRenderPost] = useState(post);
  const [show, setShow] = useState(false);

  const SUCCESS_CLASS = "success";
  const ERROR_CLASS = "error";
  const INFO_CLASS = "info";

  const handlePostLikes = async () => {
    // console.log("Old Post:", post);
    // console.log(post.id);
    // console.log(post.user);
    const likesUpdate = post.likes + 1;
    const newPost = {
      ...post,
      likes: likesUpdate,
    };
    // console.log("New Post:", newPost);

    const updatedPost = await blogService.update(post.id, newPost);
    // console.log(updatedPost);
    const postWithCorrectUserInfo = { ...updatedPost, user: post.user };
    // console.log(postWithCorrectUserInfo);
    setRenderPost(postWithCorrectUserInfo);
    // setPosts((prevPosts) => {
    //   console.log(prevPosts);
    //   // helpers.sortPosts(prevPosts);
    //   prevPosts.map((post) =>
    //     post.id === postWithCorrectUserInfo.id ? postWithCorrectUserInfo : post
    //   );
    // });
  };

  const handleRemovePost = async () => {
    if (window.confirm(`Remove post: ${post.title} by ${post.author}`)) {
      try {
        const res = await blogService.remove(post.id);
        // console.log("button remove: ", res);
        handleMessage(`Post, ${post.title}, removed`, 4000, SUCCESS_CLASS);
        setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
      } catch (error) {
        const errorMsg = error.response.data.error;
        handleMessage(`Cannot delete a ${errorMsg}`, 4000, ERROR_CLASS);
      }
    }
  };

  return (
    <li>
      <p className="title">
        {renderPost.title} by {renderPost.author}
        <button type="button" onClick={() => setShow(!show)}>
          {show ? "hide" : "view"}
        </button>
      </p>
      {show && (
        <>
          <p className="user">{renderPost.user.username}</p>
          <p className="likes">
            Likes: {renderPost.likes}
            <button
              type="button"
              className="likes-btn"
              onClick={() => handlePostLikes()}
            >
              like
            </button>
          </p>
          <p className="url">{renderPost.url}</p>
          <button type="button" className="remove" onClick={handleRemovePost}>
            remove
          </button>
        </>
      )}
    </li>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  setPosts: PropTypes.func.isRequired,
  handleMessage: PropTypes.func.isRequired,
};
export default Post;
