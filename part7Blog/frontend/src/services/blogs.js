import axios from "axios";
const baseUrl = "/api/blogs";

let token;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const config = () => {
  const user = JSON.parse(window.localStorage.getItem("loggedBlogappUser"));
  if (!user) return;
  return {
    headers: {
      Authorization: token || user.token,
    },
  };
};

const getAll = async () => {
  try {
    const request = await axios.get(baseUrl);
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

const create = async (newObject) => {
  try {
    const response = await axios.post(baseUrl, newObject, config());
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const update = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config());
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const remove = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}/${id}`, config());
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default { getAll, setToken, create, update, remove };
