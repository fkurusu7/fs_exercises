import { useState } from "react";
import blogService from "./../services/posts";

function FormPosts({
  posts,
  setPosts,
  handleMessage,
  setShowNewPostForm,
  user,
}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const SUCCESS_CLASS = "success";
  const ERROR_CLASS = "error";

  const handleCreatePost = async (ev) => {
    ev.preventDefault();

    const newPost = {
      title,
      author,
      url,
    };

    try {
      const postCreated = await blogService.create(newPost);
      // console.log("POST Created: ", postCreated);
      // console.log("usER?:", user);

      setPosts(posts.concat({ ...postCreated, user: user }));
      handleMessage(
        `A new Post "${postCreated.title}" by ${postCreated.author} added`,
        4000,
        SUCCESS_CLASS
      );
      setTitle("");
      setAuthor("");
      setUrl("");
      setShowNewPostForm((show) => !show);
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
    <form className="form" onSubmit={handleCreatePost}>
      <h2>Create a Post</h2>
      <div className="input-container">
        <div className="form-input">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div className="form-input">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div className="form-input">
          <label htmlFor="url">URL</label>
          <input
            type="text"
            name="url"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
      </div>
      <div className="btns">
        <button
          className="btn-cancel"
          type="button"
          onClick={() => setShowNewPostForm((show) => !show)}
        >
          Cancel
        </button>
        <button type="submit">create post</button>
      </div>
    </form>
  );
}

export default FormPosts;
