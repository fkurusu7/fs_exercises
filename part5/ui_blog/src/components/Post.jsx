import { useState } from "react";

function Post({ post }) {
  const [show, setShow] = useState(false);
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
          <p className="url">{post.url}</p>
          <p className="likes">Likes: {post.likes}</p>
          <p className="author">{post.author}</p>
        </>
      )}
    </li>
  );
}

export default Post;
