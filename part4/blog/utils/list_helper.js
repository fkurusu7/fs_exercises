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

const mostBlogs = (postsList) => {
  const authorPostsCount = postsList.reduce((authorCounts, currPost) => {
    authorCounts[currPost.author] = (authorCounts[currPost.author] || 0) + 1;
    return authorCounts;
  }, {}); // {} is the initial object called authorCounts

  return Object.entries(authorPostsCount).reduce(
    (maxAuthor, [author, count]) =>
      count >= maxAuthor.count ? { author, count } : maxAuthor,
    { author: "", count: -Infinity }
  );
};

const mostLikes = (postsList) => {
  const authorLikes = postsList.reduce((authorPostLikes, currPost) => {
    authorPostLikes[currPost.author] =
      (authorPostLikes[currPost.author] || 0) + currPost.likes;
    return authorPostLikes;
  }, {});
  // console.log(authorLikes);

  return Object.entries(authorLikes).reduce(
    (authorWithMaxLikes, [author, likes]) => {
      // console.log(authorWithMaxLikes, author, likes);
      if (likes >= authorWithMaxLikes.likes) return { author, likes };
      return authorWithMaxLikes;
    },
    { author: "", likes: -Infinity }
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
