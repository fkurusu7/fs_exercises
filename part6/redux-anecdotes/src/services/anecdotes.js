import { axios } from "axios";

const baseUrl = "https://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
};
