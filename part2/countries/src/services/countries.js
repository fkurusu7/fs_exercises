import axios from "axios";

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api";
const ALL_URL = "all";
const BY_COUNTRY_URL = "name";

function getAll() {
  const request = axios.get(`${BASE_URL}/${ALL_URL}`);
  return request.then((res) => res.data);
}

function getCountry(name) {
  // https://studies.cs.helsinki.fi/restcountries/api/finland
  const request = axios.get(`${BASE_URL}/${BY_COUNTRY_URL}/${name}`);
  return request.then((res) => res.data);
}

export default { getAll, getCountry };
