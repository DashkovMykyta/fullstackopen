import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  try {
    console.log("call");
    const response = await axios.post(baseUrl, credentials);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Wrong username or password");
  }
};

export default { login };
