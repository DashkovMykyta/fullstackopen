import axios from "axios";
const baseUrl = "/api/users";

const register = async (credentials, setMessage) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    setMessage("Successfully registered in");
    return response.data;
  } catch (error) {
    console.log(error);
    setMessage("Error while registering in");
  }
};

export default { register };
