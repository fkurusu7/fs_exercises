import { useState } from "react";
import blogService from "./../services/posts";

function Post({ post }) {
  const [show, setShow] = useState(false);

  const handlePostLikes = async () => {
    console.log("Old Post:", post);
    console.log(post.id);

    const likesUpdate = post.likes + 1;
    const newPost = {
      ...post,
      likes: likesUpdate,
    };

    console.log("New Post:", newPost);

    const updatedPost = await blogService.update(post.id, newPost);
    console.log(updatedPost);
  };

  return (
    <li>
      <p className="title">
        {post.title}{" "}
        <button type="button" onClick={() => setShow(!show)}>
          {show ? "hide" : "view"}
        </button>
      </p>
      {show && (
        <>
          <p className="user">{post.author}</p>
          <p className="likes">
            Likes: {post.likes}{" "}
            <button type="button" onClick={() => handlePostLikes()}>
              like
            </button>
          </p>
          <p className="url">{post.url}</p>
        </>
      )}
    </li>
  );
}

export default Post;
