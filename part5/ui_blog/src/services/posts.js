import axios from "axios";
const BASE_POSTS_PATH = "/api/blog/posts";

const getAll = async () => {
  const response = await axios.get(BASE_POSTS_PATH);
  return response.data;
};

let token = null;
const setToken = (newToken) => (token = `Bearer ${newToken}`);

const create = async (newPost) => {
  const config = { headers: { Authorization: token } };

  const res = await axios.post(BASE_POSTS_PATH, newPost, config);
  return res.data;
};

export default { getAll, create, setToken };
