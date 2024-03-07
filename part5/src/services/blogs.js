import axios from "axios";
const baseUrl = "/api/blogs";

let token;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
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
    const config = {
      headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, newObject, config);
    setMessage("Successfully created");
    return response.data;
  } catch (error) {
    console.log(error);
    setMessage("Error creating blog post");
  }
};

const update = async (id, newObject) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const remove = async (id, setMessage) => {
  try {
    await axios.delete(`${baseUrl}/${id}`, {
      headers: { Authorization: token },
    });
    setMessage("Successfully deleted");
  } catch (error) {
    console.log(error);
    setMessage("Error deleting blog post");
  }
};

export default { getAll, setToken, create, update, remove };
