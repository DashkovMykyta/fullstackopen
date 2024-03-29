import { Input } from "@mui/material";
import React from "react";
import { Diagnosis } from "../types";

function Form({ codes }: { codes: Diagnosis[] }) {
  return (
    <form>
      <Input placeholder="description" name="description" />
      <Input placeholder="date" name="date" type="date" />
      <Input placeholder="specialist" name="specialist" />
      <Input placeholder="4" name="healthcheckRating" />
      <select>
        {codes.map((code) => (
          <option key={code.code} value={code.code}>
            {code.code}
          </option>
        ))}
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

export default Form;
