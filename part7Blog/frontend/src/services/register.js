import axios from "axios";
const baseUrl = "/api/users";

const register = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default { register };
