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

const getAll = async (setMessage) => {
  try {
    const request = await axios.get(baseUrl);
    return request.data;
  } catch (error) {
    console.log(error);
    setMessage("Error fetching blog posts");
  }
};

const create = async (newObject, setMessage) => {
  try {
    const response = await axios.post(baseUrl, newObject, config());
    setMessage("Successfully created");
    return response.data;
  } catch (error) {
    console.log(error);
    setMessage("Error creating blog post");
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

const remove = async (id, setMessage) => {
  try {
    const res = await axios.delete(`${baseUrl}/${id}`, config());
    setMessage("Successfully deleted");
    return res.data;
  } catch (error) {
    console.log(error);
    setMessage("Error deleting blog post");
  }
};

export default { getAll, setToken, create, update, remove };
