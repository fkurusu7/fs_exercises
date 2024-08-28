// SORT POSTS
const sortPosts = (posts) => {
  const result = posts.sort((a, b) => {
    if (a.likes < b.likes) return 1;
    if (a.likes > b.likes) return -1;
    return 0;
  });
  return result;
};

export default { sortPosts };
