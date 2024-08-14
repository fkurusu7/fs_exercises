const dummy = (blogs) => {
  return 1;
};

const totalLikes = (postsList) => {
  if (postsList.length === 0) return 0;

  const result = postsList.reduce((totLikes, currPost) => {
    const likes = currPost.likes;
    return totLikes + likes;
  }, 0);

  return result;
};

const favoriteBlog = (postsList) => {
  const postWithMaxLikes = postsList.reduce((maxPost, currPost) => {
    return currPost.likes > maxPost.likes ? currPost : maxPost;
  }, postsList[0]);

  return {
    title: postWithMaxLikes.title,
    author: postWithMaxLikes.author,
    likes: postWithMaxLikes.likes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
