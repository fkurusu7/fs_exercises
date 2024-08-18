const Post = require("./../models/post");

const initialPosts = [
  {
    title: "First Post",
    author: "Quevedo",
    url: "URL is required",
    likes: 3,
  },
  {
    title: "Second Post",
    author: "Paz",
    url: "Catalina.com",
    likes: 3,
  },
];

const nonExistingID = async () => {
  const post = new Post({
    title: "SHOULD NOT exist",
    author: "24s",
    url: "catalina.com",
    likes: 1,
  });
  await post.save();
  await post.deleteOne();

  return post._id.toString();
};

const postsInDB = async () => {
  const posts = await Post.find({});
  return posts.map((post) => post.toJSON());
};

module.exports = { initialPosts, nonExistingID, postsInDB };
