import axios from "axios";
const LOGIN_BASE_PATH = "/api/login";

const login = async (credentials) => {
  try {
    const userRes = await axios.post(LOGIN_BASE_PATH, credentials);
    console.log("LOGIN response: ", userRes);
    return userRes.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default { login };
