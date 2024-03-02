import React, { useState, useEffect } from "react";
import countriesService from "../services/countries";
import Content from "../components/countries/Content";
import otherService from "../services/other";

export default function Countries() {
  const [country, setCountry] = useState("");
  const [weather, setWeather] = useState(null);
  const [data, setData] = useState([]);

  //Handle input change
  const handleChange = (value) => {
    weather && setWeather(null);
    setCountry(value);
  };

  //Filter data based on country
  const filteredData = data.filter((d) =>
    d.name.common.toLowerCase().includes(country.toLowerCase())
  );

  //Get all countries data
  useEffect(() => {
    (async () => {
      const res = await countriesService.getAll();
      setData(res);
    })();
  }, []);

  //Get whether data whtn filteredData has only one country
  useEffect(() => {
    if (filteredData.length === 1 && !weather) {
      (async () => {
        const latlng = filteredData[0].capitalInfo.latlng;
        const res = await otherService.getWeather(latlng);
        setWeather(res);
      })();
    }
  }, [filteredData]);

  return (
    <div>
      <span>find country:</span>
      <input value={country} onChange={(e) => handleChange(e.target.value)} />
      <Content
        filteredData={filteredData}
        setCountry={setCountry}
        weather={weather}
      />
    </div>
  );
}
