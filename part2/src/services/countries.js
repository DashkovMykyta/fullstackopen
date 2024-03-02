import axios from "axios";
const url = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = async () => {
  const response = await axios.get(url + "/all");
  return response.data;
};

export default { getAll };
