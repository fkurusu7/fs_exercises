import { useState } from "react";
import blogService from "./../services/posts";
import { useEffect } from "react";

function Post({ post }) {
  const [renderPost, setRenderPost] = useState(post);
  const [show, setShow] = useState(false);

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
            <button type="button" onClick={() => handlePostLikes()}>
              like
            </button>
          </p>
          <p className="url">{renderPost.url}</p>
        </>
      )}
    </li>
  );
}

export default Post;
