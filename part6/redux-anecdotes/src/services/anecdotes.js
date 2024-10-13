import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching anecdotes:", error);
    throw error;
  }
};

const createAnecdote = async (content) => {
  const object = {
    content,
    votes: 0,
  };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const createVote = async (id, newAnecdote) => {
  const response = await axios.put(`${baseUrl}/${id}`, newAnecdote);
  return response.data;
};

export default { getAll, createAnecdote, createVote };
