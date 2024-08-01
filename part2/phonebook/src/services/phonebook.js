import axios from "axios";

const BASE_URL = "http://localhost:3002/persons";

const getAll = () => {
  const request = axios.get(BASE_URL);

  return request.then((res) => {
    return res.data;
  });
};

const create = (newObj) => {
  const request = axios.post(BASE_URL, newObj);
  return request.then((res) => res.data);
};

export default { getAll, create };
