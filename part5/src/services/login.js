import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials, setMessage) => {
  try {
    console.log("call");
    const response = await axios.post(baseUrl, credentials);
    setMessage("Successfully logged in");
    return response.data;
  } catch (error) {
    console.log(error);
    setMessage("Wrong username or password");
    throw new Error("Wrong username or password");
  }
};

export default { login };
