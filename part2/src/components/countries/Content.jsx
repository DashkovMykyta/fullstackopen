import React from "react";
import CounrtyCard from "./Card";
import ListItem from "./ListItem";

function Content({ filteredData, setCountry, weather }) {
  return filteredData.length === 1 ? (
    <CounrtyCard country={filteredData[0]} weather={weather} />
  ) : (
    <div>
      {filteredData.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        filteredData.map((d) => (
          <ListItem key={d.name.common} country={d} setCountry={setCountry} />
        ))
      )}
    </div>
  );
}

export default Content;
