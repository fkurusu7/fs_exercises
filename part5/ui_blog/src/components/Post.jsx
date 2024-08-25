function Post({ post }) {
  return (
    <li>
      <span className="title">{post.title}</span>
      by <span className="author">{post.author}</span>
    </li>
  );
}

export default Post;
