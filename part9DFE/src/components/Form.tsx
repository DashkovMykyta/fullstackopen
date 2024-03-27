import React, { useState } from "react";
import entriesService from "../services/entries";
import { Entry } from "../types";
function Form({
  setEntries,
  entries,
}: {
  setEntries: (entries: Entry[]) => void;
  entries: Entry[];
}) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      const form = event.target as HTMLFormElement;

      const date = (form.elements.namedItem("date") as HTMLInputElement).value;
      const visibility = (
        form.elements.namedItem("visibility") as HTMLInputElement
      ).value;
      const weather = (form.elements.namedItem("weather") as HTMLInputElement)
        .value;
      const comment = (form.elements.namedItem("comment") as HTMLInputElement)
        .value;

      const res = await entriesService.create({
        date,
        visibility,
        weather,
        comment,
      });

      setEntries(entries.concat(res.data));
      form.reset();
    } catch (error) {
      console.error(error);

      //@ts-ignore
      setError(error.response.data);
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <label>date</label>
          <input type="date" name="date" />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <label>visibility</label>
          <label>great</label>
          <input type="radio" id="great" name="visibility" value="great" />
          <label>good</label>
          <input type="radio" id="good" name="visibility" value="good" />
          <label>ok</label>
          <input type="radio" id="ok" name="visibility" value="ok" />
          <label>Poor</label>
          <input type="radio" id="poor" name="visibility" value="poor" />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <label>weather</label>
          <label>Sunny</label>
          <input type="radio" id="sunny" name="weather" value="sunny" />
          <label>Rainy</label>
          <input type="radio" id="rainy" name="weather" value="rainy" />
          <label>Cloudy</label>
          <input type="radio" id="cloudy" name="weather" value="cloudy" />
          <label>Stormy</label>
          <input type="radio" id="stormy" name="weather" value="stormy" />
          <label>Windy</label>
          <input type="radio" id="windy" name="weather" value="windy" />
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <label>comment</label>
          <input type="text" name="comment" />
        </div>
        <button>add</button>
      </form>
    </div>
  );
}

export default Form;
