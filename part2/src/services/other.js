import axios from "axios";

const getWeather = async ([lat, lon]) => {
  try {
    const weatherApi = import.meta.env.VITE_WEATHER;
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApi}`
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default { getWeather };
