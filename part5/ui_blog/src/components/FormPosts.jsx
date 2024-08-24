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
    <form onSubmit={handleCreatePost}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          id="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <br />
      <div>
        <label htmlFor="url">URL</label>
        <input
          type="text"
          name="url"
          id="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <br />
      <button type="submit">create post</button>
    </form>
  );
}

export default FormPosts;
