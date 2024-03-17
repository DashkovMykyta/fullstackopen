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

const get = async (id) => {
  try {
    const request = await axios.get(`${baseUrl}/${id}`);
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

const create = async (data) => {
  try {
    const response = await axios.post(baseUrl, data, config());
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const update = async ({ id, data }) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, data, config());
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const remove = async (blog) => {
  try {
    const res = await axios.delete(`${baseUrl}/${blog.id}`, config());
    return blog.id;
  } catch (error) {
    console.log(error);
  }
};

export default { getAll, setToken, create, update, remove, get };
