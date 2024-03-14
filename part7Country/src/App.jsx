import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./Country";
import { useField } from "./hooks/useField";
import { useCountry } from "./hooks/useCountry";

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  console.log("country", country);
  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
