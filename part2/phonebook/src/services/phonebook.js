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

const deleteP = (id) => {
  return axios
    .delete(`${BASE_URL}/${id}`)
    .then((p) => {
      console.log("AXIOS Del", p.data);
      return p.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default { getAll, create, deleteP };
