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

const update = async (id, newPost) => {
  // console.log("ID: ", id);
  // console.log("New Post: ", newPost);
  // console.log("Token: ", token);

  const config = { headers: { Authorization: token } };
  const res = await axios.put(`${BASE_POSTS_PATH}/${id}`, newPost, config);
  // console.log(res.data);

  return res.data;
};

export default { getAll, create, update, setToken };
