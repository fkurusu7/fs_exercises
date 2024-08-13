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

module.exports = {
  dummy,
  totalLikes,
};
