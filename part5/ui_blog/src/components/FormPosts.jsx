function FormPosts({
  handleCreatePost,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) {
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
      <button type="submit">create post</button>
    </form>
  );
}

export default FormPosts;
